import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext(null);

const STORAGE_KEY = 'khonic_user';

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check local storage on initial load
        try {
            const storedUserStr = localStorage.getItem(STORAGE_KEY);
            if (storedUserStr) {
                const parsedUser = JSON.parse(storedUserStr);
                // Basic validation: ensure it's an object with required fields
                if (parsedUser && typeof parsedUser === 'object' && parsedUser.email && parsedUser.name) {
                    setUser(parsedUser);
                } else {
                    // Invalid data, clear it
                    localStorage.removeItem(STORAGE_KEY);
                }
            }
        } catch (error) {
            console.error('Error restoring auth state:', error);
            localStorage.removeItem(STORAGE_KEY);
        } finally {
            setLoading(false);
        }
    }, []);

    const login = (email, password, displayName) => {
        // Mock Login Logic
        // In a real app, this would hit the backend API

        // Simulating API call
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (email && password) {
                    const mockUser = {
                        name: displayName || 'Khonic Admin Finance', // Default mock name
                        email: email,
                        role: 'admin'
                    };

                    // If email is specific and no name provided, we can change the name
                    if (!displayName && email.includes('louis')) {
                        mockUser.name = 'Louis Wangg';
                    }

                    setUser(mockUser);
                    localStorage.setItem(STORAGE_KEY, JSON.stringify(mockUser));
                    resolve(mockUser);
                } else {
                    reject(new Error('Email and password are required'));
                }
            }, 500);
        });
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem(STORAGE_KEY);
        // We might want to clear other stored items here
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
