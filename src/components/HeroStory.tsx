"use client";

import { motion, useSpring, useTransform, animate } from "framer-motion";
import { useEffect, useState } from "react";
import { CONVERSION_CONSTANTS } from "@/lib/constants";
import BackgroundVideo from "./ui/BackgroundVideo";

export default function HeroStory() {
    const [displayCount, setDisplayCount] = useState(0);
    const targetTons = CONVERSION_CONSTANTS.TOTAL_TONS_TARGET;

    useEffect(() => {
        const controls = animate(0, targetTons, {
            duration: 3,
            ease: "easeOut",
            onUpdate: (value) => setDisplayCount(Math.floor(value)),
        });
        return () => controls.stop();
    }, [targetTons]);

    return (
        <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden industrial-grid bg-black">
            {/* Background Video (Immersive) */}
            <BackgroundVideo />

            {/* Veolia Logo */}
            <div className="absolute top-6 right-6 z-20">
                <img
                    src="/veolia-logo.png"
                    alt="Veolia"
                    className="h-8 md:h-10 opacity-80 hover:opacity-100 transition-opacity"
                />
            </div>

            {/* Background Atmosphere */}
            <div className="absolute inset-0 bg-gradient-to-b from-veolia-blue/10 via-transparent to-black pointer-events-none" />
            <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none industrial-grid" />

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="z-10 text-center px-4"
            >
                <div className="flex items-center justify-center gap-4 mb-8">
                    <div className="h-[1px] w-12 bg-veolia-blue/50" />
                    <h2 className="text-veolia-blue uppercase tracking-[0.4em] text-xs font-bold">
                        Héritage & Futur depuis {CONVERSION_CONSTANTS.BASE_YEAR}
                    </h2>
                    <div className="h-[1px] w-12 bg-veolia-blue/50" />
                </div>

                <div className="relative inline-block mb-8">
                    <h1 className="text-7xl md:text-9xl font-black tracking-tighter tabular-nums leading-none">
                        <span className="text-gradient-heat inline-block">
                            {displayCount.toLocaleString('fr-FR')}
                        </span>
                    </h1>
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: "100%" }}
                        transition={{ delay: 1, duration: 2 }}
                        className="absolute -bottom-2 left-0 h-1 bg-gradient-to-r from-heat-orange to-transparent opacity-50"
                    />
                </div>

                <div className="flex flex-col items-center gap-2">
                    <span className="text-2xl md:text-4xl font-light text-white/40 uppercase tracking-[0.2em] mb-8">
                        Tonnes Valorisées
                    </span>

                    <p className="max-w-2xl mx-auto text-lg md:text-xl text-white/70 leading-relaxed font-light">
                        L'unité <span className="text-white font-medium border-b border-veolia-blue pb-0.5">SOVALEM</span> transforme chaque jour les déchets du territoire en ressources essentielles : <span className="text-heat-orange font-medium">chaleur</span> et <span className="text-veolia-blue font-medium">électricité</span>.
                    </p>

                    {/* CTA Button - Scroll to Certificate */}
                    <motion.button
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 2, duration: 1 }}
                        onClick={() => window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' })}
                        className="mt-8 flex items-center gap-3 bg-veolia-blue hover:bg-veolia-blue/80 text-white px-8 py-4 rounded-full font-bold transition-all shadow-lg shadow-veolia-blue/20 hover:shadow-veolia-blue/40 text-base md:text-lg group"
                    >
                        <svg className="w-5 h-5 group-hover:rotate-12 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        Générer votre rapport
                    </motion.button>
                </div>
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 3, duration: 1 }}
                className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 group cursor-pointer"
            >
                <span className="text-[10px] uppercase tracking-[0.3em] text-white/30 group-hover:text-veolia-blue transition-colors">
                    Commencer le voyage
                </span>
                <div className="relative w-[1px] h-16 bg-white/10 overflow-hidden">
                    <motion.div
                        animate={{ y: [-64, 64] }}
                        transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                        className="absolute top-0 left-0 w-full h-[32px] bg-gradient-to-b from-transparent via-veolia-blue to-transparent"
                    />
                </div>
            </motion.div>
        </section>
    );
}
