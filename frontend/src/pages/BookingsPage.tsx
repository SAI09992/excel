import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import { fetchBookings, cancelBooking } from '../services/api';

const BookingsPage = () => {
    const [bookings, setBookings] = useState<any[]>([]);

    useEffect(() => {
        const loadBookings = async () => {
            try {
                const data = await fetchBookings();
                setBookings(data);
            } catch (err) {
                console.error("Failed to load bookings", err);
            }
        };
        loadBookings();
    }, []);

    const handleCancel = async (bookingId: string) => {
        if (!window.confirm("Are you sure you want to cancel this booking?")) return;
        try {
            await cancelBooking(bookingId);
            // Refresh bookings
            const data = await fetchBookings();
            setBookings(data);
        } catch (err: any) {
            alert(`Failed to cancel: ${err.response?.data?.error || err.message}`);
        }
    };

    return (
        <div className="flex min-h-screen bg-black font-sans text-gray-200">
            {/* Background Texture */}
            <div className="fixed inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-purple-900/10 via-black to-black pointer-events-none"></div>

            <Sidebar />
            <main className="flex-1 p-8 overflow-y-auto relative z-10">
                <h1 className="text-3xl font-bold text-white mb-8">My Bookings</h1>

                {bookings.length === 0 ? (
                    <div className="text-center py-20 bg-gray-900/40 rounded-3xl border border-gray-800">
                        <div className="text-gray-500 text-xl mb-4">No bookings found</div>
                        <p className="text-gray-600">Your parking history will appear here.</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {bookings.map((booking) => (
                            <div key={booking._id} className="bg-gray-900/40 border border-gray-800 p-6 rounded-2xl flex flex-col md:flex-row md:items-center justify-between hover:border-blue-500/30 transition group">
                                <div className="flex items-center space-x-6 mb-4 md:mb-0">
                                    <div className={`w-14 h-14 rounded-xl flex items-center justify-center font-bold text-xl ${booking.status === 'ACTIVE' || booking.status === 'PENDING_ARRIVAL' ? 'bg-blue-600 text-white shadow-[0_0_15px_#2563eb]' : 'bg-gray-800 text-gray-500'}`}>
                                        {booking.slotId?.slotNumber || '?'}
                                    </div>
                                    <div>
                                        <div className="text-lg font-medium text-white mb-1">
                                            {new Date(booking.startTime).toLocaleDateString()}
                                            <span className="text-gray-500 text-sm ml-2">{new Date(booking.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                        </div>
                                        <div className="text-sm text-gray-400 font-mono">
                                            {booking.carNumber} • <span className="text-blue-400 font-bold">₹{booking.totalCost}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between md:justify-end md:space-x-8 w-full md:w-auto">
                                    <div className="text-right hidden md:block">
                                        <div className="text-xs text-gray-500 uppercase tracking-wider">Duration</div>
                                        <div className="text-white font-medium">
                                            {Math.ceil((new Date(booking.endTime).getTime() - new Date(booking.startTime).getTime()) / 36e5)}h
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-4">
                                        <span className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wide border ${booking.status === 'ACTIVE' ? 'bg-green-900/30 text-green-400 border-green-500/30' :
                                            booking.status === 'PENDING_ARRIVAL' ? 'bg-yellow-900/30 text-yellow-400 border-yellow-500/30' :
                                                booking.status === 'CANCELLED' ? 'bg-red-900/30 text-red-400 border-red-500/30' :
                                                    'bg-gray-800 text-gray-400 border-gray-700'
                                            }`}>
                                            {booking.status.replace('_', ' ')}
                                        </span>
                                        {(booking.status === 'PENDING_ARRIVAL' || booking.status === 'ACTIVE') && (
                                            <button
                                                onClick={() => handleCancel(booking._id)}
                                                className="text-red-400 hover:text-red-300 hover:bg-red-900/20 px-3 py-1.5 rounded-lg text-sm font-medium transition"
                                            >
                                                Cancel
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
};

export default BookingsPage;
