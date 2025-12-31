'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/hooks/use-theme';
import { Users, Cpu, Trophy, LucideIcon } from 'lucide-react';
import React from 'react';
import Image from 'next/image';

const StatCard = ({ icon: Icon, label, value }: { icon: LucideIcon, label: string, value: string }) => (
    <motion.div
        whileHover={{ y: -5 }}
        className="glass-card flex flex-col items-center text-center p-6 border-primary/5 hover:border-primary/20 aspect-square justify-center transition-all duration-500"
    >
        <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mb-4 text-primary group-hover:scale-110 transition-transform">
            <Icon size={24} />
        </div>
        <span className="text-4xl font-black mb-1 tracking-tighter italic uppercase">{value}</span>
        <span className="text-[10px] uppercase tracking-[0.3em] opacity-40 font-black">{label}</span>
    </motion.div>
);

export const About = () => {
    const { theme } = useTheme();

    return (
        <section id="about" className="section-padding scroll-mt-20 overflow-hidden">
            <div className="grid md:grid-cols-2 gap-24 items-center">
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="relative group"
                >
                    {/* Decorative Backdrops */}
                    <div className="absolute -inset-10 bg-primary/20 blur-[120px] rounded-full group-hover:bg-primary/30 transition-colors opacity-50" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] border border-primary/10 rounded-[60px] rotate-6 pointer-events-none transition-transform group-hover:rotate-12 duration-1000" />

                    <div className="relative glass-card border-white/5 p-4 overflow-hidden shadow-2xl rounded-[40px]">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={theme}
                                initial={{ opacity: 0, scale: 1.1 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.8, ease: "easeOut" }}
                            >
                                <Image
                                    src={theme === 'dark' ? '/images/mehdi_dark.png' : '/images/mehdi_light.png'}
                                    alt="Mehdi Hassan"
                                    width={800}
                                    height={800}
                                    className="w-full rounded-[32px] grayscale hover:grayscale-0 transition-all duration-1000 ease-in-out opacity-80 hover:opacity-100 h-auto"
                                />
                            </motion.div>
                        </AnimatePresence>

                        <div className="absolute bottom-8 left-8 right-8 p-6 glass-card bg-black/40 backdrop-blur-3xl border-white/10 rounded-2xl">
                            <div className="flex justify-between items-center text-white">
                                <div>
                                    <p className="text-[9px] font-black uppercase tracking-[0.4em] text-primary mb-1">Current Focus</p>
                                    <p className="text-base font-bold uppercase tracking-tighter italic">Android Developer</p>
                                </div>
                                <div className="h-10 w-px bg-white/10" />
                                <div className="text-right">
                                    <p className="text-[9px] font-black uppercase tracking-[0.4em] text-primary mb-1">Deployment</p>
                                    <p className="text-base font-bold uppercase tracking-tighter italic">AIDEON UK</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="relative z-10"
                >
                    <span className="text-primary text-[10px] font-black uppercase tracking-[0.6em] mb-8 block">System.identity()</span>
                    <h2 className="section-title mb-10">The <span className="text-gradient italic">Core Layer.</span></h2>

                    <div className="space-y-8 text-lg opacity-60 leading-relaxed font-light mb-16 max-w-xl">
                        <p>
                            I am an <span className="text-foreground font-semibold">Android Developer at AIDEON Limited</span>, currently architecting high-scale mobile infrastructure for the Middle Eastern market. My work involves transforming legacy systems into high-performance, reactive mobile environments.
                        </p>
                        <p>
                            My philosophy centers on <span className="text-foreground font-semibold">deterministic UI engineering</span>—ensuring every frame and interaction is predictable, performant, and premium. I bridge the gap between low-level system performance and elite user experiences.
                        </p>
                        <p>
                            With a Master's degree in Web Development and a heavy focus on <span className="text-primary font-bold italic underline decoration-2 underline-offset-8">Open Source internals</span>, I build software that isn't just functional, but computationally elegant.
                        </p>
                    </div>

                    <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
                        <StatCard icon={Users} label="Engineers Led" value="08+" />
                        <StatCard icon={Trophy} label="Project Scale" value="$272K" />
                        <StatCard icon={Cpu} label="Algos Solved" value="300+" />
                    </div>
                </motion.div>
            </div>
        </section>
    );
};
