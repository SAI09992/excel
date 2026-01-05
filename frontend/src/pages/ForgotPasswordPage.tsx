import React, { useState } from 'react';
import api from '../services/api';
import { Link, useNavigate } from 'react-router-dom';

const ForgotPasswordPage = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [msg, setMsg] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await api.post('/auth/forgot', { email });
            setMsg('Email sent! Redirecting to Reset Page...');

            // Auto-redirect for demo purposes
            if (res.data.resetToken) {
                setTimeout(() => {
                    navigate(`/reset-password/${res.data.resetToken}`);
                }, 1500);
            }

            setError('');
        } catch (err: any) {
            console.error("Forgot Password Error:", err);
            const errorMessage = err.response?.data?.message || err.message || 'Error occurred connecting to server';
            setError(errorMessage);
            setMsg('');
        }
    };

    return (
        <div className="min-h-screen bg-black text-white flex items-center justify-center p-4 relative">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-black to-black pointer-events-none"></div>

            <div className="w-full max-w-md bg-gray-900/60 p-8 rounded-3xl border border-gray-800 shadow-2xl backdrop-blur-xl relative z-10 animate-fade-in-up">
                <h2 className="text-3xl font-bold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-white">Forgot Password</h2>

                {msg && <div className="bg-green-500/20 text-green-400 p-3 rounded-lg mb-4 text-center">{msg}</div>}
                {error && <div className="bg-red-500/20 text-red-400 p-3 rounded-lg mb-4 text-center">{error}</div>}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-gray-400 mb-2 font-medium">Email Address</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
                            placeholder="Enter your email"
                            required
                        />
                    </div>
                    <button type="submit" className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-xl shadow-lg shadow-blue-900/50 transition-all transform hover:scale-[1.02]">
                        Send Reset Link
                    </button>
                </form>

                <div className="mt-6 text-center">
                    <Link to="/login" className="text-gray-400 hover:text-white transition-colors">Back to Login</Link>
                </div>
            </div>
        </div>
    );
};

export default ForgotPasswordPage;
