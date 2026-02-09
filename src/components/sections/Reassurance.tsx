'use client';

import { useLanguage } from '@/context/LanguageContext';
import styles from './Reassurance.module.css';

export default function Reassurance() {
    const { t } = useLanguage();

    const items = [
        {
            id: 'vertigo',
            icon: (
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2L2 7l10 5 10-5-10-5z" />
                    <path d="M2 17l10 5 10-5" />
                    <path d="M2 12l10 5 10-5" />
                </svg>
            ),
            title: t.reassurance.vertigo.title,
            desc: t.reassurance.vertigo.desc
        },
        {
            id: 'forEveryone',
            icon: (
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
            ),
            title: t.reassurance.forEveryone.title,
            desc: t.reassurance.forEveryone.desc
        },
        {
            id: 'listening',
            icon: (
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                    <path d="M8 9h8" />
                    <path d="M8 13h6" />
                </svg>
            ),
            title: t.reassurance.listening.title,
            desc: t.reassurance.listening.desc
        }
    ];

    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <div className={styles.grid}>
                    {items.map((item) => (
                        <div key={item.id} className={styles.item}>
                            <div className={styles.iconWrapper}>
                                {item.icon}
                            </div>
                            <h3 className={styles.title}>{item.title}</h3>
                            <p className={styles.description}>{item.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
