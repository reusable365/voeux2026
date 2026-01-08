"use client";

import React from "react";
import { motion } from "framer-motion";
import { Zap, Box, Info, Trash2 } from "lucide-react";

interface TimelineEventProps {
    date: string;
    title: string;
    description: string;
    icon: React.ReactNode;
    isLast?: boolean;
}

const TimelineEvent = ({ date, title, description, icon, isLast }: TimelineEventProps) => {
    return (
        <div className="flex gap-6 md:gap-10 pb-12 group last:pb-0">
            {/* Timeline Line & Icon Container */}
            <div className="flex flex-col items-center">
                <div className="relative flex items-center justify-center">
                    <motion.div
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        className="w-12 h-12 rounded-full bg-zinc-900 border-2 border-[#004587] flex items-center justify-center z-10 text-[#FF6B00] group-hover:shadow-[0_0_15px_rgba(255,107,0,0.5)] transition-shadow duration-300"
                    >
                        {icon}
                    </motion.div>
                    {!isLast && (
                        <div className="absolute top-12 bottom-[-48px] w-0.5 bg-gradient-to-b from-[#004587] to-zinc-900" />
                    )}
                </div>
            </div>

            {/* Content Container */}
            <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex-1 pt-1"
            >
                <div className="bg-zinc-900/50 border border-zinc-800 p-6 rounded-xl hover:bg-zinc-900/80 transition-colors duration-300">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-3">
                        <span className="text-sm font-bold tracking-widest text-[#004587] uppercase">
                            {date}
                        </span>
                        <h3 className="text-xl font-bold text-zinc-100">{title}</h3>
                    </div>
                    <p className="text-zinc-400 leading-relaxed">
                        {description}
                    </p>
                </div>
            </motion.div>
        </div>
    );
};

export default function FactoryLife() {
    return (
        <section className="py-24 px-6 md:px-12 bg-black text-white overflow-hidden" id="journal-de-bord">
            <div className="max-w-4xl mx-auto">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-20 text-center"
                >
                    <h2 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight">
                        Journal de <span className="text-[#004587]">Bord</span>
                    </h2>
                    <div className="h-1 w-24 bg-[#FF6B00] mx-auto mb-8" />
                    <p className="text-zinc-400 text-lg max-w-2xl mx-auto italic">
                        "Derrière la technique, une vigilance humaine de chaque instant pour garantir la performance de l'UVE."
                    </p>
                </motion.div>

                {/* Timeline Container */}
                <div className="relative ml-4 md:ml-0">
                    <TimelineEvent
                        date="2 Septembre 2024"
                        title="Le Black-out"
                        description="Perte totale d'alimentation électrique externe. Réactivité immédiate des équipes : basculement en mode îlotage et sécurisation des installations. Situation maîtrisée en seulement 21 minutes."
                        icon={<Zap size={24} />}
                    />

                    <TimelineEvent
                        date="24 Septembre 2024"
                        title="Indigestion des 50 briques"
                        description="Blocage critique au niveau de l'extracteur suite à l'introduction massive de mâchefers durcis (50 briques). Intervention technique marathon pour désobstruer et relancer la valorisation."
                        icon={<Box size={24} />}
                    />

                    <TimelineEvent
                        date="Message Pédagogique"
                        title="Le Tri, notre bouclier"
                        description="Chaque erreur de tri est un risque pour la machine. Les briques, le métal lourd ou les encombrants ralentissent notre capacité à produire de l'énergie locale. Ensemble, protégeons l'outil de valorisation."
                        icon={<Trash2 size={24} />}
                        isLast={true}
                    />
                </div>

                {/* Decorative elements */}
                <div className="mt-20 p-8 border border-[#004587]/20 bg-[#004587]/5 rounded-2xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 text-[#004587]/10 group-hover:text-[#004587]/20 transition-colors">
                        <Info size={120} />
                    </div>
                    <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
                        <div className="flex-1">
                            <h4 className="text-[#FF6B00] font-bold text-xl mb-3">Saviez-vous ?</h4>
                            <p className="text-zinc-300">
                                L'UVE Sovalem fonctionne 24h/24. En 2025, nous avons assuré plus de 8 000 heures de disponibilité technique pour transformer vos déchets en chaleur et électricité.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
