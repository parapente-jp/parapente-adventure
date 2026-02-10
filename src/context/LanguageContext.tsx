'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language, translations } from '@/data/translations';

type LanguageContextType = {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: any;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
    const [language, setLanguage] = useState<Language>('fr');
    const [isInitialized, setIsInitialized] = useState(false);

    // Load language from localStorage if available
    useEffect(() => {
        const savedLang = localStorage.getItem('language') as Language;
        if (savedLang && (savedLang === 'fr' || savedLang === 'en')) {
            setLanguage(savedLang);
        }
        setIsInitialized(true);
    }, []);

    const handleSetLanguage = (lang: Language) => {
        setLanguage(lang);
        localStorage.setItem('language', lang);
    };

    const t = translations[language];

    return (
        <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
            {isInitialized ? children : <div style={{ opacity: 0 }}>{children}</div>}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
}
