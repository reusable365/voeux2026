"use client";

import { motion } from "framer-motion";
import { Flame, Zap, Mountain, Clock, TrendingUp } from "lucide-react";
import EnergyGauge from "../ui/EnergyGauge";
import MatterCard from "../ui/MatterCard";

// Cumulative data since 2011 (estimated from production_history)
const CUMUL_ELEC_MWH = 388000; // ~388 GWh since 2011
const CUMUL_HEAT_MWH = 210000; // ~210 GWh since 2011
const CUMUL_TONNAGE = 903000; // tonnes

export default function ForgeDesRessources() {
    return (
        <section className="py-24 px-6 md:px-12 bg-black text-white overflow-hidden relative" id="forge-ressources">
            {/* Background Effects */}
            <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-veolia-blue/5 blur-[200px] pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-heat-orange/5 blur-[200px] pointer-events-none" />

            <div className="max-w-6xl mx-auto relative z-10">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-20 text-center"
                >
                    <h2 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight">
                        La <span className="text-veolia-blue">Forge</span> des{" "}
                        <span className="text-heat-orange">Ressources</span>
                    </h2>
                    <div className="h-1 w-24 bg-gradient-to-r from-veolia-blue to-heat-orange mx-auto mb-8" />
                    <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
                        Depuis 2011, chaque tonne de déchets se transforme en énergie et en matière première pour le territoire.
                    </p>
                </motion.div>

                {/* CUMULATIVE HERO STATS (Since 2011) */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-20 p-8 md:p-12 bg-gradient-to-br from-zinc-900 to-zinc-950 border border-zinc-800 rounded-3xl relative overflow-hidden"
                >
                    <div className="absolute -top-10 -right-10 opacity-5">
                        <TrendingUp size={200} strokeWidth={0.5} />
                    </div>

                    <div className="relative z-10">
                        <h3 className="text-xl font-bold text-zinc-400 mb-8 flex items-center gap-3 uppercase tracking-widest">
                            <span className="text-2xl">🏭</span> Bilan Cumulé depuis 2011
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="text-center p-6 bg-black/30 rounded-2xl border border-zinc-800">
                                <span className="text-4xl md:text-5xl font-black text-white">{CUMUL_TONNAGE.toLocaleString()}+</span>
                                <p className="text-zinc-500 mt-2 text-sm">tonnes valorisées</p>
                            </div>
                            <div className="text-center p-6 bg-black/30 rounded-2xl border border-veolia-blue/30">
                                <span className="text-4xl md:text-5xl font-black text-veolia-blue">{(CUMUL_ELEC_MWH / 1000).toFixed(0)} GWh</span>
                                <p className="text-zinc-500 mt-2 text-sm">électricité produite</p>
                            </div>
                            <div className="text-center p-6 bg-black/30 rounded-2xl border border-heat-orange/30">
                                <span className="text-4xl md:text-5xl font-black text-heat-orange">{(CUMUL_HEAT_MWH / 1000).toFixed(0)} GWh</span>
                                <p className="text-zinc-500 mt-2 text-sm">chaleur livrée à Coriance</p>
                            </div>
                        </div>

                        {/* WOUAH Comparatif */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="mt-10 p-6 bg-gradient-to-r from-veolia-blue/10 to-heat-orange/10 border border-zinc-700 rounded-2xl text-center"
                        >
                            <p className="text-xl md:text-2xl font-bold text-white mb-2">
                                🗼 En 15 ans, nous avons évité une montagne de déchets
                            </p>
                            <p className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-veolia-blue to-heat-orange">
                                haute comme 90 Tours Eiffel
                            </p>
                        </motion.div>
                    </div>
                </motion.div>

                {/* 2025 Performance Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-8"
                >
                    <h3 className="text-2xl font-bold text-white mb-2 text-center">Performance 2025</h3>
                    <p className="text-zinc-500 text-center text-sm mb-12">Dernière année complète</p>
                </motion.div>

                {/* Two Columns: Energy & Matter */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
                    {/* ENERGY Column */}
                    <div>
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="flex items-center gap-3 mb-8"
                        >
                            <div className="w-12 h-12 rounded-xl bg-veolia-blue/10 border border-veolia-blue/30 flex items-center justify-center">
                                <Zap className="text-veolia-blue" size={24} />
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-white">ÉNERGIE</h3>
                                <p className="text-zinc-500 text-sm">Production 2025</p>
                            </div>
                        </motion.div>

                        <div className="space-y-6">
                            <EnergyGauge
                                label="Électricité"
                                value={35093}
                                max={40000}
                                unit="MWh"
                                color="blue"
                                subtitle="Turbine 5,5 MW"
                                equivalence="Assez d'électricité pour éclairer 8 000 foyers du territoire. Un sac de 30L génère 2,2 kWh."
                            />
                            <EnergyGauge
                                label="Chaleur Coriance"
                                value={21519}
                                max={25000}
                                unit="MWh"
                                color="orange"
                                subtitle="Réseau urbain • 87% rendement"
                                equivalence="Objectif contractuel de 20 697 MWh dépassé ! Équivalent à 2 500 appartements chauffés sans gaz fossile."
                            />
                        </div>
                    </div>

                    {/* MATTER Column */}
                    <div>
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="flex items-center gap-3 mb-8"
                        >
                            <div className="w-12 h-12 rounded-xl bg-zinc-700/30 border border-zinc-600 flex items-center justify-center">
                                <Mountain className="text-zinc-400" size={24} />
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-white">MATIÈRE</h3>
                                <p className="text-zinc-500 text-sm">Renaissance des Déchets</p>
                            </div>
                        </motion.div>

                        <div className="space-y-6">
                            <MatterCard
                                type="machefers"
                                value={14294}
                                unit="tonnes en 2024"
                                description="71-79% du tonnage évacué. Envoyés vers une filière REP pour valorisation en sous-couches routières locales."
                                equivalence="Plus de 200 000 tonnes depuis 2011 : de quoi construire une autoroute Montereau-Paris !"
                            />
                            <MatterCard
                                type="ferrailles"
                                value={1440}
                                unit="tonnes en 2024"
                                description="Extraction par électroaimant. Métaux expédiés vers PREFERNORD/SAME. Recettes ~74 000 €/an."
                                equivalence="20 000 tonnes depuis 2011 : 2× le poids de la Tour Eiffel réinjectées dans l'industrie !"
                            />
                        </div>
                    </div>
                </div>

                {/* Historical Vision: Le Rétroviseur */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="p-8 md:p-12 bg-gradient-to-br from-zinc-900/50 to-zinc-950/50 border border-zinc-800 rounded-3xl relative overflow-hidden"
                >
                    <div className="absolute -top-10 -right-10 opacity-5">
                        <Clock size={200} strokeWidth={0.5} />
                    </div>

                    <div className="relative z-10">
                        <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                            <span className="text-3xl">🔙</span> Le Rétroviseur : Fiabilité
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="text-center p-6 bg-black/30 rounded-2xl border border-zinc-800">
                                <span className="text-5xl md:text-6xl font-black text-heat-orange">~8 000</span>
                                <p className="text-zinc-400 mt-2">heures/an de service continu</p>
                            </div>
                            <div className="text-center p-6 bg-black/30 rounded-2xl border border-zinc-800">
                                <span className="text-5xl md:text-6xl font-black text-veolia-blue">15</span>
                                <p className="text-zinc-400 mt-2">années de valorisation</p>
                            </div>
                        </div>

                        {/* Eloquent Comparisons */}
                        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-zinc-400">
                            <div className="p-4 bg-black/20 rounded-xl border border-zinc-800/50">
                                <span className="text-veolia-blue font-bold">⚡ Électricité :</span>
                                <p className="mt-1">Depuis le début, nous avons produit assez d'énergie pour que chaque habitant des 138 communes puisse recharger son téléphone chaque jour pendant 50 ans.</p>
                            </div>
                            <div className="p-4 bg-black/20 rounded-xl border border-zinc-800/50">
                                <span className="text-heat-orange font-bold">🔥 Chaleur :</span>
                                <p className="mt-1">L'équivalent de millions de bains chauds garantis sans énergie fossile pour les Monterelais.</p>
                            </div>
                            <div className="p-4 bg-black/20 rounded-xl border border-zinc-800/50">
                                <span className="text-zinc-300 font-bold">🛤️ Matière :</span>
                                <p className="mt-1">Nos mâchefers ont servi à stabiliser des dizaines de kilomètres de routes locales en Seine-et-Marne.</p>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
