'use client';

import { useState } from 'react';
import styles from './VideoCarousel.module.css';

interface VideoCarouselProps {
    videos: string[];
}

export default function VideoCarousel({ videos }: VideoCarouselProps) {
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleVideoEnd = () => {
        const nextIndex = (currentIndex + 1) % videos.length;
        setCurrentIndex(nextIndex);
    };

    return (
        <div className={styles.carouselContainer}>
            <video
                key={currentIndex} // Force re-render on video change to avoid play() race conditions
                className={styles.video}
                src={videos[currentIndex]}
                autoPlay
                muted
                playsInline
                onEnded={handleVideoEnd}
                controls={false}
            />
            {/* Optional: Add indicators or controls if needed */}
            <div className={styles.indicators}>
                {videos.map((_, index) => (
                    <span
                        key={index}
                        className={`${styles.indicator} ${index === currentIndex ? styles.active : ''}`}
                        onClick={() => setCurrentIndex(index)}
                    />
                ))}
            </div>
        </div>
    );
}
