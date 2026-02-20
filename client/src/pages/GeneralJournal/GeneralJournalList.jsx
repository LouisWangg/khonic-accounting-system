import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../../components/Layout/Layout';
import { Plus, Search, RefreshCw, MoreHorizontal } from 'lucide-react';

const GeneralJournalList = () => {
    // Mock Data
    const journals = [
        { id: 1, date: '09/10/2025', number: 'JU-2025-004', description: 'Biaya servis mobil kantor bulan Oktober', status: 'Posted' },
        { id: 2, date: '28/10/2025', number: 'JU-2025-003', description: 'Biaya ATK bulan Oktober', status: 'Posted' },
        { id: 3, date: '27/10/2025', number: 'JU-2025-002', description: 'Biaya Makan bulan Oktober', status: 'Draft' },
        { id: 4, date: '26/10/2025', number: 'JU-2025-001', description: 'Biaya kesehatan bulan Oktober', status: 'Canceled' },
    ];

    const getStatusColor = (status) => {
        switch (status) {
            case 'Posted': return 'bg-green-100 text-green-600';
            case 'Draft': return 'bg-gray-100 text-gray-600';
            case 'Canceled': return 'bg-red-100 text-red-600';
            default: return 'bg-gray-100 text-gray-600';
        }
    };

    return (
        <Layout title="Jurnal Umum">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 min-h-[calc(100vh-8rem)]">
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
                    <Link to="/jurnal-umum/baru" className="flex items-center gap-2 bg-gray-700 hover:bg-gray-800 text-white px-5 py-2.5 rounded-lg font-medium transition-colors">
                        <Plus size={18} />
                        Tambah Jurnal Baru
                    </Link>
                </div>

                {/* Table Header */}
                <div className="grid grid-cols-12 gap-4 px-6 py-3 bg-gray-50 border-b border-gray-200 text-xs font-bold text-gray-500 uppercase tracking-wider">
                    <div className="col-span-2">Tanggal</div>
                    <div className="col-span-2">Nomor</div>
                    <div className="col-span-5">Deskripsi</div>
                    <div className="col-span-2">Status</div>
                    <div className="col-span-1 text-center">Action</div>
                </div>

                {/* Table Body */}
                <div className="divide-y divide-gray-100">
                    {journals.map((journal) => (
                        <div key={journal.id} className="grid grid-cols-12 gap-4 px-6 py-4 items-center hover:bg-gray-50 transition-colors">
                            <div className="col-span-2 text-sm text-gray-900">{journal.date}</div>
                            <div className="col-span-2 text-sm text-gray-500">{journal.number}</div>
                            <div className="col-span-5 text-sm font-medium text-gray-900">{journal.description}</div>
                            <div className="col-span-2">
                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(journal.status)}`}>
                                    {journal.status}
                                </span>
                            </div>
                            <div className="col-span-1 flex justify-center">
                                <button className="p-1.5 rounded-full hover:bg-gray-200 text-gray-400 hover:text-gray-600 transition-colors">
                                    <RefreshCw size={16} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Layout>
    );
};

export default GeneralJournalList;
