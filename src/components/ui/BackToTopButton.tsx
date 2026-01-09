"use client";

import { motion } from "framer-motion";
import { ArrowUp } from "lucide-react";

export default function BackToTopButton() {
    const scrollToTop = () => {
        const startY = window.scrollY;
        const duration = 3000; // 3 secondes pour voir remonter
        let start: number | null = null;

        const step = (timestamp: number) => {
            if (!start) start = timestamp;
            const progress = Math.min((timestamp - start) / duration, 1);
            const easeProgress = progress < 0.5
                ? 2 * progress * progress
                : 1 - Math.pow(-2 * progress + 2, 2) / 2; // easeInOutQuad
            window.scrollTo(0, startY * (1 - easeProgress));
            if (progress < 1) {
                requestAnimationFrame(step);
            }
        };
        requestAnimationFrame(step);
    };

    return (
        <div className="w-full py-16 flex justify-center">
            <motion.button
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                onClick={scrollToTop}
                className="group flex items-center gap-3 bg-gradient-to-r from-veolia-blue to-heat-orange hover:from-veolia-blue/80 hover:to-heat-orange/80 text-white px-8 py-4 rounded-full font-bold transition-all shadow-2xl hover:shadow-veolia-blue/50 text-lg"
            >
                <ArrowUp size={24} className="group-hover:-translate-y-1 transition-transform" />
                Commencer le voyage
            </motion.button>
        </div>
    );
}
