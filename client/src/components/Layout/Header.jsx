import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '../../context/AuthContext';

const Header = () => {
    const navigate = useNavigate();
    const { user, logout } = useAuth();
    const [showDropdown, setShowDropdown] = React.useState(false);

    return (
        <header className="bg-white h-16 border-b border-gray-100 flex items-center justify-between px-8 sticky top-0 z-10">
            <div className="flex items-center gap-4">
                <button
                    onClick={() => navigate(-1)}
                    className="p-1 rounded-full hover:bg-gray-100 text-gray-600 transition-colors"
                >
                    <ArrowLeft size={20} />
                </button>
            </div>

            <div className="flex items-center gap-3 relative">
                <span className="text-sm font-medium text-gray-700">{user?.name || 'User'}</span>
                <button
                    onClick={() => setShowDropdown(!showDropdown)}
                    className="w-8 h-8 rounded-full bg-orange-600 flex items-center justify-center text-white text-xs font-bold hover:bg-orange-700 transition-colors outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
                >
                    {user?.name ? user.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() : 'U'}
                </button>

                {showDropdown && (
                    <div className="absolute right-0 top-full mt-2 w-32 bg-white rounded-lg shadow-lg border border-gray-100 py-1 z-50">
                        <button
                            onClick={() => {
                                logout();
                                setShowDropdown(false);
                            }}
                            className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 font-medium transition-colors"
                        >
                            Logout
                        </button>
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header;
