import React, { useState } from 'react';
import Layout from '../../components/Layout/Layout';
import { Trash2, Plus, Calendar, ChevronDown } from 'lucide-react';

const AddGeneralJournal = () => {
    const [lines, setLines] = useState([
        { id: 1, account: '110.000 - ASET LANCAR', debit: 900450, credit: 0 },
        { id: 2, account: '', debit: 0, credit: 0 }
    ]);

    const addLine = () => {
        setLines([...lines, { id: Date.now(), account: '', debit: 0, credit: 0 }]);
    };

    const removeLine = (id) => {
        setLines(lines.filter(line => line.id !== id));
    };

    const totalDebit = lines.reduce((sum, line) => sum + (parseFloat(line.debit) || 0), 0);
    const totalCredit = lines.reduce((sum, line) => sum + (parseFloat(line.credit) || 0), 0);

    return (
        <Layout title="Tambah Jurnal Umum Baru">
            <div className="max-w-5xl mx-auto space-y-6">

                {/* Header Inputs */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-6">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            <span className="text-red-500">*</span> Tanggal Jatuh Tempo
                        </label>
                        <div className="relative">
                            <input
                                type="date"
                                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all"
                                defaultValue="2025-10-09"
                            />
                            {/* Native date picker usually has icon, but customized structure requires relative wrap */}
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Pilih Invoice
                        </label>
                        <div className="relative">
                            <select className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none appearance-none bg-white">
                                <option>Pilih invoice</option>
                            </select>
                            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            <span className="text-red-500">*</span> Deskripsi
                        </label>
                        <textarea
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all min-h-[100px]"
                            placeholder="Biaya servis mobil kantor bulan Oktober"
                        ></textarea>
                    </div>
                </div>

                {/* Journal Entries */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <div className="grid grid-cols-12 gap-4 mb-4 text-xs font-bold text-gray-500 uppercase tracking-wider">
                        <div className="col-span-6">Akun</div>
                        <div className="col-span-3">Debit</div>
                        <div className="col-span-3">Kredit</div>
                    </div>

                    <div className="space-y-3">
                        {lines.map((line) => (
                            <div key={line.id} className="grid grid-cols-12 gap-4 items-start">
                                <div className="col-span-6 relative">
                                    <select
                                        className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none appearance-none bg-white"
                                        defaultValue={line.account}
                                    >
                                        <option value="" disabled>Pilih Akun</option>
                                        <option value="110.000 - ASET LANCAR">110.000 - ASET LANCAR</option>
                                        <option value="111.000 - Kas & Bank">111.000 - Kas & Bank</option>
                                    </select>
                                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
                                </div>
                                <div className="col-span-3 relative">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-medium">Rp</span>
                                    <input
                                        type="number"
                                        defaultValue={line.debit}
                                        className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all"
                                    />
                                </div>
                                <div className="col-span-3 relative flex items-center gap-2">
                                    <div className="relative w-full">
                                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-medium">Rp</span>
                                        <input
                                            type="number"
                                            defaultValue={line.credit}
                                            className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all"
                                        />
                                    </div>
                                    <button onClick={() => removeLine(line.id)} className="text-red-400 hover:text-red-600 p-1">
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    <button onClick={addLine} className="mt-4 flex items-center gap-2 text-green-600 font-medium hover:text-green-700">
                        <Plus size={18} />
                        Tambah Baris
                    </button>

                    <div className="mt-8 border-t border-gray-100 pt-4 flex flex-col items-end gap-2">
                        <div className="flex items-center gap-12 text-sm">
                            <span className="text-gray-500">Total Debit :</span>
                            <span className="font-bold text-gray-900">Rp{totalDebit.toLocaleString('id-ID')}</span>
                        </div>
                        <div className="flex items-center gap-12 text-sm">
                            <span className="text-gray-500">Total Kredit :</span>
                            <span className="font-bold text-gray-900">Rp{totalCredit.toLocaleString('id-ID')}</span>
                        </div>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex justify-end gap-4 pb-8">
                    <button className="px-6 py-2.5 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 bg-white">
                        Simpan Draft
                    </button>
                    <button className="px-6 py-2.5 rounded-lg bg-green-600 text-white font-medium hover:bg-green-700 shadow-sm">
                        Tambah Jurnal
                    </button>
                </div>
            </div>
        </Layout>
    );
};

export default AddGeneralJournal;
