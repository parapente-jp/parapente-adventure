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
    const { t, language } = useLanguage();
    const [isCheckingOut, setIsCheckingOut] = useState(false);
    const [error, setError] = useState('');

    const cartT = t.reservation.cart;

    const handleCheckout = async () => {
        if (items.length === 0) return;

        setIsCheckingOut(true);
        setError('');

        try {
            const lineItems = items.map(item => ({
                formulaId: item.formulaId,
                formulaName: translateFormulaName(item.formulaId) || item.formulaName,
                price: item.price,
                options: item.options.map(opt => ({
                    ...opt,
                    name: translateOptionName(opt.id) || opt.name
                })),
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
                setError(data.error || cartT.paymentError);
            }
        } catch {
            setError(cartT.connectionError);
        } finally {
            setIsCheckingOut(false);
        }
    };

    const translateFormulaName = (formulaId: string) => {
        const idToKey: Record<string, { season: 'summer' | 'winter'; key: string }> = {
            'decouverte-ete': { season: 'summer', key: 'decouverte' },
            'ascendances': { season: 'summer', key: 'ascendances' },
            'balade': { season: 'summer', key: 'balade' },
            'decouverte-hiver': { season: 'winter', key: 'decouverte' },
            'promenade-hiver': { season: 'winter', key: 'grandVol' },
        };

        const mapping = idToKey[formulaId];
        // @ts-ignore
        return t.formulaData?.[mapping?.season]?.[mapping?.key]?.name;
    };

    const translateOptionName = (optionId: string) => {
        // @ts-ignore
        return t.formulaData?.options?.[optionId];
    };

    const availableOptions = [
        { id: 'acrobatie', name: cartT.acrobatie, price: 10 },
        { id: 'pilotage', name: cartT.pilotage, price: 10 },
        { id: 'photo-video', name: cartT['photo-video'], price: 30 },
    ];

    return (
        <div className={styles.page}>
            {/* Hero */}
            <section className={styles.hero}>
                <div className={styles.heroBackground}>
                    <Image
                        src="/gallery/G0100428-1024x768.jpg"
                        alt={cartT.heroTitle}
                        fill
                        priority
                        className={styles.heroImage}
                    />
                    <div className={styles.heroOverlay}></div>
                </div>
                <div className={styles.heroContent}>
                    <h1 className={styles.heroTitle}>{cartT.heroTitle}</h1>
                    <p className={styles.heroSubtitle}>
                        {cartT.heroSubtitle}
                    </p>
                </div>
            </section>

            <div className={styles.container}>

                {/* Notice consolidée */}
                <div className={styles.importantNotice}>
                    <div className={styles.noticeIcon}>🎁</div>
                    <div>
                        <p>
                            <strong>{cartT.giftNotice}</strong> {cartT.giftNoticeText}{' '}
                            <a href={siteConfig.phoneLink} className={styles.inlinePhone}>
                                {siteConfig.phone}
                            </a>{' '}
                            {cartT.giftNoticeEnd}
                        </p>
                    </div>
                </div>

                {items.length === 0 ? (
                    <div className={styles.emptyCart}>
                        <div className={styles.emptyIcon}>🎈</div>
                        <h2>{cartT.empty}</h2>
                        <p>{cartT.emptyText}</p>
                        <Link href="/tarifs" className="btn btn-primary btn-lg">
                            {cartT.viewFormulas}
                        </Link>
                    </div>
                ) : (
                    <>
                        <div className={styles.cartGrid}>
                            <div className={styles.cartItems}>
                                {items.map(item => {
                                    const optionsTotal = item.options.reduce((s, o) => s + o.price, 0);
                                    const itemTotal = (item.price + optionsTotal) * item.quantity;
                                    const localizedName = translateFormulaName(item.formulaId) || item.formulaName;

                                    return (
                                        <div key={item.id} className={styles.cartItem}>
                                            <div className={styles.itemInfo}>
                                                <h3>{localizedName}</h3>
                                                <p className={styles.itemDuration}>{item.duration}</p>

                                                {/* Options toggle */}
                                                <div className={styles.optionsSection}>
                                                    <span className={styles.optionsLabel}>{cartT.availableOptions}</span>
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
                                    {cartT.clearCart}
                                </button>
                            </div>

                            <div className={styles.cartSummary}>
                                <h2>{cartT.summary}</h2>

                                <div className={styles.summaryLines}>
                                    {items.map(item => {
                                        const optionsTotal = item.options.reduce((s, o) => s + o.price, 0);
                                        const localizedName = translateFormulaName(item.formulaId) || item.formulaName;
                                        return (
                                            <div key={item.id} className={styles.summaryLine}>
                                                <span>{localizedName} × {item.quantity}</span>
                                                <span>{(item.price + optionsTotal) * item.quantity}€</span>
                                            </div>
                                        );
                                    })}
                                </div>

                                <div className={styles.totalLine}>
                                    <span>{cartT.total}</span>
                                    <span className={styles.totalPrice}>{totalPrice}€</span>
                                </div>

                                <div className={styles.contraindications}>
                                    <div className={styles.contraHeader}>
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"></path>
                                            <path d="M12 9v4"></path>
                                            <path d="M12 17h.01"></path>
                                        </svg>
                                        {cartT.contraindications}
                                    </div>
                                    <ul className={styles.contraList}>
                                        <li><strong>{cartT.contraPregnant}</strong></li>
                                        <li><strong>{cartT.contraHandicap}</strong></li>
                                    </ul>
                                </div>

                                {error && <div className={styles.error}>{error}</div>}

                                <button
                                    onClick={handleCheckout}
                                    disabled={isCheckingOut}
                                    className="btn btn-primary btn-lg"
                                    style={{ width: '100%' }}
                                >
                                    {isCheckingOut ? cartT.redirecting : `${cartT.pay} ${totalPrice}€`}
                                </button>

                                <p className={styles.secureNote}>{cartT.securePayment}</p>


                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
