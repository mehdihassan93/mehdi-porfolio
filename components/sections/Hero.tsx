'use client';

import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Rocket, ArrowRight, Smartphone } from 'lucide-react';
import Typewriter from 'typewriter-effect';


export const Hero = () => {
    const [isMounted, setIsMounted] = useState(false);
    const { scrollY } = useScroll();

    // Smooth Parallax Effects
    const yTransform = useTransform(scrollY, [0, 500], [0, 150]);
    const opacityTransform = useTransform(scrollY, [0, 300], [1, 0]);
    const scaleTransform = useTransform(scrollY, [0, 500], [1, 0.9]);

    // Mouse Parallax
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    useEffect(() => {
        setIsMounted(true);
        const handleMouseMove = (e: MouseEvent) => {
            const x = (e.clientX / window.innerWidth - 0.5) * 40;
            const y = (e.clientY / window.innerHeight - 0.5) * 40;
            setMousePos({ x, y });
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <section className="relative min-h-[95vh] flex items-center justify-center pt-32 overflow-hidden bg-transparent">
            {/* Dynamic Tech Grid */}
            <div className="absolute inset-0 tech-grid opacity-20 pointer-events-none" />

            {/* Cinematic Background Glows */}
            <motion.div
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.15, 0.25, 0.15]
                }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-1/4 left-1/4 w-[50vw] h-[50vw] bg-primary/30 blur-[180px] rounded-full"
            />
            <motion.div
                animate={{
                    scale: [1.2, 1, 1.2],
                    opacity: [0.1, 0.2, 0.1]
                }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute bottom-1/4 right-1/4 w-[50vw] h-[50vw] bg-secondary/20 blur-[180px] rounded-full"
            />

            <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 w-full">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    {/* Text Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                        className="text-left"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-md mb-10">
                            <Smartphone size={14} className="text-primary" />
                            <span className="text-[10px] font-black tracking-[0.4em] uppercase text-primary">
                                Android Developer @ AIDEON
                            </span>
                        </div>

                        <h1 className="text-5xl md:text-[80px] xl:text-[110px] font-black leading-[0.8] tracking-tighter mb-10 uppercase italic">
                            Mehdi <br />
                            <span className="text-gradient">Hassan</span>
                        </h1>

                        <div className="text-lg md:text-xl font-light tracking-[0.1em] uppercase opacity-70 flex flex-wrap items-center gap-x-3 gap-y-2 mb-8">
                            Engineering
                            <span className="text-primary font-bold">
                                {isMounted && (
                                    <Typewriter
                                        options={{
                                            strings: [
                                                '120FPS Performance.',
                                                'Deterministic UI.',
                                                'Clean Architecture.',
                                                'Scalable Systems.'
                                            ],
                                            autoStart: true,
                                            loop: true,
                                            deleteSpeed: 40,
                                            delay: 60,
                                        }}
                                    />
                                )}
                            </span>
                        </div>

                        <p className="max-w-xl text-base md:text-lg opacity-60 mb-12 leading-relaxed font-light">
                            Specializing in <span className="text-primary font-medium">Jetpack Compose</span> and low-latency mobile infrastructure.
                            Currently building the next generation of UAE-scale retail systems at <span className="text-foreground font-semibold">AIDEON Limited</span>.
                        </p>

                        <div className="flex flex-wrap items-center gap-8">
                            <a href="#projects" className="btn-primary group flex items-center gap-3 !px-10 !py-5">
                                View Case Studies <Rocket size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                            </a>
                            <a href="#contact" className="group flex items-center gap-2 font-black uppercase tracking-[0.25em] text-[10px] hover:text-primary transition-all">
                                Initialize Git <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                            </a>
                        </div>
                    </motion.div>

                    {/* Cinematic Portrait Showcase - Now Bird Flock Boids */}

                </div>

                {/* Technical Achievement Row */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto mt-24">
                    {[
                        { label: 'Kotlin Expert', detail: 'Advanced Flow & Coroutines' },
                        { label: 'Compose Master', detail: 'Complex UI Orchestration' },
                        { label: 'MVI Architect', detail: 'Deterministic State Management' },
                        { label: 'Performance', detail: 'Sub-16ms Frame Times' }
                    ].map((item, idx) => (
                        <motion.div
                            key={item.label}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 0.5, y: 0 }}
                            whileHover={{ opacity: 1, scale: 1.05, backgroundColor: 'rgba(255,255,255,0.05)' }}
                            transition={{ delay: 0.8 + (idx * 0.1) }}
                            className="px-6 py-8 glass-card border-white/5 flex flex-col items-start gap-2"
                        >
                            <span className="text-[10px] font-black uppercase tracking-widest text-primary">{item.label}</span>
                            <span className="text-[9px] font-medium uppercase tracking-tight opacity-50">{item.detail}</span>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
