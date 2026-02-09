'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { Html5Qrcode } from 'html5-qrcode';
import { useAdminAuth } from '@/context/AdminAuthContext';
import styles from './page.module.css';

interface Ticket {
    id: string;
    formula: string;
    options: string[];
    price: number;
    customerName: string;
    customerEmail: string;
    createdAt: string;
    validUntil: string;
    status: 'active' | 'used' | 'expired';
    usedAt?: string;
}

interface ScanResult {
    valid: boolean;
    message: string;
    ticket?: Ticket;
}

export default function AdminScannerPage() {
    const { isAuthenticated } = useAdminAuth();
    const [scanResult, setScanResult] = useState<ScanResult | null>(null);
    const [isScanning, setIsScanning] = useState(false);
    const [isValidating, setIsValidating] = useState(false);
    const [manualId, setManualId] = useState('');
    const [cameraError, setCameraError] = useState<string | null>(null);
    const scannerRef = useRef<Html5Qrcode | null>(null);
    const isInitializing = useRef(false);

    const checkTicket = useCallback(async (ticketId: string) => {
        try {
            const response = await fetch(`/api/tickets/validate?ticketId=${encodeURIComponent(ticketId)}`);
            const data = await response.json();
            setScanResult(data);
        } catch (error) {
            console.error('Error checking ticket:', error);
            setScanResult({ valid: false, message: 'Erreur de connexion' });
        }
    }, []);

    const stopScanner = useCallback(async () => {
        if (scannerRef.current) {
            try {
                await scannerRef.current.stop();
            } catch (e) {
                console.log('Scanner already stopped', e);
            }
            scannerRef.current = null;
        }
    }, []);

    const startScanner = useCallback(async () => {
        if (isInitializing.current) return;
        isInitializing.current = true;
        setCameraError(null);

        try {
            await stopScanner();

            const html5QrCode = new Html5Qrcode('qr-reader');
            scannerRef.current = html5QrCode;

            await html5QrCode.start(
                { facingMode: 'environment' },
                {
                    fps: 10,
                    qrbox: { width: 250, height: 250 },
                },
                async (decodedText) => {
                    await stopScanner();
                    setIsScanning(false);
                    await checkTicket(decodedText);
                },
                () => { }
            );
        } catch (err) {
            console.error('Camera error:', err);
            setCameraError('Impossible d\'accéder à la caméra. Utilisez la saisie manuelle.');
            setIsScanning(false);
        } finally {
            isInitializing.current = false;
        }
    }, [checkTicket, stopScanner]);

    useEffect(() => {
        if (isAuthenticated && isScanning) {
            startScanner();
        }
        return () => { stopScanner(); };
    }, [isAuthenticated, isScanning, startScanner, stopScanner]);

    const handleValidate = async () => {
        if (!scanResult?.ticket) return;
        setIsValidating(true);
        try {
            const response = await fetch('/api/tickets/validate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ticketId: scanResult.ticket.id })
            });
            const data = await response.json();
            setScanResult(data);
        } catch (error) {
            console.error('Error validating ticket:', error);
            alert('Erreur lors de la validation');
        }
        setIsValidating(false);
    };

    const handleManualCheck = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!manualId.trim()) return;
        await checkTicket(manualId.trim().toUpperCase());
        setManualId('');
    };

    const resetScanner = () => {
        setScanResult(null);
        setCameraError(null);
    };

    if (!isAuthenticated) {
        return (
            <div className={styles.page}>
                <div className={styles.accessDenied}>
                    <p>🔒 Accès refusé. Connectez-vous d&apos;abord.</p>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.page}>
            <div className={styles.container}>
                <h1>🎫 Scanner de Billets</h1>

                <form onSubmit={handleManualCheck} className={styles.manualEntry}>
                    <input
                        type="text"
                        value={manualId}
                        onChange={(e) => setManualId(e.target.value)}
                        placeholder="ID du billet (TKT-XXXXXXXX)"
                        className={styles.manualInput}
                    />
                    <button type="submit" className={styles.checkButton}>
                        Vérifier
                    </button>
                </form>

                {!scanResult && (
                    <div className={styles.scannerArea}>
                        {!isScanning ? (
                            <button
                                onClick={() => setIsScanning(true)}
                                className={styles.startScanButton}
                            >
                                📷 Démarrer la caméra
                            </button>
                        ) : (
                            <>
                                <div id="qr-reader" className={styles.qrReader}></div>
                                <p className={styles.scanHint}>Placez le QR code devant la caméra</p>
                                <button
                                    onClick={() => { stopScanner(); setIsScanning(false); }}
                                    className={styles.stopButton}
                                >
                                    ✕ Arrêter
                                </button>
                            </>
                        )}
                        {cameraError && (
                            <div className={styles.cameraError}>
                                <p>⚠️ {cameraError}</p>
                            </div>
                        )}
                    </div>
                )}

                {scanResult && (
                    <div className={`${styles.resultCard} ${scanResult.valid ? styles.valid : styles.invalid}`}>
                        <div className={styles.resultIcon}>
                            {scanResult.valid ? '✅' : '❌'}
                        </div>
                        <h2>{scanResult.message}</h2>

                        {scanResult.ticket && (
                            <div className={styles.ticketDetails}>
                                <div className={styles.detailRow}>
                                    <span>Référence</span>
                                    <strong>{scanResult.ticket.id}</strong>
                                </div>
                                <div className={styles.detailRow}>
                                    <span>Formule</span>
                                    <strong>{scanResult.ticket.formula}</strong>
                                </div>
                                <div className={styles.detailRow}>
                                    <span>Client</span>
                                    <strong>{scanResult.ticket.customerName}</strong>
                                </div>
                                <div className={styles.detailRow}>
                                    <span>Prix</span>
                                    <strong>{scanResult.ticket.price} €</strong>
                                </div>
                                <div className={styles.detailRow}>
                                    <span>Statut</span>
                                    <strong className={styles[scanResult.ticket.status]}>
                                        {scanResult.ticket.status === 'active' ? '✅ Actif' :
                                            scanResult.ticket.status === 'used' ? '⚠️ Utilisé' : '❌ Expiré'}
                                    </strong>
                                </div>
                                {scanResult.ticket.usedAt && (
                                    <div className={styles.detailRow}>
                                        <span>Utilisé le</span>
                                        <strong>{new Date(scanResult.ticket.usedAt).toLocaleString('fr-FR')}</strong>
                                    </div>
                                )}
                            </div>
                        )}

                        <div className={styles.resultActions}>
                            {scanResult.valid && scanResult.ticket?.status === 'active' && (
                                <button
                                    onClick={handleValidate}
                                    disabled={isValidating}
                                    className={styles.validateButton}
                                >
                                    {isValidating ? 'Validation...' : '✓ Valider ce billet'}
                                </button>
                            )}
                            <button onClick={resetScanner} className={styles.newScanButton}>
                                🔄 Nouveau scan
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
