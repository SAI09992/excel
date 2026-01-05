import React, { useState, useEffect } from 'react';
import SlotMap from '../components/SlotMap';
import PaymentModal from '../components/PaymentModal';
import { fetchSlots, createBooking, checkEntry } from '../services/api';

const KioskPage = () => {
    const [step, setStep] = useState<'DETECTING' | 'SELECT_SLOT' | 'SELECT_DURATION' | 'CONFIRMED' | 'ENTRY_GRANTED'>('DETECTING');
    const [detectedPlate, setDetectedPlate] = useState<string>('');
    const [selectedSlot, setSelectedSlot] = useState<any>(null);
    const [duration, setDuration] = useState<number>(2);
    const [showPayment, setShowPayment] = useState(false);
    const [slots, setSlots] = useState<any[]>([]);

    // Mock plate detection simulation
    useEffect(() => {
        let timer: any;
        if (step === 'DETECTING') {
            timer = setTimeout(() => {
                // Generate random plate: KA + 2 digits + 2 chars + 4 digits
                const r = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;
                const char = () => String.fromCharCode(r(65, 90));
                const randomPlate = `KA${r(10, 99)}${char()}${char()}${r(1000, 9999)}`;

                setDetectedPlate(randomPlate);
                setStep('SELECT_SLOT');
            }, 3500);
        }
        return () => clearTimeout(timer);
    }, [step]);

    // Check for existing booking when plate is detected/changed
    const handleVerifyPlate = async () => {
        if (!detectedPlate) return;
        try {
            console.log("Checking entry for:", detectedPlate);
            const result = await checkEntry(detectedPlate);
            if (result.matched) {
                // Existing booking found!
                setStep('ENTRY_GRANTED');
                setTimeout(() => {
                    setStep('DETECTING');
                    setDetectedPlate('');
                }, 5000);
            } else {
                alert('No existing booking found for this plate.');
            }
        } catch (error) {
            console.error("Entry check failed", error);
            alert('Error checking entry status');
        }
    };

    // Fetch Slots
    useEffect(() => {
        const loadSlots = async () => {
            try {
                const data = await fetchSlots();
                setSlots(data);
            } catch (err) {
                console.error("Failed to load slots", err);
            }
        };
        loadSlots();
        // Poll every 5 seconds for updates
        const interval = setInterval(loadSlots, 5000);
        return () => clearInterval(interval);
    }, []);

    const handleSlotSelect = (slot: any) => {
        setSelectedSlot(slot);
        setStep('SELECT_DURATION');
    };

    const initiatePayment = () => {
        setShowPayment(true);
    };

    const handlePaymentSuccess = async () => {
        try {
            await createBooking({
                slotId: selectedSlot._id,
                carNumber: detectedPlate,
                startTime: new Date(),
                endTime: new Date(Date.now() + duration * 60 * 60 * 1000),
                source: 'KIOSK'
            });

            setShowPayment(false);
            setStep('CONFIRMED');

            // Auto reset
            setTimeout(() => {
                setStep('DETECTING');
                setDetectedPlate('');
                setSelectedSlot(null);
                setDuration(2);
            }, 6000);
        } catch (error) {
            console.error("Booking failed", error);
            alert("Payment successful but booking failed. Please contact support.");
            setShowPayment(false);
        }
    };

    return (
        <div className="min-h-screen bg-black text-white relative overflow-hidden font-sans selection:bg-blue-500 selection:text-white">
            {/* Background Ambience */}
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-black to-black z-0 pointer-events-none"></div>

            {/* Header */}
            <header className="relative z-10 p-6 flex justify-between items-center bg-black/50 backdrop-blur-md border-b border-white/10">
                <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse-glow"></div>
                    <h1 className="text-2xl font-bold tracking-wider uppercase text-gray-200">System Online</h1>
                </div>
                <div className="text-gray-400 font-mono">{new Date().toLocaleTimeString()}</div>
            </header>

            {/* Main Content */}
            <main className="relative z-10 max-w-6xl mx-auto p-8 h-[calc(100vh-80px)] flex flex-col justify-center">

                {step === 'DETECTING' && (
                    <div className="flex flex-col items-center justify-center space-y-8">
                        <div className="relative w-96 h-64 border-2 border-blue-500/50 rounded-lg overflow-hidden bg-gray-900 shadow-[0_0_50px_rgba(59,130,246,0.2)]">
                            {/* Simulated Camera View */}
                            <div className="absolute inset-0 flex items-center justify-center">
                                <span className="text-gray-600 font-mono">CAMERA FEED</span>
                            </div>
                            {/* Scanning Line */}
                            <div className="absolute left-0 w-full h-1 bg-blue-500 shadow-[0_0_20px_#3b82f6] animate-scan z-20"></div>

                            {/* Corners */}
                            <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-blue-500 z-20"></div>
                            <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-blue-500 z-20"></div>
                            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-blue-500 z-20"></div>
                            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-blue-500 z-20"></div>
                        </div>

                        <div className="text-center">
                            <h2 className="text-4xl font-light mb-2">Approaching Entry Gate...</h2>
                            <p className="text-blue-400 animate-pulse text-xl">Aligning License Plate</p>
                        </div>
                    </div>
                )}

                {step === 'SELECT_SLOT' && (
                    <div className="animate-fade-in-up">
                        <div className="text-center mb-10">
                            <h2 className="text-xl text-gray-400 mb-2">Vehicle Identified</h2>
                            <div className="inline-block relative group">
                                <input
                                    type="text"
                                    value={detectedPlate}
                                    onChange={(e) => setDetectedPlate(e.target.value.toUpperCase())}
                                    className="bg-white text-black px-8 py-4 text-5xl font-mono font-bold rounded-lg border-4 border-yellow-400 shadow-[0_0_30px_rgba(250,204,21,0.5)] focus:outline-none focus:border-blue-500 uppercase w-80 text-center"
                                />
                                <div className="text-xs text-gray-500 mt-2">Tap to Edit</div>
                            </div>
                            <div className="mt-4">
                                <button onClick={handleVerifyPlate} className="px-6 py-2 bg-blue-600 text-white rounded-full font-bold hover:bg-blue-500 transition shadow-lg">
                                    Verify Pre-Booking (Web)
                                </button>
                            </div>
                        </div>

                        <div className="bg-gray-900/80 p-8 rounded-3xl border border-gray-700/50 shadow-2xl backdrop-blur-xl">
                            <h3 className="text-2xl font-bold mb-6 text-center text-blue-300">Tap a Slot to Park</h3>
                            <SlotMap slots={slots} onSlotSelect={handleSlotSelect} />
                        </div>
                    </div>
                )}

                {step === 'SELECT_DURATION' && (
                    <div className="animate-fade-in-up max-w-4xl mx-auto w-full">
                        <h2 className="text-3xl font-bold mb-8 text-center text-white">Confirm Parking Details</h2>

                        <div className="bg-gray-900/80 p-8 rounded-3xl border border-gray-700/50 backdrop-blur-xl mb-8">
                            <div className="grid grid-cols-2 gap-8 mb-8">
                                <div>
                                    <span className="text-gray-400 block mb-1">SELECTED SLOT</span>
                                    <span className="text-4xl font-bold text-blue-400">{selectedSlot?.slotNumber}</span>
                                </div>
                                <div>
                                    <span className="text-gray-400 block mb-1">VEHICLE PLATE</span>
                                    <span className="text-4xl font-mono text-white">{detectedPlate}</span>
                                </div>
                            </div>

                            <div className="mb-8">
                                <span className="text-gray-400 block mb-4">PARKING DURATION</span>
                                <div className="flex items-center space-x-6">
                                    <input
                                        type="range"
                                        min="1"
                                        max="12"
                                        value={duration}
                                        onChange={(e) => setDuration(parseInt(e.target.value))}
                                        className="flex-1 h-4 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
                                    />
                                    <span className="text-3xl font-bold text-white w-24 text-right">{duration} hrs</span>
                                </div>
                            </div>

                            <div className="border-t border-gray-700 pt-6 flex justify-between items-center">
                                <span className="text-xl text-gray-300">Total Amount</span>
                                <span className="text-5xl font-bold text-green-400">₹{duration * 50}</span>
                            </div>
                        </div>

                        <div className="flex space-x-4">
                            <button
                                onClick={() => setStep('SELECT_SLOT')}
                                className="flex-1 py-5 rounded-xl border border-gray-600 text-gray-300 font-bold text-xl hover:bg-gray-800 transition"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={initiatePayment}
                                className="flex-[2] py-5 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold text-xl shadow-lg hover:shadow-green-500/30 transform transition hover:-translate-y-1"
                            >
                                Pay & Enter
                            </button>
                        </div>
                    </div>
                )}

                {step === 'ENTRY_GRANTED' && (
                    <div className="flex flex-col items-center justify-center animate-zoom-in text-center">
                        <div className="w-32 h-32 bg-blue-500 rounded-full flex items-center justify-center mb-8 shadow-[0_0_50px_#3b82f6]">
                            <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M5 13l4 4L19 7"></path></svg>
                        </div>
                        <h2 className="text-5xl font-bold text-white mb-4">Welcome Back!</h2>
                        <p className="text-2xl text-blue-300">Web Booking Detected. Gate Opening...</p>
                        <div className="mt-12 text-gray-500 font-mono">Status: CHECK-IN COMPLETE</div>
                    </div>
                )}

                {step === 'CONFIRMED' && (
                    <div className="flex flex-col items-center justify-center animate-zoom-in text-center">
                        <div className="w-32 h-32 bg-green-500 rounded-full flex items-center justify-center mb-8 shadow-[0_0_50px_#22c55e]">
                            <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M5 13l4 4L19 7"></path></svg>
                        </div>
                        <h2 className="text-5xl font-bold text-white mb-4">Access Granted</h2>
                        <p className="text-2xl text-gray-400">Gate Opening... Please Proceed.</p>
                        <div className="mt-12 text-gray-500 font-mono">Session ID: #SP-{Math.floor(Math.random() * 10000)}</div>
                    </div>
                )}
            </main>

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

export default KioskPage;
