"use client";

import { motion } from "framer-motion";
import { useState, useEffect, useRef, useCallback } from "react";
import { Zap, Flame, Trash2, Download, X, Award } from "lucide-react";

// Ratios de calcul basés sur la performance 2025
const RATIOS = {
    dechets_kg_par_sec: 2.6,      // 74 698 tonnes / 31 536 000 sec ≈ 2.37 → arrondi 2.6
    elec_kwh_par_sec: 1.2,        // 35 093 MWh / 31 536 000 sec × 1000 ≈ 1.11 → arrondi 1.2
    chaleur_kwh_par_sec: 0.7,     // 21 519 MWh / 31 536 000 sec × 1000 ≈ 0.68 → arrondi 0.7
};

interface OdometerProps {
    value: number;
    decimals?: number;
    unit: string;
    label: string;
    color: "blue" | "orange" | "white";
    icon: React.ReactNode;
}

function Odometer({ value, decimals = 0, unit, label, color, icon }: OdometerProps) {
    const colorMap = {
        blue: "text-veolia-blue",
        orange: "text-heat-orange",
        white: "text-white",
    };
    const glowMap = {
        blue: "drop-shadow-[0_0_15px_rgba(0,69,135,0.8)]",
        orange: "drop-shadow-[0_0_15px_rgba(255,107,0,0.8)]",
        white: "drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]",
    };

    const formattedValue = decimals > 0
        ? value.toLocaleString("fr-FR", { minimumFractionDigits: decimals, maximumFractionDigits: decimals })
        : Math.floor(value).toLocaleString("fr-FR");

    return (
        <div className="flex flex-col items-center p-6 md:p-8 bg-zinc-900/80 backdrop-blur-sm border border-zinc-800 rounded-2xl relative overflow-hidden group">
            {/* Glow background */}
            <div className={`absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity bg-gradient-radial from-current to-transparent ${colorMap[color]}`} />

            <div className={`mb-4 ${colorMap[color]}`}>
                {icon}
            </div>

            <p className="text-zinc-500 text-sm mb-2 uppercase tracking-widest">{label}</p>

            <div className={`text-4xl md:text-5xl lg:text-6xl font-black tabular-nums ${colorMap[color]} ${glowMap[color]} transition-all`}>
                {formattedValue}
            </div>

            <p className="text-zinc-400 text-lg mt-2">{unit}</p>
        </div>
    );
}

interface CertificateModalProps {
    isOpen: boolean;
    onClose: () => void;
    currentStats: { dechets: number; elec: number; chaleur: number };
}

// Données cumulées depuis 2011
const CUMUL_STATS = {
    tonnes: 903467,
    elec_gwh: 388,
    chaleur_gwh: 210,
    tours_eiffel: 90,
};

// Performance 2025
const PERF_2025 = {
    heures_service: 7822,
    tonnes_valorisees: 74698,
    elec_mwh: 35093,
    chaleur_mwh: 21519,
};

// Date de référence : 1er janvier 2026 à 00h00
const START_2026 = new Date("2026-01-01T00:00:00").getTime();

function CertificateModal({ isOpen, onClose, currentStats }: CertificateModalProps) {
    const certificateRef = useRef<HTMLDivElement>(null);

    const handleDownload = useCallback(async () => {
        if (!certificateRef.current) return;

        try {
            const html2canvas = (await import("html2canvas")).default;
            const canvas = await html2canvas(certificateRef.current, {
                backgroundColor: "#09090b",
                scale: 2,
            });
            const link = document.createElement("a");
            link.download = "certificat-sovalem-2026.png";
            link.href = canvas.toDataURL("image/png");
            link.click();
        } catch (error) {
            console.error("Erreur lors du téléchargement:", error);
            alert("Pour télécharger, faites une capture d'écran de ce certificat.");
        }
    }, []);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/90 backdrop-blur-md overflow-y-auto">
            <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="relative w-full max-w-xl mx-4 my-6 md:my-10"
            >
                <button
                    onClick={onClose}
                    className="absolute -top-2 -right-2 md:-top-4 md:-right-4 w-10 h-10 bg-zinc-800 rounded-full flex items-center justify-center text-zinc-400 hover:text-white hover:bg-zinc-700 transition-colors z-20 shadow-xl"
                >
                    <X size={20} />
                </button>

                <div
                    ref={certificateRef}
                    className="relative p-6 md:p-8 bg-gradient-to-br from-zinc-900 via-black to-zinc-900 border-2 border-transparent rounded-2xl overflow-hidden"
                    style={{
                        backgroundImage: "linear-gradient(to bottom right, #18181b, #09090b, #18181b), linear-gradient(135deg, #004587, #FF6B00)",
                        backgroundOrigin: "border-box",
                        backgroundClip: "padding-box, border-box",
                    }}
                >
                    {/* Decorative glow effects */}
                    <div className="absolute top-0 left-0 w-48 h-48 bg-veolia-blue/20 blur-[80px] pointer-events-none" />
                    <div className="absolute bottom-0 right-0 w-48 h-48 bg-heat-orange/20 blur-[80px] pointer-events-none" />

                    {/* Veolia Logo */}
                    <div className="relative z-10 flex justify-center mb-4">
                        <img
                            src="/veolia-logo.png"
                            alt="Veolia"
                            className="h-8 md:h-10 object-contain opacity-90"
                        />
                    </div>

                    {/* Header */}
                    <div className="relative z-10 text-center mb-6">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-veolia-blue to-heat-orange mb-3 shadow-[0_0_20px_rgba(0,69,135,0.5)]">
                            <Award className="w-8 h-8 text-white" />
                        </div>
                        <h3 className="text-2xl md:text-3xl font-black text-white mb-1 tracking-tight">Certificat d'Impact</h3>
                        <p className="text-transparent bg-clip-text bg-gradient-to-r from-veolia-blue to-heat-orange font-bold">
                            SOVALEM × SYTRADEM
                        </p>
                    </div>

                    {/* Cumulative Stats */}
                    <div className="relative z-10 mb-6">
                        <p className="text-zinc-500 text-xs uppercase tracking-widest text-center mb-3">🏭 Depuis 2011</p>
                        <div className="grid grid-cols-3 gap-2 md:gap-3">
                            <div className="text-center p-3 bg-black/40 rounded-xl border border-zinc-800">
                                <p className="text-2xl md:text-3xl font-black text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">
                                    {(CUMUL_STATS.tonnes / 1000).toFixed(0)}k
                                </p>
                                <p className="text-zinc-500 text-xs">tonnes</p>
                            </div>
                            <div className="text-center p-3 bg-black/40 rounded-xl border border-veolia-blue/30">
                                <p className="text-2xl md:text-3xl font-black text-veolia-blue drop-shadow-[0_0_10px_rgba(0,69,135,0.5)]">
                                    {CUMUL_STATS.elec_gwh}
                                </p>
                                <p className="text-zinc-500 text-xs">GWh élec</p>
                            </div>
                            <div className="text-center p-3 bg-black/40 rounded-xl border border-heat-orange/30">
                                <p className="text-2xl md:text-3xl font-black text-heat-orange drop-shadow-[0_0_10px_rgba(255,107,0,0.5)]">
                                    {CUMUL_STATS.chaleur_gwh}
                                </p>
                                <p className="text-zinc-500 text-xs">GWh chaleur</p>
                            </div>
                        </div>
                        <div className="mt-3 p-2 bg-gradient-to-r from-veolia-blue/10 to-heat-orange/10 rounded-lg text-center border border-zinc-800">
                            <p className="text-sm font-bold text-white">
                                🗼 = <span className="text-transparent bg-clip-text bg-gradient-to-r from-veolia-blue to-heat-orange">{CUMUL_STATS.tours_eiffel} Tours Eiffel</span>
                            </p>
                        </div>
                    </div>

                    {/* 2025 Performance - Compact */}
                    <div className="relative z-10 mb-6">
                        <p className="text-zinc-500 text-xs uppercase tracking-widest text-center mb-3">⭐ Performance 2025</p>
                        <div className="grid grid-cols-2 gap-2 md:gap-3">
                            <div className="p-3 bg-gradient-to-br from-zinc-800/50 to-black/50 rounded-xl border border-zinc-700 text-center">
                                <p className="text-xl md:text-2xl font-black text-white">
                                    {PERF_2025.tonnes_valorisees.toLocaleString()}
                                </p>
                                <p className="text-zinc-500 text-xs">tonnes valorisées</p>
                            </div>
                            <div className="p-3 bg-gradient-to-br from-zinc-800/50 to-black/50 rounded-xl border border-zinc-700 text-center">
                                <p className="text-xl md:text-2xl font-black text-green-500">
                                    {PERF_2025.heures_service.toLocaleString()}h
                                </p>
                                <p className="text-zinc-500 text-xs">de service</p>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-2 mt-2">
                            <div className="p-2 bg-veolia-blue/10 rounded-lg border border-veolia-blue/20 text-center">
                                <p className="text-lg font-black text-veolia-blue">{PERF_2025.elec_mwh.toLocaleString()}</p>
                                <p className="text-zinc-500 text-xs">MWh élec</p>
                            </div>
                            <div className="p-2 bg-heat-orange/10 rounded-lg border border-heat-orange/20 text-center">
                                <p className="text-lg font-black text-heat-orange">{PERF_2025.chaleur_mwh.toLocaleString()}</p>
                                <p className="text-zinc-500 text-xs">MWh chaleur</p>
                            </div>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="relative z-10 text-center pt-4 border-t border-zinc-800">
                        <p className="text-xl md:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-veolia-blue via-white to-heat-orange">
                            Bonne Année 2026 !
                        </p>
                        <p className="text-zinc-500 text-xs mt-1">138 communes du territoire • {new Date().toLocaleDateString("fr-FR")}</p>
                    </div>
                </div>

                <button
                    onClick={handleDownload}
                    className="mt-4 w-full py-3 bg-gradient-to-r from-veolia-blue to-heat-orange text-white font-bold rounded-xl flex items-center justify-center gap-2 hover:opacity-90 transition-opacity shadow-lg"
                >
                    <Download size={18} />
                    Télécharger pour partager
                </button>
            </motion.div>
        </div>
    );
}

export default function Live2026Dashboard() {
    const [stats, setStats] = useState({ dechets: 0, elec: 0, chaleur: 0 });
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const updateStats = () => {
            const now = Date.now();
            const elapsedSeconds = Math.max(0, (now - START_2026) / 1000);

            setStats({
                dechets: elapsedSeconds * RATIOS.dechets_kg_par_sec,
                elec: elapsedSeconds * RATIOS.elec_kwh_par_sec,
                chaleur: elapsedSeconds * RATIOS.chaleur_kwh_par_sec,
            });
        };

        updateStats();
        const interval = setInterval(updateStats, 100); // Update 10x per second for smooth animation

        return () => clearInterval(interval);
    }, []);

    // Convert kg to tonnes for display
    const tonnes = stats.dechets / 1000;

    return (
        <section className="py-24 px-6 md:px-12 relative overflow-hidden" id="live-2026">
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-veolia-blue/10 via-black to-heat-orange/10" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-zinc-900/50 via-black to-black" />

            <div className="max-w-6xl mx-auto relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-zinc-900/80 border border-zinc-800 rounded-full mb-6">
                        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                        <span className="text-zinc-400 text-sm font-medium">EN DIRECT</span>
                    </div>

                    <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6 tracking-tight">
                        Impact <span className="text-transparent bg-clip-text bg-gradient-to-r from-veolia-blue to-heat-orange">2026</span> en Temps Réel
                    </h2>

                    <p className="text-zinc-400 text-lg max-w-2xl mx-auto leading-relaxed">
                        Ensemble, transformons chaque seconde de 2026 en une ressource pour demain.
                    </p>
                </motion.div>

                {/* Live Counters */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0 }}
                    >
                        <Odometer
                            value={tonnes}
                            decimals={2}
                            unit="tonnes"
                            label="Ressources créées"
                            color="white"
                            icon={<Trash2 size={32} />}
                        />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                    >
                        <Odometer
                            value={stats.elec}
                            decimals={1}
                            unit="kWh"
                            label="Électricité injectée"
                            color="blue"
                            icon={<Zap size={32} />}
                        />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                    >
                        <Odometer
                            value={stats.chaleur}
                            decimals={1}
                            unit="kWh"
                            label="Chaleur partagée"
                            color="orange"
                            icon={<Flame size={32} />}
                        />
                    </motion.div>
                </div>

                {/* Ratios explanation */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <p className="text-zinc-600 text-sm">
                        À chaque seconde : <span className="text-white font-semibold">{RATIOS.dechets_kg_par_sec} kg</span> valorisés •
                        <span className="text-veolia-blue font-semibold"> {RATIOS.elec_kwh_par_sec} kWh</span> électriques •
                        <span className="text-heat-orange font-semibold"> {RATIOS.chaleur_kwh_par_sec} kWh</span> thermiques
                    </p>
                </motion.div>

                {/* Certificate Button */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center"
                >
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-veolia-blue to-heat-orange text-white font-bold rounded-full hover:shadow-[0_0_30px_rgba(0,69,135,0.5)] transition-all hover:scale-105"
                    >
                        <Award size={24} />
                        Générer mon Certificat 2026
                    </button>
                </motion.div>
            </div>

            {/* Certificate Modal */}
            <CertificateModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                currentStats={stats}
            />
        </section>
    );
}
