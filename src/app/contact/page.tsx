'use client';

import Image from 'next/image';
import { siteConfig } from '@/data/site-config';
import { useLanguage } from '@/context/LanguageContext';
import styles from './page.module.css';

export default function ContactPage() {
    const { t } = useLanguage();

    return (
        <div className={styles.page}>
            {/* Hero */}
            <section className={styles.hero}>
                <div className={styles.heroBackground}>
                    <Image
                        src="/bapteme-hero.png"
                        alt="Contact Parapente Adventure"
                        fill
                        priority
                        className={styles.heroImage}
                    />
                    <div className={styles.heroOverlay}></div>
                </div>
                <div className={styles.heroContent}>
                    <h1 className={styles.title}>{t.contact.title}</h1>
                    <p className={styles.subtitle}>
                        {t.contact.subtitle}
                    </p>
                </div>
            </section>

            {/* Main Content */}
            <section className={styles.main}>
                <div className={styles.container}>
                    <div className={styles.grid}>
                        {/* About Section */}
                        <div className={styles.about}>
                            <div className={styles.profileImage}>
                                <Image
                                    src="/jean-phi.jpg"
                                    alt="Jean-Philippe Gayon"
                                    width={200}
                                    height={200}
                                    className={styles.avatar}
                                />
                            </div>
                            <h2>{siteConfig.owner.name}</h2>
                            <p className={styles.titles}>
                                {t.contact.instructor}<br />
                                {t.contact.instructorParamotor}
                            </p>
                            <div className={styles.experience}>
                                <span className={styles.experienceNumber}>25+</span>
                                <span className={styles.experienceText}>{t.contact.yearsExp}</span>
                            </div>
                            <p className={styles.bio}>
                                {t.contact.bio}
                            </p>
                            <div className={styles.languages}>
                                <span>🇫🇷 Français</span>
                                <span>🇬🇧 English spoken</span>
                            </div>
                        </div>

                        {/* Contact Info */}
                        <div className={styles.contactInfo}>
                            <h3>{t.contact.myContact}</h3>

                            <div className={styles.contactCards}>
                                <a href={siteConfig.phoneLink} className={styles.contactCard}>
                                    <div className={styles.contactIcon}>📞</div>
                                    <div className={styles.contactDetails}>
                                        <span className={styles.contactLabel}>{t.contact.phone}</span>
                                        <span className={styles.contactValue}>{siteConfig.phone}</span>
                                    </div>
                                </a>

                                <a href={`mailto:${siteConfig.email}`} className={styles.contactCard}>
                                    <div className={styles.contactIcon}>✉️</div>
                                    <div className={styles.contactDetails}>
                                        <span className={styles.contactLabel}>{t.contact.email}</span>
                                        <span className={styles.contactValue}>{siteConfig.email}</span>
                                    </div>
                                </a>

                                <div className={styles.contactCard}>
                                    <div className={styles.contactIcon}>📍</div>
                                    <div className={styles.contactDetails}>
                                        <span className={styles.contactLabel}>{t.contact.location}</span>
                                        <span className={styles.contactValue}>
                                            {siteConfig.location.city}<br />
                                            {siteConfig.location.valley}, {siteConfig.location.region}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Quick CTA */}
                            <div className={styles.quickCta}>
                                <p>{t.contact.readyToBook}</p>
                                <a href="/tarifs" className="btn btn-primary btn-lg">
                                    {t.contact.bookNow}
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Map Section */}
            <section className={styles.mapSection}>
                <div className={styles.container}>
                    <h3 className={styles.mapTitle}>{t.contact.whereToFind}</h3>
                    <p className={styles.mapSubtitle}>
                        {t.contact.flightsFrom}
                    </p>
                    <div className={styles.mapWrapper}>
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d45916.09270746087!2d6.2833!3d44.6883!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12cc9d26f7a8d6d7%3A0x40819a5fd979c20!2sOrci%C3%A8res%2C%20France!5e0!3m2!1sfr!2sfr!4v1700000000000!5m2!1sfr!2sfr"
                            width="100%"
                            height="400"
                            style={{ border: 0 }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Carte Orcières Merlette"
                            className={styles.map}
                        ></iframe>
                    </div>
                </div>
            </section>
        </div>
    );
}
