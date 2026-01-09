"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Download, Headphones, X, Maximize2 } from "lucide-react";

export default function MediaSection() {
    const [videoState, setVideoState] = useState({ isOpen: false, src: "" });

    const openVideo = (src: string) => setVideoState({ isOpen: true, src });
    const closeVideo = () => setVideoState({ isOpen: false, src: "" });

    return (
        <section className="py-24 bg-black relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-zinc-900/50 to-black z-0" />

            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-black text-white mb-4 uppercase tracking-tight">
                        La Médiathèque <span className="text-veolia-blue">2026</span>
                    </h2>
                    <p className="text-white/60 max-w-2xl mx-auto">
                        Retrouvez les contenus immersifs de cette expérience pour les visionner ou les écouter à votre rythme.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto">

                    {/* Carte 1 : Vidéo Narrative (Film Usine) */}
                    <motion.div
                        whileHover={{ y: -5 }}
                        className="group relative bg-zinc-900/50 border border-white/10 rounded-2xl overflow-hidden aspect-video flex flex-col cursor-pointer shadow-lg hover:shadow-veolia-blue/20 transition-all"
                        onClick={() => openVideo("/Media/video_narrative.mp4")}
                    >
                        {/* Video Thumbnail using the video itself (muted/loop) */}
                        <video
                            src="/Media/video_narrative.mp4"
                            muted
                            loop
                            className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity"
                            onMouseOver={(e) => e.currentTarget.play()}
                            onMouseOut={(e) => e.currentTarget.pause()}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90" />

                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 group-hover:scale-110 transition-transform z-20">
                            <Play fill="white" className="ml-1 text-white" size={32} />
                        </div>

                        <div className="absolute bottom-6 left-6 right-6 z-20">
                            <div className="flex items-center gap-2 text-veolia-blue mb-2">
                                <Maximize2 size={16} />
                                <span className="text-xs font-bold uppercase tracking-wider">Le Film</span>
                            </div>
                            <h3 className="text-xl font-bold text-white mb-1">Immersion Totale</h3>
                        </div>
                    </motion.div>

                    {/* Carte 2 : Ambiance Visuelle (Background) */}
                    <motion.div
                        whileHover={{ y: -5 }}
                        className="group relative bg-zinc-900/50 border border-white/10 rounded-2xl overflow-hidden aspect-video flex flex-col cursor-pointer shadow-lg hover:shadow-heat-orange/20 transition-all"
                        onClick={() => openVideo("/Media/video_background.mp4")}
                    >
                        <img
                            src="/Media/factory_photo.png"
                            alt="Atmosphère Usine"
                            className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90" />

                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 group-hover:scale-110 transition-transform z-20">
                            <Play fill="white" className="ml-1 text-white" size={32} />
                        </div>

                        <div className="absolute bottom-6 left-6 right-6 z-20">
                            <div className="flex items-center gap-2 text-heat-orange mb-2">
                                <Maximize2 size={16} />
                                <span className="text-xs font-bold uppercase tracking-wider">Ambiance</span>
                            </div>
                            <h3 className="text-xl font-bold text-white mb-1">Atmosphère Usine</h3>
                        </div>
                    </motion.div>

                    {/* Carte 3 : Podcast Audio */}
                    <motion.div
                        whileHover={{ y: -5 }}
                        className="bg-zinc-900/80 border border-white/10 rounded-2xl p-6 flex flex-col justify-between h-full min-h-[250px] shadow-lg hover:shadow-emerald-500/20 transition-all"
                    >
                        <div className="flex items-start justify-between mb-4">
                            <div className="w-12 h-12 bg-zinc-800 rounded-full flex items-center justify-center">
                                <Headphones className="text-emerald-400" size={24} />
                            </div>
                            <div className="px-3 py-1 bg-emerald-500/20 text-emerald-400 text-xs font-bold rounded-full uppercase tracking-wide">
                                Podcast
                            </div>
                        </div>

                        <div>
                            <h3 className="text-xl font-bold text-white mb-2 leading-tight">Briefing Expert</h3>
                            <p className="text-sm text-zinc-400 mb-6 line-clamp-2">
                                L'analyse complète des performances AI.
                            </p>

                            <a
                                href="/Media/briefing_sovalem_2026.mp3"
                                download
                                className="inline-flex items-center gap-2 bg-white text-black px-4 py-3 rounded-full font-bold hover:bg-zinc-200 transition-colors w-full justify-center text-sm"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <Download size={18} />
                                Télécharger MP3
                            </a>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Video Modal (Generic) */}
            <AnimatePresence>
                {videoState.isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4"
                        onClick={closeVideo}
                    >
                        <div className="relative w-full max-w-6xl aspect-video bg-black rounded-lg overflow-hidden shadow-2xl border border-white/10">
                            <button
                                onClick={(e) => { e.stopPropagation(); closeVideo(); }}
                                className="absolute top-4 right-4 z-10 p-2 bg-black/50 hover:bg-white/20 rounded-full text-white transition-colors"
                            >
                                <X size={24} />
                            </button>

                            <video
                                src={videoState.src}
                                controls
                                autoPlay
                                className="w-full h-full object-contain"
                                onClick={(e) => e.stopPropagation()}
                            />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
