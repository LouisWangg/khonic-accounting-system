import React, { useState } from 'react';
import Layout from '../../components/Layout/Layout';
import RecordPaymentModal from '../../components/Modals/RecordPaymentModal';
import { Search, Plus, BarChart2, FileText } from 'lucide-react';

const Invoicing = () => {
    const [isPaymentModalOpen, setPaymentModalOpen] = useState(false);

    const invoices = [
        { customer: 'PT. Sukses Selalu', invoiceNo: 'INV-2025-08-009', date: '28/10/2025', status: 'Jatuh tempo hari ini', amount: 'Rp500.000' },
        { customer: 'CV Maju Mundur', invoiceNo: 'INV-2025-08-008', date: '28/10/2025', status: 'Terlambat 10 hari', amount: 'Rp2.500.000', expired: true },
        { customer: 'PT. Marsha Lenathea Lapian', invoiceNo: 'INV-2025-08-007', date: '28/10/2025', status: 'Jatuh tempo 8 hari lagi', amount: 'Rp7.000.000' },
        { customer: 'PT. Azizi Asadel', invoiceNo: 'INV-2025-08-006', date: '28/10/2025', status: 'Jatuh tempo 6 hari lagi', amount: 'Rp500.000' },
        { customer: 'CV. Maju Bersama', invoiceNo: 'INV-2025-08-005', date: '28/10/2025', status: 'Jatuh tempo 5 hari lagi', amount: 'Rp500.000' },
        { customer: 'PT. Cipta Karya', invoiceNo: 'INV-2025-08-004', date: '28/10/2025', status: 'Jatuh tempo 5 hari lagi', amount: 'Rp500.000' },
        { customer: 'PT. Inovasi Abadi', invoiceNo: 'INV-2025-08-003', date: '28/10/2025', status: 'Jatuh tempo hari ini', amount: 'Rp500.000' },
        { customer: 'PT. Sinar Harapan', invoiceNo: 'INV-2025-08-002', date: '28/10/2025', status: 'Jatuh tempo hari ini', amount: 'Rp500.000' },
        { customer: 'CV. Gemilang Sejahtera', invoiceNo: 'INV-2025-08-002', date: '28/10/2025', status: 'Jatuh tempo hari ini', amount: 'Rp500.000' },
    ];

    return (
        <Layout title="Penagihan">
            <div className="space-y-6">

                {/* Statistics Cards */}
                <div className="grid grid-cols-2 gap-6">
                    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-center justify-between">
                        <div>
                            <div className="flex items-center gap-2 text-gray-600 mb-2">
                                <BarChart2 size={18} className="text-blue-500" />
                                <span className="font-semibold text-sm">Total Piutang</span>
                            </div>
                            <div className="text-3xl font-bold text-gray-900">Rp127.500.500</div>
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-center justify-between">
                        <div>
                            <div className="flex items-center gap-2 text-gray-600 mb-2">
                                <FileText size={18} className="text-orange-500" />
                                <span className="font-semibold text-sm">Total Jatuh Tempo</span>
                            </div>
                            <div className="text-3xl font-bold text-gray-900">Rp24.500.000</div>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 min-h-[calc(100vh-20rem)]">
                    {/* Toolbar */}
                    <div className="p-6 flex items-center justify-between border-b border-gray-100 gap-4">
                        <div className="relative flex-1 max-w-xl">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                            <input
                                type="text"
                                placeholder="Cari akun..."
                                className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-200 bg-gray-50"
                            />
                        </div>
                        <button
                            onClick={() => setPaymentModalOpen(true)}
                            className="flex items-center gap-2 bg-gray-700 hover:bg-gray-800 text-white px-5 py-2.5 rounded-lg font-medium transition-colors"
                        >
                            <Plus size={18} />
                            Catat Pembayaran
                        </button>
                    </div>

                    {/* Table Header */}
                    <div className="grid grid-cols-12 gap-4 px-6 py-3 bg-gray-50 border-b border-gray-200 text-xs font-bold text-gray-500 uppercase tracking-wider">
                        <div className="col-span-3">Pelanggan</div>
                        <div className="col-span-2">Nomor Faktur</div>
                        <div className="col-span-2">Tanggal Jatuh Tempo</div>
                        <div className="col-span-3">Umur</div>
                        <div className="col-span-2 text-right">Sisa Tagihan</div>
                    </div>

                    {/* Table Body */}
                    <div className="divide-y divide-gray-100">
                        {invoices.map((inv, idx) => (
                            <div key={idx} className="grid grid-cols-12 gap-4 px-6 py-4 items-center hover:bg-gray-50 transition-colors">
                                <div className="col-span-3 text-sm text-gray-900 font-medium">{inv.customer}</div>
                                <div className="col-span-2 text-sm text-gray-400">{inv.invoiceNo}</div>
                                <div className="col-span-2 text-sm text-gray-900">{inv.date}</div>
                                <div className={`col-span-3 text-sm ${inv.expired ? 'font-bold text-gray-900' : 'text-gray-500'}`}>{inv.status}</div>
                                <div className="col-span-2 text-right text-sm font-bold text-gray-900">{inv.amount}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <RecordPaymentModal isOpen={isPaymentModalOpen} onClose={() => setPaymentModalOpen(false)} />
        </Layout>
    );
};

export default Invoicing;
