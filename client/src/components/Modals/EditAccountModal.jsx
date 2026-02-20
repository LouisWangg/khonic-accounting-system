import React, { useState, useEffect, useRef } from 'react';
import { X, ChevronDown, Check } from 'lucide-react';

// Helper to flatten accounts
const flattenAccounts = (accs, level = 0) => {
    let flat = [];
    accs.forEach(acc => {
        flat.push({ id: acc.id, code: acc.code, name: acc.name, level, parentId: acc.parentId });
        if (acc.children) {
            flat = [...flat, ...flattenAccounts(acc.children, level + 1)];
        }
    });
    return flat;
};

const EditAccountModal = ({ isOpen, onClose, accounts = [], onEditAccount, account }) => {
    const initialFormState = {
        namaAkun: '',
        akunInduk: null,
        nomorAkun: '',
        saldo: ''
    };

    const [formData, setFormData] = useState(initialFormState);
    const [errors, setErrors] = useState({});
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const dropdownRef = useRef(null);

    // Populate form when account prop changes or modal opens
    useEffect(() => {
        if (isOpen && account) {
            const allFlat = flattenAccounts(accounts);
            // Try to find parent by ID, or if ID is missing, try by code prefix
            let parent = allFlat.find(a => a.id === account.parentId);

            if (!parent && account.code) {
                const parentCode = account.code.split('.')[0] + '.000';
                parent = allFlat.find(a => a.code === parentCode);
            }

            setFormData({
                namaAkun: account.name || '',
                akunInduk: parent || null,
                nomorAkun: account.code || '',
                saldo: formatRupiahValue(account.balance?.replace('Rp', '').replace(/\./g, '') || '')
            });
            setErrors({});
            setIsDropdownOpen(false);
            setIsSuccess(false);
        } else if (!isOpen) {
            setFormData(initialFormState);
            setErrors({});
            setIsDropdownOpen(false);
            setIsSuccess(false);
        }
    }, [isOpen, account, accounts]);

    const flatAccounts = flattenAccounts(accounts);

    // Get all used codes for duplicate check (excluding current account code)
    const usedCodes = flatAccounts
        .filter(acc => acc.id !== account?.id)
        .map(acc => acc.code);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const formatRupiahValue = (value) => {
        if (!value || value === '0') return '';
        const numberString = value.toString().replace(/[^0-9]/g, '');
        if (!numberString || numberString === '0') return '';
        return numberString.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    };

    const validate = (field, value, currentParent = formData.akunInduk) => {
        let newErrors = { ...errors };

        if (field === 'nomorAkun' || field === 'akunInduk') {
            const codeToValidate = field === 'nomorAkun' ? value : formData.nomorAkun;
            const parentToValidate = field === 'akunInduk' ? value : currentParent;

            if (codeToValidate) {
                if (parentToValidate) {
                    const parentPrefix = parentToValidate.code.split('.')[0];
                    const ownPrefix = codeToValidate.split('.')[0];
                    if (parentPrefix !== ownPrefix) {
                        newErrors.nomorAkun = `Nomor akun harus diawali dengan ${parentPrefix}`;
                    } else if (usedCodes.includes(codeToValidate)) {
                        newErrors.nomorAkun = 'Nomor akun sudah digunakan';
                    } else {
                        delete newErrors.nomorAkun;
                    }
                } else {
                    delete newErrors.nomorAkun;
                }
            } else {
                delete newErrors.nomorAkun;
            }
        }

        setErrors(newErrors);
    };

    const handleInputChange = (field, value) => {
        let processedValue = value;

        if (field === 'namaAkun') {
            processedValue = value.replace(/[0-9]/g, '');
            processedValue = processedValue.replace(/[^a-zA-Z\s&'\",.\/\-]/g, '');
        }

        if (field === 'nomorAkun') {
            processedValue = value.replace(/[^0-9.]/g, '').slice(0, 7);
        }

        if (field === 'saldo') {
            processedValue = formatRupiahValue(value);
        }

        setFormData(prev => ({ ...prev, [field]: processedValue }));
        validate(field, processedValue);
    };

    const handleParentSelect = (parent) => {
        if (!parent.code.endsWith('.000')) return;
        setFormData(prev => ({ ...prev, akunInduk: parent }));
        setIsDropdownOpen(false);
        validate('akunInduk', parent);
    };

    const handleSubmit = () => {
        if (onEditAccount) {
            onEditAccount({
                id: account.id,
                parentId: formData.akunInduk?.id,
                code: formData.nomorAkun,
                name: formData.namaAkun,
                balance: formData.saldo
            });
            onClose(); // Close modal immediately on success
        }
    };

    const handleCloseFull = () => {
        setIsSuccess(false);
        onClose();
    };

    if (!isOpen) return null;

    const hasErrors = Object.keys(errors).length > 0;
    const isFormIncomplete = !formData.namaAkun || !formData.akunInduk || formData.nomorAkun.length !== 7 || !formData.saldo;
    const isButtonDisabled = hasErrors || isFormIncomplete;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 px-4" style={{ backgroundColor: 'rgba(0, 0, 0, 0.4)' }}>
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden relative">
                {isSuccess && (
                    <div className="absolute inset-0 bg-white z-20 flex flex-col items-center justify-center p-8 text-center animate-in fade-in duration-300">
                        <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mb-10 shadow-lg shadow-green-100 scale-125">
                            <Check size={48} className="text-white" strokeWidth={3} />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">Berhasil Simpan Perubahan</h2>
                        <p className="text-gray-500 mb-10">Perubahan akun berhasil disimpan!</p>
                        <button
                            onClick={handleCloseFull}
                            className="w-full py-4 rounded-xl bg-green-600 text-white font-bold hover:bg-green-700 transition-all shadow-lg shadow-green-100"
                        >
                            Kembali
                        </button>
                    </div>
                )}

                <div className="flex items-center justify-between p-6">
                    <h2 className="text-xl font-bold text-gray-900">Edit Akun</h2>
                    <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                        <X size={20} className="text-gray-500" />
                    </button>
                </div>

                <div className="p-6 pt-0 space-y-5">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                            <span className="text-red-500">*</span> Nama Akun
                        </label>
                        <input
                            type="text"
                            value={formData.namaAkun}
                            onChange={(e) => handleInputChange('namaAkun', e.target.value)}
                            placeholder="Test Pemasukan"
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-gray-200 outline-none transition-all"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="relative" ref={dropdownRef}>
                            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                                <span className="text-red-500">*</span> Akun Induk
                            </label>
                            <button
                                type="button"
                                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-gray-200 outline-none flex items-center justify-between bg-white text-left text-gray-900"
                            >
                                <span className="truncate">
                                    {formData.akunInduk ? `${formData.akunInduk.code}` : ''}
                                </span>
                                <ChevronDown size={18} className="text-gray-400 flex-shrink-0 ml-2" />
                            </button>

                            {isDropdownOpen && (
                                <div className="absolute z-10 w-[200%] mt-2 bg-white border border-gray-100 rounded-xl shadow-xl max-h-64 overflow-y-auto py-2">
                                    {flatAccounts.map((acc) => {
                                        const isSelectable = acc.code.endsWith('.000');
                                        return (
                                            <button
                                                key={acc.id}
                                                type="button"
                                                onClick={() => handleParentSelect(acc)}
                                                className={`w-full text-left px-4 py-2 text-sm transition-colors ${isSelectable
                                                    ? 'hover:bg-gray-50 text-gray-900 font-medium'
                                                    : 'text-gray-400 cursor-not-allowed'
                                                    }`}
                                                style={{ paddingLeft: `${acc.level * 1.5 + 1}rem` }}
                                            >
                                                {acc.code} - {acc.name}
                                            </button>
                                        );
                                    })}
                                </div>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                                <span className="text-red-500">*</span> Nomor Akun
                            </label>
                            <input
                                type="text"
                                value={formData.nomorAkun}
                                maxLength={7}
                                onChange={(e) => handleInputChange('nomorAkun', e.target.value)}
                                placeholder="Contoh : 120.000"
                                className={`w-full px-4 py-3 rounded-xl border ${errors.nomorAkun ? 'border-red-500' : 'border-gray-200'} focus:ring-2 focus:ring-gray-200 outline-none transition-all`}
                            />
                        </div>
                    </div>
                    {errors.nomorAkun && <p className="text-red-500 text-xs mt-[-10px]">{errors.nomorAkun}</p>}

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                            <span className="text-red-500">*</span> Saldo
                        </label>
                        <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold">Rp</span>
                            <input
                                type="text"
                                value={formData.saldo}
                                placeholder="0"
                                onChange={(e) => handleInputChange('saldo', e.target.value)}
                                className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-gray-200 outline-none transition-all"
                            />
                        </div>
                    </div>

                    <button
                        onClick={handleSubmit}
                        className={`w-full py-4 rounded-xl font-bold transition-all mt-4 mb-2 ${isButtonDisabled
                            ? 'bg-gray-200 text-white cursor-not-allowed'
                            : 'bg-green-600 text-white hover:bg-green-700 shadow-lg'
                            }`}
                        disabled={isButtonDisabled}
                    >
                        Simpan Perubahan
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EditAccountModal;
