"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";

interface EnergyGaugeProps {
    label: string;
    value: number;
    max: number;
    unit: string;
    color: "blue" | "orange";
    subtitle?: string;
    equivalence?: string;
}

export default function EnergyGauge({
    label,
    value,
    max,
    unit,
    color,
    subtitle,
    equivalence,
}: EnergyGaugeProps) {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, amount: 0.5 });
    const [displayValue, setDisplayValue] = useState(0);

    const percentage = Math.min((value / max) * 100, 100);
    const colorClass = color === "blue" ? "bg-veolia-blue" : "bg-heat-orange";
    const textColorClass = color === "blue" ? "text-veolia-blue" : "text-heat-orange";
    const glowClass = color === "blue"
        ? "shadow-[0_0_20px_rgba(0,69,135,0.5)]"
        : "shadow-[0_0_20px_rgba(255,107,0,0.5)]";

    useEffect(() => {
        if (isInView) {
            const duration = 2000;
            const startTime = Date.now();
            const animate = () => {
                const elapsed = Date.now() - startTime;
                const progress = Math.min(elapsed / duration, 1);
                const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
                setDisplayValue(Math.floor(value * eased));
                if (progress < 1) requestAnimationFrame(animate);
            };
            requestAnimationFrame(animate);
        }
    }, [isInView, value]);

    return (
        <div ref={ref} className="relative p-6 bg-zinc-900/50 border border-zinc-800 rounded-2xl">
            <div className="flex items-center justify-between mb-4">
                <h4 className={`text-lg font-bold ${textColorClass}`}>{label}</h4>
                {subtitle && <span className="text-xs text-zinc-500">{subtitle}</span>}
            </div>

            {/* Gauge Bar */}
            <div className="relative h-4 bg-zinc-800 rounded-full overflow-hidden mb-4">
                <motion.div
                    initial={{ width: 0 }}
                    animate={isInView ? { width: `${percentage}%` } : { width: 0 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className={`absolute h-full ${colorClass} rounded-full ${glowClass}`}
                />
            </div>

            {/* Value Display */}
            <div className="flex items-baseline gap-2 mb-3">
                <span className={`text-4xl font-black ${textColorClass}`}>
                    {displayValue.toLocaleString()}
                </span>
                <span className="text-zinc-400 text-sm">{unit}</span>
            </div>

            {/* Equivalence */}
            {equivalence && (
                <p className="text-zinc-500 text-sm leading-relaxed border-t border-zinc-800 pt-3 mt-3">
                    💡 {equivalence}
                </p>
            )}
        </div>
    );
}
