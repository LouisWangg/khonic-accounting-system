import React from 'react';
import { AlertTriangle } from 'lucide-react';

const DeleteAccountModal = ({ isOpen, onClose, onDelete, account }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 px-4" style={{ backgroundColor: 'rgba(0, 0, 0, 0.4)' }}>
            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-sm overflow-hidden p-8 flex flex-col items-center">
                <div className="mb-6">
                    <AlertTriangle size={120} className="text-gray-500" strokeWidth={1} />
                </div>

                <h2 className="text-2xl font-bold text-gray-900 mb-2">Hapus Akun</h2>

                <p className="text-gray-500 text-center mb-10 leading-relaxed px-4">
                    Apakah kamu yakin ingin menghapus akun ini?
                </p>

                <div className="w-full space-y-3">
                    <button
                        onClick={() => {
                            onDelete(account.id);
                            onClose();
                        }}
                        className="w-full py-4 rounded-2xl bg-[#D9534F] text-white font-bold hover:bg-[#C9302C] transition-all shadow-sm"
                    >
                        Hapus
                    </button>

                    <button
                        onClick={onClose}
                        className="w-full py-4 text-gray-900 font-bold hover:bg-gray-50 rounded-2xl transition-all"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteAccountModal;
