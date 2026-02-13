'use client';

import { useRef, useEffect, useState } from 'react';
import Link from 'next/link';
import { useSeason } from '@/context/SeasonContext';
import { useLanguage } from '@/context/LanguageContext';
import { useCart } from '@/context/CartContext';
import styles from './Formules.module.css';

interface Formula {
    id: string;
    name: string;
    duration: string;
    altitude: string;
    weightMin: number;
    weightMax: number;
    price: number;
    description: string;
    features: string[];
    popular?: boolean;
    options?: { id: string; name: string; price: number }[];
}

interface FormulesProps {
    titleEte?: string;
    titleHiver?: string;
    subtitleEte?: string;
    subtitleHiver?: string;
    formulasEte?: Formula[];
    formulasHiver?: Formula[];
    // Backward compatibility / Single season overrides
    formulas?: Formula[];
    title?: string;
    subtitle?: string;
    season?: 'ete' | 'hiver';
}

export default function Formules({
    titleEte,
    titleHiver,
    subtitleEte,
    subtitleHiver,
    formulasEte = [],
    formulasHiver = [],
    formulas: directFormulas = [],
    title: directTitle,
    subtitle: directSubtitle,
    season: propSeason
}: FormulesProps) {
    const sectionRef = useRef<HTMLElement>(null);
    const [isVisible, setIsVisible] = useState(false);
    const [addedItems, setAddedItems] = useState<Set<string>>(new Set());
    const { season: contextSeason, setSeason } = useSeason();
    const { t, language } = useLanguage();
    const { addItem } = useCart();

    const season = propSeason || contextSeason;
    const formulas = directFormulas.length > 0 ? directFormulas : (season === 'ete' ? formulasEte : formulasHiver);
    const title = directTitle || (season === 'ete'
        ? (titleEte || t.formules.summerTitle)
        : (titleHiver || t.formules.winterTitle));
    const subtitle = directSubtitle || (season === 'ete'
        ? (subtitleEte || t.formules.summerSubtitle)
        : (subtitleHiver || t.formules.winterSubtitle));

    // Helper function to get translated formula data
    const getTranslatedFormula = (formula: Formula) => {
        const formulaData = t.formulaData as Record<string, Record<string, { name: string; altitude: string; description: string; features: string[]; requirements?: string[] }>>;
        const optionsData = t.formulaData?.options as Record<string, string> | undefined;

        // Map formula IDs to translation keys
        const idToKey: Record<string, { season: 'summer' | 'winter'; key: string }> = {
            'decouverte-ete': { season: 'summer', key: 'decouverte' },
            'ascendances': { season: 'summer', key: 'ascendances' },
            'balade': { season: 'summer', key: 'balade' },
            'decouverte-hiver': { season: 'winter', key: 'decouverte' },
            'promenade-hiver': { season: 'winter', key: 'grandVol' },
        };

        const mapping = idToKey[formula.id];
        if (mapping && formulaData?.[mapping.season]?.[mapping.key]) {
            const translated = formulaData[mapping.season][mapping.key];
            return {
                ...formula,
                name: translated.name,
                altitude: translated.altitude,
                description: translated.description,
                features: translated.features,
                options: formula.options?.map(opt => ({
                    ...opt,
                    name: optionsData?.[opt.id] || opt.name
                }))
            };
        }
        return formula;
    };

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
            className={`${styles.section} ${isVisible ? styles.visible : ''} ${season === 'hiver' ? styles.hiverMode : ''}`}
            id="formules"
        >
            <div className={styles.container}>
                {/* Header */}
                <div className={styles.header}>
                    {/* Season Toggle - Only show if both formula sets are provided or on homepage */}
                    {formulasEte.length > 0 && formulasHiver.length > 0 && (
                        <div className={`${styles.seasonToggle} ${season === 'hiver' ? styles.hiverMode : ''}`}>
                            <button
                                className={`${styles.toggleBtn} ${season === 'ete' ? styles.active : ''}`}
                                onClick={() => setSeason('ete')}
                            >
                                {t.formules.summerMode}
                            </button>
                            <button
                                className={`${styles.toggleBtn} ${season === 'hiver' ? styles.activeHiver : ''}`}
                                onClick={() => setSeason('hiver')}
                            >
                                {t.formules.winterMode}
                            </button>
                        </div>
                    )}
                    <h2 className={styles.title}>{title}</h2>
                    {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
                </div>

                {/* Cards Grid */}
                <div className={styles.grid} key={season}>
                    {formulas.map((formula, index) => {
                        const translatedFormula = getTranslatedFormula(formula);
                        return (
                            <div
                                key={formula.id}
                                className={`${styles.card} ${formula.popular ? styles.popular : ''}`}
                                style={{ animationDelay: `${index * 100}ms` }}
                                id={formula.id}
                            >
                                {formula.popular && (
                                    <div className={styles.popularBadge}>
                                        <span>⭐</span> {t.formules.popular}
                                    </div>
                                )}

                                <div className={styles.cardHeader}>
                                    <h3 className={styles.cardTitle}>{translatedFormula.name}</h3>
                                    <div className={styles.cardPrice}>
                                        <span className={styles.priceAmount}>{formula.price}€</span>
                                        <span className={styles.priceLabel}>{t.formules.perPerson}</span>
                                    </div>
                                </div>

                                <div className={styles.cardMeta}>
                                    <div className={styles.metaItem}>
                                        <span className={styles.metaIcon}>⏱️</span>
                                        <span>{formula.duration}</span>
                                    </div>
                                    <div className={styles.metaItem}>
                                        <span className={styles.metaIcon}>📏</span>
                                        <span>{translatedFormula.altitude}</span>
                                    </div>
                                    <div className={styles.metaItem}>
                                        <span className={styles.metaIcon}>⚖️</span>
                                        <span>{formula.weightMin}-{formula.weightMax} kg</span>
                                    </div>
                                </div>

                                <p className={styles.cardDescription}>{translatedFormula.description}</p>

                                <ul className={styles.featuresList}>
                                    {translatedFormula.features.map((feature, i) => (
                                        <li key={i} className={styles.featureItem}>
                                            <svg className={styles.checkIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                            <span>{feature}</span>
                                        </li>
                                    ))}
                                </ul>

                                {translatedFormula.options && translatedFormula.options.length > 0 && (
                                    <div className={styles.optionsAvailable}>
                                        <span className={styles.optionsLabel}>{t.formules.optionsAvailable}</span>
                                        {translatedFormula.options.map(opt => (
                                            <span key={opt.id} className={styles.optionTag}>
                                                {opt.name} +{opt.price}€
                                            </span>
                                        ))}
                                    </div>
                                )}

                                <button
                                    className={`btn ${addedItems.has(formula.id) ? 'btn-success' : (formula.popular ? 'btn-primary' : 'btn-outline')} ${styles.cardCta}`}
                                    onClick={() => {
                                        if (process.env.NEXT_PUBLIC_ENABLE_PAYMENTS !== 'true') {
                                            window.location.href = `tel:${process.env.NEXT_PUBLIC_PHONE_NUMBER || '0683036344'}`;
                                            return;
                                        }
                                        addItem({
                                            formulaId: formula.id,
                                            formulaName: translatedFormula.name,
                                            price: formula.price,
                                            duration: formula.duration,
                                            options: []
                                        });
                                        setAddedItems(prev => new Set(prev).add(formula.id));
                                        setTimeout(() => {
                                            setAddedItems(prev => {
                                                const next = new Set(prev);
                                                next.delete(formula.id);
                                                return next;
                                            });
                                        }, 2000);
                                    }}
                                >
                                    {process.env.NEXT_PUBLIC_ENABLE_PAYMENTS === 'true' ? (
                                        addedItems.has(formula.id) ? `✓ ${t.formules.addedToCart}` : t.formules.addToCart
                                    ) : (
                                        "Réservation par téléphone"
                                    )}
                                </button>
                            </div>
                        );
                    })}
                </div>

                {/* Bottom CTA */}
                <div className={styles.bottomCta}>
                    <p>{t.formules.readyToBook}</p>
                    <Link href="/panier" className={styles.helpLink}>
                        {t.formules.viewCart}
                    </Link>
                </div>
            </div>
        </section >
    );
}
