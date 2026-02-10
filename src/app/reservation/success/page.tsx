'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
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
    const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

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
                    setTicket(data.ticket);
                } else {
                    const errorData = await response.json();
                    console.error('Ticket API error:', errorData.error);
                }
            } catch (error) {
                console.error('Error creating ticket:', error);
            }

            setIsLoading(false);
        }

        createOrGetTicket();
    }, [sessionId]);

    const handleDownloadPDF = async () => {
        if (!ticket) return;
        setIsGeneratingPDF(true);
        try {
            await generateTicketPDF(ticket);
        } catch (error) {
            console.error('Error generating PDF:', error);
            alert('Erreur lors de la génération du PDF. Veuillez réessayer.');
        }
        setIsGeneratingPDF(false);
    };

    if (isLoading) {
        return (
            <div className={styles.loading}>
                <div className={styles.spinner}></div>
                <p>Confirmation en cours...</p>
            </div>
        );
    }

    return (
        <div className={styles.content}>
            <div className={styles.iconSuccess}>✓</div>
            <h1>Paiement confirmé !</h1>
            <p className={styles.intro}>
                Merci pour votre achat. Votre paiement a bien été reçu.
            </p>

            {/* Warning Box - IMPORTANT */}
            <div className={styles.warningBox}>
                <div className={styles.warningIcon}>⚠️</div>
                <div className={styles.warningContent}>
                    <h3>ACTION REQUISE</h3>
                    <p>
                        <strong>L&apos;achat de ce billet ne constitue PAS une réservation de date de vol.</strong>
                    </p>
                    <p>
                        Vous devez <strong>OBLIGATOIREMENT appeler Jean-Philippe</strong> pour convenir d&apos;une date et d&apos;un horaire de vol.
                    </p>
                    <a href={siteConfig.phoneLink} className={styles.callButton}>
                        📞 Appeler maintenant : {siteConfig.phone}
                    </a>
                </div>
            </div>

            {/* Ticket Download */}
            {ticket && (
                <div className={styles.card}>
                    <h2>🎫 Votre billet</h2>
                    <p>Référence : <strong>{ticket.id}</strong></p>
                    <p>Valable jusqu&apos;au : <strong>{new Date(ticket.validUntil).toLocaleDateString('fr-FR')}</strong></p>
                    <button
                        onClick={handleDownloadPDF}
                        disabled={isGeneratingPDF}
                        className={styles.downloadButton}
                    >
                        {isGeneratingPDF ? 'Génération en cours...' : '📄 Télécharger mon billet PDF'}
                    </button>
                </div>
            )}



            <div className={styles.actions}>
                <Link href="/" className="btn btn-primary btn-lg">
                    Retour à l&apos;accueil
                </Link>
            </div>

            {sessionId && (
                <p className={styles.reference}>
                    Référence paiement : {sessionId.slice(-8).toUpperCase()}
                </p>
            )}
        </div>
    );
}

export default function ReservationSuccessPage() {
    return (
        <div className={styles.page}>
            <div className={styles.container}>
                <Suspense fallback={
                    <div className={styles.loading}>
                        <div className={styles.spinner}></div>
                        <p>Chargement...</p>
                    </div>
                }>
                    <SuccessContent />
                </Suspense>
            </div>
        </div>
    );
}
