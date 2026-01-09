"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ShieldCheck, Users, FileText, Cpu, ChevronDown } from "lucide-react";

// Données fournies par l'utilisateur
const DATA = [
    {
        id: "certif",
        title: "Le Graal des Certifications",
        subtitle: "Qualité, Sécurité & Énergie",
        icon: ShieldCheck,
        color: "text-veolia-blue",
        content: [
            { label: "ISO 50001 (2017)", val: "Management de l'Énergie & Performance" },
            { label: "SMI (2012)", val: "Système de Management Intégré unifié" },
            { label: "ISO 14001", val: "Maîtrise totale des impacts environnementaux" },
            { label: "Démarche HQE", val: "Conception haute performance (>100k h d'études)" }
        ]
    },
    {
        id: "management",
        title: "Management & Excellence",
        subtitle: "Culture LEAN & 5S",
        icon: Users,
        color: "text-heat-orange",
        content: [
            { label: "LEAN 5S (2024)", val: "Transformation durable des ateliers" },
            { label: "Management Visuel", val: "Points 15' quotidiens pour réactivité max" },
            { label: "GMAO Prédictive", val: "Digitalisation pour réduire les pannes" },
            { label: "Causeries Sécurité", val: "Implication continue des équipes" }
        ]
    },
    {
        id: "strategy",
        title: "Victoires Stratégiques",
        subtitle: "Évolutions Contractuelles",
        icon: FileText,
        color: "text-white",
        content: [
            { label: "Avenant n°10 (2023)", val: "Partage de valeur sur la vente d'électricité" },
            { label: "Filière Mâchefers", val: "Passage en local (REP) = gain financier" },
            { label: "Partenariat Sytradem", val: "Rentabilité directe pour le territoire" }
        ]
    },
    {
        id: "tech",
        title: "Innovations Invisibles",
        subtitle: "Sécurité & Futur",
        icon: Cpu,
        color: "text-purple-400",
        content: [
            { label: "Rotor sous Azote", val: "Pièce critique stockée pour durer" },
            { label: "Analyseurs Mercure", val: "Anticipation des normes EU (BREF)" },
            { label: "Vidéosurveillance IA", val: "Traçabilité loi AGEC depuis 2022" }
        ]
    }
];

export default function ExcellenceNavire() {
    const [activeId, setActiveId] = useState<string | null>(null);

    const toggleOpen = (id: string) => {
        setActiveId(activeId === id ? null : id);
    };

    return (
        <section className="relative w-full py-24 px-4 bg-zinc-950 overflow-hidden">
            {/* Background Decor */}
            <div className="absolute top-0 left-0 w-full h-full industrial-grid opacity-20 pointer-events-none" />
            <div className="absolute -top-[20%] -right-[10%] w-[500px] h-[500px] bg-veolia-blue/10 blur-[100px] rounded-full" />

            <div className="max-w-6xl mx-auto relative z-10">

                {/* Header Section */}
                <div className="text-center mb-16 md:mb-24">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-3 mb-4 px-4 py-1.5 rounded-full border border-veolia-blue/30 bg-veolia-blue/10 backdrop-blur-md"
                    >
                        <span className="w-2 h-2 rounded-full bg-veolia-blue animate-pulse" />
                        <span className="text-veolia-blue text-xs font-bold tracking-widest uppercase">Navire Amiral</span>
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-5xl font-black text-white mb-6 uppercase tracking-tight"
                    >
                        L'Excellence <span className="text-stroke-thin">Opérationnelle</span>
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="max-w-2xl mx-auto text-zinc-400 text-sm md:text-base leading-relaxed"
                    >
                        L'usine SOVALEM n'est pas qu'une simple machine à brûler des déchets. C'est un <strong className="text-white">Navire Amiral</strong> parfaitement entretenu, avec ses cartes de navigation à jour (Certifications) et son équipage d'élite.
                    </motion.p>
                </div>

                {/* BENTO GRID LAYOUT */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                    {DATA.map((item, idx) => {
                        const Icon = item.icon;
                        const isOpen = activeId === item.id;

                        return (
                            <motion.div
                                key={item.id}
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                onClick={() => toggleOpen(item.id)}
                                className={`
                  relative overflow-hidden rounded-2xl border transition-all duration-500 cursor-pointer group
                  ${isOpen ? 'border-veolia-blue bg-zinc-900' : 'border-zinc-800 bg-zinc-900/50 hover:border-zinc-700'}
                `}
                            >
                                {/* Header Card */}
                                <div className="p-6 md:p-8 flex items-start gap-4 md:gap-6 relative z-10">
                                    <div className={`
                    p-3 rounded-lg bg-zinc-950 border border-zinc-800 shadow-lg group-hover:scale-110 transition-transform duration-300
                    ${item.color}
                  `}>
                                        <Icon size={24} />
                                    </div>

                                    <div className="flex-1">
                                        <h3 className="text-lg md:text-xl font-bold text-white mb-1 group-hover:text-veolia-blue transition-colors">
                                            {item.title}
                                        </h3>
                                        <p className="text-xs md:text-sm text-zinc-500 uppercase tracking-wider font-medium">
                                            {item.subtitle}
                                        </p>
                                    </div>

                                    {/* Mobile Chevron */}
                                    <ChevronDown className={`md:hidden text-zinc-600 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                                </div>

                                {/* Content - Collapsible on Mobile, Visible on Desktop (grid mode) */}
                                <div className="block md:block">
                                    {/* On Mobile: Animate Height */}
                                    <AnimatePresence>
                                        {(isOpen || typeof window !== 'undefined' && window.innerWidth >= 768) && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: "auto", opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                className="px-6 pb-6 md:px-8 md:pb-8 md:pt-0"
                                            >
                                                <ul className="space-y-4 md:grid md:grid-cols-2 md:gap-4 md:space-y-0 pt-4 border-t border-zinc-800/50 md:border-none">
                                                    {item.content.map((point, i) => (
                                                        <li key={i} className="flex flex-col gap-1">
                                                            <span className={`text-sm font-semibold ${item.color} opacity-90`}>
                                                                {point.label}
                                                            </span>
                                                            <span className="text-sm text-zinc-400 leading-snug">
                                                                {point.val}
                                                            </span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>

                                    {/* Desktop Only: Always Visible Content override via CSS if needed, 
                      but here we handle logic slightly differently. 
                      Actually, for the "Bento" look, we want content visible on desktop always.
                  */}
                                    <div className="hidden md:grid grid-cols-2 gap-6 px-8 pb-8">
                                        {item.content.map((point, i) => (
                                            <div key={i} className="flex flex-col gap-1">
                                                <h4 className={`text-sm font-bold ${item.color} mb-1 flex items-center gap-2`}>
                                                    <span className="w-1 h-1 rounded-full bg-current opacity-50" />
                                                    {point.label}
                                                </h4>
                                                <p className="text-xs text-zinc-400 group-hover:text-zinc-300 transition-colors">
                                                    {point.val}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Decorative Glow */}
                                <div className={`
                    absolute -right-12 -bottom-12 w-32 h-32 rounded-full blur-[60px] opacity-20 pointer-events-none transition-colors duration-500
                    ${isOpen ? 'bg-veolia-blue' : 'bg-transparent group-hover:bg-veolia-blue/50'}
                `} />
                            </motion.div>
                        );
                    })}
                </div>

                {/* Bottom Quote */}
                <div className="mt-16 text-center">
                    <p className="text-zinc-500 text-xs uppercase tracking-[0.2em] animate-pulse">
                        Un outil de haute technologie qui se bonifie avec le temps
                    </p>
                </div>
            </div>
        </section>
    );
}
