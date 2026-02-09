'use client';

import { useState, useRef } from 'react';
import { useAdminAuth } from '@/context/AdminAuthContext';
import styles from './page.module.css';

const CATEGORIES = [
    { id: 'ete', label: 'Photos Été', icon: '☀️' },
    { id: 'hiver', label: 'Photos Hiver', icon: '❄️' },
    { id: 'paysage', label: 'Paysages', icon: '🏔️' },
    { id: 'video', label: 'Vidéos', icon: '🎬' },
];

export default function AdminPhotosPage() {
    const { isAuthenticated } = useAdminAuth();
    const [selectedCategory, setSelectedCategory] = useState('ete');
    const [uploading, setUploading] = useState(false);
    const [message, setMessage] = useState('');
    const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleUpload = async (files: FileList | null) => {
        if (!files || files.length === 0) return;

        setUploading(true);
        setMessage('');
        const newFiles: string[] = [];

        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const formData = new FormData();
            formData.append('file', file);
            formData.append('category', selectedCategory);

            try {
                const res = await fetch('/api/upload', {
                    method: 'POST',
                    body: formData,
                });

                if (res.ok) {
                    const data = await res.json();
                    newFiles.push(data.path);
                } else {
                    setMessage(`❌ Erreur: ${file.name}`);
                }
            } catch {
                setMessage(`❌ Erreur upload: ${file.name}`);
            }
        }

        if (newFiles.length > 0) {
            setUploadedFiles(prev => [...newFiles, ...prev]);
            setMessage(`✅ ${newFiles.length} fichier(s) téléversé(s)`);
        }

        setUploading(false);
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        handleUpload(e.dataTransfer.files);
    };

    if (!isAuthenticated) {
        return (
            <div className={styles.page}>
                <div className={styles.accessDenied}>
                    <p>🔒 Accès refusé</p>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.page}>
            <div className={styles.container}>
                <h1 className={styles.title}>📸 Gestion Galerie</h1>

                <div className={styles.categoryGrid}>
                    {CATEGORIES.map(cat => (
                        <button
                            key={cat.id}
                            className={`${styles.categoryBtn} ${selectedCategory === cat.id ? styles.active : ''}`}
                            onClick={() => setSelectedCategory(cat.id)}
                        >
                            <span className={styles.categoryIcon}>{cat.icon}</span>
                            <span>{cat.label}</span>
                        </button>
                    ))}
                </div>

                <div
                    className={styles.dropZone}
                    onDrop={handleDrop}
                    onDragOver={(e) => e.preventDefault()}
                    onClick={() => fileInputRef.current?.click()}
                >
                    <input
                        ref={fileInputRef}
                        type="file"
                        multiple
                        accept="image/*,video/*"
                        onChange={(e) => handleUpload(e.target.files)}
                        style={{ display: 'none' }}
                    />
                    {uploading ? (
                        <div className={styles.uploading}>
                            <div className={styles.spinner}></div>
                            <p>Téléversement en cours...</p>
                        </div>
                    ) : (
                        <>
                            <div className={styles.dropIcon}>📤</div>
                            <p className={styles.dropText}>
                                Glissez vos {selectedCategory === 'video' ? 'vidéos' : 'photos'} ici
                            </p>
                            <p className={styles.dropHint}>ou cliquez pour sélectionner</p>
                        </>
                    )}
                </div>

                {message && <div className={styles.message}>{message}</div>}

                {uploadedFiles.length > 0 && (
                    <div className={styles.recentSection}>
                        <h2>Fichiers téléversés</h2>
                        <div className={styles.recentGrid}>
                            {uploadedFiles.slice(0, 8).map((path, i) => (
                                <div key={i} className={styles.recentItem}>
                                    {path.match(/\.(mp4|mov|webm)$/i) ? (
                                        <video src={path} className={styles.recentMedia} />
                                    ) : (
                                        // eslint-disable-next-line @next/next/no-img-element
                                        <img src={path} alt="" className={styles.recentMedia} />
                                    )}
                                    <span className={styles.recentPath}>{path.split('/').pop()}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
