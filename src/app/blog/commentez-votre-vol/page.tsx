import { Metadata } from 'next';
import Link from 'next/link';
import { siteConfig } from '@/data/site-config';
import styles from './page.module.css';

export const metadata: Metadata = {
    title: 'Commentez votre vol | Partagez votre expérience',
    description: 'Partagez votre expérience de vol en parapente avec Parapente Adventure. Laissez un avis et aidez les futurs passagers à découvrir cette aventure.',
};

export default function CommentPage() {
    return (
        <div className={styles.page}>
            {/* Hero */}
            <section className={styles.hero}>
                <div className={styles.heroContent}>
                    <h1 className={styles.title}>PARTAGEZ VOTRE EXPÉRIENCE</h1>
                    <p className={styles.subtitle}>
                        Vous avez volé avec nous ? Racontez votre aventure !
                    </p>
                </div>
            </section>

            {/* Comment Options */}
            <section className={styles.options}>
                <div className={styles.container}>
                    <h2 className={styles.sectionTitle}>Laissez votre avis</h2>
                    <p className={styles.sectionSubtitle}>
                        Choisissez votre plateforme préférée pour partager votre expérience
                    </p>

                    <div className={styles.optionsGrid}>
                        {/* Google Reviews */}
                        <a
                            href="https://www.google.com/search?q=parapente+adventure+orcieres+avis"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.optionCard}
                        >
                            <div className={styles.optionIcon}>⭐</div>
                            <h3>Google Avis</h3>
                            <p>Laissez un avis sur Google pour aider les futurs passagers</p>
                            <span className={styles.optionBtn}>Laisser un avis →</span>
                        </a>

                        {/* TripAdvisor */}
                        <a
                            href="https://www.tripadvisor.fr/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.optionCard}
                        >
                            <div className={styles.optionIcon}>🦉</div>
                            <h3>TripAdvisor</h3>
                            <p>Partagez votre expérience avec la communauté de voyageurs</p>
                            <span className={styles.optionBtn}>Écrire un avis →</span>
                        </a>

                        {/* Email */}
                        <a
                            href={`mailto:${siteConfig.email}?subject=Mon expérience de vol`}
                            className={styles.optionCard}
                        >
                            <div className={styles.optionIcon}>✉️</div>
                            <h3>Par Email</h3>
                            <p>Envoyez-nous directement votre témoignage et vos photos</p>
                            <span className={styles.optionBtn}>Envoyer un email →</span>
                        </a>
                    </div>

                    {/* Call to Action */}
                    <div className={styles.cta}>
                        <p>Une question sur votre vol ?</p>
                        <a href={siteConfig.phoneLink} className={styles.phone}>
                            📞 {siteConfig.phone}
                        </a>
                    </div>

                    {/* Back Link */}
                    <div className={styles.backLink}>
                        <Link href="/blog">← Retour au blog</Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
