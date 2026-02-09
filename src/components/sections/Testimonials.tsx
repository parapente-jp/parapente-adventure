'use client';

import { useState, useRef, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import styles from './Testimonials.module.css';

interface Testimonial {
    id: number;
    name: string;
    location: string;
    rating: number;
    text: string;
    date: string;
    formula: string;
}

interface TestimonialsProps {
    testimonials: Testimonial[];
}

export default function Testimonials({ testimonials }: TestimonialsProps) {
    const [activeIndex, setActiveIndex] = useState(0);
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
            { threshold: 0.2 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, []);

    // Auto-rotate testimonials
    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % testimonials.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [testimonials.length]);

    const renderStars = (rating: number) => {
        return Array.from({ length: 5 }, (_, i) => (
            <span key={i} className={i < rating ? styles.starFilled : styles.starEmpty}>
                ★
            </span>
        ));
    };

    return (
        <section
            ref={sectionRef}
            className={`${styles.section} ${isVisible ? styles.visible : ''}`}
            id="testimonials"
        >
            <div className={styles.container}>
                {/* Header */}
                <div className={styles.header}>
                    <span className={styles.badge}>{t.testimonials.badge}</span>
                    <h2 className={styles.title}>{t.testimonials.title}</h2>
                    <p className={styles.subtitle}>
                        {t.testimonials.subtitle}
                    </p>
                </div>

                {/* Testimonials Carousel */}
                <div className={styles.carousel}>
                    <div className={styles.carouselTrack}>
                        {testimonials.map((testimonial, index) => (
                            <div
                                key={testimonial.id}
                                className={`${styles.testimonialCard} ${index === activeIndex ? styles.active : ''}`}
                            >
                                <div className={styles.quoteIcon}>&ldquo;</div>
                                <div className={styles.rating}>
                                    {renderStars(testimonial.rating)}
                                </div>
                                <blockquote className={styles.quote}>
                                    {testimonial.text}
                                </blockquote>
                                <div className={styles.author}>
                                    <div className={styles.avatar}>
                                        {testimonial.name.charAt(0)}
                                    </div>
                                    <div className={styles.authorInfo}>
                                        <span className={styles.authorName}>{testimonial.name}</span>
                                        <span className={styles.authorMeta}>
                                            {testimonial.location} • {testimonial.formula}
                                        </span>
                                    </div>
                                </div>
                                <span className={styles.date}>{testimonial.date}</span>
                            </div>
                        ))}
                    </div>

                    {/* Navigation Dots */}
                    <div className={styles.dots}>
                        {testimonials.map((_, index) => (
                            <button
                                key={index}
                                className={`${styles.dot} ${index === activeIndex ? styles.activeDot : ''}`}
                                onClick={() => setActiveIndex(index)}
                                aria-label={`${t.testimonials.viewTestimonial} ${index + 1}`}
                            />
                        ))}
                    </div>

                    {/* Navigation Arrows */}
                    <button
                        className={`${styles.navBtn} ${styles.prevBtn}`}
                        onClick={() => setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)}
                        aria-label={t.testimonials.previousTestimonial}
                    >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                    <button
                        className={`${styles.navBtn} ${styles.nextBtn}`}
                        onClick={() => setActiveIndex((prev) => (prev + 1) % testimonials.length)}
                        aria-label={t.testimonials.nextTestimonial}
                    >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>

                {/* CTA */}
                <div className={styles.cta}>
                    <p>{t.testimonials.flownWithUs}</p>
                    <a href="/blog/commentez-votre-vol" className={styles.ctaLink}>
                        {t.testimonials.leaveReview}
                    </a>
                </div>
            </div>
        </section>
    );
}
