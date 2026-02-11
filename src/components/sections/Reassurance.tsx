'use client';

import { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import Modal from '@/components/ui/Modal';
import styles from './Reassurance.module.css';

const MountainIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
);

const UsersIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
);

const MessageIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
);

export default function Reassurance() {
    const { t } = useLanguage();
    const [activeModal, setActiveModal] = useState<string | null>(null);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const items = [
        {
            id: 'vertigo',
            icon: <MountainIcon />,
            title: t.reassurance.vertigo.title,
            desc: t.reassurance.vertigo.desc
        },
        {
            id: 'forEveryone',
            icon: <UsersIcon />,
            title: t.reassurance.forEveryone.title,
            desc: t.reassurance.forEveryone.desc
        },
        {
            id: 'listening',
            icon: <MessageIcon />,
            title: t.reassurance.listening.title,
            desc: t.reassurance.listening.desc
        }
    ];

    const handleCardClick = (id: string) => {
        if (isMobile) {
            setActiveModal(id);
        }
    };

    return (
        <section className={styles.reassurance}>
            <div className={styles.container}>
                <div className={styles.grid}>
                    {items.map((item) => (
                        <div
                            key={item.id}
                            className={`${styles.card} ${isMobile ? styles.clickable : ''}`}
                            onClick={() => handleCardClick(item.id)}
                            role={isMobile ? "button" : "article"}
                        >
                            <div className={styles.iconWrapper}>
                                {item.icon}
                            </div>
                            <h3 className={styles.title}>{item.title}</h3>
                            <p className={styles.description}>{item.desc}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Modals for Mobile Only */}
            {isMobile && items.map((item) => (
                <Modal
                    key={`modal-${item.id}`}
                    isOpen={activeModal === item.id}
                    onClose={() => setActiveModal(null)}
                    title={item.title}
                    icon={<div className={styles.modalIcon}>{item.icon}</div>}
                >
                    <p className={styles.modalDesc}>{item.desc}</p>
                </Modal>
            ))}
        </section>
    );
}
