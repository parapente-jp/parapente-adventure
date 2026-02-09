'use client';

import { useRef, useEffect, useState } from 'react';
import Link from 'next/link';
import styles from './SeasonSelector.module.css';

export default function SeasonSelector() {
    const sectionRef = useRef<HTMLElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.2 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <section
            ref={sectionRef}
            className={`${styles.section} ${isVisible ? styles.visible : ''}`}
            id="seasons"
        >
            <div className={styles.container}>
                {/* Header */}
                <div className={styles.header}>
                    <span className={styles.badge}>🗓️ Toute l&apos;année</span>
                    <h2 className={styles.title}>Choisissez votre saison</h2>
                    <p className={styles.subtitle}>
                        Été comme hiver, vivez l&apos;expérience du vol en parapente
                    </p>
                </div>

                {/* Season Cards */}
                <div className={styles.grid}>
                    {/* Summer Card */}
                    <Link href="/tarifs/ete" className={styles.card}>
                        <div className={styles.cardBackground} style={{
                            backgroundImage: 'url(/gallery/G0010661-1024x768.jpg)'
                        }}></div>
                        <div className={styles.cardOverlay}></div>
                        <div className={styles.cardContent}>
                            <div className={styles.cardIconWrapper}>
                                <svg className={styles.cardIconSvg} viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                    <circle cx="12" cy="12" r="5" strokeWidth="2" />
                                    <path d="M12 1v2m0 18v2M4.22 4.22l1.42 1.42m12.72 12.72l1.42 1.42M1 12h2m18 0h2m-18.78 7.78l1.42-1.42m12.72-12.72l1.42-1.42" strokeWidth="2" strokeLinecap="round" />
                                </svg>
                            </div>
                            <h3 className={styles.cardTitle}>Tarifs Été</h3>
                            <p className={styles.cardDescription}>
                                Décollage depuis Orcières, Ancelle ou Saint-Léger.
                                Vols de 15 à 45 minutes au-dessus de la vallée du Champsaur.
                            </p>
                            <div className={styles.cardFeatures}>
                                <span>Découverte 95€</span>
                                <span>Ascendances 130€</span>
                                <span>Balade 150€</span>
                                <span>Dynamique 125€</span>
                            </div>
                            <span className={styles.cardCta}>
                                Découvrir les formules été
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </span>
                        </div>
                    </Link>

                    {/* Winter Card */}
                    <Link href="/tarifs/hiver" className={styles.card}>
                        <div className={styles.cardBackground} style={{
                            backgroundImage: 'url(/gallery/G0100428-1024x768.jpg)'
                        }}></div>
                        <div className={`${styles.cardOverlay} ${styles.winterOverlay}`}></div>
                        <div className={styles.cardContent}>
                            <div className={`${styles.cardIconWrapper} ${styles.winterIcon}`}>
                                <svg className={styles.cardIconSvg} viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                    <path d="M12 2v20M2 12h20M5 5l14 14M19 5L5 19" strokeWidth="2" strokeLinecap="round" />
                                </svg>
                            </div>
                            <h3 className={styles.cardTitle}>Tarifs Hiver</h3>
                            <p className={styles.cardDescription}>
                                Décollage à ski ou à pied depuis Orcières Merlette.
                                Expérience unique avec touch and go possible !
                            </p>
                            <div className={styles.cardFeatures}>
                                <span>Découverte 85€</span>
                                <span>Promenade 135€</span>
                                <span>Ski Tandem</span>
                                <span>Déc - Avril</span>
                            </div>
                            <span className={styles.cardCta}>
                                Découvrir les formules hiver
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </span>
                        </div>
                    </Link>
                </div>
            </div>
        </section>
    );
}
