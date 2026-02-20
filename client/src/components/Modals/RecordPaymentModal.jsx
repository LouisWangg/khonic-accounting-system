import React, { useState } from 'react';
import { X, Check, Calendar, ChevronDown, Minus } from 'lucide-react';
import SuccessModal from './SuccessModal';

const RecordPaymentModal = ({ isOpen, onClose }) => {
    const [showSuccess, setShowSuccess] = useState(false);

    if (!isOpen) return null;

    const handleSave = () => {
        // Logic to save payment
        setShowSuccess(true);
    };

    const handleCloseSuccess = () => {
        setShowSuccess(false);
        onClose();
    };

    return (
        <>
            <div className="fixed inset-0 flex items-center justify-center z-50" style={{ backgroundColor: 'rgba(0, 0, 0, 0.8)' }}>
                <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl mx-4 max-h-[90vh] overflow-y-auto">
                    {/* Header */}
                    <div className="flex items-center justify-between p-6 border-b border-gray-100">
                        <h2 className="text-xl font-bold text-gray-900">Catat Pembayaran Pelanggan</h2>
                        <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                            <X size={24} />
                        </button>
                    </div>

                    <div className="p-6 space-y-6">
                        {/* Header Input */}
                        <div>
                            <label className="block text-sm font-semibold text-red-500 mb-2">
                                * Nama Pelanggan
                            </label>
                            <div className="relative">
                                <select className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none appearance-none bg-white">
                                    <option>PT. Marsha Lenathea Lapian</option>
                                </select>
                                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                            </div>
                        </div>

                        <div className="grid grid-cols-3 gap-4">
                            <div>
                                <label className="block text-sm font-semibold text-red-500 mb-2">
                                    * Tanggal Pembayaran
                                </label>
                                <div className="relative">
                                    <input
                                        type="date"
                                        defaultValue="2025-10-09"
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-red-500 mb-2">
                                    * Setor ke Akun
                                </label>
                                <div className="relative">
                                    <select className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none appearance-none bg-white">
                                        <option>111.001 - Kas Kantor</option>
                                    </select>
                                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Diskon
                                </label>
                                <div className="relative">
                                    <select className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none appearance-none bg-white">
                                        <option>701.001 - DISKON PENJUALAN BARANG</option>
                                    </select>
                                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                                </div>
                            </div>
                        </div>

                        {/* Allocation Table */}
                        <div>
                            <h3 className="text-sm font-bold text-gray-900 mb-4">Alokasi Pembayaran</h3>
                            <div className="bg-gray-50 rounded-lg p-3 grid grid-cols-12 gap-4 text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                                <div className="col-span-1 text-center"><Minus size={16} className="mx-auto" /></div>
                                <div className="col-span-4">Faktur</div>
                                <div className="col-span-3 text-right">Sisa Tagihan</div>
                                <div className="col-span-4 text-right">Alokasi Pembayaran</div>
                            </div>

                            {/* Row 1 */}
                            <div className="grid grid-cols-12 gap-4 items-center py-3 border-b border-gray-50">
                                <div className="col-span-1 flex justify-center">
                                    <div className="w-5 h-5 bg-gray-600 rounded flex items-center justify-center text-white">
                                        <Check size={14} />
                                    </div>
                                </div>
                                <div className="col-span-4 text-sm font-medium text-gray-900">
                                    INV-2025-08-002 (09-10-2025)
                                </div>
                                <div className="col-span-3 text-right text-sm font-bold text-gray-900">
                                    Rp6.300.000
                                </div>
                                <div className="col-span-4">
                                    <div className="relative">
                                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-bold text-xs">Rp</span>
                                        <input
                                            type="text"
                                            defaultValue="10.000.000"
                                            className="w-full pl-8 pr-3 py-2 text-right rounded border border-gray-300 font-bold text-gray-900 focus:ring-2 focus:ring-green-500 outline-none"
                                        />
                                    </div>
                                    <div className="text-right text-xs text-green-600 font-bold mt-1 flex justify-end items-center gap-1">
                                        LUNAS <Check size={12} />
                                    </div>
                                </div>
                            </div>

                            {/* Row 2 */}
                            <div className="grid grid-cols-12 gap-4 items-center py-3 border-b border-gray-50 bg-white">
                                <div className="col-span-1 flex justify-center">
                                    <div className="w-5 h-5 border border-gray-300 rounded"></div>
                                </div>
                                <div className="col-span-4 text-sm font-medium text-gray-900">
                                    INV-2025-08-001 (09-11-2025)
                                </div>
                                <div className="col-span-3 text-right text-sm font-bold text-gray-900">
                                    Rp6.300.000
                                </div>
                                <div className="col-span-4">
                                    <div className="relative">
                                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-bold text-xs">Rp</span>
                                        <input
                                            type="text"
                                            defaultValue="0"
                                            className="w-full pl-8 pr-3 py-2 text-right rounded border border-gray-200 bg-gray-50 text-gray-400 focus:outline-none"
                                            readOnly
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Summary */}
                        <div className="flex justify-end gap-8 pt-4">
                            <div className="text-center">
                                <div className="text-xs text-gray-500 mb-1">Diskon</div>
                                <div className="text-lg font-bold text-gray-900">10%</div>
                            </div>
                            <div className="text-right">
                                <div className="text-xs text-gray-500 mb-1">Total Dialokasikan</div>
                                <div className="text-lg font-bold text-gray-900">Rp10.000.000</div>
                            </div>
                            <div className="text-right">
                                <div className="text-xs text-gray-500 mb-1">Sisa Alokasi</div>
                                <div className="text-lg font-bold text-green-500">+ Rp3.700.000</div>
                            </div>
                        </div>

                    </div>

                    <div className="p-6 border-t border-gray-100 flex justify-between bg-gray-50 rounded-b-lg">
                        <button onClick={onClose} className="px-8 py-2.5 rounded-lg border border-gray-300 text-gray-700 font-bold hover:bg-white bg-white w-1/3">
                            Batal
                        </button>
                        <button onClick={handleSave} className="px-8 py-2.5 rounded-lg bg-green-600 text-white font-bold hover:bg-green-700 shadow-sm w-1/3">
                            Simpan Pembayaran
                        </button>
                    </div>
                </div>
            </div>

            <SuccessModal
                isOpen={showSuccess}
                onClose={handleCloseSuccess}
                title="Berhasil Simpan Pembayaran"
                message="Pembayaran baru berhasil disimpan!"
            />
        </>
    );
};

export default RecordPaymentModal;
