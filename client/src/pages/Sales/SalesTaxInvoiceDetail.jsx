import React, { useState } from 'react';
import Layout from '../../components/Layout/Layout';
import { ArrowLeft, Download, XCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import CancelInvoiceModal from '../../components/Modals/CancelInvoiceModal';

const SalesTaxInvoiceDetail = () => {
    const navigate = useNavigate();
    const [isCancelModalOpen, setCancelModalOpen] = useState(false);
    const [status, setStatus] = useState('Issued');

    const handleCancel = () => {
        setCancelModalOpen(false);
        setStatus('Cancelled');
    };

    return (
        <Layout>
            <div className="max-w-6xl mx-auto space-y-6 pb-20">
                {/* Header Back */}
                <div className="flex items-center gap-2 text-gray-500 text-sm mb-4">
                    <button onClick={() => navigate('/faktur-pajak-penjualan')} className="hover:text-gray-900 flex items-center gap-1">
                        <ArrowLeft size={16} />
                        Faktur Pajak Penjualan
                    </button>
                    <span>&gt;</span>
                    <span className="font-semibold text-gray-900">Detail</span>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    {/* Actions Header */}
                    <div className="flex justify-between items-start mb-8">
                        <div>
                            <h2 className="text-lg font-bold text-gray-900">010.001-25.12345678</h2>
                        </div>
                        <div className="flex gap-3">
                            <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
                                <Download size={16} />
                                Download PDF
                            </button>
                            {status !== 'Cancelled' && (
                                <button
                                    onClick={() => setCancelModalOpen(true)}
                                    className="flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 rounded-lg text-sm font-medium text-white"
                                >
                                    <XCircle size={16} />
                                    Cancel
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Metadata Grid */}
                    <div className="grid grid-cols-3 gap-y-6 gap-x-12 mb-8">
                        <div>
                            <div className="text-xs font-semibold text-gray-500 mb-1">Nomor Faktur Pajak</div>
                            <div className="text-sm font-bold text-blue-600">010.001-25.12345678</div>
                        </div>
                        <div>
                            <div className="text-xs font-semibold text-gray-500 mb-1">Nama Supplier</div>
                            <div className="text-sm font-medium text-gray-900">PT. Supplier Jaya</div>
                        </div>
                        <div>
                            <div className="text-xs font-semibold text-gray-500 mb-1">Status</div>
                            <span className={`inline-block px-2 py-0.5 rounded text-xs font-bold uppercase ${status === 'Issued' ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-500 line-through'}`}>
                                {status}
                            </span>
                        </div>

                        <div>
                            <div className="text-xs font-semibold text-gray-500 mb-1">Nama Supplier</div>
                            <div className="text-sm font-medium text-gray-900">PT. Supplier Jaya</div>
                        </div>
                        <div className="col-span-2">
                            <div className="text-xs font-semibold text-gray-500 mb-1">Nama Supplier</div>
                            <div className="text-sm font-medium text-gray-900">PT. Supplier Jaya</div>
                        </div>

                        <div>
                            <div className="text-xs font-semibold text-gray-500 mb-1">Nomor Purchase Order (PO)</div>
                            <div className="text-sm font-medium text-gray-900">PO-001</div>
                        </div>
                        <div className="col-span-2">
                            <div className="text-xs font-semibold text-gray-500 mb-1">Nomor Goods Received Note (GRN)</div>
                            <div className="text-sm font-medium text-gray-900">GRN-001</div>
                        </div>
                    </div>

                    {/* Items Table */}
                    <div className="mb-4">
                        <h3 className="font-bold text-gray-900 mb-4">Detail Barang / Jasa</h3>
                        <div className="bg-gray-50 rounded-lg p-3 grid grid-cols-12 gap-4 text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                            <div className="col-span-6">Nama Barang / Jasa</div>
                            <div className="col-span-2 text-center">Kuantitas</div>
                            <div className="col-span-2 text-right">Harga Satuan</div>
                            <div className="col-span-2 text-right">Total</div>
                        </div>

                        <div className="space-y-4">
                            {[
                                { name: 'Makna Ice v3 Sea Salt Caramel Latte 60ml by Union Labs - 3mg', qty: 3, price: 'Rp 150.000', total: 'Rp 450.000' },
                                { name: 'Liquid Oat Drips Pod Friendly 30ml 15mg', qty: 4, price: 'Rp 125.000', total: 'Rp 500.000' },
                                { name: 'Lunar Strawberry Ice Cream 60ml by Vapezoo - 3mg', qty: 6, price: 'Rp 150.000', total: 'Rp 810.000' },
                            ].map((item, idx) => (
                                <div key={idx} className="grid grid-cols-12 gap-4 items-center border-b border-gray-50 pb-4 last:border-0 last:pb-0">
                                    <div className="col-span-6 text-sm font-medium text-gray-900">{item.name}</div>
                                    <div className="col-span-2 text-sm text-center text-gray-900">{item.qty}</div>
                                    <div className="col-span-2 text-sm text-right text-gray-900">{item.price}</div>
                                    <div className="col-span-2 text-sm text-right text-gray-900 font-medium">{item.total}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Summary */}
                    <div className="border-t border-gray-100 pt-4 space-y-2">
                        <div className="flex justify-end gap-10 text-xs">
                            <span className="text-gray-500 font-medium">DPP</span>
                            <span className="font-bold text-gray-900 w-32 text-right">Rp1.760.000</span>
                        </div>
                        <div className="flex justify-end gap-10 text-xs">
                            <span className="text-gray-500 font-medium">PPN (11%)</span>
                            <span className="font-bold text-gray-900 w-32 text-right">Rp193.600</span>
                        </div>
                        <div className="flex justify-end gap-10 text-sm">
                            <span className="font-bold text-gray-900">Total</span>
                            <span className="font-extrabold text-gray-900 w-32 text-right">Rp1.953.600</span>
                        </div>
                    </div>

                </div>
            </div>

            <CancelInvoiceModal
                isOpen={isCancelModalOpen}
                onClose={() => setCancelModalOpen(false)}
                onConfirm={handleCancel}
            />
        </Layout>
    );
};

export default SalesTaxInvoiceDetail;
