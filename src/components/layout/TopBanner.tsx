'use client';

import { useLanguage } from '@/context/LanguageContext';
import styles from './TopBanner.module.css';

export default function TopBanner() {
    const { t } = useLanguage();

    return (
        <div className={styles.topBanner}>
            <div className={styles.container}>
                <div className={styles.statsBar}>
                    <div className={styles.statItem}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={styles.statIconSvg}>
                            <circle cx="12" cy="12" r="10" strokeWidth="2" />
                            <polyline points="12,6 12,12 16,14" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <div className={styles.statContent}>
                            <span className={styles.statValue}>15-25 MIN</span>
                            <span className={styles.statLabel}>{t.hero.stats.flightTime}</span>
                        </div>
                    </div>
                    <div className={styles.statItem}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={styles.statIconSvg}>
                            <path d="M12 2L2 22h20L12 2z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <div className={styles.statContent}>
                            <span className={styles.statValue}>1800 M</span>
                            <span className={styles.statLabel}>{t.hero.stats.altitude}</span>
                        </div>
                    </div>
                    <div className={styles.statItem}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={styles.statIconSvg}>
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <div className={styles.statContent}>
                            <span className={styles.statValue}>+25 ANS</span>
                            <span className={styles.statLabel}>{t.hero.stats.experience}</span>
                        </div>
                    </div>
                    <div className={styles.statItem}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={styles.statIconSvg}>
                            <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 3.037 1.353 5.756 3.489 7.59" strokeWidth="2" strokeLinecap="round" />
                            <path d="M12 8v8M8 12h8" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                        <div className={styles.statContent}>
                            <span className={styles.statValue}>15 000+</span>
                            <span className={styles.statLabel}>{t.hero.stats.flights}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
