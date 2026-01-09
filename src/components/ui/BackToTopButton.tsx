"use client";

import { motion } from "framer-motion";
import { ArrowUp } from "lucide-react";

export default function BackToTopButton() {
    const scrollToTop = () => {
        // Pour PC (>= 768px), on garde le scroll doux et lent
        if (window.innerWidth >= 768) {
            import('@/lib/smoothScroll').then(({ smoothScrollTo }) => {
                smoothScrollTo(0, 3000); // 3 seconds back to top
            });
        } else {
            // Pour Mobile, retour instantané
            window.scrollTo({ top: 0, behavior: "auto" });
        }
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
