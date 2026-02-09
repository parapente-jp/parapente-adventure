'use client';

import { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { useSeason } from '@/context/SeasonContext';
import styles from './page.module.css';
import detailStyles from './details.module.css';
import Formules from '@/components/sections/Formules';
import { formulesEte, formulesHiver } from '@/data/site-config';
import Image from 'next/image';

const CheckIcon = () => (
    <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={styles.checkIcon}
    >
        <polyline points="20 6 9 17 4 12" />
    </svg>
);

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    icon: React.ReactNode;
    children: React.ReactNode;
}

const Modal = ({ isOpen, onClose, title, icon, children }: ModalProps) => {
    if (!isOpen) return null;

    return (
        <div className={styles.modalOverlay} onClick={onClose}>
            <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
                <button className={styles.modalClose} onClick={onClose}>&times;</button>
                <div className={styles.modalHeader}>
                    <div className={styles.modalIconSVG}>{icon}</div>
                    <h3>{title}</h3>
                </div>
                <div className={styles.modalBody}>
                    {children}
                </div>
            </div>
        </div>
    );
};

interface InfoPastilleProps {
    icon: React.ReactNode;
    title: string;
    onClick: () => void;
}

const InfoPastille = ({ icon, title, onClick }: InfoPastilleProps) => (
    <button className={styles.pastille} onClick={onClick}>
        <div className={styles.pastilleCircle}>
            {icon}
            <div className={styles.pastillePlus}>+</div>
        </div>
        <span className={styles.pastilleTitle}>{title}</span>
    </button>
);

export default function TarifsPage() {
    const { language, t } = useLanguage();
    const { season, setSeason } = useSeason();
    const [activeModal, setActiveModal] = useState<string | null>(null);

    const isHiver = season === 'hiver';

    const modalContent = {
        takeoff: {
            title: isHiver ? (language === 'fr' ? 'Décollage à ski' : 'Ski takeoff') : (language === 'fr' ? 'Sites de décollage' : 'Takeoff sites'),
            icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                </svg>
            ),
            text: isHiver
                ? (language === 'fr'
                    ? "Pas besoin d'être un expert ! Si vous savez descendre une piste bleue en restant stable sur vos skis, vous pouvez décoller avec nous. Le décollage se fait en douceur : on se laisse glisser jusqu'à ce que l'aile nous soulève. Le décollage se fait uniquement en ski."
                    : "No expert skills needed! If you can ski down a blue run with stability, you can take off with us. The takeoff is smooth: we just glide until the wing lifts us. Takeoff is by ski only.")
                : (language === 'fr'
                    ? "Nous décollons principalement d'Orcières Merlette (sommet du Drouvet à 2650m) pour son panorama à 360°."
                    : "We mainly take off from Orcières Merlette (Drouvet peak at 2650m) for its 360° panorama.")
        },
        period: {
            title: language === 'fr' ? 'Période & Météo' : 'Period & Weather',
            icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
            ),
            text: isHiver
                ? (language === 'fr'
                    ? "La saison d'hiver s'étend de mi-décembre à mi-avril. Les vols ont lieu tous les jours de 9h à 16h. Le parapente est très dépendant de la météo : nous validons ensemble le rendez-vous la veille ou le matin même selon les dernières prévisions."
                    : "The winter season runs from mid-December to mid-April. Flights take place daily from 9am to 4pm. Paragliding is highly weather-dependent: we confirm the appointment together the day before or the morning of, based on the latest forecasts.")
                : (language === 'fr'
                    ? "L'été commence dès les beaux jours d'avril et dure jusqu'en octobre. Les conditions de vol évoluent au fil de la journée : calme le matin pour la découverte, et plus thermique l'après-midi pour ceux qui veulent durer."
                    : "Summer starts from sunny April days and lasts until October. Flying conditions evolve throughout the day: calm in the morning for discovery, and more thermal in the afternoon for those who want to stay up longer.")
        },
        video: {
            title: language === 'fr' ? 'Souvenir Vidéo' : 'Video Souvenir',
            icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="23 7 16 12 23 17 23 7" />
                    <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
                </svg>
            ),
            text: language === 'fr'
                ? "Repartez avec un souvenir inoubliable de votre aventure ! Votre moniteur filme les moments forts du vol (le décollage, les paysages, vos réactions et l'atterrissage). Les fichiers HD vous sont remis directement sur une carte SD pour que vous puissiez les partager immédiatement."
                : "Take home an unforgettable memory of your adventure! Your instructor films the highlights of the flight (takeoff, scenery, your reactions, and landing). HD files are given to you directly on an SD card so you can share them immediately."
        }
    };

    return (
        <main className={`${styles.section} ${isHiver ? styles.hiverMode : ''}`}>
            {/* Hero Section */}
            <section className={detailStyles.hero}>
                <div className={detailStyles.heroBackground}>
                    <Image
                        src={isHiver
                            ? "/gallery/G0100428-1024x768.jpg"
                            : "/gallery/G0010661-1024x768.jpg"
                        }
                        alt="Baptême parapente"
                        fill
                        priority
                        className={detailStyles.heroImage}
                    />
                    <div className={`${detailStyles.heroOverlay} ${isHiver ? detailStyles.winterHeroOverlay : ''}`}></div>
                    <div className={detailStyles.gradientOverlay}></div>
                </div>
                <div className={detailStyles.heroContent}>
                    <h1 className={detailStyles.title}>
                        {language === 'fr' ? 'Nos Tarifs' : 'Our Prices'}
                    </h1>
                    <p className={detailStyles.subtitle}>
                        {isHiver
                            ? (language === 'fr' ? 'Décollage à ski depuis Orcières Merlette' : 'Ski takeoff from Orcières Merlette')
                            : (language === 'fr' ? 'Survolez la magnifique vallée du Champsaur' : 'Fly over the beautiful Champsaur valley')
                        }
                    </p>

                    <div className={styles.heroPastilleGrid}>
                        <InfoPastille
                            icon={(
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                                    <circle cx="12" cy="10" r="3" />
                                </svg>
                            )}
                            title={isHiver ? (language === 'fr' ? 'Décollage ski' : 'Ski takeoff') : (language === 'fr' ? 'Sites de vol' : 'Flight sites')}
                            onClick={() => setActiveModal('takeoff')}
                        />
                        <InfoPastille
                            icon={(
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                                    <line x1="16" y1="2" x2="16" y2="6" />
                                    <line x1="8" y1="2" x2="8" y2="6" />
                                    <line x1="3" y1="10" x2="21" y2="10" />
                                </svg>
                            )}
                            title={language === 'fr' ? 'Saison & Météo' : 'Season & Weather'}
                            onClick={() => setActiveModal('period')}
                        />
                        <InfoPastille
                            icon={(
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <polygon points="23 7 16 12 23 17 23 7" />
                                    <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
                                </svg>
                            )}
                            title={language === 'fr' ? 'Option Vidéo' : 'Video Option'}
                            onClick={() => setActiveModal('video')}
                        />
                    </div>
                </div>
            </section>

            {/* Modals */}
            <Modal
                isOpen={activeModal === 'takeoff'}
                onClose={() => setActiveModal(null)}
                title={modalContent.takeoff.title}
                icon={modalContent.takeoff.icon}
            >
                <p>{modalContent.takeoff.text}</p>
            </Modal>
            <Modal
                isOpen={activeModal === 'period'}
                onClose={() => setActiveModal(null)}
                title={modalContent.period.title}
                icon={modalContent.period.icon}
            >
                <p>{modalContent.period.text}</p>
            </Modal>
            <Modal
                isOpen={activeModal === 'video'}
                onClose={() => setActiveModal(null)}
                title={modalContent.video.title}
                icon={modalContent.video.icon}
            >
                <p>{modalContent.video.text}</p>
            </Modal>

            {/* Formulas Section with Toggle */}
            <section className={styles.formulasSection}>
                <div className="container">
                    <div className={styles.header}>
                        <div className={styles.seasonToggle}>
                            <button
                                className={`${styles.toggleBtn} ${season === 'ete' ? styles.active : ''}`}
                                onClick={() => setSeason('ete')}
                            >
                                {language === 'fr' ? '🌞 Été' : '🌞 Summer'}
                            </button>
                            <button
                                className={`${styles.toggleBtn} ${season === 'hiver' ? styles.activeHiver : ''}`}
                                onClick={() => setSeason('hiver')}
                            >
                                {language === 'fr' ? '❄️ Hiver' : '❄️ Winter'}
                            </button>
                        </div>
                    </div>

                    {/* Summer Note - Above formulas */}
                    {season === 'ete' && (
                        <div className={`${styles.summerNote} animate-fade-in-up`}>
                            <div className={styles.summerIcon}>☀️</div>
                            <div className={styles.summerContent}>
                                <h3>{language === 'fr' ? "Vols en groupe" : "Group Flights"}</h3>
                                <p>
                                    {language === 'fr'
                                        ? "En été, nous sommes 2 ou 3 moniteurs disponibles chaque jour. C'est l'idéal pour voler en même temps ! Appelez-nous pour coordonner vos créneaux."
                                        : "During summer, 2 or 3 instructors are available daily. Perfect for flying together! Call us to coordinate your slots."}
                                </p>
                            </div>
                        </div>
                    )}
                </div>

                <Formules
                    formulas={isHiver ? formulesHiver : formulesEte}
                    title={isHiver ? (language === 'fr' ? "Nos Formules Hiver" : "Our Winter Formulas") : (language === 'fr' ? "Nos Formules Été" : "Our Summer Formulas")}
                    subtitle={isHiver ? (language === 'fr' ? "Vivez l'expérience unique du parapente en ski" : "Experience the uniqueness of ski paragliding") : (language === 'fr' ? "Choisissez l'expérience qui vous correspond" : "Choose the experience that fits you")}
                    season={season}
                />
            </section>

            <div className="container">
                {/* Paiement sur place */}
                <div className={styles.paymentInfoBox}>
                    <h4>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '8px', verticalAlign: 'middle' }}>
                            <rect x="2" y="5" width="20" height="14" rx="2"></rect>
                            <line x1="2" y1="10" x2="22" y2="10"></line>
                        </svg>
                        {t.tarifs.paymentOnSite}
                    </h4>
                    <p>
                        {t.tarifs.atTakeoff}
                        <strong>{t.tarifs.paymentMethods}</strong>
                    </p>
                </div>

                {/* Garanties */}
                <div className={styles.guaranteesSection}>
                    <h2 className={styles.guaranteesTitle}>
                        {language === 'fr' ? 'VOS GARANTIES' : 'YOUR GUARANTEES'}
                    </h2>
                    <div className={styles.guaranteesGrid}>
                        <div className={styles.guaranteeCard}>
                            <div className={styles.guaranteeIcon}>
                                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                                </svg>
                            </div>
                            <h4>{language === 'fr' ? 'Paiement 100% sécurisé' : '100% Secure Payment'}</h4>
                            <p>{language === 'fr' ? 'Protocole SSL et 3D Secure' : 'SSL and 3D Secure protocols'}</p>
                        </div>
                        <div className={styles.guaranteeCard}>
                            <div className={styles.guaranteeIcon}>
                                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="12" cy="12" r="10"></circle>
                                    <polyline points="12 6 12 12 16 14"></polyline>
                                </svg>
                            </div>
                            <h4>{language === 'fr' ? 'Confirmation immédiate' : 'Immediate Confirmation'}</h4>
                            <p>
                                {language === 'fr'
                                    ? 'Bon cadeau reçu par email instantanément'
                                    : 'Gift voucher received by email instantly'}
                            </p>
                        </div>
                        <div className={styles.guaranteeCard}>
                            <div className={styles.guaranteeIcon}>
                                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <rect x="2" y="5" width="20" height="14" rx="2"></rect>
                                    <line x1="2" y1="10" x2="22" y2="10"></line>
                                </svg>
                            </div>
                            <h4>{language === 'fr' ? 'Multiples moyens de paiement' : 'Multiple Payment Methods'}</h4>
                            <p>CB, PayPal, Apple Pay, Google Pay</p>
                        </div>
                        <div className={styles.guaranteeCard}>
                            <div className={styles.guaranteeIcon}>
                                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                                    <line x1="16" y1="2" x2="16" y2="6"></line>
                                    <line x1="8" y1="2" x2="8" y2="6"></line>
                                    <line x1="3" y1="10" x2="21" y2="10"></line>
                                </svg>
                            </div>
                            <h4>{language === 'fr' ? 'Validité 1 an' : '1 Year Validity'}</h4>
                            <p>
                                {language === 'fr'
                                    ? "Utilisez votre bon quand vous voulez, durant nos périodes d'ouverture"
                                    : "Use your voucher whenever you want during our opening periods"}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
