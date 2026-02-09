'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { siteConfig } from '@/data/site-config';
import { useLanguage } from '@/context/LanguageContext';
import styles from './page.module.css';

export default function PlanningPage() {
    const { t, language } = useLanguage();
    const [closures, setClosures] = useState<Record<string, string>>({});
    const [currentDate, setCurrentDate] = useState(new Date());
    const [loadingClosures, setLoadingClosures] = useState(true);

    const REASONS = [
        {
            id: 'vent',
            label: t.planning.closureReasons.wind,
            icon: (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17.7 7.7a2.5 2.5 0 1 1 1.8 4.3H2"></path>
                    <path d="M9.6 4.6A2 2 0 1 1 11 8H2"></path>
                    <path d="M12.6 19.4A2 2 0 1 0 14 16H2"></path>
                </svg>
            )
        },
        {
            id: 'pluie',
            label: t.planning.closureReasons.rain,
            icon: (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 17.58A5 5 0 0 0 18 8h-1.26A8 8 0 1 0 4 16.25"></path>
                    <path d="M8 13v2"></path>
                    <path d="M8 19v2"></path>
                    <path d="M12 15v2"></path>
                    <path d="M12 21v2"></path>
                    <path d="M16 13v2"></path>
                    <path d="M16 19v2"></path>
                </svg>
            )
        },
        {
            id: 'brouillard',
            label: t.planning.closureReasons.fog,
            icon: (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M7 10a5 5 0 0 1 10 0v4a5 5 0 0 1-10 0z"></path>
                    <path d="M5 20h14"></path>
                    <path d="M19 16H5"></path>
                </svg>
            )
        },
        {
            id: 'autre',
            label: t.planning.closureReasons.other,
            icon: (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="4.93" y1="4.93" x2="19.07" y2="19.07"></line>
                </svg>
            )
        },
    ];

    const DAYS = language === 'fr'
        ? ['L', 'M', 'M', 'J', 'V', 'S', 'D']
        : ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

    useEffect(() => {
        const fetchClosures = async () => {
            try {
                const res = await fetch('/api/closures');
                const data = await res.json();
                setClosures(data);
            } catch (error) {
                console.error('Failed to fetch closures:', error);
            } finally {
                setLoadingClosures(false);
            }
        };
        fetchClosures();
    }, []);

    // Calendar logic
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const offset = firstDay === 0 ? 6 : firstDay - 1;
    const calendarDays: (Date | null)[] = [];
    for (let i = 0; i < offset; i++) calendarDays.push(null);
    for (let i = 1; i <= daysInMonth; i++) calendarDays.push(new Date(year, month, i));

    const changeMonth = (off: number) => {
        setCurrentDate(new Date(year, month + off, 1));
    };

    const flightPossible = language === 'fr' ? 'Vol possible' : 'Flight available';
    const flightClosed = language === 'fr' ? 'Vol impossible' : 'Flight not available';
    const todayLabel = language === 'fr' ? "Aujourd'hui" : 'Today';
    const unavailableReason = language === 'fr' ? 'Indisponible (Raison) :' : 'Unavailable (Reason):';
    const flightCalendar = language === 'fr' ? 'Calendrier des vols' : 'Flight Calendar';
    const callInfo = language === 'fr'
        ? "Appelez-nous pour vérifier l'ouverture du jour ou pour voler en même temps à plusieurs (2 à 3 moniteurs en été) :"
        : "Call us to check today's availability or to fly together with others (2-3 instructors in summer):";

    return (
        <div className={styles.page}>
            {/* Hero */}
            <section className={styles.hero}>
                <div className={styles.heroBackground}>
                    <Image
                        src="/gallery/G0061304-1024x768.jpg"
                        alt={t.planning.title}
                        fill
                        priority
                        className={styles.heroImage}
                    />
                    <div className={styles.heroOverlay}></div>
                </div>
                <div className={styles.heroContent}>
                    <h1 className={styles.title}>{t.planning.title}</h1>
                    <p className={styles.subtitle}>
                        {t.planning.subtitle}
                    </p>
                </div>
            </section>

            <section className={styles.main}>
                <div className={styles.container}>
                    {/* Calendar - Full Width */}
                    <div className={styles.calendarSection}>
                        <div className={styles.calendarCard}>
                            <h3>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                                    <line x1="16" y1="2" x2="16" y2="6"></line>
                                    <line x1="8" y1="2" x2="8" y2="6"></line>
                                    <line x1="3" y1="10" x2="21" y2="10"></line>
                                </svg>
                                {flightCalendar}
                            </h3>

                            {loadingClosures ? (
                                <div className={styles.loading}>
                                    <div className={styles.loadingSpinner}></div>
                                </div>
                            ) : (
                                <>
                                    <div className={styles.calendarControls}>
                                        <button onClick={() => changeMonth(-1)} className={styles.navBtn}>⟨</button>
                                        <span className={styles.monthTitle}>
                                            {currentDate.toLocaleDateString(language === 'fr' ? 'fr-FR' : 'en-US', { month: 'long', year: 'numeric' })}
                                        </span>
                                        <button onClick={() => changeMonth(1)} className={styles.navBtn}>⟩</button>
                                    </div>

                                    <div className={styles.calendarGrid}>
                                        {DAYS.map((day, i) => (
                                            <div key={i} className={styles.weekday}>{day}</div>
                                        ))}
                                        {calendarDays.map((date, i) => {
                                            if (!date) return <div key={`empty-${i}`} className={styles.empty} />;
                                            const dateStr = date.toISOString().split('T')[0];
                                            const isToday = dateStr === new Date().toISOString().split('T')[0];
                                            const closureReason = closures[dateStr];
                                            const reasonObj = closureReason ? REASONS.find(r => r.id === closureReason) : null;
                                            return (
                                                <div key={dateStr} className={styles.dayCell}>
                                                    <div className={`${styles.dayBadge} ${isToday ? styles.today : (closureReason ? styles.closedDay : styles.available)}`}>
                                                        {date.getDate()}
                                                        {closureReason && <span className={styles.statusIcon}>{reasonObj?.icon}</span>}
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>

                                    <div className={styles.legend}>
                                        <div className={styles.legendGroup}>
                                            <div className={styles.legendItem}>
                                                <div className={styles.legendColor} style={{ background: '#f0fdfa' }} />
                                                <span>{flightPossible}</span>
                                            </div>
                                            <div className={styles.legendItem}>
                                                <div className={styles.legendColor} style={{ background: '#fff1f2' }} />
                                                <span>{flightClosed}</span>
                                            </div>
                                            <div className={styles.legendItem}>
                                                <div className={styles.legendColor} style={{ background: '#ffedd5' }} />
                                                <span>{todayLabel}</span>
                                            </div>
                                        </div>
                                        <div className={styles.legendSeparator} />
                                        <div className={styles.legendGroup}>
                                            <div className={styles.legendHeader}>{unavailableReason}</div>
                                            <div className={styles.weatherLegend}>
                                                {REASONS.map(reason => (
                                                    <div key={reason.id} className={styles.legendItem}>
                                                        <span className={styles.legendIcon}>{reason.icon}</span>
                                                        <span>{reason.label}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Infos Pratiques - Seul le contact reste ici */}
                    <div className={styles.contactInfoBox}>
                        <p>{callInfo}</p>
                        <a href={siteConfig.phoneLink} className={styles.infoPhone}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '8px', verticalAlign: 'middle' }}>
                                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                            </svg>
                            {siteConfig.phone}
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
}
