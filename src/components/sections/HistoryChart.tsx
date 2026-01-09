"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { YearlyProduction } from "@/types/data";
import sovalemData from "@/data/sovalem_data.json";

const data = (sovalemData as any).production_history as YearlyProduction[];

export default function HistoryChart() {
    const maxProd = Math.max(...data.map((d) => Math.max(d.mwh_electrique, d.mwh_thermique)));
    const [selectedYear, setSelectedYear] = useState<number | null>(null);

    const handleBarClick = (year: number) => {
        setSelectedYear(selectedYear === year ? null : year);
    };

    return (
        <div className="w-full max-w-5xl mx-auto py-20 px-4 relative">
            <div className="text-center mb-12">
                <h3 className="text-2xl font-bold text-white mb-2">Historique de Valorisation</h3>
                <p className="text-zinc-500 text-sm">Énergie produite par l'UVE depuis sa mise en service (MWh)</p>
                <p className="text-zinc-600 text-xs mt-2 md:hidden">Touchez une barre pour voir les détails</p>
            </div>

            <div className="relative h-[350px] md:h-[400px] flex items-end justify-between gap-1 md:gap-4 border-b border-zinc-800 pb-2">
                {/* Y-Axis scale (simplified) */}
                <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-[10px] text-zinc-600 -translate-x-full pr-4 pointer-events-none">
                    <span>{Math.round(maxProd).toLocaleString()}</span>
                    <span>{Math.round(maxProd / 2).toLocaleString()}</span>
                    <span>0</span>
                </div>

                {data.map((yearData, idx) => {
                    // Réduction de 6% sur mobile pour mieux voir l'échelle
                    const scaleFactor = 0.94; // 94% = réduction de 6%
                    const elecHeight = (yearData.mwh_electrique / maxProd) * 100 * scaleFactor;
                    const heatHeight = (yearData.mwh_thermique / maxProd) * 100 * scaleFactor;
                    const isSelected = selectedYear === yearData.annee;

                    return (
                        <div
                            key={yearData.annee}
                            className="flex-1 flex flex-col items-center group relative h-full cursor-pointer"
                            onClick={() => handleBarClick(yearData.annee)}
                        >
                            {/* Tooltip combiné pour mobile (affiché au clic) */}
                            {isSelected && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="absolute -top-20 left-1/2 -translate-x-1/2 bg-zinc-900 border border-zinc-700 px-3 py-2 rounded-lg text-xs text-white z-30 whitespace-nowrap shadow-xl md:hidden"
                                >
                                    <div className="font-bold text-white mb-1">{yearData.annee}</div>
                                    <div className="flex items-center gap-2 text-veolia-blue">
                                        <span className="w-2 h-2 bg-veolia-blue rounded-full"></span>
                                        {yearData.mwh_electrique.toLocaleString()} MWh
                                    </div>
                                    <div className="flex items-center gap-2 text-heat-orange">
                                        <span className="w-2 h-2 bg-heat-orange rounded-full"></span>
                                        {yearData.mwh_thermique.toLocaleString()} MWh
                                    </div>
                                    <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-zinc-900 border-b border-r border-zinc-700 rotate-45"></div>
                                </motion.div>
                            )}

                            <div className="flex gap-0.5 h-full items-end w-full max-w-[40px] relative">
                                {/* Electricity Bar */}
                                <motion.div
                                    initial={{ scaleY: 0 }}
                                    whileInView={{ scaleY: 1 }}
                                    viewport={{ once: true, amount: 0.3 }}
                                    transition={{ duration: 0.8, delay: idx * 0.05, ease: "easeOut" }}
                                    style={{ height: `${elecHeight}%`, transformOrigin: "bottom" }}
                                    className={`flex-1 rounded-t-sm relative transition-all ${isSelected
                                        ? 'bg-veolia-blue ring-2 ring-veolia-blue/50'
                                        : 'bg-veolia-blue/80 group-hover:bg-veolia-blue'
                                        }`}
                                >
                                    {/* Tooltip on hover (PC only) */}
                                    <div className="hidden md:block absolute -top-12 left-1/2 -translate-x-1/2 bg-zinc-900 border border-zinc-700 px-2 py-1 rounded text-[10px] text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-20 pointer-events-none">
                                        {yearData.annee}: {yearData.mwh_electrique.toLocaleString()} MWh (Elec)
                                    </div>
                                </motion.div>

                                {/* Heat Bar */}
                                <motion.div
                                    initial={{ scaleY: 0 }}
                                    whileInView={{ scaleY: 1 }}
                                    viewport={{ once: true, amount: 0.3 }}
                                    transition={{ duration: 0.8, delay: idx * 0.05 + 0.1, ease: "easeOut" }}
                                    style={{ height: `${heatHeight}%`, transformOrigin: "bottom" }}
                                    className={`flex-1 rounded-t-sm relative transition-all ${isSelected
                                        ? 'bg-heat-orange ring-2 ring-heat-orange/50'
                                        : 'bg-heat-orange/80 group-hover:bg-heat-orange'
                                        }`}
                                >
                                    <div className="hidden md:block absolute -top-8 left-1/2 -translate-x-1/2 bg-zinc-900 border border-zinc-700 px-2 py-1 rounded text-[10px] text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-20 pointer-events-none">
                                        {yearData.mwh_thermique.toLocaleString()} MWh (Chaleur)
                                    </div>
                                </motion.div>
                            </div>

                            <span className={`mt-4 text-[10px] md:text-xs font-medium rotate-45 md:rotate-0 transition-colors ${isSelected ? 'text-white' : 'text-zinc-500'
                                }`}>
                                {yearData.annee}
                            </span>
                        </div>
                    );
                })}
            </div>

            <div className="mt-12 flex justify-center gap-8 text-xs">
                <div className="flex items-center gap-2 text-zinc-400">
                    <div className="w-3 h-3 bg-veolia-blue/80 rounded-sm" />
                    <span>Électricité Valorisée</span>
                </div>
                <div className="flex items-center gap-2 text-zinc-400">
                    <div className="w-3 h-3 bg-heat-orange/80 rounded-sm" />
                    <span>Chaleur Urbaine Coriance</span>
                </div>
            </div>
        </div>
    );
}
