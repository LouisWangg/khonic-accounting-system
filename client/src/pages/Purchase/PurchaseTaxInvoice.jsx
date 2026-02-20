import React from 'react';
import Layout from '../../components/Layout/Layout';
import { Search, Plus, Calendar, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const PurchaseTaxInvoice = () => {
    const navigate = useNavigate();

    // Mock Data
    const invoices = [
        { id: 1, number: '010.001-25.12345678', date: '28/10/2025', supplier: 'CV Maju Mundur', po: 'PO-001', amount: 'Rp5.500.000', status: 'Posted' },
        { id: 2, number: '123.456-78.98765432', date: '28/10/2025', supplier: 'PT. Supplier Jaya', po: 'PO-002', amount: 'Rp3.400.000', status: 'Paid' },
        { id: 3, number: '987.654-32.12345678', date: '28/10/2025', supplier: 'PT. Grosir Elektronik', po: 'PO-003', amount: 'Rp1.200.000', status: 'Draft' },
        { id: 4, number: '456.789-01.23456789', date: '28/10/2025', supplier: 'PT. Cloud Production', po: 'PO-004', amount: 'Rp4.200.500', status: 'Posted' },
    ];

    const getStatusStyle = (status) => {
        switch (status) {
            case 'Posted': return 'bg-gray-100 text-gray-700';
            case 'Paid': return 'bg-green-100 text-green-700';
            case 'Draft': return 'bg-gray-200 text-gray-500';
            default: return 'bg-gray-100 text-gray-600';
        }
    };

    return (
        <Layout title="Faktur Pajak Pembelian">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 min-h-[calc(100vh-8rem)]">
                {/* Toolbar */}
                <div className="p-6 flex items-center justify-between border-b border-gray-100 gap-4">
                    <div className="relative flex-1 max-w-sm">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            type="text"
                            placeholder="Cari faktur pajak..."
                            className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-200 bg-gray-50"
                        />
                    </div>

                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => navigate('/faktur-pajak-pembelian/baru')}
                            className="flex items-center gap-2 bg-gray-700 hover:bg-gray-800 text-white px-5 py-2.5 rounded-lg font-medium transition-colors"
                        >
                            <Plus size={18} />
                            Buat Faktur Pajak Pembelian
                        </button>
                    </div>
                </div>

                {/* Table Header */}
                <div className="grid grid-cols-12 gap-4 px-6 py-3 bg-gray-50 border-b border-gray-200 text-xs font-bold text-gray-500 uppercase tracking-wider">
                    <div className="col-span-3">Nomor Faktur Pajak</div>
                    <div className="col-span-2">Tanggal Faktur</div>
                    <div className="col-span-2">Nama Supplier</div>
                    <div className="col-span-2">Nomor PO</div>
                    <div className="col-span-2 text-right">Nilai Faktur</div>
                    <div className="col-span-1 text-center">Status</div>
                    <div className="col-span-1 text-center">Action</div>
                </div>

                {/* Table Body */}
                <div className="divide-y divide-gray-100">
                    {invoices.map((invoice) => (
                        <div
                            key={invoice.id}
                            className="grid grid-cols-12 gap-4 px-6 py-4 items-center hover:bg-gray-50 transition-colors cursor-pointer"
                            onClick={() => navigate(`/faktur-pajak-pembelian/detail/${invoice.id}`)}
                        >
                            <div className="col-span-3 text-sm text-gray-400 font-medium">{invoice.number}</div>
                            <div className="col-span-2 text-sm text-gray-900">{invoice.date}</div>
                            <div className="col-span-2 text-sm text-gray-900 font-medium">{invoice.supplier}</div>
                            <div className="col-span-2 text-sm text-gray-500">{invoice.po}</div>
                            <div className="col-span-2 text-sm text-right font-bold text-gray-900">{invoice.amount}</div>
                            <div className="col-span-1 flex justify-center">
                                <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${getStatusStyle(invoice.status)}`}>
                                    {invoice.status}
                                </span>
                            </div>
                            <div className="col-span-1 flex justify-center text-gray-400 hover:text-gray-600">
                                <Eye size={18} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Layout>
    );
};

export default PurchaseTaxInvoice;
