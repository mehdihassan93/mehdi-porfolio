'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Keyboard, Trophy, Zap, Terminal } from 'lucide-react';
import Link from 'next/link';
import { SyntaxSiegeGame } from '@/components/interactive/SyntaxSiegeGame';

export default function SyntaxSiegePage() {
    return (
        <main className="min-h-screen bg-background-dark text-foreground selection:bg-primary selection:text-white">
            {/* Nav */}
            <nav className="fixed top-0 left-0 w-full z-50 p-6 mix-blend-difference">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <Link
                        href="/#games"
                        className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-xl border border-white/10 text-[10px] font-black uppercase tracking-widest hover:bg-primary hover:text-white transition-all group"
                    >
                        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Exit to OS
                    </Link>
                    <div className="text-xl font-black tracking-tighter cursor-help group">
                        SYNTAX<span className="text-primary">.SIEGE</span>
                    </div>
                </div>
            </nav>

            {/* Content */}
            <section className="pt-32 pb-20 px-6">
                <div className="max-w-4xl mx-auto text-center mb-12">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-bold uppercase tracking-widest mb-6"
                    >
                        <Zap size={12} className="fill-current" /> Interactive Typing Defense
                    </motion.div>

                    <h1 className="text-5xl md:text-7xl font-black mb-6 italic uppercase leading-none tracking-tighter">
                        Code <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Defender</span>
                    </h1>
                    <p className="text-lg text-white/50 max-w-2xl mx-auto font-light">
                        Test your typing speed and syntax knowledge. Protect the system core from incoming bugs and malformed packets.
                    </p>
                </div>

                {/* Game Component */}
                <SyntaxSiegeGame />

                {/* Instructions Grid */}
                <div className="max-w-5xl mx-auto mt-20 grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                        { icon: Terminal, title: 'Observe', desc: 'Watch for falling keywords and syntax errors.' },
                        { icon: Keyboard, title: 'Type', desc: 'Type the words exactly as they appear to target them.' },
                        { icon: Trophy, title: 'Survive', desc: 'Protect your system health and achieve high scores.' }
                    ].map((item, i) => (
                        <div key={i} className="bg-white/5 border border-white/5 p-6 rounded-2xl flex flex-col items-center text-center hover:bg-white/10 transition-colors group">
                            <item.icon size={24} className="text-primary mb-4 group-hover:scale-110 transition-transform" />
                            <h3 className="font-bold text-sm uppercase tracking-widest mb-2">{item.title}</h3>
                            <p className="text-xs text-gray-400">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </section>
        </main>
    );
}
