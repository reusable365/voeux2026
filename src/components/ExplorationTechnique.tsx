"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BoilerSchematic } from "./BoilerSchematic";
import { Info, MapPin, Activity, Truck } from "lucide-react";

const DATA_POINTS = {
    chaudiere: {
        title: "Le Cœur Inox",
        value: "250 Tonnes d'acier",
        description: "Une structure monumentale acheminée par 14 convois exceptionnels.",
        icon: <Truck className="w-5 h-5 text-zinc-400" />,
    },
    tubes: {
        title: "L'Irrigation",
        value: "30 km de tubes",
        description: "Une maille complexe qui transforme l'énergie du feu en vapeur.",
        icon: <MapPin className="w-5 h-5 text-veolia-blue" />,
    },
    vapeur: {
        title: "Vecteur d'Énergie",
        value: "Vapeur Haute Pression",
        description: "Le souffle qui anime la turbine de 5,5 MW pour l'électricité.",
        icon: <Activity className="w-5 h-5 text-heat-orange" />,
    },
    service: {
        title: "Disponibilité 2025",
        value: "326 jours / 365",
        description: "Une performance opérationnelle quasi-ininterrompue.",
        icon: <Info className="w-5 h-5 text-green-500" />,
    },
};

export const ExplorationTechnique = () => {
    const [activeId, setActiveId] = useState<string | null>(null);

    const activeData = activeId ? DATA_POINTS[activeId as keyof typeof DATA_POINTS] : null;

    return (
        <section className="relative min-h-screen w-full flex flex-col items-center justify-center py-20 px-6 bg-industrial-black text-white overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-veolia-blue/10 rounded-full blur-[120px] pointer-events-none" />

            <div className="z-10 max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                {/* Left Side: Text and Analogy */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="flex flex-col gap-8"
                >
                    <div className="space-y-4">
                        <h2 className="text-4xl md:text-6xl font-bold tracking-tighter">
                            Cathédrale <span className="text-veolia-blue">de Métal</span>
                        </h2>
                        <p className="text-xl text-zinc-400 max-w-md leading-relaxed">
                            Plongez au cœur de la technique. Une ingénierie de précision au service de la performance énergétique.
                        </p>
                    </div>

                    <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md relative overflow-hidden group">
                        <div className="absolute top-0 left-0 w-1 h-full bg-heat-orange" />
                        <p className="italic text-lg text-zinc-300">
                            "Une distance <span className="text-heat-orange font-semibold">Montereau-Fontainebleau</span> uniquement en tuyaux de vapeur."
                        </p>
                    </div>

                    <div className="flex flex-col gap-4 mt-8">
                        <div className="flex items-center gap-3 text-zinc-500">
                            <Info className="w-4 h-4" />
                            <span className="text-sm uppercase tracking-widest">Survolez les points chauds</span>
                        </div>
                    </div>
                </motion.div>

                {/* Right Side: Interactive Schematic */}
                <div className="relative flex items-center justify-center">
                    <BoilerSchematic onHover={setActiveId} activeId={activeId} />

                    {/* Tooltip Overlay */}
                    <AnimatePresence>
                        {activeData && (
                            <motion.div
                                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                className="absolute top-0 right-4 lg:-right-12 p-6 w-72 rounded-xl bg-zinc-900/90 border border-white/20 backdrop-blur-xl shadow-2xl z-20 pointer-events-none"
                            >
                                <div className="flex items-center gap-3 mb-3">
                                    {activeData.icon}
                                    <h3 className="font-bold text-zinc-100">{activeData.title}</h3>
                                </div>
                                <div className="text-2xl font-black text-white mb-2 leading-tight">
                                    {activeData.value}
                                </div>
                                <p className="text-sm text-zinc-400 leading-relaxed font-medium">
                                    {activeData.description}
                                </p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
};
