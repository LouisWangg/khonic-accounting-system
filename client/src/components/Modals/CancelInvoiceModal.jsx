import React from 'react';
import { X, AlertCircle } from 'lucide-react';

const CancelInvoiceModal = ({ isOpen, onClose, onConfirm }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50" style={{ backgroundColor: 'rgba(0, 0, 0, 0.8)' }}>
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4 p-6 relative">
                <button onClick={onClose} className="absolute right-4 top-4 text-gray-400 hover:text-gray-600">
                    <X size={20} />
                </button>

                <h2 className="text-lg font-bold text-gray-900 mb-4">Batalkan Faktur Pajak</h2>

                <p className="text-sm text-gray-600 mb-4">
                    Anda akan membatalkan Faktur Pajak <span className="font-medium text-gray-900">010.001-25.12345678</span>. Tindakan ini akan mengubah statusnya menjadi "Cancelled" dan tidak dapat diurungkan.
                </p>

                <div className="bg-gray-100 p-3 rounded-lg flex items-start gap-3 mb-6">
                    <AlertCircle size={18} className="text-gray-500 mt-0.5" />
                    <p className="text-xs text-gray-600">
                        Pastikan Anda juga telah membatalkan faktur ini di aplikasi e-Faktur DJP.
                    </p>
                </div>

                <div className="space-y-3">
                    <button
                        onClick={onConfirm}
                        className="w-full py-2.5 bg-gray-700 hover:bg-gray-800 text-white font-medium rounded-lg transition-colors"
                    >
                        Ya, Batalkan
                    </button>
                    <button
                        onClick={onClose}
                        className="w-full py-2.5 border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium rounded-lg transition-colors"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CancelInvoiceModal;
