"use client";

import { useEffect, useRef } from "react";

interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    life: number;
    color: string;
}

interface ParticleFlowProps {
    color: string;
    count?: number;
    className?: string;
    direction?: "left" | "right";
}

export default function ParticleFlow({
    color,
    count = 50,
    className = "",
    direction = "right",
}: ParticleFlowProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const particles = useRef<Particle[]>([]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const resize = () => {
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
        };

        window.addEventListener("resize", resize);
        resize();

        const createParticle = (): Particle => ({
            x: direction === "right" ? 0 : canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() * 2 + 1) * (direction === "right" ? 1 : -1),
            vy: (Math.random() - 0.5) * 0.5,
            life: Math.random() * 0.5 + 0.5,
            color,
        });

        // Initialize particles
        particles.current = Array.from({ length: count }, createParticle);

        let animationFrame: number;

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particles.current.forEach((p, i) => {
                p.x += p.vx;
                p.y += p.vy;
                p.life -= 0.005;

                if (p.life <= 0 || (direction === "right" ? p.x > canvas.width : p.x < 0)) {
                    particles.current[i] = createParticle();
                }

                ctx.beginPath();
                ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
                ctx.fillStyle = p.color;
                ctx.globalAlpha = p.life;
                ctx.fill();
                ctx.globalAlpha = 1;
            });

            animationFrame = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener("resize", resize);
            cancelAnimationFrame(animationFrame);
        };
    }, [color, count, direction]);

    return <canvas ref={canvasRef} className={`w-full h-full pointer-events-none ${className}`} />;
}
