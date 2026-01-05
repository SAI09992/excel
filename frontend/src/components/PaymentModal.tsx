import React, { useState } from 'react';

interface PaymentModalProps {
    amount: number;
    onSuccess: () => void;
    onCancel: () => void;
}

const PaymentModal: React.FC<PaymentModalProps> = ({ amount, onSuccess, onCancel }) => {
    const [processing, setProcessing] = useState(false);

    const handlePay = () => {
        setProcessing(true);
        // Simulate payment gateway delay
        setTimeout(() => {
            setProcessing(false);
            onSuccess();
        }, 2000);
    };

    return (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
            <div className="bg-gray-900 rounded-2xl p-8 max-w-md w-full shadow-2xl transform transition-all border border-gray-800">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-2xl font-bold text-white">Confirm Payment</h3>
                    <button onClick={onCancel} className="text-gray-400 hover:text-white">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                    </button>
                </div>

                <div className="bg-blue-900/30 border border-blue-500/30 p-4 rounded-xl mb-6 flex justify-between items-center">
                    <span className="text-blue-300 font-medium">Total Amount</span>
                    <span className="text-3xl font-bold text-blue-400">₹{amount}</span>
                </div>

                <div className="space-y-3 mb-8">
                    <div className="p-3 border border-gray-700 rounded-lg cursor-pointer hover:border-blue-500 hover:bg-gray-800 transition flex items-center group">
                        <div className="w-4 h-4 rounded-full border-2 border-blue-500 mr-3 bg-blue-500"></div>
                        <span className="font-medium text-gray-300 group-hover:text-white">UPI / GPay / PhonePe</span>
                    </div>
                    <div className="p-3 border border-gray-700 rounded-lg cursor-pointer hover:border-blue-500 hover:bg-gray-800 transition flex items-center group">
                        <div className="w-4 h-4 rounded-full border-2 border-gray-500 mr-3"></div>
                        <span className="font-medium text-gray-300 group-hover:text-white">Credit / Debit Card</span>
                    </div>
                </div>

                <button
                    onClick={handlePay}
                    disabled={processing}
                    className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white font-bold py-4 rounded-xl shadow-lg transform transition active:scale-95 disabled:opacity-70 flex justify-center items-center"
                >
                    {processing ? (
                        <>
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Processing...
                        </>
                    ) : (
                        `Pay ₹${amount}`
                    )}
                </button>
            </div>
        </div>
    );
};

export default PaymentModal;
