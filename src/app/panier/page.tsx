'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import { useLanguage } from '@/context/LanguageContext';
import { siteConfig } from '@/data/site-config';
import styles from './page.module.css';

export default function PanierPage() {
    const { items, removeItem, updateQuantity, toggleOption, clearCart, totalPrice } = useCart();
    const { language } = useLanguage();
    const [isCheckingOut, setIsCheckingOut] = useState(false);
    const [error, setError] = useState('');

    const t = {
        fr: {
            heroTitle: 'Votre Panier',
            heroSubtitle: 'Finalisez votre commande de vols et bons cadeaux',
            giftNotice: 'Achat de votre Bon Cadeau :',
            giftNoticeText: 'Votre commande valide un pré-paiement sans date fixe. Pour réserver votre créneau ou pour voler en même temps à plusieurs (vols simultanés possibles en été), appelez Jean-Philippe au',
            giftNoticeEnd: 'avant ou après votre achat afin de choisir ensemble le jour idéal selon la météo.',
            emptyCart: 'Votre panier est vide',
            emptyCartText: 'Ajoutez un vol pour commencer votre aventure !',
            viewFormulas: 'Voir les formules',
            availableOptions: 'Options disponibles :',
            acrobatie: 'Acrobatie',
            pilotage: 'Initiation Pilotage',
            video: 'Photos & Vidéos',
            clearCart: 'Vider le panier',
            summary: 'Récapitulatif',
            contraindications: 'Contre-indications importantes',
            contraPregnant: 'Activité proscrite pour les femmes enceintes.',
            contraHandicap: 'Pas de qualification pour faire voler les personnes handicapées (PMR).',
            pay: 'Payer',
            redirecting: 'Redirection...',
            securePayment: '🔒 Paiement sécurisé par Stripe',
            connectionError: 'Erreur de connexion. Veuillez réessayer.',
            paymentError: 'Erreur lors de la création du paiement',
            total: 'Total'
        },
        en: {
            heroTitle: 'Your Cart',
            heroSubtitle: 'Complete your flight and gift voucher order',
            giftNotice: 'Gift Voucher Purchase:',
            giftNoticeText: 'Your order validates a pre-payment without a fixed date. To book your slot or to fly together with others (simultaneous flights available in summer), call Jean-Philippe at',
            giftNoticeEnd: 'before or after your purchase to choose the ideal day together based on weather.',
            emptyCart: 'Your cart is empty',
            emptyCartText: 'Add a flight to start your adventure!',
            viewFormulas: 'View formulas',
            availableOptions: 'Available options:',
            acrobatie: 'Acrobatics',
            pilotage: 'Piloting Introduction',
            video: 'Photos & Videos',
            clearCart: 'Clear cart',
            summary: 'Summary',
            contraindications: 'Important contraindications',
            contraPregnant: 'Activity prohibited for pregnant women.',
            contraHandicap: 'No qualification to fly people with disabilities (PMR).',
            pay: 'Pay',
            redirecting: 'Redirecting...',
            securePayment: '🔒 Secure payment by Stripe',
            connectionError: 'Connection error. Please try again.',
            paymentError: 'Error creating payment',
            total: 'Total'
        }
    }[language];

    const handleCheckout = async () => {
        if (items.length === 0) return;

        setIsCheckingOut(true);
        setError('');

        try {
            const lineItems = items.map(item => ({
                formulaId: item.formulaId,
                formulaName: item.formulaName,
                price: item.price,
                options: item.options,
                quantity: item.quantity
            }));

            const response = await fetch('/api/checkout/cart', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ items: lineItems }),
            });

            const data = await response.json();

            if (data.url) {
                window.location.href = data.url;
            } else {
                setError(data.error || t.paymentError);
            }
        } catch {
            setError(t.connectionError);
        } finally {
            setIsCheckingOut(false);
        }
    };

    const availableOptions = [
        { id: 'acrobatie', name: t.acrobatie, price: 10 },
        { id: 'pilotage', name: t.pilotage, price: 10 },
        { id: 'video', name: t.video, price: 30 },
    ];

    return (
        <div className={styles.page}>
            {/* Hero */}
            <section className={styles.hero}>
                <div className={styles.heroBackground}>
                    <Image
                        src="/gallery/G0100428-1024x768.jpg"
                        alt={t.heroTitle}
                        fill
                        priority
                        className={styles.heroImage}
                    />
                    <div className={styles.heroOverlay}></div>
                </div>
                <div className={styles.heroContent}>
                    <h1 className={styles.heroTitle}>{t.heroTitle}</h1>
                    <p className={styles.heroSubtitle}>
                        {t.heroSubtitle}
                    </p>
                </div>
            </section>

            <div className={styles.container}>

                {/* Notice consolidée */}
                <div className={styles.importantNotice}>
                    <div className={styles.noticeIcon}>🎁</div>
                    <div>
                        <p>
                            <strong>{t.giftNotice}</strong> {t.giftNoticeText}{' '}
                            <a href={siteConfig.phoneLink} className={styles.inlinePhone}>
                                {siteConfig.phone}
                            </a>{' '}
                            {t.giftNoticeEnd}
                        </p>
                    </div>
                </div>

                {items.length === 0 ? (
                    <div className={styles.emptyCart}>
                        <div className={styles.emptyIcon}>🎈</div>
                        <h2>{t.emptyCart}</h2>
                        <p>{t.emptyCartText}</p>
                        <Link href="/tarifs" className="btn btn-primary btn-lg">
                            {t.viewFormulas}
                        </Link>
                    </div>
                ) : (
                    <>
                        <div className={styles.cartGrid}>
                            <div className={styles.cartItems}>
                                {items.map(item => {
                                    const optionsTotal = item.options.reduce((s, o) => s + o.price, 0);
                                    const itemTotal = (item.price + optionsTotal) * item.quantity;

                                    return (
                                        <div key={item.id} className={styles.cartItem}>
                                            <div className={styles.itemInfo}>
                                                <h3>{item.formulaName}</h3>
                                                <p className={styles.itemDuration}>{item.duration}</p>

                                                {/* Options toggle */}
                                                <div className={styles.optionsSection}>
                                                    <span className={styles.optionsLabel}>{t.availableOptions}</span>
                                                    <div className={styles.optionsList}>
                                                        {availableOptions.map(opt => {
                                                            const isSelected = item.options.some(o => o.id === opt.id);
                                                            return (
                                                                <label key={opt.id} className={`${styles.optionCheckbox} ${isSelected ? styles.optionSelected : ''}`}>
                                                                    <input
                                                                        type="checkbox"
                                                                        checked={isSelected}
                                                                        onChange={() => toggleOption(item.id, opt)}
                                                                    />
                                                                    <span>{opt.name} (+{opt.price}€)</span>
                                                                </label>
                                                            );
                                                        })}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className={styles.itemActions}>
                                                <div className={styles.quantityControl}>
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                        className={styles.qtyBtn}
                                                    >
                                                        −
                                                    </button>
                                                    <span className={styles.quantity}>{item.quantity}</span>
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                        className={styles.qtyBtn}
                                                    >
                                                        +
                                                    </button>
                                                </div>
                                                <div className={styles.itemPrice}>{itemTotal}€</div>
                                                <button
                                                    onClick={() => removeItem(item.id)}
                                                    className={styles.removeBtn}
                                                    aria-label="Remove"
                                                >
                                                    ✕
                                                </button>
                                            </div>
                                        </div>
                                    );
                                })}

                                <button onClick={clearCart} className={styles.clearBtn}>
                                    {t.clearCart}
                                </button>
                            </div>

                            <div className={styles.cartSummary}>
                                <h2>{t.summary}</h2>

                                <div className={styles.summaryLines}>
                                    {items.map(item => {
                                        const optionsTotal = item.options.reduce((s, o) => s + o.price, 0);
                                        return (
                                            <div key={item.id} className={styles.summaryLine}>
                                                <span>{item.formulaName} × {item.quantity}</span>
                                                <span>{(item.price + optionsTotal) * item.quantity}€</span>
                                            </div>
                                        );
                                    })}
                                </div>

                                <div className={styles.totalLine}>
                                    <span>{t.total}</span>
                                    <span className={styles.totalPrice}>{totalPrice}€</span>
                                </div>

                                <div className={styles.contraindications}>
                                    <div className={styles.contraHeader}>
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"></path>
                                            <path d="M12 9v4"></path>
                                            <path d="M12 17h.01"></path>
                                        </svg>
                                        {t.contraindications}
                                    </div>
                                    <ul className={styles.contraList}>
                                        <li><strong>{t.contraPregnant}</strong></li>
                                        <li><strong>{t.contraHandicap}</strong></li>
                                    </ul>
                                </div>

                                {error && <div className={styles.error}>{error}</div>}

                                <button
                                    onClick={handleCheckout}
                                    disabled={isCheckingOut}
                                    className="btn btn-primary btn-lg"
                                    style={{ width: '100%' }}
                                >
                                    {isCheckingOut ? t.redirecting : `${t.pay} ${totalPrice}€`}
                                </button>

                                <p className={styles.secureNote}>{t.securePayment}</p>


                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
