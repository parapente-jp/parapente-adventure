'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAdminAuth } from '@/context/AdminAuthContext';
import styles from './page.module.css';

const ADMIN_SECTIONS = [
    {
        href: '/admin/planning',
        icon: '📅',
        title: 'Planning',
        description: 'Gérer les fermetures du calendrier'
    },
    {
        href: '/admin/photos',
        icon: '📸',
        title: 'Galerie',
        description: 'Téléverser photos et vidéos'
    },
    {
        href: '/admin/scanner',
        icon: '🎫',
        title: 'Scanner',
        description: 'Valider les billets clients'
    },
];

export default function AdminDashboardPage() {
    const { isAuthenticated, login } = useAdminAuth();
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (!login(password)) {
            setError('Mot de passe incorrect');
            setPassword('');
        }
    };

    if (!isAuthenticated) {
        return (
            <div className={styles.loginPage}>
                <div className={styles.loginCard}>
                    <div className={styles.loginIcon}>🔒</div>
                    <h1>Administration</h1>
                    <p>Entrez le mot de passe pour accéder au panneau d&apos;administration</p>

                    <form onSubmit={handleLogin} className={styles.loginForm}>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => { setPassword(e.target.value); setError(''); }}
                            placeholder="Mot de passe"
                            className={styles.passwordInput}
                            autoFocus
                        />
                        {error && <p className={styles.error}>{error}</p>}
                        <button type="submit" className={styles.loginButton}>
                            Se connecter
                        </button>
                    </form>

                    <Link href="/" className={styles.backLink}>
                        ← Retour au site
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.dashboard}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <h1>🛠️ Administration</h1>
                    <p>Bienvenue dans le panneau d&apos;administration</p>
                </div>

                <div className={styles.grid}>
                    {ADMIN_SECTIONS.map(section => (
                        <Link
                            key={section.href}
                            href={section.href}
                            className={styles.card}
                        >
                            <span className={styles.cardIcon}>{section.icon}</span>
                            <h2>{section.title}</h2>
                            <p>{section.description}</p>
                        </Link>
                    ))}
                </div>

                <div className={styles.quickStats}>
                    <h3>Liens rapides</h3>
                    <div className={styles.links}>
                        <Link href="/tarifs" className={styles.quickLink}>Voir les tarifs</Link>
                        <Link href="/galerie" className={styles.quickLink}>Voir la galerie</Link>
                        <Link href="/planning" className={styles.quickLink}>Voir le planning public</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
