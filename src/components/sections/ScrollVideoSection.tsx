"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function ScrollVideoSection() {
    const containerRef = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    // Transformation du scroll (0 à 1) vers le temps de la vidéo
    // Note: On suppose une vidéo de ~10-15s ou on normalisera après chargement
    const [videoDuration, setVideoDuration] = useState(0);

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        const handleMetadata = () => {
            setVideoDuration(video.duration);
        };

        video.addEventListener('loadedmetadata', handleMetadata);
        return () => video.removeEventListener('loadedmetadata', handleMetadata);
    }, []);

    // Sync scroll to video time
    // On utilise un useMotionValueEvent pour réagir aux changements de scrollYProgress
    // Cependant, pour la performance, on peut aussi lier directement dans une requestAnimationFrame si besoin.
    // Ici, Framer Motion nous donne une valeur réactive.
    useEffect(() => {
        const unsubscribe = scrollYProgress.on("change", (latest) => {
            if (videoRef.current && videoDuration > 0) {
                // Scrubbing : on définit le currentTime selon le % de scroll
                // On s'assure de ne pas dépasser la durée
                const targetTime = latest * videoDuration;
                // Petites optimisations pour éviter les saccades si possible
                if (Math.abs(videoRef.current.currentTime - targetTime) > 0.1) {
                    videoRef.current.currentTime = targetTime;
                }
            }
        });
        return () => unsubscribe();
    }, [scrollYProgress, videoDuration]);


    return (
        <div ref={containerRef} className="h-[400vh] relative bg-black">
            <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">

                {/* La vidéo "pilotée" */}
                <video
                    ref={videoRef}
                    muted
                    playsInline
                    preload="auto"
                    className="w-full h-full object-cover opacity-60"
                >
                    <source src="/Media/video_narrative.mp4" type="video/mp4" />
                </video>

                {/* Overlays de texte synchronisés avec le scroll - Apparaissent à différents moments */}

                {/* 10% - 30% : Tubes */}
                <Overlay
                    progress={scrollYProgress}
                    range={[0.1, 0.3]}
                    title="30 km de tubes"
                    subtitle="Un réseau sanguin d'acier pour l'énergie"
                    position="bottom-left"
                />

                {/* 40% - 60% : Rendement */}
                <Overlay
                    progress={scrollYProgress}
                    range={[0.4, 0.6]}
                    title="87% de rendement"
                    subtitle="Une performance technique de premier plan"
                    position="center"
                />

                {/* 70% - 90% : Investissement */}
                <Overlay
                    progress={scrollYProgress}
                    range={[0.7, 0.9]}
                    title="100 000 h d'études"
                    subtitle="L'ingénierie au service du durable"
                    position="top-right"
                />

                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50 text-sm animate-pulse">
                    Scrollez pour piloter l'histoire ↕
                </div>
            </div>
        </div>
    );
}

// Sous-composant pour afficher les textes
function Overlay({ progress, range, title, subtitle, position }: {
    progress: any,
    range: [number, number],
    title: string,
    subtitle: string,
    position: "bottom-left" | "center" | "top-right"
}) {
    const opacity = useTransform(progress, [range[0], (range[0] + range[1]) / 2, range[1]], [0, 1, 0]);
    const y = useTransform(progress, [range[0], range[1]], [50, -50]);

    let posClasses = "";
    if (position === "bottom-left") posClasses = "bottom-32 left-8 md:left-32 text-left";
    if (position === "center") posClasses = "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center";
    if (position === "top-right") posClasses = "top-32 right-8 md:right-32 text-right";

    return (
        <motion.div
            style={{ opacity, y }}
            className={`absolute z-10 ${posClasses}`}
        >
            <h2 className="text-4xl md:text-6xl font-black text-white mb-2">{title}</h2>
            <p className="text-xl md:text-2xl text-veolia-blue font-light">{subtitle}</p>
        </motion.div>
    );
}
