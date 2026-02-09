'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import styles from './Hero.module.css';

export default function Hero() {
    const { t } = useLanguage();
    const backgroundRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;

            if (backgroundRef.current) {
                backgroundRef.current.style.transform = `translateY(${scrollY * 0.4}px)`;
            }
            if (contentRef.current) {
                contentRef.current.style.transform = `translateY(${scrollY * -0.1}px)`;
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <section className={styles.hero}>
            {/* Background */}
            <div className={styles.background} ref={backgroundRef}>
                <div className={styles.overlay}></div>
                <div className={styles.gradientOverlay}></div>
            </div>

            {/* Slow Floating Clouds */}
            <div className={styles.clouds}>
                <div className={`${styles.cloud} ${styles.cloud1}`}></div>
                <div className={`${styles.cloud} ${styles.cloud2}`}></div>
                <div className={`${styles.cloud} ${styles.cloud3}`}></div>
            </div>

            {/* Content */}
            <div className={styles.container}>
                <div className={styles.content}>


                    {/* Title */}
                    <h1 className={styles.title}>
                        <span className={styles.titleMain}>{t.hero.titleMain}</span>
                        <span className={styles.titleHighlight}>{t.hero.titleHighlight}</span>
                    </h1>

                    {/* Subtitle */}
                    <p className={styles.subtitle} dangerouslySetInnerHTML={{ __html: t.hero.subtitle }} />

                    {/* CTA */}
                    <div className={styles.ctas}>
                        <Link href="/planning" className={styles.primaryCta}>
                            {t.hero.ctaPrimary}
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={styles.ctaIcon}>
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </Link>
                    </div>

                    {/* Stats Bar (Pastilles) */}
                    <div className={styles.statsBar}>
                        <div className={styles.statItem}>
                            <div className={styles.statIconWrapper}>
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={styles.statIconSvg}>
                                    <circle cx="12" cy="12" r="10" strokeWidth="2" />
                                    <polyline points="12,6 12,12 16,14" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                            <div className={styles.statContent}>
                                <span className={styles.statValue}>15-25 MIN</span>
                                <span className={styles.statLabel}>{t.hero.stats.flightTime}</span>
                            </div>
                        </div>

                        <div className={styles.statItem}>
                            <div className={styles.statIconWrapper}>
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={styles.statIconSvg}>
                                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                            <div className={styles.statContent}>
                                <span className={styles.statValue}>+25 ANS</span>
                                <span className={styles.statLabel}>{t.hero.stats.experience}</span>
                            </div>
                        </div>
                        <div className={styles.statItem}>
                            <div className={styles.statIconWrapper}>
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={styles.statIconSvg}>
                                    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 3.037 1.353 5.756 3.489 7.59" strokeWidth="2" strokeLinecap="round" />
                                    <path d="M12 8v8M8 12h8" strokeWidth="2" strokeLinecap="round" />
                                </svg>
                            </div>
                            <div className={styles.statContent}>
                                <span className={styles.statValue}>15 000+</span>
                                <span className={styles.statLabel}>{t.hero.stats.flights}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section >
    );
}
