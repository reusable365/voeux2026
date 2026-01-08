"use client";

import React from "react";
import { motion } from "framer-motion";

interface BoilerSchematicProps {
    onHover: (id: string | null) => void;
    activeId: string | null;
}

export const BoilerSchematic = ({ onHover, activeId }: BoilerSchematicProps) => {
    const points = [
        { id: "chaudiere", x: 200, y: 350, label: "Chaudière" },
        { id: "tubes", x: 250, y: 280, label: "30 km de tubes" },
        { id: "vapeur", x: 340, y: 115, label: "Vapeur" },
        { id: "service", x: 180, y: 530, label: "Disponibilité" },
    ];

    return (
        <svg
            viewBox="0 0 400 600"
            className="w-full h-auto max-w-[400px] drop-shadow-2xl"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            {/* Background Structure */}
            <rect x="50" y="50" width="300" height="500" rx="10" fill="#1a1a1a" stroke="#333" strokeWidth="2" />

            {/* Internal Pipes / Tubes Schematic */}
            <motion.path
                d="M 80 115 L 340 115"
                stroke={activeId === "vapeur" ? "var(--heat-orange)" : "#444"}
                strokeWidth="4"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.5 }}
                className="transition-colors duration-500"
            />
            <circle cx="340" cy="115" r="4" fill={activeId === "vapeur" ? "var(--heat-orange)" : "#444"} />

            {/* Main Boiler Body */}
            <rect x="80" y="160" width="240" height="380" rx="5" fill="#111" stroke="#333" strokeWidth="2" />

            {/* The Drum (Ballon) */}
            <rect x="120" y="140" width="160" height="30" rx="15" fill="#1a1a1a" stroke="#444" strokeWidth="2" />
            <motion.path
                d="M 140 145 H 260"
                stroke="var(--veolia-blue)"
                strokeWidth="2"
                opacity="0.3"
                animate={{ opacity: [0.2, 0.5, 0.2] }}
                transition={{ duration: 2, repeat: Infinity }}
            />

            {/* Vertical Tubes */}
            {[...Array(12)].map((_, i) => (
                <rect
                    key={i}
                    x={100 + i * 18}
                    y={180}
                    width="4"
                    height="320"
                    fill={activeId === "tubes" ? "var(--veolia-blue)" : "#222"}
                    className="transition-colors duration-500"
                />
            ))}

            {/* The Grate (Grille) */}
            <rect x="100" y="500" width="200" height="20" rx="5" fill="#1a1a1a" stroke="#333" />
            <motion.rect
                x="110" y="505" width="180" height="10" rx="2"
                fill="var(--heat-orange)"
                animate={{ opacity: [0.3, 0.8, 0.3], filter: ["blur(2px)", "blur(4px)", "blur(2px)"] }}
                transition={{ duration: 3, repeat: Infinity }}
            />

            {/* Interactive Points */}
            {points.map((pt) => (
                <g
                    key={pt.id}
                    onMouseEnter={() => onHover(pt.id)}
                    onMouseLeave={() => onHover(null)}
                    className="cursor-pointer"
                >
                    {/* Invisible Hit Area */}
                    <circle cx={pt.x} cy={pt.y} r="30" fill="transparent" />

                    {/* Pulse Effect */}
                    <motion.circle
                        cx={pt.x}
                        cy={pt.y}
                        r="12"
                        fill="var(--heat-orange)"
                        initial={{ opacity: 0.3, scale: 0.8 }}
                        animate={{
                            opacity: activeId === pt.id ? 0.8 : 0.4,
                            scale: activeId === pt.id ? 1.5 : 1
                        }}
                        transition={{ duration: 0.5, repeat: activeId === pt.id ? Infinity : 0, repeatType: "reverse" }}
                    />
                    <circle
                        cx={pt.x}
                        cy={pt.y}
                        r="6"
                        fill="var(--heat-orange)"
                        className="drop-shadow-[0_0_8px_var(--heat-orange)]"
                    />
                </g>
            ))}

            {/* Accents */}
            <path d="M 50 500 L 350 500" stroke="var(--veolia-blue)" strokeWidth="4" strokeLinecap="round" opacity="0.5" />
        </svg>
    );
};
