import React, { useState } from 'react';
import Layout from '../../components/Layout/Layout';
import AddAccountModal from '../../components/Modals/AddAccountModal';
import EditAccountModal from '../../components/Modals/EditAccountModal';
import DeleteAccountModal from '../../components/Modals/DeleteAccountModal';
import { Plus, Search, ChevronDown, ChevronUp, PencilLine, Trash2, CheckCircle, AlertTriangle, Lock } from 'lucide-react';

const initialAccounts = [
    {
        id: '100.000', code: '100.000', name: 'ASET', balance: 'Rp50.000.000', level: 0, type: 'Assets', isSystem: true, children: [
            {
                id: '110.000', code: '110.000', name: 'ASET LANCAR', balance: 'Rp25.000.000', level: 1, type: 'Assets', isControl: true, children: [
                    {
                        id: '111.000', code: '111.000', name: 'Kas & Bank', balance: 'Rp20.000.000', level: 2, type: 'Assets', isControl: true, children: [
                            { id: '111.001', code: '111.001', name: 'Kas Kantor', balance: 'Rp5.000.000', level: 3, type: 'Assets' },
                            { id: '111.002', code: '111.002', name: 'Bank BCA', balance: 'Rp5.000.000', level: 3, type: 'Assets' },
                        ]
                    },
                    { id: '112.000', code: '112.000', name: 'Piutang Usaha', balance: 'Rp20.000.000', level: 2, type: 'Assets' },
                ]
            },
            {
                id: '120.000', code: '120.000', name: 'ASET TETAP', balance: 'Rp25.000.000', level: 1, type: 'Assets', isControl: true, children: [
                    { id: '121.000', code: '121.000', name: 'Tanah dan Bangunan', balance: 'Rp20.000.000', level: 2, type: 'Assets' },
                ]
            },
        ]
    },
    {
        id: '200.000', code: '200.000', name: 'KEWAJIBAN', balance: 'Rp8.000.000', level: 0, type: 'Liabilities', isSystem: true, children: [
            { id: '210.000', code: '210.000', name: 'Utang Usaha', balance: 'Rp5.000.000', level: 1, type: 'Liabilities' },
            { id: '220.000', code: '220.000', name: 'Utang Gaji', balance: 'Rp4.000.000', level: 1, type: 'Liabilities' },
        ]
    },
    {
        id: '300.000', code: '300.000', name: 'EKUITAS', balance: 'Rp600.000.000', level: 0, type: 'Equity', isSystem: true, children: [
            { id: '310.000', code: '310.000', name: 'Modal Pemilik', balance: 'Rp600.000.000', level: 1, type: 'Equity' },
        ]
    },
    {
        id: '400.000', code: '400.000', name: 'PENDAPATAN', balance: 'Rp100.000.000', level: 0, type: 'Revenue', isSystem: true, children: [
            { id: '410.000', code: '410.000', name: 'Penjualan Barang', balance: 'Rp50.000.000', level: 1, type: 'Revenue' },
            { id: '420.000', code: '420.000', name: 'Jasa Konsultasi', balance: 'Rp30.000.000', level: 1, type: 'Revenue' },
            { id: '430.000', code: '430.000', name: 'Biaya Langganan', balance: 'Rp20.000.000', level: 1, type: 'Revenue' },
        ]
    },
    {
        id: '500.000', code: '500.000', name: 'PENGELUARAN', balance: 'Rp40.000.000', level: 0, type: 'Expenses', isSystem: true, children: [
            { id: '510.000', code: '510.000', name: 'Gaji Karyawan', balance: 'Rp15.000.000', level: 1, type: 'Expenses' },
            { id: '520.000', code: '520.000', name: 'Sewa Kantor', balance: 'Rp10.000.000', level: 1, type: 'Expenses' },
            { id: '530.000', code: '530.000', name: 'Listrik', balance: 'Rp5.000.000', level: 1, type: 'Expenses' },
            { id: '540.000', code: '540.000', name: 'Biaya Marketing', balance: 'Rp10.000.000', level: 1, type: 'Expenses' },
        ]
    },
];

const AccountList = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedAccount, setSelectedAccount] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [notification, setNotification] = useState(null);
    const [expanded, setExpanded] = useState({});
    const [accounts, setAccounts] = useState(initialAccounts);

    const handleAddAccount = (newAccountData) => {
        const { parentId, code, name, balance } = newAccountData;

        const addToParent = (accs) => {
            return accs.map(acc => {
                if (acc.id === parentId) {
                    const newEntry = {
                        id: code,
                        code: code,
                        name: name,
                        balance: `Rp${balance}`,
                        level: acc.level + 1,
                        type: acc.type, // Inherit type from parent
                        parentId: parentId,
                        children: []
                    };
                    return {
                        ...acc,
                        children: [...(acc.children || []), newEntry]
                    };
                }
                if (acc.children) {
                    return {
                        ...acc,
                        children: addToParent(acc.children)
                    };
                }
                return acc;
            });
        };

        setAccounts(prev => addToParent(prev));
    };

    const handleEditAccount = (updatedData) => {
        const updateInList = (accs) => {
            return accs.map(acc => {
                if (acc.id === updatedData.id) {
                    return {
                        ...acc,
                        code: updatedData.code,
                        name: updatedData.name,
                        balance: `Rp${updatedData.balance}`,
                        parentId: updatedData.parentId
                    };
                }
                if (acc.children) {
                    return {
                        ...acc,
                        children: updateInList(acc.children)
                    };
                }
                return acc;
            });
        };
        setAccounts(prev => updateInList(prev));

        // Show success notification
        setNotification({ message: 'Berhasil Edit Akun!', type: 'success' });
        setTimeout(() => setNotification(null), 8000);
    };

    const handleDeleteAccount = (id) => {
        const removeFromList = (accs) => {
            return accs.filter(acc => acc.id !== id).map(acc => ({
                ...acc,
                children: acc.children ? removeFromList(acc.children) : []
            }));
        };
        setAccounts(prev => removeFromList(prev));

        // Show success notification
        setNotification({ message: 'Berhasil Hapus Akun!', type: 'success' });
        setTimeout(() => setNotification(null), 8000);
    };

    const handleEditClick = (account) => {
        if (account.children && account.children.length > 0) {
            setNotification({ message: 'Akun tidak dapat diubah karena memiliki akun turunan', type: 'warning' });
            setTimeout(() => setNotification(null), 8000);
            return;
        }
        setSelectedAccount(account);
        setIsEditModalOpen(true);
    };

    const handleDeleteClick = (account) => {
        if (account.children && account.children.length > 0) {
            setNotification({ message: 'Akun tidak dapat dihapus karena memiliki akun turunan', type: 'warning' });
            setTimeout(() => setNotification(null), 8000);
            return;
        }
        setSelectedAccount(account);
        setIsDeleteModalOpen(true);
    };

    const toggleExpand = (id) => {
        // ...
        setExpanded(prev => ({
            ...prev,
            [id]: prev[id] === undefined ? false : !prev[id]
        }));
    };

    // Helper to parse currency string to number
    const parseBalance = (balanceStr) => {
        if (!balanceStr) return 0;
        return parseInt(balanceStr.replace(/Rp|\./g, '')) || 0;
    };

    // Helper to format number to currency string
    const formatBalance = (num) => {
        return 'Rp' + num.toLocaleString('id-ID');
    };

    // Recursive function to sum all child balances
    const calculateTotal = (account) => {
        if (!account.children || account.children.length === 0) {
            return parseBalance(account.balance);
        }
        return account.children.reduce((sum, child) => sum + calculateTotal(child), 0);
    };

    // Recursive sorting function
    const sortAccounts = (accs) => {
        return [...accs].sort((a, b) => a.code.localeCompare(b.code, undefined, { numeric: true }))
            .map(acc => ({
                ...acc,
                children: acc.children ? sortAccounts(acc.children) : []
            }));
    };

    // Recursive filtering function
    const filterAccounts = (accs, term) => {
        if (!term) return accs;
        const lowerTerm = term.toLowerCase();

        return accs.map(acc => {
            const matchesCurrent = acc.name.toLowerCase().includes(lowerTerm) ||
                acc.code.toLowerCase().includes(lowerTerm);

            const filteredChildren = acc.children ? filterAccounts(acc.children, term) : [];
            const hasMatchingChildren = filteredChildren.length > 0;

            if (matchesCurrent || hasMatchingChildren) {
                return {
                    ...acc,
                    children: filteredChildren
                };
            }
            return null;
        }).filter(Boolean);
    };

    const filteredAccounts = filterAccounts(accounts, searchTerm);
    const sortedAccounts = sortAccounts(filteredAccounts);

    const renderRow = (account, isLast = false, parentLast = []) => {
        const hasChildren = account.children && account.children.length > 0;
        const isExpanded = expanded[account.id] !== false; // Default to expanded if undefined

        if (account.level === 0) {
            const totalSaldo = calculateTotal(account);

            return (
                <React.Fragment key={account.id}>
                    <div className="flex items-center py-3 bg-gray-50 border-b border-gray-200 text-sm font-bold text-gray-500 uppercase tracking-wider mt-4 first:mt-0 group min-h-[52px]">
                        <div className="w-1/4 pl-4 text-gray-600">{account.code}</div>
                        <div className="flex-1 text-gray-900 flex items-center gap-2">
                            {account.name}
                            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                {(account.isSystem || account.isControl) && (
                                    <div className="p-1.5 bg-gray-200/50 border border-gray-300/30 rounded-lg text-gray-500">
                                        <Lock size={12} />
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="w-64 text-right pr-4 flex items-center justify-end gap-3">
                            <span className="text-gray-400 normal-case font-medium whitespace-nowrap">Total Saldo :</span>
                            <span className="text-gray-900 text-sm normal-case whitespace-nowrap min-w-[120px]">{formatBalance(totalSaldo)}</span>
                            <button
                                onClick={() => toggleExpand(account.id)}
                                className="p-1 hover:bg-gray-200 rounded-full transition-colors text-gray-500"
                            >
                                {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                            </button>
                        </div>
                    </div>
                    {hasChildren && isExpanded && account.children.map((child, index) =>
                        renderRow(child, index === account.children.length - 1, [...parentLast, true])
                    )}
                </React.Fragment>
            );
        }

        return (
            <React.Fragment key={account.id}>
                <div className="flex items-center py-4 border-b border-gray-50 hover:bg-gray-50 transition-colors relative group">
                    {/* Tree Lines Container */}
                    <div className="absolute top-0 bottom-0 left-4" style={{ width: `${account.level * 2}rem` }}>
                        {/* Parent Vertical Lines */}
                        {parentLast.slice(1, -1).map((isParentLast, i) => (
                            !isParentLast && (
                                <div
                                    key={i}
                                    className="absolute top-0 bottom-0 border-l border-gray-200"
                                    style={{ left: `${(i + 1) * 2 - 1}rem` }}
                                />
                            )
                        ))}
                        {/* Current Level L-Shape */}
                        <div
                            className={`absolute top-0 ${isLast ? 'h-1/2' : 'bottom-0'} border-l border-gray-200`}
                            style={{ left: `${(account.level - 1) * 2 + 1}rem` }}
                        />
                        <div
                            className="absolute top-1/2 border-b border-gray-200"
                            style={{
                                left: `${(account.level - 1) * 2 + 1}rem`,
                                width: '1rem'
                            }}
                        />
                    </div>

                    <div className="w-1/4 pl-4" style={{ paddingLeft: `${account.level * 2 + 1.25}rem` }}>
                        <span className="text-gray-600 font-medium">{account.code}</span>
                    </div>
                    <div className="flex-1 flex items-center gap-2">
                        <span className="text-gray-900 font-medium">{account.name}</span>
                        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            {account.isSystem || account.isControl ? (
                                <div className="p-1.5 bg-gray-50 border border-gray-100 rounded-lg text-gray-400">
                                    <Lock size={14} />
                                </div>
                            ) : (
                                <>
                                    <button
                                        onClick={() => handleEditClick(account)}
                                        className="p-1.5 bg-white border border-gray-100 rounded-lg shadow-sm hover:bg-gray-50 text-gray-500 transition-all"
                                    >
                                        <PencilLine size={14} />
                                    </button>
                                    <button
                                        onClick={() => handleDeleteClick(account)}
                                        className="p-1.5 bg-white border border-gray-100 rounded-lg shadow-sm hover:bg-red-50 hover:text-red-500 text-gray-500 transition-all"
                                    >
                                        <Trash2 size={14} />
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                    <div className="w-64 text-right pr-4">
                        <span className="text-gray-500 font-medium min-w-[120px] inline-block pr-[28px]">{account.balance}</span>
                    </div>
                </div>
                {hasChildren && isExpanded && account.children.map((child, index) =>
                    renderRow(child, index === account.children.length - 1, [...parentLast, isLast])
                )}
            </React.Fragment>
        );
    };

    return (
        <Layout title="Daftar Akun">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 min-h-[calc(100vh-8rem)] relative">
                {/* Floating Notification */}
                {notification && (
                    <div className={`fixed top-20 right-8 z-50 flex items-center gap-2 px-4 py-3 rounded-xl border shadow-xl animate-in slide-in-from-top-2 duration-300 ${notification.type === 'warning'
                        ? 'bg-[#FFF9F2] text-[#B45309] border-[#FED7AA]'
                        : 'bg-white text-green-700 border-green-100'
                        }`}>
                        {notification.type === 'warning' ? (
                            <AlertTriangle size={18} className="text-[#F59E0B]" />
                        ) : (
                            <CheckCircle size={18} className="text-green-500" />
                        )}
                        <span className="font-bold text-sm">{notification.message}</span>
                    </div>
                )}

                {/* Toolbar */}
                <div className="p-6 flex items-center justify-between border-b border-gray-100 gap-4">
                    <div className="relative flex-1 max-w-xl">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            type="text"
                            placeholder="Cari akun..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-200 bg-gray-50"
                        />
                    </div>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="flex items-center gap-2 bg-gray-700 hover:bg-gray-800 text-white px-5 py-2.5 rounded-lg font-medium transition-colors"
                    >
                        <Plus size={18} />
                        Tambah Akun Baru
                    </button>
                </div>


                {/* Table Body */}
                <div className="text-sm">
                    {sortedAccounts.map(account => renderRow(account))}
                </div>
            </div>

            <AddAccountModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                accounts={accounts}
                onAddAccount={handleAddAccount}
            />

            <EditAccountModal
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                accounts={accounts}
                onEditAccount={handleEditAccount}
                account={selectedAccount}
            />

            <DeleteAccountModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onDelete={handleDeleteAccount}
                account={selectedAccount}
            />
        </Layout>
    );
};

export default AccountList;
