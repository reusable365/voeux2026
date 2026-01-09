"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, Volume2, X } from "lucide-react";

export default function FloatingAudioPlayer() {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const audioRef = useRef<HTMLAudioElement>(null);

    // Toggle play/pause
    const togglePlay = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    // Handle time update
    const handleTimeUpdate = () => {
        if (audioRef.current) {
            setCurrentTime(audioRef.current.currentTime);
        }
    };

    // Handle loaded metadata
    const handleLoadedMetadata = () => {
        if (audioRef.current) {
            setDuration(audioRef.current.duration);
        }
    };

    if (!isVisible) return null;

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2"
        >
            {/* Tooltip d'invitation (disparaît après lecture ou clic) */}
            <AnimatePresence>
                {!isPlaying && currentTime === 0 && (
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="bg-veolia-blue text-white text-xs font-bold px-3 py-2 rounded-lg shadow-lg mb-2 relative"
                    >
                        Ecoutez le bilan pour 2026 🎧
                        <div className="absolute -bottom-1 right-6 w-2 h-2 bg-veolia-blue rotate-45" />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Lecteur Audio Glassmorphism */}
            <div className="backdrop-blur-md bg-white/5 border border-white/10 p-4 rounded-2xl shadow-2xl flex items-center gap-4 w-64 transition-all hover:bg-white/10 group">
                <audio
                    ref={audioRef}
                    src="/Media/briefing_sovalem_2026.mp3"
                    onTimeUpdate={handleTimeUpdate}
                    onLoadedMetadata={handleLoadedMetadata}
                    onEnded={() => setIsPlaying(false)}
                />

                <button
                    onClick={togglePlay}
                    className="w-10 h-10 rounded-full bg-veolia-blue flex items-center justify-center text-white hover:bg-veolia-blue/80 transition-colors shadow-lg shadow-veolia-blue/20"
                >
                    {isPlaying ? <Pause size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" className="ml-1" />}
                </button>

                <div className="flex-1">
                    <div className="flex justify-between items-center text-xs text-zinc-400 mb-1">
                        <span className="font-medium text-white">Expert Sovalem</span>
                        <span>{formatTime(currentTime)} / {formatTime(duration || 0)}</span>
                    </div>

                    {/* Visualizer / Progress Bar */}
                    <div className="h-8 flex items-center gap-[2px] overflow-hidden">
                        {isPlaying ? (
                            // Fake waveform animation when playing
                            Array.from({ length: 20 }).map((_, i) => (
                                <motion.div
                                    key={i}
                                    className="w-1 bg-gradient-to-t from-veolia-blue to-emerald-400 rounded-full"
                                    animate={{
                                        height: [
                                            Math.random() * 10 + 4,
                                            Math.random() * 24 + 4,
                                            Math.random() * 10 + 4
                                        ]
                                    }}
                                    transition={{
                                        duration: 0.5,
                                        repeat: Infinity,
                                        delay: i * 0.05,
                                        ease: "easeInOut"
                                    }}
                                />
                            ))
                        ) : (
                            // Static progress bar when paused
                            <div className="w-full h-1 bg-zinc-800 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-veolia-blue transition-all duration-100"
                                    style={{ width: `${(currentTime / duration) * 100}%` }}
                                />
                            </div>
                        )}
                    </div>
                </div>

                <button
                    onClick={() => setIsVisible(false)}
                    className="text-zinc-500 hover:text-white transition-colors"
                >
                    <X size={14} />
                </button>
            </div>
        </motion.div>
    );
}

function formatTime(seconds: number) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
}
