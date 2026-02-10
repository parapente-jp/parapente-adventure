'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { siteConfig } from '@/data/site-config';
import { generateTicketPDF } from '@/utils/generateTicketPDF';
import styles from './page.module.css';

interface TicketData {
    id: string;
    formula: string;
    options: string[];
    price: number;
    customerName: string;
    createdAt: string;
    validUntil: string;
}

function SuccessContent() {
    const searchParams = useSearchParams();
    const sessionId = searchParams.get('session_id');
    const [isLoading, setIsLoading] = useState(true);
    const [ticket, setTicket] = useState<TicketData | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
    const { t, language } = useLanguage();
    const successT = t.reservation.success;

    useEffect(() => {
        async function createOrGetTicket() {
            if (!sessionId) {
                setIsLoading(false);
                return;
            }

            try {
                // Try to create/get ticket
                const response = await fetch('/api/tickets', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        stripeSessionId: sessionId
                    })
                });

                if (response.ok) {
                    const data = await response.json();
                    if (data.ticket) {
                        setTicket(data.ticket);
                    } else {
                        console.error('Ticket not found in response');
                        setError(successT.errorNotFound);
                    }
                } else {
                    const errorData = await response.json();
                    console.error('Ticket API error:', errorData.error);
                    setError(`${successT.errorTechnical} : ${errorData.error}`);
                }
            } catch (error: any) {
                console.error('Error creating ticket:', error);
                setError(`${successT.errorConnection} : ${error.message}`);
            } finally {
                setIsLoading(false);
            }
        }

        createOrGetTicket();
    }, [sessionId, successT]);

    const handleDownloadPDF = async () => {
        if (!ticket) return;
        setIsGeneratingPDF(true);
        try {
            await generateTicketPDF(ticket, language);
        } catch (error) {
            console.error('Error generating PDF:', error);
            alert(successT.errorPDF);
        }
        setIsGeneratingPDF(false);
    };

    if (isLoading) {
        return (
            <div className={styles.loading}>
                <div className={styles.spinner}></div>
                <p>{successT.confirming}</p>
            </div>
        );
    }

    const locale = language === 'fr' ? 'fr-FR' : 'en-GB';

    return (
        <div className={styles.content}>
            <div className={styles.iconSuccess}>✓</div>
            <h1>{successT.title}</h1>
            <p className={styles.intro}>
                {successT.thanks}. {successT.thanksSubtitle}
            </p>

            {error && (
                <div className={styles.errorBanner}>
                    <p>⚠️ {error}</p>
                </div>
            )}

            {/* Warning Box - IMPORTANT */}
            <div className={styles.warningBox}>
                <div className={styles.warningIcon}>⚠️</div>
                <div className={styles.warningContent}>
                    <h3>{successT.actionRequired}</h3>
                    <p>
                        <strong>{successT.warning}</strong>
                    </p>
                    <p>
                        {successT.warningText}
                    </p>
                    <a href={siteConfig.phoneLink} className={styles.callButton}>
                        📞 {successT.callNow} : {siteConfig.phone}
                    </a>
                </div>
            </div>

            {/* Ticket Download */}
            {ticket && (
                <div className={styles.card}>
                    <h2>🎫 {successT.yourTicket}</h2>
                    <p>{successT.reference} : <strong>{ticket.id}</strong></p>
                    <p>{successT.validUntil} : <strong>{new Date(ticket.validUntil).toLocaleDateString(locale)}</strong></p>
                    <button
                        onClick={handleDownloadPDF}
                        disabled={isGeneratingPDF}
                        className={styles.downloadButton}
                    >
                        {isGeneratingPDF ? successT.generating : `📄 ${successT.downloadTicket}`}
                    </button>
                </div>
            )}



            <div className={styles.actions}>
                <Link href="/" className="btn btn-primary btn-lg">
                    {successT.backHome}
                </Link>
            </div>

            {sessionId && (
                <p className={styles.reference}>
                    {successT.paymentReference} : {sessionId.slice(-8).toUpperCase()}
                </p>
            )}
        </div>
    );
}

export default function ReservationSuccessPage() {
    const { t, language } = useLanguage();
    const successT = t.reservation.success;

    return (
        <div className={styles.page}>
            <div className={styles.container}>
                <Suspense fallback={
                    <div className={styles.loading}>
                        <div className={styles.spinner}></div>
                        <p>{successT.confirming}</p>
                    </div>
                }>
                    <SuccessContent key={language} />
                </Suspense>
            </div>
        </div>
    );
}
