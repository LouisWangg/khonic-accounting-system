import React from 'react';
import { Check } from 'lucide-react';

const SuccessModal = ({ isOpen, onClose, title, message }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50" style={{ backgroundColor: 'rgba(0, 0, 0, 0.8)' }}>
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4 p-8 flex flex-col items-center text-center">
                <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mb-6 shadow-lg shadow-green-100">
                    <Check className="text-white" size={40} strokeWidth={3} />
                </div>

                <h2 className="text-xl font-bold text-gray-900 mb-2">{title}</h2>
                <p className="text-gray-500 mb-8">{message}</p>

                <button
                    onClick={onClose}
                    className="w-full py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors shadow-sm"
                >
                    Kembali
                </button>
            </div>
        </div>
    );
};

export default SuccessModal;
