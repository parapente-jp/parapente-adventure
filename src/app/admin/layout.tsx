'use client';

import { ReactNode } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AdminAuthProvider, useAdminAuth } from '@/context/AdminAuthContext';
import styles from './layout.module.css';

const NAV_ITEMS = [
    { href: '/admin', label: 'Dashboard', icon: '🏠' },
    { href: '/admin/planning', label: 'Planning', icon: '📅' },
    { href: '/admin/photos', label: 'Galerie', icon: '📸' },
    { href: '/admin/scanner', label: 'Scanner', icon: '🎫' },
];

function AdminNav() {
    const pathname = usePathname();
    const { isAuthenticated, logout } = useAdminAuth();

    if (!isAuthenticated) return null;

    return (
        <nav className={styles.nav}>
            <div className={styles.navContent}>
                <Link href="/" className={styles.backToSite}>
                    ← Retour au site
                </Link>
                <div className={styles.navLinks}>
                    {NAV_ITEMS.map(item => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`${styles.navLink} ${pathname === item.href ? styles.active : ''}`}
                        >
                            <span className={styles.navIcon}>{item.icon}</span>
                            <span className={styles.navLabel}>{item.label}</span>
                        </Link>
                    ))}
                </div>
                <button onClick={logout} className={styles.logoutBtn}>
                    Déconnexion
                </button>
            </div>
        </nav>
    );
}

export default function AdminLayout({ children }: { children: ReactNode }) {
    return (
        <AdminAuthProvider>
            <div className={styles.adminLayout}>
                <AdminNav />
                <main className={styles.main}>
                    {children}
                </main>
            </div>
        </AdminAuthProvider>
    );
}
