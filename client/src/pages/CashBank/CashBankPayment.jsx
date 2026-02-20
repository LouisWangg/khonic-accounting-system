import React, { useState } from 'react';
import Layout from '../../components/Layout/Layout';
import { Trash2, Plus, Calendar, ChevronDown } from 'lucide-react';

const CashBankPayment = () => {
    const [lines, setLines] = useState([
        { id: 1, account: '', amount: 0, memo: '', department: '', project: '' },
    ]);

    const addLine = () => {
        setLines([...lines, { id: Date.now(), account: '', amount: 0, memo: '', department: '', project: '' }]);
    };

    const removeLine = (id) => {
        setLines(lines.filter(line => line.id !== id));
    };

    const totalAmount = lines.reduce((sum, line) => sum + (parseFloat(line.amount) || 0), 0);

    return (
        <Layout title="Pengeluaran Kas & Bank">
            <div className="max-w-6xl mx-auto space-y-6">

                {/* Header Inputs */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 grid grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            No. Voucher
                        </label>
                        <input
                            type="text"
                            defaultValue="KK-25100075"
                            className="w-full px-4 py-2.5 rounded-lg border border-gray-200 bg-gray-50 text-gray-500 focus:outline-none"
                            readOnly
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-red-500 mb-2">
                            * Dibayar Dari
                        </label>
                        <div className="relative">
                            <select className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none appearance-none bg-white">
                                <option>Pilih akun kas/bank</option>
                            </select>
                            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-red-500 mb-2">
                            * Nama Penerima
                        </label>
                        <input
                            type="text"
                            placeholder="Nama penerima pembayaran"
                            className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-red-500 mb-2">
                            * Tanggal
                        </label>
                        <div className="relative">
                            <input
                                type="date"
                                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            No. Cek
                        </label>
                        <input
                            type="text"
                            placeholder="Masukkan nomor cek"
                            className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all"
                        />
                        <div className="flex items-center gap-2 mt-2">
                            <input type="checkbox" id="cekKosong" className="rounded border-gray-300 text-green-600 focus:ring-green-500" />
                            <label htmlFor="cekKosong" className="text-sm text-gray-700">Cek Kosong</label>
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-red-500 mb-2">
                            * Jumlah
                        </label>
                        <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-medium">Rp</span>
                            <input
                                type="text"
                                value="0"
                                className="w-full pl-6 pr-4 py-2.5 rounded-lg border border-gray-200 bg-gray-50 text-gray-500 focus:outline-none"
                                readOnly
                            />
                        </div>
                    </div>

                    <div className="col-span-2">
                        <label className="block text-sm font-semibold text-red-500 mb-2">
                            * Memo
                        </label>
                        <textarea
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all min-h-[80px]"
                            placeholder="Contoh : biaya ATK bulan oktober"
                        ></textarea>
                    </div>
                </div>

                {/* Transaction Details */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <h3 className="text-sm font-bold text-gray-800 mb-4">Detail Transaksi</h3>
                    <div className="bg-red-50/50 rounded-lg p-4 mb-4 grid grid-cols-12 gap-4 text-xs font-bold text-gray-600 uppercase tracking-wider">
                        <div className="col-span-3">No. Akun</div>
                        <div className="col-span-3">Jumlah</div>
                        <div className="col-span-3">Memo</div>
                        <div className="col-span-3">Departemen / Proyek</div>
                    </div>

                    <div className="space-y-3">
                        {lines.map((line) => (
                            <div key={line.id} className="grid grid-cols-12 gap-4 items-start">
                                <div className="col-span-3 relative">
                                    <select
                                        className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none appearance-none bg-white text-sm"
                                        defaultValue={line.account}
                                    >
                                        <option value="">Pilih Akun</option>
                                        <option value="600.001 - Biaya ATK">600.001 - Biaya ATK</option>
                                    </select>
                                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
                                </div>
                                <div className="col-span-3 relative">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-medium text-sm">Rp</span>
                                    <input
                                        type="number"
                                        placeholder="0"
                                        className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all text-sm"
                                        onChange={(e) => {
                                            const val = e.target.value;
                                            setLines(lines.map(l => l.id === line.id ? { ...l, amount: val } : l));
                                        }}
                                    />
                                </div>
                                <div className="col-span-3">
                                    <input
                                        type="text"
                                        placeholder="Masukkan memo"
                                        defaultValue={line.memo}
                                        className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all text-sm"
                                    />
                                </div>
                                <div className="col-span-3 flex gap-2">
                                    <div className="flex-1 space-y-2">
                                        <input
                                            type="text"
                                            placeholder="Departemen"
                                            defaultValue={line.department}
                                            className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all text-sm"
                                        />
                                        <input
                                            type="text"
                                            placeholder="Proyek"
                                            defaultValue={line.project}
                                            className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all text-sm"
                                        />
                                    </div>
                                    <button onClick={() => removeLine(line.id)} className="text-red-400 hover:text-red-600 p-1 self-start mt-2">
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="flex justify-end mt-2">
                        <button onClick={addLine} className="text-green-600 font-medium hover:text-green-700 flex items-center gap-1 text-sm">
                            <Plus size={16} /> Tambah Baris
                        </button>
                    </div>

                    <div className="mt-6 pt-4 border-t border-gray-100 flex justify-end items-center gap-4">
                        <span className="text-gray-500 text-sm">Total Disetor :</span>
                        <span className="font-bold text-gray-900 text-lg">Rp{totalAmount.toLocaleString('id-ID')}</span>
                    </div>


                </div>
                {/* Footer Buttons */}
                <div className="flex justify-end gap-3 mt-6 pb-8">
                    <button className="px-6 py-2.5 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 bg-white">
                        Batal
                    </button>
                    <button className="px-6 py-2.5 rounded-lg bg-gray-200 text-gray-400 font-medium cursor-not-allowed">
                        Simpan Penerimaan
                    </button>
                </div>
            </div>
        </Layout>
    );
};

export default CashBankPayment;
