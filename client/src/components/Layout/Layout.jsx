import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

const Layout = ({ children, title }) => {
    return (
        <div className="flex bg-background min-h-screen">
            <Sidebar />
            <div className="flex-1 flex flex-col min-w-0">
                <Header />
                <main className="flex-1 p-8 overflow-y-auto">
                    {title && (
                        <h1 className="text-2xl font-bold text-gray-900 mb-6">{title}</h1>
                    )}
                    {children}
                </main>
            </div>
        </div>
    );
};

export default Layout;
