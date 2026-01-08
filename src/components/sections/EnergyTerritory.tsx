"use client";

import { motion } from "framer-motion";
import ParticleFlow from "../ui/ParticleFlow";
import EnergyCard from "../ui/EnergyCard";
import { Zap, Flame } from "lucide-react";

export default function EnergyTerritory() {
    return (
        <section className="relative min-h-screen py-24 px-6 flex flex-col items-center justify-center overflow-hidden bg-black">
            {/* Dynamic Background Patterns */}
            <div className="absolute inset-0 opacity-20">
                <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-zinc-800 to-transparent" />
                <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-zinc-800 to-transparent" />
            </div>

            <div className="relative z-10 max-w-6xl w-full">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-20"
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
                        L'Énergie du Territoire
                    </h2>
                    <p className="text-zinc-400 max-w-2xl mx-auto text-lg leading-relaxed">
                        SOVALEM transforme vos déchets en ressources vitales pour l'agglomération,
                        produisant simultanément électricité et chauffage urbain.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 items-stretch">
                    {/* Electricity Flow Block */}
                    <div className="h-32 md:h-40 relative bg-zinc-950/50 rounded-xl border border-zinc-900 overflow-hidden shadow-inner flex items-center justify-center">
                        <ParticleFlow color="#3b82f6" count={80} />
                        <motion.span
                            initial={{ opacity: 0.1, clipPath: "inset(0 100% 0 0)" }}
                            whileInView={{ opacity: 0.6, clipPath: "inset(0 0% 0 0)" }}
                            transition={{ duration: 5, ease: "easeInOut" }}
                            className="absolute text-blue-500/80 font-black text-4xl md:text-6xl tracking-[0.15em] md:tracking-[0.2em] uppercase select-none pointer-events-none text-center"
                            style={{ textShadow: "0 0 20px rgba(59, 130, 246, 0.3)" }}
                        >
                            ELEC
                        </motion.span>
                    </div>

                    {/* Heat Flow Block */}
                    <div className="h-32 md:h-40 relative bg-zinc-950/50 rounded-xl border border-zinc-900 overflow-hidden shadow-inner flex items-center justify-center">
                        <ParticleFlow color="#f97316" count={80} direction="right" />
                        <motion.span
                            initial={{ opacity: 0.1, clipPath: "inset(0 100% 0 0)" }}
                            whileInView={{ opacity: 0.6, clipPath: "inset(0 0% 0 0)" }}
                            transition={{ duration: 5, ease: "easeInOut" }}
                            className="absolute text-orange-500/80 font-black text-3xl md:text-6xl tracking-[0.1em] md:tracking-[0.2em] uppercase select-none pointer-events-none text-center"
                            style={{ textShadow: "0 0 20px rgba(249, 115, 22, 0.3)" }}
                        >
                            CHALEUR
                        </motion.span>
                    </div>

                    {/* Electricity Card */}
                    <EnergyCard
                        title="Électricité"
                        subtitle="Turbine 5,5 MW"
                        value={35093}
                        unit="MWh"
                        color="#3b82f6"
                        icon={<Zap size={24} />}
                    />

                    {/* Heat Card */}
                    <EnergyCard
                        title="Chaleur Coriance"
                        subtitle="10 MW"
                        value={21519}
                        unit="MWh"
                        color="#f97316"
                        tooltip="En 2025, nous avons dépassé l'objectif contractuel de 20 697 MWh."
                        icon={<Flame size={24} />}
                    />
                </div>

                {/* 2025 Badge */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    className="mt-20 flex justify-center"
                >
                    <div className="px-6 py-2 rounded-full border border-zinc-800 bg-zinc-900/50 text-zinc-400 text-sm font-medium backdrop-blur-md">
                        Performance consolidée 2025
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
