'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

type Season = 'ete' | 'hiver';

interface SeasonContextType {
    season: Season;
    setSeason: (season: Season) => void;
}

const SeasonContext = createContext<SeasonContextType | undefined>(undefined);

export function SeasonProvider({ children }: { children: React.ReactNode }) {
    const [season, setSeason] = useState<Season>('ete');

    useEffect(() => {
        document.documentElement.classList.remove('ete-mode', 'hiver-mode');
        document.documentElement.classList.add(`${season}-mode`);
    }, [season]);

    return (
        <SeasonContext.Provider value={{ season, setSeason }}>
            <div className={season === 'ete' ? 'ete-mode' : 'hiver-mode'}>
                {children}
            </div>
        </SeasonContext.Provider>
    );
}

export function useSeason() {
    const context = useContext(SeasonContext);
    if (context === undefined) {
        throw new Error('useSeason must be used within a SeasonProvider');
    }
    return context;
}
