'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface AdminAuthContextType {
    isAuthenticated: boolean;
    login: (password: string) => boolean;
    logout: () => void;
}

const AdminAuthContext = createContext<AdminAuthContextType | null>(null);

const ADMIN_PASSWORD = 'parapente2024';
const STORAGE_KEY = 'admin_auth';

export function AdminAuthProvider({ children }: { children: ReactNode }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Check localStorage on mount
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored === 'true') {
            setIsAuthenticated(true);
        }
        setIsLoading(false);
    }, []);

    const login = (password: string): boolean => {
        if (password === ADMIN_PASSWORD) {
            setIsAuthenticated(true);
            localStorage.setItem(STORAGE_KEY, 'true');
            return true;
        }
        return false;
    };

    const logout = () => {
        setIsAuthenticated(false);
        localStorage.removeItem(STORAGE_KEY);
    };

    if (isLoading) {
        return (
            <div style={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)'
            }}>
                <div style={{
                    width: '40px',
                    height: '40px',
                    border: '3px solid #334155',
                    borderTopColor: '#f97316',
                    borderRadius: '50%',
                    animation: 'spin 1s linear infinite'
                }} />
            </div>
        );
    }

    return (
        <AdminAuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AdminAuthContext.Provider>
    );
}

export function useAdminAuth() {
    const context = useContext(AdminAuthContext);
    if (!context) {
        throw new Error('useAdminAuth must be used within AdminAuthProvider');
    }
    return context;
}
