'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Gamepad2, Rocket, Keyboard, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const games = [
    {
        title: "Syntax Siege",
        genre: "Cyber Defense",
        description: "Defend the mainframe from buggy code in this high-speed typing defense game. Test your syntax knowledge under pressure.",
        icon: Keyboard,
        color: "var(--primary)",
        href: "/projects/syntax-siege",
        stats: "WPM • Accuracy • High Score"
    },
    {
        title: "Gravity Lander",
        genre: "Physics Sim",
        description: "Master the forces of gravity and thrust. Pilot the module to a safe landing on procedural terrain without crashing.",
        icon: Rocket,
        color: "var(--accent)",
        href: "/projects/gravity-lander",
        stats: "Physics • Momentum • Fuel Mgmt"
    }
];

export const Games = () => {
    return (
        <section id="games" className="section-padding py-32 bg-background-dark">
            <div className="max-w-7xl mx-auto px-6 md:px-12">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/50 text-[10px] font-bold uppercase tracking-widest mb-4">
                            <Gamepad2 size={12} className="text-secondary" /> Interactive Experiments
                        </div>
                        <h2 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter text-white">
                            Micro <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-accent">Games</span>
                        </h2>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    {games.map((game, i) => (
                        <Link key={game.title} href={game.href} className="group relative block h-[400px] rounded-[40px] overflow-hidden bg-white/5 border border-white/10 hover:border-white/30 transition-all">
                            {/* Background Glow */}
                            <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/80 z-0" />
                            <div
                                className="absolute top-0 right-0 w-[300px] h-[300px] rounded-full blur-[100px] opacity-20 group-hover:opacity-40 transition-opacity"
                                style={{ backgroundColor: game.color }}
                            />

                            <div className="relative z-10 h-full p-10 flex flex-col justify-between">
                                <div className="flex justify-between items-start">
                                    <div className="p-4 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 group-hover:scale-110 transition-transform duration-500">
                                        <game.icon size={32} style={{ color: game.color }} />
                                    </div>
                                    <div className="px-3 py-1 rounded-full border border-white/10 text-[10px] font-bold uppercase tracking-widest text-white/40">
                                        {game.genre}
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-4xl font-black italic uppercase mb-2 text-white group-hover:translate-x-2 transition-transform">{game.title}</h3>
                                    <p className="text-white/60 mb-8 max-w-sm text-sm leading-relaxed font-light">
                                        {game.description}
                                    </p>

                                    <div className="flex items-center justify-between border-t border-white/10 pt-6">
                                        <span className="text-[10px] font-mono uppercase text-white/30 tracking-widest">{game.stats}</span>
                                        <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-white group-hover:gap-4 transition-all">
                                            Play Now <ArrowRight size={16} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
};
