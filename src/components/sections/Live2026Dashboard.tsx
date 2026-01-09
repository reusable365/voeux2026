"use client";

import { motion } from "framer-motion";
import { useState, useEffect, useRef, useCallback } from "react";
import { Zap, Flame, Trash2, Download, X, Award } from "lucide-react";
import sovalemData from "@/data/sovalem_data.json";

// Ratios de calcul basés sur la performance réelle 2025
const RATIOS = {
    dechets_kg_par_sec: Number((sovalemData.stats_2025.tonnage_incinere / 31536000 * 1000).toFixed(2)),
    elec_kwh_par_sec: Number((sovalemData.stats_2025.mwh_electrique / 31536000 * 1000).toFixed(1)),
    chaleur_kwh_par_sec: Number((sovalemData.stats_2025.mwh_thermique / 31536000 * 1000).toFixed(1)),
};

// Données cumulées depuis 2011
const CUMUL_STATS = {
    tonnes: sovalemData.historique.tonnage_cumule,
    elec_gwh: Math.round(388000 / 1000),
    chaleur_gwh: Math.round(210000 / 1000),
    tours_eiffel: 90,
};

// Performance 2025
const PERF_2025 = {
    heures_service: sovalemData.stats_2025.heures_fonct,
    tonnes_valorisees: sovalemData.stats_2025.tonnage_incinere,
    elec_mwh: sovalemData.stats_2025.mwh_electrique,
    chaleur_mwh: sovalemData.stats_2025.mwh_thermique,
};

// Données cumulées avec illustrations
const CUMUL_ILLUSTRATIONS = {
    tonnes: { value: 978165, label: "tonnes valorisées", illu: "90 Tours Eiffel en déchets évités" },
    elec: { value: 388, label: "GWh électricité", illu: "La ville de Provins alimentée pendant 15 ans" },
    chaleur: { value: 210, label: "GWh chaleur", illu: "84 millions de douches chaudes" },
    machefers: { value: 200, label: "tonnes mâchefers", illu: "Autoroute Montereau-Paris (70km)" },
    ferrailles: { value: 20, label: "tonnes ferrailles", illu: "2x la Tour Eiffel en métal recyclé" }
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
// Date de référence : 1er janvier 2026 à 00h00
const START_2026 = new Date("2026-01-01T00:00:00").getTime();

function CertificateModal({ isOpen, onClose, currentStats }: CertificateModalProps) {
    const [isDownloading, setIsDownloading] = useState(false);

    const generateImage = useCallback(async () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (!ctx) return null;

        const width = 1200;
        const height = 1400; // Slightly taller for more content
        canvas.width = width;
        canvas.height = height;

        // Background
        ctx.fillStyle = '#09090b';
        ctx.fillRect(0, 0, width, height);

        const gradBlue = ctx.createRadialGradient(0, 0, 0, 200, 200, 600);
        gradBlue.addColorStop(0, 'rgba(0, 69, 135, 0.2)');
        gradBlue.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = gradBlue;
        ctx.fillRect(0, 0, width, height);

        const gradOrange = ctx.createRadialGradient(width, height, 0, width - 200, height - 200, 600);
        gradOrange.addColorStop(0, 'rgba(255, 107, 0, 0.2)');
        gradOrange.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = gradOrange;
        ctx.fillRect(0, 0, width, height);

        ctx.strokeStyle = 'rgba(0, 69, 135, 0.5)';
        ctx.lineWidth = 4;
        ctx.strokeRect(20, 20, width - 40, height - 40);

        // Logo
        const logoImg = new Image();
        logoImg.crossOrigin = "anonymous";
        logoImg.src = "/veolia-logo.png";

        await new Promise((resolve) => {
            logoImg.onload = resolve;
            logoImg.onerror = resolve;
        });

        const logoWidth = 200;
        const logoHeight = logoImg.height * (logoWidth / logoImg.width) || 100;
        ctx.drawImage(logoImg, (width - logoWidth) / 2, 80, logoWidth, logoHeight);

        // Title
        ctx.textAlign = 'center';
        ctx.fillStyle = '#ffffff';
        ctx.font = '900 60px Inter, sans-serif';
        ctx.fillText("CERTIFICAT D'IMPACT", width / 2, 250);

        ctx.fillStyle = '#004587';
        ctx.font = 'bold 30px Inter, sans-serif';
        ctx.fillText("SOVALEM × SYTRADEM", width / 2, 300);

        ctx.beginPath();
        ctx.moveTo(width / 2 - 50, 340);
        ctx.lineTo(width / 2 + 50, 340);
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 2;
        ctx.stroke();

        // --- CUMULATIVE SECTION ---
        let yPos = 420;
        ctx.fillStyle = '#71717a';
        ctx.font = 'bold 24px Inter, sans-serif';
        ctx.fillText("BILAN CUMULÉ DEPUIS 2011", width / 2, yPos);
        yPos += 60;

        // Function to draw stats rows
        const drawStatRow = (y: number, left: any, right: any) => {
            const colW = width / 2;

            // Left
            ctx.fillStyle = '#ffffff';
            ctx.font = '900 40px Inter, sans-serif';
            ctx.fillText(left.val, colW * 0.5, y);
            ctx.font = '18px Inter, sans-serif';
            ctx.fillStyle = '#a1a1aa';
            ctx.fillText(left.label.toUpperCase(), colW * 0.5, y + 25);
            ctx.font = 'italic 18px Inter, sans-serif';
            ctx.fillStyle = '#60a5fa'; // Light blue for equivalence
            ctx.fillText(left.illu, colW * 0.5, y + 55);

            // Right
            ctx.fillStyle = '#ffffff';
            ctx.font = '900 40px Inter, sans-serif';
            if (right.color === 'blue') ctx.fillStyle = '#004587';
            if (right.color === 'orange') ctx.fillStyle = '#ff6b00';
            ctx.fillText(right.val, colW * 1.5, y);
            ctx.font = '18px Inter, sans-serif';
            ctx.fillStyle = '#a1a1aa';
            ctx.fillText(right.label.toUpperCase(), colW * 1.5, y + 25);
            ctx.font = 'italic 18px Inter, sans-serif';
            if (right.color === 'blue') ctx.fillStyle = '#60a5fa';
            else if (right.color === 'orange') ctx.fillStyle = '#fdba74';
            else ctx.fillStyle = '#86efac';
            ctx.fillText(right.illu, colW * 1.5, y + 55);
        };

        // Row 1: Tonnes / Elec
        drawStatRow(yPos,
            { val: "978k", label: "tonnes valorisées", illu: "90 Tours Eiffel en poids de déchets" },
            { val: "388 GWh", label: "GWh électricité", color: "blue", illu: "Ville de Provins pendant 15 ans" }
        );
        yPos += 130;

        // Row 2: Chaleur / Mâchefers
        drawStatRow(yPos,
            { val: "210 GWh", label: "GWh chaleur", color: "orange", illu: "84 millions de douches chaudes" },
            { val: "200k t", label: "mâchefers valorisés", color: "white", illu: "Autoroute Montereau-Paris (70km)" }
        );
        yPos += 130;

        // Row 3: Ferrailles
        ctx.fillStyle = '#22c55e';
        ctx.font = '900 40px Inter, sans-serif';
        ctx.fillText("20k", width / 2, yPos);
        ctx.font = '18px Inter, sans-serif';
        ctx.fillStyle = '#a1a1aa';
        ctx.fillText("TONNES FERRAILLES", width / 2, yPos + 25);
        ctx.font = 'italic 18px Inter, sans-serif';
        ctx.fillStyle = '#86efac';
        ctx.fillText("2x la Tour Eiffel en métal recyclé", width / 2, yPos + 55);

        yPos += 120;

        // --- LIVE 2026 SECTION ---
        ctx.beginPath();
        ctx.moveTo(width / 2 - 100, yPos);
        ctx.lineTo(width / 2 + 100, yPos);
        ctx.strokeStyle = '#3f3f46';
        ctx.lineWidth = 1;
        ctx.stroke();
        yPos += 50;

        ctx.fillStyle = '#71717a';
        ctx.font = 'bold 24px Inter, sans-serif';
        ctx.fillText("IMPACT 2026 EN TEMPS RÉEL", width / 2, yPos);
        yPos += 80;

        // Tonnes 2025
        ctx.fillStyle = '#ffffff';
        ctx.font = '900 70px Inter, sans-serif';
        ctx.fillText(Math.floor(currentStats.dechets / 1000).toLocaleString('fr-FR', { minimumFractionDigits: 2 }), width / 2, yPos);
        ctx.font = '24px Inter, sans-serif';
        ctx.fillStyle = '#a1a1aa';
        ctx.fillText("TONNES VALORISÉES CETTE ANNÉE", width / 2, yPos + 40);

        // Footer Date
        ctx.fillStyle = '#ffffff';
        ctx.font = '900 40px Inter, sans-serif';
        ctx.fillText("BONNE ANNÉE 2026 !", width / 2, 1250);

        ctx.fillStyle = '#71717a';
        ctx.font = '24px Inter, sans-serif';
        const dateStr = new Date().toLocaleDateString("fr-FR", { day: 'numeric', month: 'long', year: 'numeric' });
        ctx.fillText(`Généré le ${dateStr}`, width / 2, 1300);

        return canvas.toDataURL("image/png");
    }, [currentStats]);

    const handleDownload = async () => {
        setIsDownloading(true);
        try {
            const dataUrl = await generateImage();
            if (dataUrl) {
                const link = document.createElement("a");
                link.download = `certificat-sovalem-2026-${Date.now()}.png`;
                link.href = dataUrl;
                link.click();
            }
        } catch (e) {
            console.error(e);
            alert("Erreur lors de la génération. Veuillez réessayer.");
        } finally {
            setIsDownloading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/90 backdrop-blur-md overflow-y-auto">
            <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="relative w-full max-w-xl mx-4 my-6 md:my-10 bg-zinc-950 border-2 border-veolia-blue/50 rounded-2xl overflow-hidden p-6 md:p-8"
            >
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 w-10 h-10 bg-zinc-800 rounded-full flex items-center justify-center text-zinc-400 hover:text-white hover:bg-zinc-700 transition-colors z-20 shadow-xl"
                >
                    <X size={20} />
                </button>

                {/* HTML Preview */}
                <div className="text-center mb-8">
                    <img src="/veolia-logo.png" className="h-8 mx-auto mb-4 opacity-90" alt="Veolia" />
                    <h3 className="text-2xl font-black text-white mb-1">Certificat d'Impact</h3>
                    <p className="text-veolia-blue font-bold mb-6">SOVALEM × SYTRADEM</p>

                    {/* Bilan Cumulé */}
                    <div className="mb-6 p-4 bg-zinc-900/50 rounded-2xl border border-zinc-800 text-left">
                        <p className="text-zinc-500 text-xs uppercase tracking-widest mb-4 text-center">Bilan Cumulé 2011-2025</p>

                        <div className="grid grid-cols-2 gap-y-6 gap-x-4">
                            <div>
                                <p className="text-lg font-black text-white">{CUMUL_ILLUSTRATIONS.tonnes.value.toLocaleString()} t</p>
                                <p className="text-[10px] text-zinc-500 uppercase">Déchets</p>
                                <p className="text-[10px] text-zinc-400 italic mt-1">💡 {CUMUL_ILLUSTRATIONS.tonnes.illu}</p>
                            </div>
                            <div>
                                <p className="text-lg font-black text-veolia-blue">{CUMUL_ILLUSTRATIONS.elec.value} GWh</p>
                                <p className="text-[10px] text-zinc-500 uppercase">Électricité</p>
                                <p className="text-[10px] text-veolia-blue/70 italic mt-1">💡 {CUMUL_ILLUSTRATIONS.elec.illu}</p>
                            </div>
                            <div>
                                <p className="text-lg font-black text-heat-orange">{CUMUL_ILLUSTRATIONS.chaleur.value} GWh</p>
                                <p className="text-[10px] text-zinc-500 uppercase">Chaleur</p>
                                <p className="text-[10px] text-heat-orange/70 italic mt-1">💡 {CUMUL_ILLUSTRATIONS.chaleur.illu}</p>
                            </div>
                            <div>
                                <p className="text-lg font-black text-white">{CUMUL_ILLUSTRATIONS.machefers.value / 1000}k t</p>
                                <p className="text-[10px] text-zinc-500 uppercase">Mâchefers</p>
                                <p className="text-[10px] text-zinc-400 italic mt-1">💡 {CUMUL_ILLUSTRATIONS.machefers.illu}</p>
                            </div>
                        </div>
                    </div>

                    {/* Live 2026 Section */}
                    <div className="relative py-4 border-t border-zinc-800">
                        <p className="text-zinc-500 text-xs uppercase tracking-widest mb-4">Votre Impact 2026</p>
                        <div className="p-4 bg-zinc-900 rounded-xl border border-zinc-800">
                            <p className="text-3xl font-black text-white">
                                {(currentStats.dechets / 1000).toFixed(3)} t
                            </p>
                            <p className="text-sm text-zinc-500 uppercase">Déchets valorisés (Temps réel)</p>
                        </div>
                    </div>
                </div>

                <div className="flex gap-2">
                    <button
                        onClick={handleDownload}
                        disabled={isDownloading}
                        className="w-full py-4 bg-gradient-to-r from-veolia-blue to-heat-orange text-white font-bold rounded-xl flex items-center justify-center gap-2 hover:opacity-90 transition-opacity shadow-lg disabled:opacity-50 disabled:cursor-not-allowed text-lg"
                    >
                        <Download size={24} />
                        {isDownloading ? 'Génération...' : 'Télécharger Certificat (HD)'}
                    </button>
                </div>
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
                            value={stats.elec / 1000}
                            decimals={3}
                            unit="MWh"
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
                            value={stats.chaleur / 1000}
                            decimals={3}
                            unit="MWh"
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
                        <span className="text-veolia-blue font-semibold"> {(RATIOS.elec_kwh_par_sec / 1000).toFixed(4)} MWh</span> électriques •
                        <span className="text-heat-orange font-semibold"> {(RATIOS.chaleur_kwh_par_sec / 1000).toFixed(4)} MWh</span> thermiques
                    </p>
                </motion.div>

                {/* Action Buttons - Same Line */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6"
                >
                    {/* Back to Top Button */}
                    <button
                        onClick={() => {
                            if (window.innerWidth >= 768) {
                                import('@/lib/smoothScroll').then(({ smoothScrollTo }) => {
                                    smoothScrollTo(0, 3000);
                                });
                            } else {
                                window.scrollTo({ top: 0, behavior: 'auto' });
                            }
                        }}
                        className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-veolia-blue to-heat-orange text-white font-bold rounded-full hover:shadow-[0_0_30px_rgba(0,69,135,0.5)] transition-all hover:scale-105"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                        </svg>
                        Commencer le voyage
                    </button>

                    {/* Certificate Button */}
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
