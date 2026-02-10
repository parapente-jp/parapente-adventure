'use client';

import { useState, useEffect } from 'react';
import { useAdminAuth } from '@/context/AdminAuthContext';
import styles from './page.module.css';

const REASONS = [
    { id: 'vent', label: 'Vent', icon: '💨' },
    { id: 'pluie', label: 'Pluie', icon: '🌧️' },
    { id: 'brouillard', label: 'Brouillard', icon: '🌫️' },
    { id: 'autre', label: 'Autre', icon: '🚫' },
];

export default function AdminPlanningPage() {
    const { isAuthenticated } = useAdminAuth();
    const [currentDate, setCurrentDate] = useState(new Date());
    const [closures, setClosures] = useState<Record<string, string>>({});
    const [selectedDate, setSelectedDate] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState('');

    const [pushing, setPushing] = useState(false);

    useEffect(() => {
        if (isAuthenticated) {
            fetchClosures();
        }
    }, [isAuthenticated]);

    const fetchClosures = async () => {
        try {
            const res = await fetch('/api/closures');
            const data = await res.json();
            setClosures(data);
        } catch (error) {
            console.error('Failed to fetch:', error);
        } finally {
            setLoading(false);
        }
    };

    const saveClosures = async (newClosures: Record<string, string>) => {
        try {
            const res = await fetch('/api/closures', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newClosures),
            });
            if (res.ok) {
                setMessage('✅ Enregistré (local)');
                setTimeout(() => setMessage(''), 2000);
            }
        } catch {
            setMessage('❌ Erreur local');
        }
    };

    const handlePush = async () => {
        setPushing(true);
        setMessage('⏳ Propagation en cours...');
        try {
            const res = await fetch('/api/admin/push', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ closures }),
            });

            const contentType = res.headers.get('content-type');
            if (contentType && contentType.includes('application/json')) {
                const data = await res.json();
                if (res.ok) {
                    setMessage('🚀 Déploiement lancé !');
                } else {
                    setMessage(`❌ Erreur: ${data.error || 'Erreur serveur'}`);
                }
            } else {
                const text = await res.text();
                setMessage(`❌ Erreur serveur (${res.status})`);
                console.error('Server error (non-JSON):', text);
            }
        } catch (err) {
            console.error('Push fetch error:', err);
            setMessage('❌ Erreur réseau ou timeout');
        } finally {
            setPushing(false);
            setTimeout(() => setMessage(''), 5000);
        }
    };

    const handleDayClick = (dateStr: string) => {
        setSelectedDate(dateStr);
    };

    const toggleClosure = (reasonId: string) => {
        if (!selectedDate) return;

        const newClosures = { ...closures };
        if (newClosures[selectedDate] === reasonId) {
            delete newClosures[selectedDate];
        } else {
            newClosures[selectedDate] = reasonId;
        }

        setClosures(newClosures);
        saveClosures(newClosures);
        setSelectedDate(null);
    };

    const removeClosure = () => {
        if (!selectedDate) return;
        const newClosures = { ...closures };
        delete newClosures[selectedDate];
        setClosures(newClosures);
        saveClosures(newClosures);
        setSelectedDate(null);
    };

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const offset = firstDay === 0 ? 6 : firstDay - 1;

    const days: (Date | null)[] = [];
    for (let i = 0; i < offset; i++) days.push(null);
    for (let i = 1; i <= daysInMonth; i++) days.push(new Date(year, month, i));

    const changeMonth = (off: number) => {
        setCurrentDate(new Date(year, month + off, 1));
    };

    const isHiver = [11, 0, 1, 2, 3].includes(month);

    if (!isAuthenticated) {
        return (
            <div className={styles.adminPage}>
                <div className={styles.accessDenied}>
                    <p>🔒 Accès refusé</p>
                </div>
            </div>
        );
    }

    if (loading) {
        return (
            <div className={styles.loading}>
                <div className={styles.loadingSpinner}></div>
            </div>
        );
    }

    return (
        <div className={styles.adminPage}>
            <div className="container">
                <div className={styles.headerRow}>
                    <h1 className={styles.title}>📅 Gestion Planning</h1>
                    <button
                        className={styles.pushBtn}
                        onClick={handlePush}
                        disabled={pushing}
                    >
                        {pushing ? '⏳ Envoi...' : '🚀 Propager sur le site'}
                    </button>
                </div>

                <div className={styles.calendarContainer}>
                    <div className={styles.calendarControls}>
                        <button onClick={() => changeMonth(-1)} className={styles.navBtn}>⟨</button>
                        <h2 className={styles.monthTitle}>
                            {currentDate.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })}
                        </h2>
                        <button onClick={() => changeMonth(1)} className={styles.navBtn}>⟩</button>
                    </div>

                    <div className={styles.seasonBanner}>
                        {isHiver ? '❄️ Saison Hiver' : '☀️ Saison Été'}
                    </div>

                    <div className={styles.calendarGrid}>
                        {['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'].map(day => (
                            <div key={day} className={styles.weekday}>{day}</div>
                        ))}
                        {days.map((date, i) => {
                            if (!date) return <div key={`empty-${i}`} className={styles.empty} />;

                            const dateStr = date.toISOString().split('T')[0];
                            const isToday = dateStr === new Date().toISOString().split('T')[0];
                            const closureReason = closures[dateStr];

                            return (
                                <div
                                    key={dateStr}
                                    className={styles.dayCell}
                                    onClick={() => handleDayClick(dateStr)}
                                >
                                    <div className={`
                                        ${styles.dayBadge} 
                                        ${isToday ? styles.today : (closureReason ? styles.closedDay : styles.available)}
                                    `}>
                                        {date.getDate()}
                                        {closureReason && (
                                            <span className={styles.statusIcon}>
                                                {REASONS.find(r => r.id === closureReason)?.icon}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {message && <div className={styles.statusMessage}>{message}</div>}
                </div>
            </div>

            {selectedDate && (
                <div className={styles.overlay} onClick={() => setSelectedDate(null)}>
                    <div className={styles.selectionBox} onClick={e => e.stopPropagation()}>
                        <h3 style={{ textAlign: 'center' }}>
                            {new Date(selectedDate).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long' })}
                        </h3>

                        <div className={styles.reasonGrid}>
                            {REASONS.map(reason => (
                                <button
                                    key={reason.id}
                                    className={`${styles.reasonButton} ${closures[selectedDate] === reason.id ? styles.reasonActive : ''}`}
                                    onClick={() => toggleClosure(reason.id)}
                                >
                                    <span style={{ fontSize: '1.5rem' }}>{reason.icon}</span>
                                    <span style={{ fontSize: '0.8rem' }}>{reason.label}</span>
                                </button>
                            ))}
                        </div>

                        <div className={styles.actionButtons}>
                            <button className={styles.btnCancel} onClick={() => setSelectedDate(null)}>Annuler</button>
                            {closures[selectedDate] && (
                                <button className={styles.btnSave} onClick={removeClosure}>
                                    Réouvrir
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
