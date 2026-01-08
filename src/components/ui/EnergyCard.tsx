"use client";

import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useRef } from "react";

interface EnergyCardProps {
    title: string;
    value: number;
    unit: string;
    subtitle: string;
    color: string;
    tooltip?: string;
    icon?: React.ReactNode;
}

export default function EnergyCard({
    title,
    value,
    unit,
    subtitle,
    color,
    tooltip,
    icon,
}: EnergyCardProps) {
    const count = useMotionValue(0);
    const rounded = useTransform(count, (latest) => Math.round(latest).toLocaleString("fr-FR"));
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    useEffect(() => {
        if (isInView) {
            const controls = animate(count, value, {
                duration: 2,
                ease: "easeOut",
            });
            return controls.stop;
        }
    }, [isInView, value, count]);

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative group p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800 backdrop-blur-sm hover:border-zinc-700 transition-all h-full flex flex-col justify-between min-h-[180px]"
        >
            <div>
                <div className="flex items-start justify-between">
                    <div>
                        <h3 className="text-zinc-400 text-sm font-medium uppercase tracking-wider">{title}</h3>
                        <p className="text-zinc-500 text-xs">{subtitle}</p>
                    </div>
                    <div
                        className="p-2 rounded-lg shrink-0"
                        style={{ backgroundColor: `${color}20`, color }}
                    >
                        {icon}
                    </div>
                </div>

                <div className="flex items-baseline gap-2">
                    <motion.span
                        className="text-4xl font-bold tracking-tight text-white"
                    >
                        {rounded}
                    </motion.span>
                    <span className="text-zinc-400 font-medium">{unit}</span>
                </div>
            </div>

            {tooltip && (
                <div className="mt-6 pt-4 border-t border-zinc-800/50">
                    <p className="text-xs text-zinc-500 italic flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: color }} />
                        {tooltip}
                    </p>
                </div>
            )}

            {/* Hover decoration */}
            <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity pointer-events-none"
                style={{ background: `radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), ${color}, transparent 40%)` }}
            />
        </motion.div>
    );
}
