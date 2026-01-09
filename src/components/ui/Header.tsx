"use client";

import { motion } from "framer-motion";
import { FileDown } from "lucide-react";

export default function Header() {
    const scrollToBottom = () => {
        window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: 'smooth'
        });
    };

    return (
        <motion.header
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/10"
        >
            <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                {/* Logo / Title */}
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-veolia-blue rounded-lg flex items-center justify-center">
                        <span className="text-white font-black text-sm">S</span>
                    </div>
                    <span className="text-white font-bold text-lg hidden md:block">SOVALEM 2026</span>
                </div>

                {/* CTA Button */}
                <button
                    onClick={scrollToBottom}
                    className="flex items-center gap-2 bg-veolia-blue hover:bg-veolia-blue/80 text-white px-4 md:px-6 py-2 md:py-3 rounded-full font-bold transition-all shadow-lg shadow-veolia-blue/20 hover:shadow-veolia-blue/40 text-sm md:text-base"
                >
                    <FileDown size={18} />
                    <span className="hidden sm:inline">Générer votre rapport</span>
                    <span className="sm:hidden">Rapport</span>
                </button>
            </div>
        </motion.header>
    );
}
