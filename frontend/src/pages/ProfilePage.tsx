import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { fetchUserProfile, updateUserProfile } from '../services/api';

const ProfilePage = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [user, setUser] = useState<any>(() => {
        // Initialize from localStorage for immediate display
        const savedInfo = localStorage.getItem('userInfo');
        return savedInfo ? JSON.parse(savedInfo) : {
            name: '',
            email: '',
            vehicleNo: ''
        };
    });

    useEffect(() => {
        const loadProfile = async () => {
            try {
                const data = await fetchUserProfile();
                // Merge with existing token/local data to keep structure
                setUser((prev: any) => ({ ...prev, ...data }));
            } catch (err: any) {
                console.error("Failed to load profile", err);
                const errorMsg = err.response?.data?.message || err.message;
                // Only alert if we really have no data to show
                if (!user.name) {
                    alert(`Failed to load profile: ${errorMsg}`);
                }
            }
        };
        loadProfile();
    }, []);

    const handleSave = async () => {
        try {
            await updateUserProfile(user);
            setIsEditing(false);
            // Show toast or notification
        } catch (err) {
            console.error("Failed to update profile", err);
        }
    };

    return (
        <div className="flex min-h-screen bg-black font-sans text-gray-200">
            <Sidebar />
            <main className="flex-1 p-8 overflow-y-auto relative z-10">
                {/* Background Texture */}
                <div className="fixed inset-0 bg-[radial-gradient(circle_at_bottom_right,_var(--tw-gradient-stops))] from-blue-900/10 via-black to-black pointer-events-none -z-10"></div>

                <div className="flex flex-col mb-10">
                    <Link to="/dashboard" className="text-gray-400 hover:text-white mb-4 flex items-center transition w-fit">
                        <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
                        Back to Dashboard
                    </Link>
                    <div className="flex justify-between items-center">
                        <h1 className="text-3xl font-bold text-white">My Profile</h1>
                        <button
                            onClick={isEditing ? handleSave : () => setIsEditing(true)}
                            className={`px-6 py-2.5 rounded-xl text-sm font-medium transition flex items-center ${isEditing ? 'bg-green-600 text-white hover:bg-green-500 shadow-lg shadow-green-900/20' : 'bg-blue-600/10 text-blue-400 border border-blue-500/30 hover:bg-blue-600/20'}`}
                        >
                            {isEditing ? (
                                <>
                                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                                    Save Changes
                                </>
                            ) : (
                                <>
                                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
                                    Edit Profile
                                </>
                            )}
                        </button>
                    </div>
                </div>

                <div className="bg-gray-900/40 border border-gray-800 rounded-3xl p-8 max-w-3xl backdrop-blur-sm">
                    <div className="flex flex-col md:flex-row items-center mb-10 pb-10 border-b border-gray-800">
                        <div className="w-28 h-28 rounded-full bg-gradient-to-tr from-blue-600 to-cyan-500 flex items-center justify-center text-4xl font-bold text-white shadow-[0_0_30px_rgba(37,99,235,0.3)] mb-6 md:mb-0 md:mr-8 border-4 border-black">
                            {user.name ? user.name.charAt(0) : 'U'}
                        </div>
                        <div className="text-center md:text-left">
                            <h2 className="text-3xl font-bold text-white mb-1">{user.name || 'User'}</h2>
                            <p className="text-gray-400 flex items-center justify-center md:justify-start">
                                <svg className="w-4 h-4 mr-1 text-yellow-500" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                                Premium Member
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <label className="block text-sm text-gray-500 uppercase tracking-wide font-bold mb-2 ml-1">Full Name</label>
                            <input
                                type="text"
                                value={user.name}
                                onChange={(e) => setUser({ ...user, name: e.target.value })}
                                disabled={!isEditing}
                                className={`w-full bg-black/50 border rounded-xl px-4 py-3 text-white focus:border-blue-500 outline-none transition disabled:opacity-70 ${isEditing ? 'border-gray-600' : 'border-transparent bg-transparent pl-0'}`}
                            />
                        </div>
                        <div>
                            <label className="block text-sm text-gray-500 uppercase tracking-wide font-bold mb-2 ml-1">Email Address</label>
                            <input
                                type="email"
                                value={user.email}
                                onChange={(e) => setUser({ ...user, email: e.target.value })}
                                disabled={!isEditing}
                                className={`w-full bg-black/50 border rounded-xl px-4 py-3 text-white focus:border-blue-500 outline-none transition disabled:opacity-70 ${isEditing ? 'border-gray-600' : 'border-transparent bg-transparent pl-0'}`}
                            />
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-sm text-gray-500 uppercase tracking-wide font-bold mb-2 ml-1">Primary Vehicle Plate</label>
                            <div className={`relative ${isEditing ? '' : ''}`}>
                                <input
                                    type="text"
                                    value={user.vehicleNo}
                                    onChange={(e) => setUser({ ...user, vehicleNo: e.target.value })}
                                    disabled={!isEditing}
                                    className={`w-full bg-black/50 border rounded-xl px-4 py-3 text-white focus:border-blue-500 outline-none transition font-mono tracking-widest disabled:opacity-70 ${isEditing ? 'border-gray-600' : 'border-transparent bg-transparent pl-0 text-xl'}`}
                                />
                                {isEditing && <div className="absolute right-4 top-3.5 text-xs text-gray-500 font-bold border border-gray-600 px-2 py-0.5 rounded">IND</div>}
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default ProfilePage;
