import Link from 'next/link';
import { siteConfig, navigation } from '@/data/site-config';
import { useLanguage } from '@/context/LanguageContext';
import { useSeason } from '@/context/SeasonContext';
import styles from './Footer.module.css';

export default function Footer() {
    const { t, language } = useLanguage();
    const { season } = useSeason();
    const currentYear = new Date().getFullYear();

    return (
        <footer className={styles.footer}>
            {/* Upper CTA - PRÊT POUR LE GRAND SAUT? */}
            <div className={styles.ctaBanner}>
                <div className={styles.ctaContainer}>
                    <h2 className={styles.ctaTitle}>
                        {season === 'hiver' ? t.cta.titleHiver : t.cta.titleEte}
                    </h2>
                    <p className={styles.ctaSubtitle}>
                        {season === 'hiver' ? t.cta.subtitleHiver : t.cta.subtitleEte}
                    </p>
                    <div className={styles.ctaButtons}>
                        <Link href="/tarifs" className={styles.ctaBtnPrimary}>
                            {t.cta.book}
                        </Link>
                        <a href={siteConfig.phoneLink} className={styles.ctaBtnOutline}>
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={styles.btnIconSvg}>
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                            {siteConfig.phone}
                        </a>
                    </div>
                </div>
            </div>

            <div className={styles.mainFooter}>
                <div className={styles.container}>
                    <div className={styles.grid}>
                        {/* 1. Brand Column */}
                        <div className={styles.brandColumn}>
                            <Link href="/" className={styles.logo}>
                                <img src="/logo_transparent.png" alt={siteConfig.name} className={styles.footerLogoImg} />
                            </Link>
                            <p className={styles.description}>
                                {t.footer.desc}
                            </p>
                            <div className={styles.languages}>
                                <span className={styles.langItem}>{language === 'fr' ? '🇫🇷 Français' : '🇫🇷 French'}</span>
                                <span className={styles.langItem}>{language === 'fr' ? '🇬🇧 Anglais' : '🇬🇧 English spoken'}</span>
                            </div>
                        </div>

                        {/* 2. Navigation Column */}
                        <div className={styles.column}>
                            <h4 className={styles.columnTitle}>{t.footer.nav}</h4>
                            <nav className={styles.navList}>
                                {navigation.map((item) => (
                                    <Link key={item.name} href={item.href} className={styles.navLink}>
                                        {language === 'fr' ? item.name : (t.nav as any)[item.id] || item.name}
                                    </Link>
                                ))}
                            </nav>
                        </div>

                        {/* 3. Nos Formules Column */}
                        <div className={styles.column}>
                            <h4 className={styles.columnTitle}>{t.footer.formules}</h4>
                            <nav className={styles.navList}>
                                <Link href="/tarifs/ete" className={styles.navLink}>
                                    {language === 'fr' ? 'Tarifs Été' : 'Summer Pricing'}
                                </Link>
                                <Link href="/tarifs/hiver" className={styles.navLink}>
                                    {language === 'fr' ? 'Tarifs Hiver' : 'Winter Pricing'}
                                </Link>
                                <Link href="/tarifs/ete#decouverte" className={styles.navLink}>
                                    {language === 'fr' ? 'Vol Découverte' : 'Discovery Flight'}
                                </Link>
                                <Link href="/tarifs/ete#ascendances" className={styles.navLink}>
                                    {language === 'fr' ? 'Vol Ascendances' : 'Thermals Flight'}
                                </Link>
                                <Link href="/tarifs/ete#balade" className={styles.navLink}>
                                    {language === 'fr' ? 'Balade Aérienne' : 'Aerial Tour'}
                                </Link>
                            </nav>
                        </div>

                        {/* 4. Contact Column */}
                        <div className={styles.column}>
                            <h4 className={styles.columnTitle}>{t.footer.contact}</h4>
                            <div className={styles.contactList}>
                                <a href={siteConfig.phoneLink} className={styles.contactItem}>
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={styles.contactIconSvg}>
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                    </svg>
                                    <span>{siteConfig.phone}</span>
                                </a>
                                <a href={`mailto:${siteConfig.email}`} className={styles.contactItem}>
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={styles.contactIconSvg}>
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                    <span>{siteConfig.email}</span>
                                </a>
                                <div className={styles.contactItem}>
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={styles.contactIconSvg}>
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                    <span>Orcières Merlette, Hautes-Alpes</span>
                                </div>
                            </div>
                            <Link href="/tarifs" className={styles.bookBtn}>
                                {t.cta.book}
                            </Link>
                        </div>
                    </div>

                    {/* Bottom Bar */}
                    <div className={styles.bottomBar}>
                        <div className={styles.bottomDivider} />
                        <div className={styles.bottomContent}>
                            <p className={styles.copyright}>
                                © {currentYear} Parapente Adventure. {t.footer.rights}
                            </p>
                            <div className={styles.legalLinks}>
                                <Link href="/mentions-legales" className={styles.legalLink}>
                                    {t.footer.legal.mentions}
                                </Link>
                                <Link href="/cgv" className={styles.legalLink}>
                                    {language === 'fr' ? 'CGV' : 'Terms & Conditions'}
                                </Link>
                                <Link href="/politique-de-confidentialite" className={styles.legalLink}>
                                    {t.footer.legal.privacy}
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

