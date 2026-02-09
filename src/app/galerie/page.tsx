'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';
import styles from './page.module.css';

const galleryImages = [
    { id: 1, src: '/gallery/G0010661-1024x768.jpg', alt: { fr: 'Vol parapente été Champsaur', en: 'Summer paragliding Champsaur' }, category: 'summer' },
    { id: 2, src: '/gallery/G0040365-1024x768.jpg', alt: { fr: 'Parapente biplace vol tandem', en: 'Tandem paragliding flight' }, category: 'summer' },
    { id: 3, src: '/gallery/G0061304-1024x768.jpg', alt: { fr: 'Vue panoramique Alpes', en: 'Panoramic Alps view' }, category: 'landscape' },
    { id: 4, src: '/gallery/G0100407-1024x768.jpg', alt: { fr: 'Décollage parapente montagne', en: 'Mountain paragliding takeoff' }, category: 'summer' },
    { id: 5, src: '/gallery/G0100428-1024x768.jpg', alt: { fr: 'Montagnes enneigées hiver', en: 'Snowy winter mountains' }, category: 'winter' },
    { id: 6, src: '/gallery/G0123920-1024x768.jpg', alt: { fr: 'Coucher soleil sommets', en: 'Sunset over peaks' }, category: 'landscape' },
    { id: 7, src: '/gallery/GOPR0360-1024x768.jpg', alt: { fr: 'Vol parapente panoramique', en: 'Panoramic paragliding flight' }, category: 'winter' },
    { id: 8, src: '/gallery/GOPR0763-1024x768.jpg', alt: { fr: 'Sommet montagne nuages', en: 'Mountain peak in clouds' }, category: 'landscape' },
    { id: 9, src: '/gallery/G0021882-1024x768.jpg', alt: { fr: 'Vue aérienne vallée', en: 'Aerial valley view' }, category: 'summer' },
    { id: 10, src: '/gallery/20210609_112934-1024x768.jpg', alt: { fr: 'Lever soleil montagne', en: 'Mountain sunrise' }, category: 'landscape' },
    { id: 11, src: '/gallery/hl-11031081631.jpg', alt: { fr: 'Parapente ciel bleu', en: 'Paragliding blue sky' }, category: 'summer' },
    { id: 12, src: '/gallery/hl-11031081633.jpg', alt: { fr: 'Ski montagne hiver', en: 'Winter mountain skiing' }, category: 'winter' },
];

export default function GaleriePage() {
    const { t, language } = useLanguage();
    const [activeCategory, setActiveCategory] = useState('all');
    const [selectedImage, setSelectedImage] = useState<typeof galleryImages[0] | null>(null);

    const categories = [
        { id: 'all', label: t.gallery.all },
        { id: 'summer', label: t.gallery.summer },
        { id: 'winter', label: t.gallery.winter },
        { id: 'landscape', label: t.gallery.landscape },
    ];

    const filteredImages = activeCategory === 'all'
        ? galleryImages
        : galleryImages.filter(img => img.category === activeCategory);

    const getCategoryLabel = (categoryId: string) => {
        const cat = categories.find(c => c.id === categoryId);
        return cat ? cat.label : categoryId;
    };

    return (
        <div className={styles.page}>
            {/* Hero */}
            <section className={styles.hero}>
                <div className={styles.heroBackground}>
                    <Image
                        src="/hero-bg.png"
                        alt={t.gallery.title}
                        fill
                        priority
                        className={styles.heroImage}
                    />
                    <div className={styles.heroOverlay}></div>
                </div>
                <div className={styles.heroContent}>
                    <h1 className={styles.title}>{t.gallery.title}</h1>
                    <p className={styles.subtitle}>
                        {t.gallery.subtitle}
                    </p>
                </div>
            </section>

            {/* Gallery */}
            <section className={styles.gallery}>
                <div className={styles.container}>
                    {/* Filters */}
                    <div className={styles.filters}>
                        {categories.map((category) => (
                            <button
                                key={category.id}
                                className={`${styles.filterBtn} ${activeCategory === category.id ? styles.active : ''}`}
                                onClick={() => setActiveCategory(category.id)}
                            >
                                {category.label}
                            </button>
                        ))}
                    </div>

                    {/* Grid */}
                    <div className={styles.grid}>
                        {filteredImages.map((image, index) => (
                            <div
                                key={image.id}
                                className={styles.imageWrapper}
                                onClick={() => setSelectedImage(image)}
                                style={{ animationDelay: `${index * 50}ms` }}
                            >
                                <Image
                                    src={image.src}
                                    alt={image.alt[language]}
                                    fill
                                    className={styles.image}
                                    sizes="(max-width: 768px) 50vw, 33vw"
                                />
                                <div className={styles.imageOverlay}>
                                    <span className={styles.imageCategory}>{getCategoryLabel(image.category)}</span>
                                    <span className={styles.zoomIcon}>🔍</span>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Video Option */}
                    <div className={styles.videoOption}>
                        <div className={styles.videoContent}>
                            <span className={styles.videoIcon}>🎥</span>
                            <div>
                                <h3>{t.gallery.videoOption.title}</h3>
                                <p>{t.gallery.videoOption.desc}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Lightbox */}
            {selectedImage && (
                <div className={styles.lightbox} onClick={() => setSelectedImage(null)}>
                    <button className={styles.closeBtn} onClick={() => setSelectedImage(null)}>
                        ✕
                    </button>
                    <div className={styles.lightboxContent} onClick={(e) => e.stopPropagation()}>
                        <Image
                            src={selectedImage.src}
                            alt={selectedImage.alt[language]}
                            width={1200}
                            height={800}
                            className={styles.lightboxImage}
                        />
                        <p className={styles.lightboxCaption}>{selectedImage.alt[language]}</p>
                    </div>
                </div>
            )}
        </div>
    );
}
