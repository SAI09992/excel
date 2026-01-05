import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
    return (
        <div className="min-h-screen bg-black text-white selection:bg-blue-500 selection:text-white font-sans overflow-x-hidden">
            {/* Navbar */}
            <nav className="fixed w-full z-50 bg-black/50 backdrop-blur-md border-b border-white/10">
                <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
                    <div className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">SmartPark</div>
                    <div className="space-x-8 hidden md:flex">
                        <a href="#features" className="text-gray-300 hover:text-white transition">Features</a>
                        <a href="#how-it-works" className="text-gray-300 hover:text-white transition">How it Works</a>
                        <Link to="/login" className="text-gray-300 hover:text-white transition">Login</Link>
                    </div>
                    <Link to="/kiosk" className="px-5 py-2 rounded-full border border-white/20 hover:bg-white/10 transition text-sm font-medium">
                        Kiosk Mode
                    </Link>
                </div>
            </nav>

            {/* Hero Section */}
            <div className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 px-6">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none">
                    <div className="absolute top-20 left-20 w-72 h-72 bg-blue-600/20 rounded-full blur-[100px]"></div>
                    <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-600/20 rounded-full blur-[100px]"></div>
                </div>

                <div className="max-w-4xl mx-auto text-center relative z-10">
                    <div className="inline-block mb-4 px-4 py-1 rounded-full bg-blue-900/30 border border-blue-500/30 text-blue-400 text-sm font-medium">
                        ✨ The Future of Parking is Here
                    </div>
                    <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
                        Smart Parking <br />
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">Made Effortless.</span>
                    </h1>
                    <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
                        Experience seamless city parking with our AI-powered platform. Book slots instantly, pay securely, and park without the hassle.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
                        <Link to="/login" className="px-8 py-4 rounded-full bg-blue-600 hover:bg-blue-500 hover:shadow-[0_0_30px_rgba(37,99,235,0.5)] transition text-lg font-bold w-full sm:w-auto">
                            Get Started
                        </Link>
                        <Link to="/book" className="px-8 py-4 rounded-full bg-gray-900 border border-gray-700 hover:bg-gray-800 transition text-lg font-bold w-full sm:w-auto">
                            Book a Slot
                        </Link>
                    </div>
                </div>
            </div>

            {/* Features Grid */}
            <div className="py-24 bg-gray-900/30 border-y border-white/5 relative z-10">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="p-8 rounded-3xl bg-black/40 border border-white/10 hover:border-blue-500/30 transition group">
                            <div className="w-12 h-12 rounded-2xl bg-blue-900/30 flex items-center justify-center mb-6 group-hover:scale-110 transition">
                                <span className="text-2xl">⚡</span>
                            </div>
                            <h3 className="text-xl font-bold mb-3">Instant Booking</h3>
                            <p className="text-gray-400">Reserve your spot in seconds through our intuitive dashboard. No more circling the block.</p>
                        </div>
                        <div className="p-8 rounded-3xl bg-black/40 border border-white/10 hover:border-purple-500/30 transition group">
                            <div className="w-12 h-12 rounded-2xl bg-purple-900/30 flex items-center justify-center mb-6 group-hover:scale-110 transition">
                                <span className="text-2xl">🤖</span>
                            </div>
                            <h3 className="text-xl font-bold mb-3">AI Kiosk Mode</h3>
                            <p className="text-gray-400">Drive in seamlessly with our automated license plate recognition and self-service kiosks.</p>
                        </div>
                        <div className="p-8 rounded-3xl bg-black/40 border border-white/10 hover:border-green-500/30 transition group">
                            <div className="w-12 h-12 rounded-2xl bg-green-900/30 flex items-center justify-center mb-6 group-hover:scale-110 transition">
                                <span className="text-2xl">🛡️</span>
                            </div>
                            <h3 className="text-xl font-bold mb-3">Secure Payments</h3>
                            <p className="text-gray-400">Integrated payment gateways ensure your transactions are fast, safe, and transparent.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="py-12 border-t border-white/10 text-center text-gray-500 text-sm">
                <p>© 2026 SmartPark Systems. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default LandingPage;
