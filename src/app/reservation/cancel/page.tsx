'use client';

import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { siteConfig } from '@/data/site-config';
import styles from '../success/page.module.css';

export default function ReservationCancelPage() {
    const { t } = useLanguage();
    const cancelT = t.reservation.cancel;

    return (
        <div className={styles.page}>
            <div className={styles.container}>
                <div className={styles.content}>
                    <div className={styles.iconCancel}>✕</div>
                    <h1>{cancelT.title}</h1>
                    <p className={styles.intro}>
                        {cancelT.subtitle}
                    </p>

                    <div className={styles.card}>
                        <h2>{cancelT.problem}</h2>
                        <p>{cancelT.reasonsTitle}</p>
                        <ul className={styles.reasonsList}>
                            <li>
                                <span>🔄</span>
                                <span>{cancelT.reason1}</span>
                            </li>
                            <li>
                                <span>📅</span>
                                <span>{cancelT.reason2}</span>
                            </li>
                            <li>
                                <span>💳</span>
                                <span>{cancelT.reason3}</span>
                            </li>
                        </ul>
                    </div>

                    <div className={styles.card}>
                        <h2>{cancelT.payOnSite}</h2>
                        <p>
                            {cancelT.payOnSiteText}
                        </p>
                        <ul>
                            <li>Espèces</li>
                            <li>Chèques</li>
                            <li>Chèques vacances</li>
                            <li>Wero</li>
                        </ul>
                    </div>

                    <div className={styles.card}>
                        <h2>{cancelT.contactUs}</h2>
                        <p>{cancelT.contactText}</p>
                        <a href={siteConfig.phoneLink} className={styles.phoneLink}>
                            {siteConfig.phone}
                        </a>
                        <span className={styles.note}>{cancelT.englishSpoken}</span>
                    </div>

                    <div className={styles.actions}>
                        <Link href="/planning" className="btn btn-primary btn-lg">
                            {cancelT.retry}
                        </Link>
                        <Link href="/" className="btn btn-outline">
                            {cancelT.backHome}
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
