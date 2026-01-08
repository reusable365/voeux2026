"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Zap, Flame, Mountain, Recycle, Factory, Users } from "lucide-react";

// Données cumulées depuis 2011 (sources: rapports d'activité 2021-2024)
const CUMUL_DATA = {
    tonnage: 978165,           // tonnes valorisées
    electricite_mwh: 388000,   // MWh électriques cumulés
    chaleur_mwh: 210000,       // MWh thermiques cumulés
    machefers_tonnes: 200000,  // ~14 000 t/an x 15 ans (rapports 2021-2024)
    ferrailles_tonnes: 20000,  // ~1 350 t/an x 15 ans (rapports 2021-2024)
    heures_fonct: 112000,      // ~8000h x 14 ans
};

// Équivalences pédagogiques - DONNÉES VÉRIFIÉES
const EQUIVALENCES = {
    foyers_par_an: 11000,             // foyers alimentés chaque année (ville de Provins)
    smartphones_charges: 25800000000, // 388 GWh / 15 Wh par charge
    douches_chaudes: 84000000,        // 210 GWh / 2.5 kWh par douche
    // Mâchefers: autoroute Montereau-Paris (~70 km de sous-couches routières)
    km_autoroute: 70,
    // Ferrailles: 2x le poids de la Tour Eiffel (10 000 t chacune)
    tours_eiffel_metal: 2,
};

interface StatCardProps {
    value: number;
    unit: string;
    label: string;
    color: "blue" | "orange" | "gray" | "green";
    icon: React.ReactNode;
    equivalence?: string;
    equivalenceValue?: string;
}

function StatCard({ value, unit, label, color, icon, equivalence, equivalenceValue }: StatCardProps) {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, amount: 0.5 });
    const [displayValue, setDisplayValue] = useState(0);

    const colorMap = {
        blue: { text: "text-veolia-blue", border: "border-veolia-blue/30", bg: "bg-veolia-blue/10" },
        orange: { text: "text-heat-orange", border: "border-heat-orange/30", bg: "bg-heat-orange/10" },
        gray: { text: "text-zinc-300", border: "border-zinc-600", bg: "bg-zinc-800/50" },
        green: { text: "text-emerald-400", border: "border-emerald-500/30", bg: "bg-emerald-500/10" },
    };
    const colors = colorMap[color];

    useEffect(() => {
        if (isInView) {
            const duration = 2000;
            const startTime = Date.now();
            const animate = () => {
                const elapsed = Date.now() - startTime;
                const progress = Math.min(elapsed / duration, 1);
                const eased = 1 - Math.pow(1 - progress, 3);
                setDisplayValue(Math.floor(value * eased));
                if (progress < 1) requestAnimationFrame(animate);
            };
            requestAnimationFrame(animate);
        }
    }, [isInView, value]);

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`p-6 rounded-2xl border ${colors.border} ${colors.bg} relative overflow-hidden group`}
        >
            <div className="flex items-start gap-4">
                <div className={`p-3 rounded-xl ${colors.bg} ${colors.text}`}>
                    {icon}
                </div>
                <div className="flex-1">
                    <p className="text-zinc-500 text-sm mb-1">{label}</p>
                    <div className="flex items-baseline gap-2">
                        <span className={`text-3xl md:text-4xl font-black ${colors.text}`}>
                            {displayValue.toLocaleString()}
                        </span>
                        <span className="text-zinc-400 text-sm">{unit}</span>
                    </div>
                </div>
            </div>

            {equivalence && (
                <div className="mt-4 pt-4 border-t border-zinc-800/50">
                    <p className="text-zinc-500 text-sm leading-relaxed">
                        💡 <span className={colors.text + " font-semibold"}>{equivalenceValue}</span> {equivalence}
                    </p>
                </div>
            )}
        </motion.div>
    );
}

export default function CumulativeEnergyDashboard() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-24 mb-12"
        >
            <div className="text-center mb-12">
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
                    🏭 Bilan Cumulé depuis 2011
                </h3>
                <p className="text-zinc-500 max-w-xl mx-auto">
                    15 années de valorisation énergétique au service du territoire
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Tonnage */}
                <StatCard
                    value={CUMUL_DATA.tonnage}
                    unit="tonnes"
                    label="Déchets valorisés"
                    color="gray"
                    icon={<Factory size={24} />}
                    equivalenceValue="90 Tours Eiffel"
                    equivalence="en poids de déchets évités en décharge"
                />

                {/* Électricité */}
                <StatCard
                    value={CUMUL_DATA.electricite_mwh}
                    unit="MWh"
                    label="Électricité produite (cumulé)"
                    color="blue"
                    icon={<Zap size={24} />}
                    equivalenceValue="La ville de Provins"
                    equivalence="alimentée en électricité chaque année depuis 15 ans (~11 000 foyers)"
                />

                {/* Chaleur */}
                <StatCard
                    value={CUMUL_DATA.chaleur_mwh}
                    unit="MWh"
                    label="Chaleur livrée à Coriance (cumulé)"
                    color="orange"
                    icon={<Flame size={24} />}
                    equivalenceValue={EQUIVALENCES.douches_chaudes.toLocaleString()}
                    equivalence="douches chaudes garanties sans gaz fossile"
                />

                {/* Mâchefers */}
                <StatCard
                    value={CUMUL_DATA.machefers_tonnes}
                    unit="tonnes"
                    label="Mâchefers valorisés (REP)"
                    color="gray"
                    icon={<Mountain size={24} />}
                    equivalenceValue="Autoroute Montereau-Paris"
                    equivalence="en sous-couches routières (~70 km sans puiser dans les carrières)"
                />

                {/* Ferrailles */}
                <StatCard
                    value={CUMUL_DATA.ferrailles_tonnes}
                    unit="tonnes"
                    label="Ferrailles recyclées"
                    color="green"
                    icon={<Recycle size={24} />}
                    equivalenceValue="2× la Tour Eiffel"
                    equivalence="en métal réinjecté dans l'industrie sidérurgique"
                />

                {/* Heures de fonctionnement */}
                <StatCard
                    value={CUMUL_DATA.heures_fonct}
                    unit="heures"
                    label="Fonctionnement cumulé"
                    color="blue"
                    icon={<Users size={24} />}
                    equivalenceValue="~8 000h/an"
                    equivalence="de service continu pour les 138 communes"
                />
            </div>

            {/* Comparaisons éloquentes */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="mt-12 p-8 bg-gradient-to-r from-veolia-blue/10 via-zinc-900 to-heat-orange/10 border border-zinc-800 rounded-3xl"
            >
                <h4 className="text-xl font-bold text-white mb-6 text-center">📊 En chiffres parlants</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                    <div className="p-4">
                        <p className="text-3xl font-black text-veolia-blue mb-2">25,8 milliards</p>
                        <p className="text-zinc-500 text-sm">de recharges smartphone cumulées depuis 2011</p>
                    </div>
                    <div className="p-4">
                        <p className="text-3xl font-black text-heat-orange mb-2">84 millions</p>
                        <p className="text-zinc-500 text-sm">de douches chaudes garanties sans fossile</p>
                    </div>
                    <div className="p-4">
                        <p className="text-3xl font-black text-emerald-400 mb-2">100%</p>
                        <p className="text-zinc-500 text-sm">des résidus valorisés (0 déchet ultime)</p>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}
