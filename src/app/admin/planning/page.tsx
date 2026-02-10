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
    const [token, setToken] = useState('');
    const [repo, setRepo] = useState('parapente-jp/parapente-adventure');
    const [showSettings, setShowSettings] = useState(false);

    useEffect(() => {
        const savedToken = localStorage.getItem('gh_token');
        const savedRepo = localStorage.getItem('gh_repo');
        if (savedToken) setToken(savedToken);
        if (savedRepo) setRepo(savedRepo);
    }, []);

    useEffect(() => {
        if (isAuthenticated) {
            fetchClosures();
        }
    }, [isAuthenticated]);

    const fetchClosures = async () => {
        try {
            const res = await fetch(`/api/closures?_=${Date.now()}`, { cache: 'no-store' });
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

    const saveSettings = () => {
        localStorage.setItem('gh_token', token);
        localStorage.setItem('gh_repo', repo);
        setShowSettings(false);
        setMessage('✅ Paramètres enregistrés');
        setTimeout(() => setMessage(''), 3000);
    };

    const handlePush = async () => {
        if (!token || !repo) {
            setShowSettings(true);
            setMessage('⚠️ Veuillez configurer GitHub');
            return;
        }

        setPushing(true);
        setMessage('⏳ Propagation vers GitHub...');

        try {
            // 1. Get the current file SHA from GitHub - add cache buster to avoid stale SHA
            const getFileResponse = await fetch(`https://api.github.com/repos/${repo}/contents/src/data/closures.json?ref=main&_=${Date.now()}`, {
                headers: {
                    'Authorization': `token ${token}`,
                    'Accept': 'application/vnd.github.v3+json',
                    'User-Agent': 'Parapente-Adventure-Admin'
                },
                cache: 'no-store'
            });

            if (!getFileResponse.ok) {
                const errorText = await getFileResponse.text();
                throw new Error(`Erreur GitHub (${getFileResponse.status}): ${errorText.substring(0, 50)}`);
            }

            const fileData = await getFileResponse.json();
            const sha = fileData.sha;

            // 2. Update the file on GitHub
            const jsonContent = JSON.stringify(closures, null, 2);
            // Use TextEncoder to handle UTF-8 properly for base64
            const base64Content = btoa(unescape(encodeURIComponent(jsonContent)));

            const updateResponse = await fetch(`https://api.github.com/repos/${repo}/contents/src/data/closures.json`, {
                method: 'PUT',
                headers: {
                    'Authorization': `token ${token}`,
                    'Accept': 'application/vnd.github.v3+json',
                    'Content-Type': 'application/json',
                    'User-Agent': 'Parapente-Adventure-Admin'
                },
                body: JSON.stringify({
                    message: 'admin: update calendar closures',
                    content: base64Content,
                    sha: sha,
                    branch: 'main'
                }),
            });

            if (!updateResponse.ok) {
                const errorText = await updateResponse.text();
                throw new Error(`Erreur Update (${updateResponse.status}): ${errorText.substring(0, 50)}`);
            }

            setMessage('🚀 Déploiement lancé sur GitHub !');
        } catch (err: any) {
            console.error('Push error:', err);
            setMessage(`❌ ${err.message || 'Erreur de connexion'}`);
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
                    <div className={styles.headerActions}>
                        <button
                            className={styles.settingsBtn}
                            onClick={() => setShowSettings(!showSettings)}
                            title="Configuration"
                        >
                            ⚙️
                        </button>
                        <button
                            className={styles.pushBtn}
                            onClick={handlePush}
                            disabled={pushing}
                        >
                            {pushing ? '⏳ Envoi...' : '🚀 Propager sur le site'}
                        </button>
                    </div>
                </div>

                {showSettings && (
                    <div className={styles.settingsPanel}>
                        <div className={styles.settingsTitle}>
                            <span>⚙️ Configuration GitHub</span>
                        </div>
                        <div className={styles.settingsGroup}>
                            <div className={styles.inputField}>
                                <label>Dépôt (ex: owner/repo)</label>
                                <input
                                    type="text"
                                    value={repo}
                                    onChange={(e) => setRepo(e.target.value)}
                                    placeholder="parapente-jp/parapente-adventure"
                                />
                            </div>
                            <div className={styles.inputField}>
                                <label>Token d'accès personnel (Classic ou Fine-grained)</label>
                                <input
                                    type="password"
                                    value={token}
                                    onChange={(e) => setToken(e.target.value)}
                                    placeholder="ghp_xxxxxxxxxxxx"
                                />
                            </div>
                            <button className={styles.saveSettingsBtn} onClick={saveSettings}>
                                Sauvegarder dans ce navigateur
                            </button>
                        </div>
                    </div>
                )}

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

                            const dateStr = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
                            const today = new Date();
                            const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
                            const isToday = dateStr === todayStr;
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
                        <h3 style={{ textAlign: 'center', marginBottom: 'var(--space-2)' }}>
                            {new Date(selectedDate + 'T00:00:00').toLocaleDateString('fr-FR', { day: 'numeric', month: 'long' })}
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
