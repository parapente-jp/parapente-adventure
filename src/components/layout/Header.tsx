'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { siteConfig, navigation } from '@/data/site-config';
import { useLanguage } from '@/context/LanguageContext';
import { useCart } from '@/context/CartContext';
import styles from './Header.module.css';

export default function Header() {
    const pathname = usePathname();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
    const { language, setLanguage, t } = useLanguage();
    const { items } = useCart();
    const cartCount = items.reduce((sum, item) => sum + item.quantity, 0);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}>
            <div className={styles.container}>
                {/* Logo */}
                <Link href="/" className={styles.logo}>
                    <img src="/logo_transparent.png" alt={siteConfig.name} className={styles.logoImg} />
                </Link>

                {/* Desktop Navigation */}
                <nav className={styles.nav}>
                    {navigation.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <div
                                key={item.name}
                                className={styles.navItem}
                            >
                                <Link
                                    href={item.href}
                                    className={`${styles.navLink} ${isActive ? styles.active : ''}`}
                                >
                                    {language === 'fr' ? item.name : (t.nav as any)[item.id] || item.name}
                                </Link>
                            </div>
                        );
                    })}
                </nav>

                {/* Language & CTA */}
                <div className={styles.ctas}>
                    <div className={styles.langToggle}>
                        <button
                            className={`${styles.langBtn} ${language === 'fr' ? styles.activeLang : ''}`}
                            onClick={() => setLanguage('fr')}
                        >
                            FR
                        </button>
                        <span className={styles.langDivider}>/</span>
                        <button
                            className={`${styles.langBtn} ${language === 'en' ? styles.activeLang : ''}`}
                            onClick={() => setLanguage('en')}
                        >
                            EN
                        </button>
                    </div>
                    <Link href="/panier" className={styles.cartBtn} aria-label={language === 'fr' ? "Panier" : "Cart"}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.cartIcon}>
                            <circle cx="9" cy="21" r="1" />
                            <circle cx="20" cy="21" r="1" />
                            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                        </svg>
                        {cartCount > 0 && (
                            <span className={styles.cartBadge}>{cartCount}</span>
                        )}
                    </Link>
                    <Link href="/tarifs" className={styles.reserveBtn}>
                        {t.nav.buy}
                    </Link>
                </div>

                {/* Mobile Cart & Menu Button */}
                <div className={styles.mobileRight}>
                    <Link href="/panier" className={styles.mobileCartBtn} aria-label={language === 'fr' ? "Panier" : "Cart"}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.cartIcon}>
                            <circle cx="9" cy="21" r="1" />
                            <circle cx="20" cy="21" r="1" />
                            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                        </svg>
                        {cartCount > 0 && (
                            <span className={styles.cartBadge}>{cartCount}</span>
                        )}
                    </Link>
                    <button
                        className={styles.mobileMenuBtn}
                        onClick={toggleMobileMenu}
                        aria-label="Menu"
                    >
                        <span className={`${styles.hamburger} ${isMobileMenuOpen ? styles.active : ''}`}></span>
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <div className={`${styles.mobileMenu} ${isMobileMenuOpen ? styles.open : ''}`}>
                <button
                    className={styles.mobileCloseBtn}
                    onClick={() => setIsMobileMenuOpen(false)}
                    aria-label="Fermer le menu"
                >
                    ✕
                </button>
                <nav className={styles.mobileNav}>
                    {navigation.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <div key={item.name} className={styles.mobileNavItem}>
                                <Link
                                    href={item.href}
                                    className={`${styles.mobileNavLink} ${isActive ? styles.mobileActive : ''}`}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    {language === 'fr' ? item.name : (t.nav as any)[item.id] || item.name}
                                </Link>
                            </div>
                        );
                    })}
                </nav>
                <div className={styles.mobileCtas}>
                    <div className={styles.mobileLangToggle}>
                        <button
                            className={`${styles.mobileLangBtn} ${language === 'fr' ? styles.mobileActiveLang : ''}`}
                            onClick={() => setLanguage('fr')}
                        >
                            Français
                        </button>
                        <button
                            className={`${styles.mobileLangBtn} ${language === 'en' ? styles.mobileActiveLang : ''}`}
                            onClick={() => setLanguage('en')}
                        >
                            English
                        </button>
                    </div>
                    <a href={siteConfig.phoneLink} className={styles.mobilePhone}>
                        📞 {siteConfig.phone}
                    </a>
                    <Link
                        href="/planning"
                        className={styles.mobileReserve}
                        onClick={() => setIsMobileMenuOpen(false)}
                    >
                        {t.nav.buy}
                    </Link>
                </div>
            </div>
        </header>
    );
}
