import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SlotMap from '../components/SlotMap';
import PaymentModal from '../components/PaymentModal';
import { fetchSlots, createBooking } from '../services/api';

const BookingPage = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [selectedSlot, setSelectedSlot] = useState<any>(null);
    const [duration, setDuration] = useState(2);
    const [startTime, setStartTime] = useState(new Date().toISOString().slice(0, 16));
    const [showPayment, setShowPayment] = useState(false);
    const [slots, setSlots] = useState<any[]>([]);

    useEffect(() => {
        const loadSlots = async () => {
            try {
                const data = await fetchSlots();
                setSlots(data);
            } catch (err: any) {
                console.error("Failed to load slots", err);
                const errorMsg = err.response?.data?.message || err.response?.data || err.message;
                alert(`Error loading slots: ${JSON.stringify(errorMsg)}`);
            }
        };
        loadSlots();
        const interval = setInterval(loadSlots, 5000);
        return () => clearInterval(interval);
    }, []);

    const handleSlotSelect = (slot: any) => {
        setSelectedSlot(slot);
        setStep(2);
    };

    const handlePaymentSuccess = async () => {
        try {
            // Get user info for car number (fallback to mock if needed)
            const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
            const info_car = userInfo.carPlate || 'KA05MC1234'; // Fallback or prompt user

            const start = new Date(startTime);
            const end = new Date(start.getTime() + duration * 60 * 60 * 1000);

            await createBooking({
                slotId: selectedSlot._id,
                carNumber: info_car,
                startTime: start,
                endTime: end,
                source: 'WEB'
            });

            // alert('Booking Successful!'); // Removed as per request
            setShowPayment(false);
            navigate('/dashboard');
        } catch (err: any) {
            console.error("Booking failed", err);
            const errorMsg = err.response?.data?.error || err.message;
            alert(`Booking Failed: ${errorMsg}`);
            setShowPayment(false);
        }
    };

    return (
        <div className="min-h-screen bg-black text-white p-6 md:p-12 font-sans relative">
            <div className="fixed inset-0 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-purple-900/20 via-black to-black pointer-events-none"></div>

            <div className="max-w-5xl mx-auto relative z-10">
                <div className="flex items-center justify-between mb-12">
                    <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-white">Book Your Spot</h1>
                    <button onClick={() => navigate('/dashboard')} className="text-gray-400 hover:text-white transition">Exit</button>
                </div>

                {/* Progress Steps */}
                <div className="flex mb-12 relative">
                    <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-800 -z-10 transform -translate-y-1/2 rounded-full"></div>
                    <div className={`flex-1 flex flex-col items-center ${step >= 1 ? 'text-blue-400' : 'text-gray-600'}`}>
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold mb-2 transition-all ${step >= 1 ? 'bg-blue-600 text-white shadow-[0_0_15px_#2563eb]' : 'bg-gray-800'}`}>1</div>
                        <span className="text-sm font-medium">Select Slot</span>
                    </div>
                    <div className={`flex-1 flex flex-col items-center ${step >= 2 ? 'text-blue-400' : 'text-gray-600'}`}>
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold mb-2 transition-all ${step >= 2 ? 'bg-blue-600 text-white shadow-[0_0_15px_#2563eb]' : 'bg-gray-800'}`}>2</div>
                        <span className="text-sm font-medium">Duration</span>
                    </div>
                    <div className={`flex-1 flex flex-col items-center ${step >= 3 ? 'text-blue-400' : 'text-gray-600'}`}>
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold mb-2 transition-all ${step >= 3 ? 'bg-blue-600 text-white shadow-[0_0_15px_#2563eb]' : 'bg-gray-800'}`}>3</div>
                        <span className="text-sm font-medium">Payment</span>
                    </div>
                </div>

                {step === 1 && (
                    <div className="bg-gray-900/60 p-8 rounded-3xl border border-gray-800 shadow-2xl backdrop-blur-md animate-fade-in-up">
                        <h2 className="text-2xl font-bold mb-6 text-gray-200">Choose a Slot</h2>
                        <SlotMap slots={slots} onSlotSelect={handleSlotSelect} />
                    </div>
                )}

                {step === 2 && (
                    <div className="bg-gray-900/60 p-8 rounded-3xl border border-gray-800 shadow-2xl backdrop-blur-md animate-fade-in-up">
                        <h2 className="text-2xl font-bold mb-8 text-gray-200">Select Time & Duration</h2>

                        <div className="mb-8">
                            <label className="block text-gray-400 font-medium mb-4">Start Time</label>
                            <input
                                type="datetime-local"
                                value={startTime}
                                onChange={(e) => setStartTime(e.target.value)}
                                min={new Date().toISOString().slice(0, 16)}
                                className="w-full bg-gray-700 text-white p-3 rounded-xl border border-gray-600 focus:border-blue-500 focus:outline-none"
                            />
                        </div>

                        <div className="mb-10">
                            <label className="block text-gray-400 font-medium mb-4">Duration (Hours)</label>
                            <input
                                type="range"
                                min="1"
                                max="12"
                                value={duration}
                                onChange={(e) => setDuration(parseInt(e.target.value))}
                                className="w-full h-3 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
                            />
                            <div className="flex justify-between mt-4 text-gray-500 font-mono">
                                <span>1h</span>
                                <span className="text-blue-400 font-bold text-xl">{duration} Hours</span>
                                <span>12h</span>
                            </div>
                        </div>

                        <div className="bg-black/40 p-6 rounded-2xl border border-white/5 flex justify-between items-center mb-8">
                            <span className="text-gray-400">Estimated Cost</span>
                            <span className="text-4xl font-bold text-white">₹{duration * 50}</span>
                        </div>

                        <div className="flex space-x-4">
                            <button onClick={() => setStep(1)} className="px-8 py-3 border border-gray-600 text-gray-300 rounded-xl hover:bg-gray-800 transition">Back</button>
                            <button onClick={() => setStep(3)} className="px-8 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-500 flex-1 font-bold shadow-lg shadow-blue-900/20">Confirm Duration</button>
                        </div>
                    </div>
                )}

                {step === 3 && (
                    <div className="bg-gray-900/60 p-8 rounded-3xl border border-gray-800 shadow-2xl backdrop-blur-md animate-fade-in-up">
                        <h2 className="text-2xl font-bold mb-8 text-gray-200">Review Booking</h2>
                        <div className="space-y-6 mb-10">
                            <div className="flex justify-between border-b border-gray-800 pb-4">
                                <span className="text-gray-400">Parking Slot</span>
                                <span className="font-bold text-xl text-white">{selectedSlot?.slotNumber}</span>
                            </div>
                            <div className="flex justify-between border-b border-gray-800 pb-4">
                                <span className="text-gray-400">Total Duration</span>
                                <span className="font-bold text-xl text-white">{duration} Hours</span>
                            </div>
                            <div className="flex justify-between border-b border-gray-800 pb-4">
                                <span className="text-gray-400">Start Time</span>
                                <span className="font-bold text-white text-right">{new Date(startTime).toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between pt-2 items-center">
                                <span className="text-gray-300 font-bold text-lg">Total Payable</span>
                                <span className="text-green-400 font-bold text-4xl">₹{duration * 50}</span>
                            </div>
                        </div>

                        <div className="flex space-x-4">
                            <button onClick={() => setStep(2)} className="px-8 py-4 border border-gray-600 text-gray-300 rounded-xl hover:bg-gray-800 transition">Back</button>
                            <button onClick={() => setShowPayment(true)} className="px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold rounded-xl hover:shadow-[0_0_20px_#16a34a] flex-1 shadow-lg transform transition active:scale-95">Proceed to Payment</button>
                        </div>
                    </div>
                )}
            </div>

            {showPayment && (
                <PaymentModal
                    amount={duration * 50}
                    onSuccess={handlePaymentSuccess}
                    onCancel={() => setShowPayment(false)}
                />
            )}
        </div>
    );
};

export default BookingPage;
