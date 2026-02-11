'use client';

import { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';
import styles from './About.module.css';
import { siteConfig } from '@/data/site-config';
import VideoPlayerCarousel from '@/components/ui/VideoCarousel';

export default function About() {
    // Rebuild trigger
    const { t, language } = useLanguage();
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
            id="about"
        >
            <div className={styles.container}>
                <div className={styles.grid}>
                    {/* Image Side */}
                    <div className={styles.imageWrapper}>
                        <div className={styles.imageContainer}>
                            <Image
                                src="/jean-phi-enhanced.png"
                                alt="Jean-Philippe Gayon - Moniteur de parapente"
                                fill
                                className={styles.image}
                                sizes="(max-width: 768px) 100vw, 50vw"
                            />
                        </div>
                        {/* Decorative Elements */}
                        <div className={styles.decorCircle}></div>
                        <div className={styles.decorDots}></div>
                        {/* Experience Badge */}
                        <div className={styles.experienceBadge}>
                            <span className={styles.experienceNumber}>25+</span>
                            <span className={styles.experienceText}>{t.about.expText}</span>
                        </div>
                    </div>

                    {/* Content Side */}
                    <div className={styles.content}>
                        <span className={styles.badge}>{t.about.badge}</span>
                        <h2 className={styles.title}>
                            {siteConfig.owner.name}
                        </h2>
                        <p className={styles.subtitle}>
                            {t.about.subtitle}
                        </p>

                        <div className={styles.description}>
                            <p dangerouslySetInnerHTML={{ __html: t.about.desc1 }} />
                            <p dangerouslySetInnerHTML={{ __html: t.about.desc2 }} />
                        </div>

                        {/* Stats */}
                        <div className={styles.stats}>
                            <div className={styles.statItem}>
                                <span className={styles.statNumber}>15 000+</span>
                                <span className={styles.statLabel}>{language === 'fr' ? 'Vols réalisés' : 'Flights completed'}</span>
                            </div>
                            <div className={styles.statItem}>
                                <span className={styles.statNumber}>100%</span>
                                <span className={styles.statLabel}>{language === 'fr' ? 'Sécurité' : 'Safety'}</span>
                            </div>
                            <div className={styles.statItem}>
                                <span className={styles.statNumber}>⭐ 5/5</span>
                                <span className={styles.statLabel}>{language === 'fr' ? 'Satisfaction' : 'Satisfaction'}</span>
                            </div>
                        </div>

                        {/* Certifications */}
                        <div className={styles.certifications}>
                            <div className={styles.certItem}>
                                <span className={styles.certIcon}>🎓</span>
                                <span>Brevet d&apos;État Parapente</span>
                            </div>
                            <div className={styles.certItem}>
                                <span className={styles.certIcon}>🛡️</span>
                                <span>Assurance professionnelle</span>
                            </div>
                            <div className={styles.certItem}>
                                <span className={styles.certIcon}>🌐</span>
                                <span>English spoken</span>
                            </div>
                        </div>

                        {/* CTA */}
                        <div className={styles.actionWrapper}>
                            <a href={siteConfig.phoneLink} className={styles.contactCta}>
                                <span>{t.about.contact}</span>
                                <span className={styles.phone}>{siteConfig.phone}</span>
                            </a>

                            {/* Video - Bottom Right */}
                            <div className={styles.videoContainer}>
                                <VideoPlayerCarousel videos={['/videos/video1.mp4', '/videos/video2.mp4']} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
