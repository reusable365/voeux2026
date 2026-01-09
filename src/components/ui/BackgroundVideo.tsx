"use client";

import { useEffect, useRef, useState } from "react";

export default function BackgroundVideo() {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
        const video = videoRef.current;
        if (video) {
            // Function to set random time
            const setRandomTime = () => {
                if (video.duration > 0) {
                    video.currentTime = Math.random() * video.duration;
                }
            };

            // If metadata is already loaded, set time immediately
            if (video.readyState >= 1) {
                setRandomTime();
            }
        }
    }, []);

    const handleLoadedMetadata = (e: React.SyntheticEvent<HTMLVideoElement, Event>) => {
        const video = e.currentTarget;
        // Set random time when metadata loads (if not already set)
        if (video.duration > 0 && video.currentTime < 0.1) {
            video.currentTime = Math.random() * video.duration;
        }
    };

    if (!isMounted) return null;

    return (
        <div className="absolute inset-0 w-full h-full overflow-hidden z-0 pointer-events-none">
            <video
                ref={videoRef}
                autoPlay
                muted
                loop
                playsInline
                onLoadedMetadata={handleLoadedMetadata}
                className="absolute top-1/2 left-1/2 min-w-full min-h-full object-cover -translate-x-1/2 -translate-y-1/2 brightness-50 backdrop-blur-[2px] opacity-80"
            >
                {/* 
                  IMPORTANT: Le fichier doit être dans public/Media/video_background.mp4
                  Si le fichier est manquant, le fond restera noir/transparent.
                */}
                <source src="/Media/video_background.mp4" type="video/mp4" />
                Votre navigateur ne supporte pas la vidéo.
            </video>

            {/* Gradient overlay for better text readability */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/30 to-black" />
        </div>
    );
}
