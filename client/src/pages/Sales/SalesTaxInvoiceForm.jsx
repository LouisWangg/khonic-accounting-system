import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layout/Layout';
import { ChevronDown, Calendar, Trash2, Plus, ArrowLeft } from 'lucide-react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import SuccessModal from '../../components/Modals/SuccessModal';

const SalesTaxInvoiceForm = () => {
    const navigate = useNavigate();
    const { id } = useParams(); // If present, it's edit mode
    const location = useLocation();
    const isEdit = location.pathname.includes('edit');

    const [lines, setLines] = useState([
        { id: 1, name: 'Makna Ice v3 Sea Salt Caramel Latte 60ml by Union Labs - 3mg', qty: 3, price: 150000, total: 450000 },
        { id: 2, name: 'Liquid Oat Drips Pod Friendly 30ml 15mg', qty: 4, price: 125000, total: 500000 },
        { id: 3, name: 'Lunar Strawberry Ice Cream 60ml by Vapezoo - 3mg', qty: 6, price: 135000, total: 810000 },
    ]);

    const [showSuccess, setShowSuccess] = useState(false);

    const addLine = () => {
        setLines([...lines, { id: Date.now(), name: '', qty: 1, price: 0, total: 0 }]);
    };

    const removeLine = (id) => {
        setLines(lines.filter(l => l.id !== id));
    };

    const calculateTotals = () => {
        const dpp = lines.reduce((sum, line) => sum + line.total, 0);
        const ppn = Math.floor(dpp * 0.11);
        const total = dpp + ppn;
        return { dpp, ppn, total };
    };

    const { dpp, ppn, total } = calculateTotals();

    const handleSave = () => {
        setShowSuccess(true);
    };

    const handleCloseSuccess = () => {
        setShowSuccess(false);
        navigate('/faktur-pajak-penjualan');
    };

    return (
        <Layout>
            <div className="max-w-6xl mx-auto space-y-6 pb-20">
                {/* Header Back */}
                <div className="flex items-center gap-2 text-gray-500 text-sm mb-4">
                    <button onClick={() => navigate(-1)} className="hover:text-gray-900 flex items-center gap-1">
                        <ArrowLeft size={16} />
                        {isEdit ? 'Edit Faktur Pajak Penjualan' : 'Faktur Pajak Penjualan'}
                    </button>
                    <span>&gt;</span>
                    <span className="font-semibold text-gray-900">{isEdit ? 'Edit' : 'Tambah Baru'}</span>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-6">
                    {/* Top Form */}
                    <div className="grid grid-cols-3 gap-6">
                        <div>
                            <label className="block text-sm font-semibold text-red-500 mb-2">* Nomor Seri Faktur Pajak</label>
                            <input type="text" defaultValue="010.000-25.12345678" className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:green-500 bg-white" />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-red-500 mb-2">* Tanggal Faktur</label>
                            <div className="relative">
                                <input type="date" defaultValue="2025-10-30" className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:green-500" />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Masa Pajak</label>
                            <div className="relative">
                                <select className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none appearance-none bg-white">
                                    <option>09/25</option>
                                </select>
                                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h3 className="font-bold text-gray-900">Penjual</h3>
                        <div className="p-4 bg-green-50 border-l-4 border-green-500 rounded-r-lg">
                            <div className="font-bold text-gray-900">PT. Khonic Sejatehra</div>
                            <div className="text-gray-600 text-sm">Jl. Jenderal Sudirman No. 1, Jakarta</div>
                            <div className="text-gray-600 text-sm">NPWP: 01.123.456.7-890.123</div>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-semibold text-red-500 mb-2">* Pilih Pembeli</label>
                            <div className="relative">
                                <select className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none appearance-none bg-white">
                                    <option>PT. SUKSES SELALU</option>
                                </select>
                                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-red-500 mb-2">* Pilih Invoice</label>
                            <div className="relative">
                                <select className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none appearance-none bg-white">
                                    <option>INV-2025-09-011</option>
                                </select>
                                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
                            </div>
                        </div>
                    </div>

                    {/* Items Table */}
                    <div>
                        <h3 className="font-bold text-gray-900 mb-4">Detail Barang / Jasa</h3>
                        <div className="bg-gray-50 rounded-lg p-3 grid grid-cols-12 gap-4 text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                            <div className="col-span-5">Nama Barang / Jasa</div>
                            <div className="col-span-2 text-center">Kuantitas</div>
                            <div className="col-span-2 text-right">Harga Satuan</div>
                            <div className="col-span-2 text-right">Total</div>
                            <div className="col-span-1"></div>
                        </div>

                        <div className="space-y-2">
                            {lines.map((line) => (
                                <div key={line.id} className="grid grid-cols-12 gap-4 items-center">
                                    <div className="col-span-5">
                                        <input type="text" defaultValue={line.name} className="w-full px-3 py-2 rounded border border-gray-200 text-sm focus:outline-none focus:border-green-500" />
                                    </div>
                                    <div className="col-span-2">
                                        <input type="number" defaultValue={line.qty} className="w-full px-3 py-2 rounded border border-gray-200 text-sm text-center focus:outline-none focus:border-green-500" />
                                    </div>
                                    <div className="col-span-2">
                                        <div className="relative">
                                            <span className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400 text-xs">Rp</span>
                                            <input type="text" defaultValue={line.price.toLocaleString('id-ID')} className="w-full pl-6 px-3 py-2 rounded border border-gray-200 text-sm text-right focus:outline-none focus:border-green-500" />
                                        </div>
                                    </div>
                                    <div className="col-span-2 text-right font-medium text-sm text-gray-600">
                                        Rp {line.total.toLocaleString('id-ID')}
                                    </div>
                                    <div className="col-span-1 flex justify-center">
                                        <button onClick={() => removeLine(line.id)} className="text-red-400 hover:text-red-600">
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-4 flex justify-end">
                            <button onClick={addLine} className="text-green-600 text-sm font-medium hover:text-green-700 flex items-center gap-1">
                                <Plus size={16} /> Tambah Baris
                            </button>
                        </div>
                    </div>

                    {/* Summary */}
                    <div className="border-t border-gray-100 pt-4 space-y-2">
                        <div className="flex justify-end gap-10 text-sm">
                            <span className="text-gray-500">DPP</span>
                            <span className="font-bold text-gray-900 w-32 text-right">Rp{dpp.toLocaleString('id-ID')}</span>
                        </div>
                        <div className="flex justify-end gap-10 text-sm">
                            <span className="text-gray-500">PPN (11%)</span>
                            <span className="font-bold text-gray-900 w-32 text-right">Rp{ppn.toLocaleString('id-ID')}</span>
                        </div>
                        <div className="flex justify-end gap-10 text-base">
                            <span className="font-bold text-gray-900">Total</span>
                            <span className="font-bold text-gray-900 w-32 text-right">Rp{total.toLocaleString('id-ID')}</span>
                        </div>
                    </div>
                </div>

                {/* Footer Actions */}
                <div className="flex justify-end gap-3">
                    <button onClick={() => navigate(-1)} className="px-6 py-2.5 rounded-lg border border-gray-300 text-gray-700 font-bold hover:bg-white bg-white">
                        Batal
                    </button>
                    <button onClick={handleSave} className="px-6 py-2.5 rounded-lg bg-green-600 text-white font-bold hover:bg-green-700 shadow-sm">
                        {isEdit ? 'Simpan Perubahan' : 'Simpan Faktur'}
                    </button>
                </div>
            </div>

            <SuccessModal
                isOpen={showSuccess}
                onClose={handleCloseSuccess}
                title="Berhasil Simpan Faktur Pajak Penjualan"
                message="Faktur Pajak Penjualan berhasil disimpan!"
            />
        </Layout>
    );
};

export default SalesTaxInvoiceForm;
