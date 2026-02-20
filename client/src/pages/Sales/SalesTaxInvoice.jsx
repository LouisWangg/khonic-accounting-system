import React from 'react';
import Layout from '../../components/Layout/Layout';
import { Search, Plus, Calendar, ChevronDown, RefreshCw, X, Download } from 'lucide-react';

const SalesTaxInvoice = () => {
    // Mock Data
    const invoices = [
        { id: 1, number: '010.001-25.12345678', date: '28/10/2025', customer: 'CV Maju Mundur', dpp: 'Rp30.000.000', ppn: 'Rp3.300.000', total: 'Rp33.300.000', status: 'Issued' },
        { id: 2, number: '010.002-25.12345679', date: '29/10/2025', customer: 'CV Sukses Selalu', dpp: 'Rp50.000.000', ppn: 'Rp5.500.000', total: 'Rp55.500.000', status: 'Issued' },
        { id: 3, number: '010.003-25.12345680', date: '30/10/2025', customer: 'CV Bintang Jaya', dpp: 'Rp70.000.000', ppn: 'Rp7.000.000', total: 'Rp77.000.000', status: 'Cancelled' },
        { id: 4, number: '010.004-25.12345681', date: '31/10/2025', customer: 'CV Karya Abadi', dpp: 'Rp90.000.000', ppn: 'Rp8.500.000', total: 'Rp98.500.000', status: 'Cancelled' },
        { id: 5, number: '010.005-25.12345682', date: '01/11/2025', customer: 'CV Mutiara Mandiri', dpp: 'Rp110.000.000', ppn: 'Rp10.000.000', total: 'Rp120.000.000', status: 'Issued' },
        { id: 6, number: '010.006-25.12345683', date: '02/11/2025', customer: 'CV Cipta Karya', dpp: 'Rp130.000.000', ppn: 'Rp12.000.000', total: 'Rp142.000.000', status: 'Issued' },
        { id: 7, number: '010.007-25.12345684', date: '03/11/2025', customer: 'CV Sejahtera', dpp: 'Rp150.000.000', ppn: 'Rp15.000.000', total: 'Rp165.000.000', status: 'Draft' },
        { id: 8, number: '010.008-25.12345685', date: '04/11/2025', customer: 'CV Abadi Jaya', dpp: 'Rp180.000.000', ppn: 'Rp18.000.000', total: 'Rp198.000.000', status: 'Issued' },
    ];

    const getStatusStyle = (status) => {
        switch (status) {
            case 'Issued': return 'bg-gray-100 text-gray-700';
            case 'Cancelled': return 'bg-gray-200 text-gray-500 line-through decoration-gray-500';
            case 'Draft': return 'bg-yellow-50 text-yellow-700';
            default: return 'bg-gray-100 text-gray-600';
        }
    };

    return (
        <Layout title="Faktur Pajak Penjualan">
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
                        <div className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm text-gray-600 cursor-pointer hover:bg-gray-50">
                            <span>Filter by date</span>
                            <Calendar size={16} />
                        </div>
                        <div className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm text-gray-600 cursor-pointer hover:bg-gray-50">
                            <span>Customer</span>
                            <ChevronDown size={16} />
                        </div>
                        <div className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm text-gray-600 cursor-pointer hover:bg-gray-50">
                            <span>Status</span>
                            <ChevronDown size={16} />
                        </div>
                        <button
                            onClick={() => window.location.href = '/faktur-pajak-penjualan/baru'}
                            className="flex items-center gap-2 bg-gray-700 hover:bg-gray-800 text-white px-5 py-2.5 rounded-lg font-medium transition-colors"
                        >
                            <Plus size={18} />
                            Buat Faktur Pajak Baru
                        </button>
                    </div>
                </div>

                {/* Table Header */}
                <div className="grid grid-cols-12 gap-4 px-6 py-3 bg-gray-50 border-b border-gray-200 text-xs font-bold text-gray-500 uppercase tracking-wider">
                    <div className="col-span-2">Nomor Faktur Pajak</div>
                    <div className="col-span-1">Tanggal</div>
                    <div className="col-span-2">Customer</div>
                    <div className="col-span-2 text-right">DPP</div>
                    <div className="col-span-2 text-right">PPN</div>
                    <div className="col-span-2 text-right">TOTAL</div>
                    <div className="col-span-1 text-center">Status</div>
                </div>

                {/* Table Body */}
                <div className="divide-y divide-gray-100">
                    {invoices.map((invoice) => (
                        <div
                            key={invoice.id}
                            className="grid grid-cols-12 gap-4 px-6 py-4 items-center hover:bg-gray-50 transition-colors cursor-pointer"
                            onClick={() => window.location.href = `/faktur-pajak-penjualan/detail/${invoice.id}`}
                        >
                            <div className="col-span-2 text-xs text-gray-400 font-medium">{invoice.number}</div>
                            <div className="col-span-1 text-xs text-gray-900">{invoice.date}</div>
                            <div className="col-span-2 text-xs text-gray-900 font-medium">{invoice.customer}</div>
                            <div className="col-span-2 text-xs text-right text-gray-900">{invoice.dpp}</div>
                            <div className="col-span-2 text-xs text-right text-gray-900">{invoice.ppn}</div>
                            <div className="col-span-2 text-xs text-right font-bold text-gray-900">{invoice.total}</div>
                            <div className="col-span-1 flex justify-center items-center gap-2">
                                <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${getStatusStyle(invoice.status)}`}>
                                    {invoice.status}
                                </span>
                                {invoice.status === 'Draft' ? (
                                    <button
                                        onClick={(e) => { e.stopPropagation(); window.location.href = `/faktur-pajak-penjualan/edit/${invoice.id}`; }}
                                        className="text-gray-400 hover:text-gray-600"
                                    >
                                        <RefreshCw size={14} />
                                    </button>
                                ) : (
                                    <button className="text-gray-400 hover:text-gray-600"><X size={14} /></button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Layout>
    );
};

export default SalesTaxInvoice;
