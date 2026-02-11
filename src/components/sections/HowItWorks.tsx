'use client';

import { useRef, useEffect, useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import Modal from '@/components/ui/Modal';
import styles from './HowItWorks.module.css';

const stepsData = [
    {
        number: '01',
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        )
    },
    {
        number: '02',
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 1118 0z" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="12" cy="10" r="3" />
            </svg>
        )
    },
    {
        number: '03',
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9c2.12 0 4.07.74 5.61 1.97" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        )
    },
    {
        number: '04',
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2L2 7l10 5 10-5-10-5z" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M2 17l10 5 10-5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M2 12l10 5 10-5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        )
    },
    {
        number: '05',
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <path d="M21 15l-5-5L5 21" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        )
    }
];

export default function HowItWorks() {
    const { t } = useLanguage();
    const sectionRef = useRef<HTMLElement>(null);
    const [isVisible, setIsVisible] = useState(false);
    const [activeModal, setActiveModal] = useState<number | null>(null);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);

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

        return () => {
            window.removeEventListener('resize', checkMobile);
            observer.disconnect();
        };
    }, []);

    const handleStepClick = (index: number) => {
        if (isMobile) {
            setActiveModal(index);
        }
    };

    return (
        <section
            ref={sectionRef}
            className={`${styles.section} ${isVisible ? styles.visible : ''}`}
            id="comment-ca-se-passe"
        >
            <div className={styles.container}>
                {/* Header */}
                <div className={styles.header}>
                    <span className={styles.badge}>{t.howItWorks.badge}</span>
                    <h2 className={styles.title}>{t.howItWorks.title}</h2>
                    <p className={styles.subtitle}>
                        {t.howItWorks.subtitle}
                    </p>
                </div>

                {/* Timeline */}
                <div className={styles.timeline}>
                    {stepsData.map((step, index) => (
                        <div
                            key={step.number}
                            className={`${styles.step} ${isMobile ? styles.clickable : ''}`}
                            style={{ animationDelay: `${index * 0.15}s` }}
                            onClick={() => handleStepClick(index)}
                        >
                            <div className={styles.stepIcon}>
                                {step.icon}
                            </div>
                            <div className={styles.stepNumber}>{step.number}</div>
                            <h3 className={styles.stepTitle}>{t.howItWorks.steps[index].title}</h3>
                            <p className={styles.stepDescription}>{t.howItWorks.steps[index].desc}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Modals for Mobile */}
            {isMobile && stepsData.map((step, index) => (
                <Modal
                    key={`step-modal-${index}`}
                    isOpen={activeModal === index}
                    onClose={() => setActiveModal(null)}
                    title={t.howItWorks.steps[index].title}
                    icon={<div className={styles.modalIcon}>{step.icon}</div>}
                >
                    <p className={styles.modalDesc}>{t.howItWorks.steps[index].desc}</p>
                </Modal>
            ))}
        </section>
    );
}
