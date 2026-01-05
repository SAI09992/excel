import React from 'react';
import Sidebar from '../components/Sidebar';

const SettingsPage = () => {
    return (
        <div className="flex min-h-screen bg-black font-sans text-gray-200">
            <Sidebar />
            <main className="flex-1 p-8 overflow-y-auto">
                <h1 className="text-3xl font-bold text-white mb-8">Settings</h1>

                <div className="space-y-6 max-w-2xl">
                    <div className="bg-gray-900/40 border border-gray-800 p-6 rounded-2xl flex items-center justify-between">
                        <div>
                            <h3 className="text-lg font-bold text-white">Push Notifications</h3>
                            <p className="text-sm text-gray-500">Receive booking alerts and buffer expiry warnings.</p>
                        </div>
                        <div className="w-12 h-6 bg-blue-600 rounded-full relative cursor-pointer">
                            <div className="w-6 h-6 bg-white rounded-full absolute right-0 shadow-sm transform scale-90"></div>
                        </div>
                    </div>

                    <div className="bg-gray-900/40 border border-gray-800 p-6 rounded-2xl flex items-center justify-between">
                        <div>
                            <h3 className="text-lg font-bold text-white">Dark Mode</h3>
                            <p className="text-sm text-gray-500">Always on because it looks cooler.</p>
                        </div>
                        <div className="w-12 h-6 bg-blue-600 rounded-full relative cursor-pointer opacity-50 cursor-not-allowed">
                            <div className="w-6 h-6 bg-white rounded-full absolute right-0 shadow-sm transform scale-90"></div>
                        </div>
                    </div>

                    <div className="bg-gray-900/40 border border-gray-800 p-6 rounded-2xl flex items-center justify-between">
                        <div>
                            <h3 className="text-lg font-bold text-red-400">Delete Account</h3>
                            <p className="text-sm text-gray-500">Permanently remove all your data.</p>
                        </div>
                        <button className="px-4 py-2 border border-red-500/30 text-red-400 rounded-lg hover:bg-red-500/10 transition">Delete</button>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default SettingsPage;
