'use client';

import Link from 'next/link';
import { siteConfig } from '@/data/site-config';
import styles from '../success/page.module.css';

export default function ReservationCancelPage() {
    return (
        <div className={styles.page}>
            <div className={styles.container}>
                <div className={styles.content}>
                    <div className={styles.iconCancel}>✕</div>
                    <h1>Paiement annulé</h1>
                    <p className={styles.intro}>
                        Votre paiement a été annulé. Aucun montant n&apos;a été débité.
                    </p>

                    <div className={styles.card}>
                        <h2>🤔 Un problème ?</h2>
                        <p>Plusieurs raisons peuvent expliquer cette annulation :</p>
                        <ul className={styles.reasonsList}>
                            <li>
                                <span>🔄</span>
                                <span>Vous avez changé d&apos;avis sur la formule</span>
                            </li>
                            <li>
                                <span>📅</span>
                                <span>Vous souhaitez vérifier vos disponibilités</span>
                            </li>
                            <li>
                                <span>💳</span>
                                <span>Problème avec votre moyen de paiement</span>
                            </li>
                        </ul>
                    </div>

                    <div className={styles.card}>
                        <h2>💰 Paiement sur place</h2>
                        <p>
                            Vous pouvez aussi réserver par téléphone et payer directement sur place.
                            Nous acceptons :
                        </p>
                        <ul>
                            <li>Espèces</li>
                            <li>Chèques</li>
                            <li>Chèques vacances</li>
                            <li>Wero</li>
                        </ul>
                    </div>

                    <div className={styles.card}>
                        <h2>📞 Contactez-nous</h2>
                        <p>Jean-Philippe est disponible pour répondre à vos questions :</p>
                        <a href={siteConfig.phoneLink} className={styles.phoneLink}>
                            {siteConfig.phone}
                        </a>
                        <span className={styles.note}>English spoken</span>
                    </div>

                    <div className={styles.actions}>
                        <Link href="/planning" className="btn btn-primary btn-lg">
                            Réessayer la réservation
                        </Link>
                        <Link href="/" className="btn btn-outline">
                            Retour à l&apos;accueil
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
