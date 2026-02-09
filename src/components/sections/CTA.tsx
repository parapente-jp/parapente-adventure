'use client';

import Link from 'next/link';
import { useSeason } from '@/context/SeasonContext';
import { useLanguage } from '@/context/LanguageContext';
import styles from './CTA.module.css';
import { siteConfig } from '@/data/site-config';

export default function CTA() {
    const { season } = useSeason();
    const { t } = useLanguage();

    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <h2 className={styles.title}>
                    {season === 'hiver' ? t.cta.titleHiver : t.cta.titleEte}
                </h2>
                <p className={styles.subtitle}>
                    {season === 'hiver' ? t.cta.subtitleHiver : t.cta.subtitleEte}
                </p>

                <div className={styles.ctas}>
                    <Link href="/tarifs" className={styles.primaryBtn}>
                        {t.cta.book}
                    </Link>
                    <a href={siteConfig.phoneLink} className={styles.secondaryBtn}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={styles.icon}>
                            <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.89 12.89 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        {siteConfig.phone}
                    </a>
                </div>
            </div>
        </section>
    );
}
