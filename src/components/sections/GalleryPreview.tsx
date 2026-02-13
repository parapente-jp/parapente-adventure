'use client';

import { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import styles from './GalleryPreview.module.css';

interface GalleryImage {
    id: number;
    src: string;
    alt: string;
    categoryKey: 'summer' | 'winter' | 'landscape';
}

const galleryImagesData: GalleryImage[] = [
    {
        id: 1,
        src: '/gallery/G0010661-1024x768.jpg',
        alt: 'Vol en parapente au-dessus des montagnes',
        categoryKey: 'summer'
    },
    {
        id: 2,
        src: '/gallery/G0040365-1024x768.jpg',
        alt: 'Parapente biplace en vol',
        categoryKey: 'summer'
    },
    {
        id: 3,
        src: '/gallery/G0061304-1024x768.jpg',
        alt: 'Vue panoramique des Alpes',
        categoryKey: 'landscape'
    },
    {
        id: 4,
        src: '/gallery/G0100407-1024x768.jpg',
        alt: 'Décollage en parapente',
        categoryKey: 'summer'
    },
    {
        id: 5,
        src: '/gallery/G0100428-1024x768.jpg',
        alt: 'Montagnes enneigées',
        categoryKey: 'winter'
    },
    {
        id: 6,
        src: '/gallery/G0123920-1024x768.jpg',
        alt: 'Coucher de soleil sur les sommets',
        categoryKey: 'landscape'
    }
];

export default function GalleryPreview() {
    const sectionRef = useRef<HTMLElement>(null);
    const [isVisible, setIsVisible] = useState(false);
    const { t } = useLanguage();

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.1 }
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
            id="gallery-preview"
        >
            <div className={styles.container}>
                {/* Header */}
                <div className={styles.header}>
                    <span className={styles.badge}>{t.galleryPreview.badge}</span>
                    <h2 className={styles.title}>{t.galleryPreview.title}</h2>
                    <p className={styles.subtitle}>
                        {t.galleryPreview.subtitle}
                    </p>
                </div>

                {/* Gallery Grid */}
                <div className={styles.grid}>
                    {galleryImagesData.map((image, index) => (
                        <div
                            key={image.id}
                            className={styles.imageWrapper}
                            style={{ animationDelay: `${index * 100}ms` }}
                        >
                            <Image
                                src={image.src}
                                alt={image.alt}
                                fill
                                className={styles.image}
                                sizes="(max-width: 768px) 50vw, 33vw"
                                quality={90}
                            />
                            <div className={styles.overlay}>
                                <span className={styles.category}>{t.galleryPreview.categories[image.categoryKey]}</span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* CTA */}
                <div className={styles.cta}>
                    <Link href="/galerie" className="btn btn-primary btn-lg">
                        {t.galleryPreview.viewAll}
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={styles.ctaIcon}>
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </Link>
                    <p className={styles.ctaNote}>
                        {t.galleryPreview.videoNote}
                    </p>
                </div>
            </div>
        </section>
    );
}
