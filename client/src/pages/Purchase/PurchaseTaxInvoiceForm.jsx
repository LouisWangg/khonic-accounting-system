import React, { useState } from 'react';
import Layout from '../../components/Layout/Layout';
import { ArrowLeft, ChevronDown, Calendar, Upload, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import SuccessModal from '../../components/Modals/SuccessModal';

const PurchaseTaxInvoiceForm = () => {
    const navigate = useNavigate();
    const [poNumber, setPoNumber] = useState('');
    const [showSuccess, setShowSuccess] = useState(false);
    const [file, setFile] = useState(null);

    // Mock PO Data
    const poData = {
        'PO-001': {
            supplier: 'CV Maju Mundur',
            items: [
                { name: 'Makna Ice v3 Sea Salt Caramel Latte 60ml by Union Labs - 3mg', qty: 3, price: 150000, total: 450000 },
                { name: 'Liquid Oat Drips Pod Friendly 30ml 15mg', qty: 4, price: 125000, total: 500000 },
                { name: 'Lunar Strawberry Ice Cream 60ml by Vapezoo - 3mg', qty: 6, price: 135000, total: 810000 },
            ]
        }
    };

    const handlePoChange = (e) => {
        setPoNumber(e.target.value);
    };

    const currentPo = poData[poNumber] || { supplier: '', items: [] };

    const calculateTotals = () => {
        const dpp = currentPo.items.reduce((sum, item) => sum + item.total, 0);
        const ppn = Math.floor(dpp * 0.11);
        const total = dpp + ppn;
        return { dpp, ppn, total };
    };

    const { dpp, ppn, total } = calculateTotals();

    const handleFileChange = (e) => {
        if (e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };

    const handleSave = () => {
        setShowSuccess(true);
    };

    const handleCloseSuccess = () => {
        setShowSuccess(false);
        navigate('/faktur-pajak-pembelian');
    };

    return (
        <Layout>
            <div className="max-w-6xl mx-auto space-y-6 pb-20">
                {/* Header Back */}
                <div className="flex items-center gap-2 text-gray-500 text-sm mb-4">
                    <button onClick={() => navigate('/faktur-pajak-pembelian')} className="hover:text-gray-900 flex items-center gap-1">
                        <ArrowLeft size={16} />
                        Faktur Pajak Pembelian
                    </button>
                    <span>&gt;</span>
                    <span className="font-semibold text-gray-900">Tambah Baru</span>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-8">
                    {/* Data PO Section */}
                    <div>
                        <h3 className="font-bold text-gray-900 mb-4 border-b pb-2">Data PO</h3>
                        <div className="grid grid-cols-3 gap-6">
                            <div>
                                <label className="block text-sm font-semibold text-red-500 mb-2">* Purchase Order (PO)</label>
                                <div className="relative">
                                    <select
                                        className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none appearance-none bg-white"
                                        value={poNumber}
                                        onChange={handlePoChange}
                                    >
                                        <option value="">Pilih PO</option>
                                        <option value="PO-001">PO-001</option>
                                    </select>
                                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Nama Supplier</label>
                                <input
                                    type="text"
                                    value={currentPo.supplier}
                                    readOnly
                                    className="w-full px-4 py-2.5 rounded-lg border border-gray-200 bg-gray-50 text-gray-600 focus:outline-none"
                                    placeholder="Nama Supplier"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Nomor PO</label>
                                <input
                                    type="text"
                                    value={poNumber}
                                    readOnly
                                    className="w-full px-4 py-2.5 rounded-lg border border-gray-200 bg-gray-50 text-gray-600 focus:outline-none"
                                    placeholder="Nomor PO"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Data Faktur Pajak Section */}
                    <div>
                        <h3 className="font-bold text-gray-900 mb-4 border-b pb-2">Data Faktur Pajak</h3>
                        <div className="grid grid-cols-3 gap-6">
                            <div>
                                <label className="block text-sm font-semibold text-red-500 mb-2">* Nomor Faktur Pajak</label>
                                <input type="text" placeholder="010.000-25.NNNNNNNN" className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:green-500" />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-red-500 mb-2">* Tanggal Faktur</label>
                                <div className="relative">
                                    <input type="date" className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:green-500" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Tanggal Diterima</label>
                                <div className="relative">
                                    <input type="date" className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:green-500" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Document Upload Section */}
                    <div>
                        <h3 className="font-bold text-gray-900 mb-4 border-b pb-2">Lampirkan Dokumen (Optional)</h3>
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 flex flex-col items-center justify-center text-center hover:bg-gray-50 transition-colors cursor-pointer relative">
                            <input
                                type="file"
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                onChange={handleFileChange}
                            />
                            {file ? (
                                <div className="flex items-center gap-2 text-green-600 font-medium">
                                    <Upload size={24} />
                                    <span>{file.name}</span>
                                </div>
                            ) : (
                                <>
                                    <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-3 text-gray-400">
                                        <Upload size={24} />
                                    </div>
                                    <p className="font-medium text-gray-900">Upload atau tarik file dokumen</p>
                                    <p className="text-xs text-gray-500 mt-1">PDF, XLSX ukuran maks 5MB dan maks 10 file</p>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Items Table */}
                    <div>
                        <h3 className="font-bold text-gray-900 mb-4 border-b pb-2">Detail Barang / Jasa</h3>
                        <div className="bg-gray-50 rounded-lg p-3 grid grid-cols-12 gap-4 text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                            <div className="col-span-6">Nama Barang / Jasa</div>
                            <div className="col-span-2 text-center">Kuantitas</div>
                            <div className="col-span-2 text-right">Harga Satuan</div>
                            <div className="col-span-2 text-right">Total</div>
                        </div>

                        {currentPo.items.length > 0 ? (
                            <div className="space-y-4">
                                {currentPo.items.map((item, idx) => (
                                    <div key={idx} className="grid grid-cols-12 gap-4 items-center border-b border-gray-50 pb-4 last:border-0 last:pb-0">
                                        <div className="col-span-6 text-sm font-medium text-gray-900">{item.name}</div>
                                        <div className="col-span-2 text-sm text-center text-gray-900">{item.qty}</div>
                                        <div className="col-span-2 text-sm text-right text-gray-900">Rp {item.price.toLocaleString('id-ID')}</div>
                                        <div className="col-span-2 text-sm text-right text-gray-900 font-medium">Rp {item.total.toLocaleString('id-ID')}</div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="py-8 text-center text-gray-400 text-sm italic">
                                Pilih Purchase Order untuk memuat item.
                            </div>
                        )}
                    </div>

                    {/* Summary */}
                    {currentPo.items.length > 0 && (
                        <div className="border-t border-gray-100 pt-4 space-y-2">
                            <div className="flex justify-end gap-10 text-xs">
                                <span className="text-gray-500 font-medium">DPP</span>
                                <span className="font-bold text-gray-900 w-32 text-right">Rp{dpp.toLocaleString('id-ID')}</span>
                            </div>
                            <div className="flex justify-end gap-10 text-xs">
                                <span className="text-gray-500 font-medium">PPN (11%)</span>
                                <span className="font-bold text-gray-900 w-32 text-right">Rp{ppn.toLocaleString('id-ID')}</span>
                            </div>
                            <div className="flex justify-end gap-10 text-sm">
                                <span className="font-bold text-gray-900">Total</span>
                                <span className="font-extrabold text-gray-900 w-32 text-right">Rp{total.toLocaleString('id-ID')}</span>
                            </div>
                        </div>
                    )}
                </div>

                {/* Footer Actions */}
                <div className="flex justify-end gap-3 mt-6">
                    <button onClick={() => navigate(-1)} className="px-6 py-2.5 rounded-lg border border-gray-300 text-gray-700 font-bold hover:bg-white bg-white">
                        Batal
                    </button>
                    <button onClick={handleSave} className="px-6 py-2.5 rounded-lg bg-gray-300 text-gray-500 font-bold cursor-not-allowed hover:bg-gray-300" disabled={poNumber === ''}>
                        Simpan Faktur
                    </button>
                </div>
            </div>

            <SuccessModal
                isOpen={showSuccess}
                onClose={handleCloseSuccess}
                title="Berhasil Simpan Faktur Pajak Pembelian Baru"
                message="Faktur Pajak Pembelian Baru berhasil disimpan!"
            />
        </Layout>
    );
};

export default PurchaseTaxInvoiceForm;
