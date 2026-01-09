"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";
import HistoryChart from "./sections/HistoryChart";


const milestones = [
    {
        year: "1973",
        title: "L'Unité Historique",
        description: "Mise en service de la première unité de valorisation historique, posant les bases de l'engagement territorial.",
        side: "left",
    },
    {
        year: "2009",
        title: "Le Grand Chantier",
        description: "Début des travaux de la nouvelle UVE. Un investissement stratégique de 61 M€ pour l'avenir du territoire.",
        side: "right",
    },
    {
        year: "2011",
        title: "La Cathédrale Technologique",
        description: "1er août : Mise en service de l'usine actuelle après 100 000h d'études et une ingénierie de pointe.",
        side: "left",
    },
    {
        year: "2012",
        title: "L'Excellence Durable",
        description: "Obtention des certifications SMI et ISO 14001, attestant de la performance environnementale exemplaire.",
        side: "right",
    },
];

export default function HistorySection() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    });

    return (
        <section ref={containerRef} className="relative py-32 bg-black overflow-hidden">
            {/* Decorative vertical line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-veolia-blue/30 to-transparent hidden md:block" />

            <div className="container mx-auto px-4 relative">
                <div className="text-center mb-24">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-veolia-blue uppercase tracking-[0.4em] text-xs font-bold mb-4"
                    >
                        L'Évolution
                    </motion.h2>
                    <motion.h3
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-5xl font-bold text-white tracking-tight"
                    >
                        D'hier à aujourd'hui
                    </motion.h3>
                </div>

                <div className="relative">
                    {milestones.map((milestone, index) => (
                        <div
                            key={milestone.year}
                            className={cn(
                                "flex flex-col md:flex-row items-center mb-24 last:mb-0",
                                milestone.side === "right" ? "md:flex-row-reverse" : ""
                            )}
                        >
                            {/* Year & Content */}
                            <motion.div
                                initial={{ opacity: 0, x: milestone.side === "left" ? -50 : 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.8, ease: "easeOut" }}
                                className={cn(
                                    "w-full md:w-1/2 flex flex-col",
                                    milestone.side === "left" ? "md:items-end md:pr-12 md:text-right" : "md:items-start md:pl-12 md:text-left"
                                )}
                            >
                                <span className="text-6xl font-black text-white/10 mb-2 leading-none">
                                    {milestone.year}
                                </span>
                                <h4 className="text-2xl font-bold text-veolia-blue mb-4">
                                    {milestone.title}
                                </h4>
                                <p className="text-white/60 leading-relaxed max-w-sm">
                                    {milestone.description}
                                </p>
                            </motion.div>

                            {/* Central Point */}
                            <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full border-2 border-veolia-blue bg-black z-10 shadow-[0_0_15px_rgba(0,17,255,0.5)]" />

                            {/* Empty side for spacing */}
                            <div className="hidden md:block w-1/2" />
                        </div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-32 pt-24 border-t border-zinc-900 relative"
                >
                    <HistoryChart />
                </motion.div>

                {/* Cumulative Energy Dashboard */}
                <CumulativeEnergyDashboard />



                {/* Bonne Année 2026 CTA/Banner */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="mt-40 mb-20 text-center"
                >
                    <div className="inline-block relative">
                        <h2 className="text-6xl md:text-8xl font-black text-white tracking-widest uppercase mb-4 opacity-20">
                            2026
                        </h2>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <span className="text-veolia-blue font-bold tracking-[0.5em] uppercase text-sm mb-2">Sovalem vous souhaite une</span>
                            <span className="text-3xl md:text-5xl font-bold text-white tracking-tight">BONNE ANNÉE</span>
                        </div>
                    </div>
                    <p className="text-zinc-500 mt-8 max-w-lg mx-auto text-sm leading-relaxed">
                        Au service du SYTRADEM et du territoire, pour une valorisation toujours plus performante et pédagogique de nos déchets.
                    </p>
                </motion.div>
            </div>

            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-veolia-blue/5 blur-[150px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-heat-orange/5 blur-[150px] pointer-events-none" />
        </section>
    );
}
