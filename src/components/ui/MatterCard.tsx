"use client";

import { motion } from "framer-motion";
import { Recycle, Route, Magnet } from "lucide-react";

interface MatterCardProps {
    type: "machefers" | "ferrailles";
    value: number;
    unit: string;
    description: string;
    equivalence: string;
}

export default function MatterCard({
    type,
    value,
    unit,
    description,
    equivalence,
}: MatterCardProps) {
    const isMachefers = type === "machefers";
    const Icon = isMachefers ? Route : Magnet;
    const title = isMachefers ? "Mâchefers Valorisés" : "Ferrailles Extraites";
    const bgGradient = isMachefers
        ? "from-zinc-700/20 to-zinc-900/50"
        : "from-slate-600/20 to-zinc-900/50";

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`relative p-6 bg-gradient-to-br ${bgGradient} border border-zinc-700 rounded-2xl overflow-hidden group`}
        >
            {/* Background Icon */}
            <div className="absolute -bottom-4 -right-4 opacity-5 group-hover:opacity-10 transition-opacity">
                <Icon size={140} strokeWidth={1} />
            </div>

            <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-zinc-800 flex items-center justify-center text-zinc-400">
                        <Icon size={20} />
                    </div>
                    <h4 className="text-lg font-bold text-zinc-200">{title}</h4>
                </div>

                <p className="text-zinc-400 text-sm mb-4 leading-relaxed">
                    {description}
                </p>

                <div className="flex items-baseline gap-2 mb-4 pb-4 border-b border-zinc-700">
                    <span className="text-3xl font-black text-white">
                        {value.toLocaleString()}
                    </span>
                    <span className="text-zinc-500 text-sm">{unit}</span>
                </div>

                <div className="flex items-start gap-2 text-sm">
                    <Recycle size={16} className="text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-zinc-400">{equivalence}</span>
                </div>
            </div>
        </motion.div>
    );
}
