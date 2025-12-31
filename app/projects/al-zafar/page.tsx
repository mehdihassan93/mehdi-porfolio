'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle2, Globe, Shield, Zap, Layout, Code2, Users } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { UIShowcase } from '@/components/sections/UIShowcase';

export default function AlZafarCaseStudy() {
    return (
        <main className="min-h-screen bg-background-dark text-white selection:bg-primary selection:text-white">
            {/* Header / Navigation Back */}
            <nav className="fixed top-0 left-0 w-full z-50 p-6 mix-blend-difference">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <Link
                        href="/#projects"
                        className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-xl border border-white/10 text-[10px] font-black uppercase tracking-widest hover:bg-primary hover:text-white transition-all group"
                    >
                        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Back to Base
                    </Link>
                    <div className="text-xl font-black italic tracking-tighter cursor-help group">
                        AL-ZAFAR<span className="text-primary italic">.</span>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0 text-white/5">
                    <Image
                        src="/images/projects/al-zafar-new.png"
                        alt="Al Zafar Shopping App"
                        fill
                        className="object-cover opacity-30 scale-105"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background-dark/90 to-background-dark z-10" />
                </div>

                <div className="relative z-20 text-center max-w-4xl px-6">
                    <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-primary text-xs font-black uppercase tracking-[0.5em] mb-4 block"
                    >
                        Enterprise Case Study
                    </motion.span>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-5xl md:text-7xl font-black mb-6 tracking-tighter italic uppercase"
                    >
                        Al-Zafar<br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Marketplace</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-lg opacity-70 font-medium max-w-2xl mx-auto leading-relaxed text-gray-200"
                    >
                        Architecting a high-scale e-commerce ecosystem for the Middle Eastern market,
                        supporting multi-vendor logistics and real-time inventory synchronization.
                    </motion.p>
                </div>
            </section>

            {/* Stats Grid */}
            <section className="section-padding py-20 border-y border-white/10">
                <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
                    {[
                        { label: 'Role', value: 'Lead Android Dev' },
                        { label: 'Timeline', value: '18 Months' },
                        { label: 'Tech', value: 'Compose + KMM' },
                        { label: 'Market', value: 'UAE / GCC' }
                    ].map((stat, i) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.1 }}
                        >
                            <p className="text-[10px] font-black uppercase tracking-widest text-accent mb-2">{stat.label}</p>
                            <p className="text-xl font-bold italic uppercase tracking-tight">{stat.value}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Content Sections */}
            <section className="section-padding py-32">
                <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-32">
                    {/* Left Side: The Challenge */}
                    <div>
                        <h2 className="text-3xl font-black mb-10 italic uppercase tracking-tighter">
                            The <span className="text-primary">Challenge</span>
                        </h2>
                        <div className="space-y-8 opacity-80 font-light text-lg leading-relaxed text-gray-200">
                            <p>
                                Al-Zafar Trading Co. required a robust mobile presence to compete with regional giants.
                                The primary challenge was handling a massive catalog of over 50,000 SKUs with
                                real-time price volatility and multi-vendor stock updates.
                            </p>
                            <p>
                                Furthermore, the application needed to support full RTL (Arabic) layout mirroring
                                and localized payment gateways like Mada and Apple Pay, while maintaining
                                sub-200ms interaction latency on mid-range Android devices.
                            </p>
                        </div>

                        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {[
                                { icon: Zap, title: 'Performance', desc: 'Sub-200ms render times' },
                                { icon: Shield, title: 'Security', desc: 'Level 1 PCI Compliance' },
                                { icon: Globe, title: 'Global', desc: 'Bilingual RTL Architecture' },
                                { icon: Layout, title: 'UX', desc: 'Jetpack Compose Dynamic UI' }
                            ].map((feature, i) => (
                                <div key={feature.title} className="p-6 glass-card border-white/5 bg-white/5">
                                    <feature.icon size={20} className="text-primary mb-4" />
                                    <h4 className="font-bold text-sm mb-2 uppercase tracking-widest">{feature.title}</h4>
                                    <p className="text-xs opacity-50">{feature.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Side: The Solution */}
                    <div className="space-y-16">
                        <div className="p-10 glass-card bg-primary/5 border-white/10 rounded-[40px]">
                            <h3 className="text-2xl font-black mb-6 italic uppercase tracking-tighter">Technical Implementation</h3>
                            <ul className="space-y-6">
                                {[
                                    'Clean Architecture with MVI pattern for predictable state management',
                                    'Custom Jetpack Compose design system for UAE-specific branding',
                                    'Offline-first synchronization using Room and WorkManager',
                                    'Multi-modular builds for 40% faster CI/CD build times',
                                    'Advanced image caching strategy for high-res product galleries'
                                ].map((step, i) => (
                                    <li key={i} className="flex gap-4 items-start group">
                                        <div className="mt-1.5 w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                                            <CheckCircle2 size={12} />
                                        </div>
                                        <span className="opacity-80 text-base font-light text-gray-200">{step}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <UIShowcase />

                        <div className="relative rounded-[40px] overflow-hidden aspect-video shadow-2xl bg-black/50">
                            <Image
                                src="/images/projects/al-zafar-new.png"
                                alt="UI Screenshot"
                                fill
                                className="object-cover opacity-80"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-background-dark to-transparent flex items-end p-10">
                                <div>
                                    <p className="text-[10px] font-black uppercase tracking-widest text-primary mb-2">Internal Alpha</p>
                                    <h4 className="text-xl font-bold text-white">Multi-vendor Dashboard Mockup</h4>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Call to Action */}
            <section className="section-padding py-32 bg-secondary/5">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-4xl md:text-6xl font-black mb-10 italic uppercase tracking-tighter">Next Infrastructure?</h2>
                    <p className="text-xl opacity-60 mb-12 font-light">
                        I am currently accepting select projects for 2026. Let's discuss how we can scale
                        your mobile performance with deterministic UX engineering.
                    </p>
                    <Link href="/#contact" className="btn-primary !px-12 !py-5">
                        Start Transmission
                    </Link>
                </div>
            </section>
        </main>
    );
}
