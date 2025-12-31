'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, CheckCircle2, ShoppingCart, Globe, Shield } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export const FeaturedProject = () => {
    return (
        <section id="projects" className="section-padding bg-background-dark/50">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                <div>
                    <span className="text-secondary text-[10px] font-bold uppercase tracking-[0.3em] mb-4 inline-block">Enterprise Spotlight</span>
                    <h2 className="section-title mb-0">Al-Zafar<br /><span className="text-gradient">Shopping App</span></h2>
                </div>
                <div className="flex flex-col items-end text-right">
                    <div className="flex items-center gap-2 mb-2">
                        <Globe size={14} className="text-primary" />
                        <span className="text-xs font-bold font-mono">UAE Market Debut</span>
                    </div>
                    <p className="max-w-md opacity-50 text-sm hidden md:block">
                        Developing a high-scale e-commerce platform for the Kenz Hypermarket chain at AIDEON.
                    </p>
                </div>
            </div>

            <div className="relative glass-card border-none bg-black/40 shadow-2xl overflow-hidden min-h-[500px] flex flex-col lg:flex-row">
                {/* Project Image Area */}
                <div className="relative w-full lg:w-1/2 aspect-video lg:aspect-auto overflow-hidden group">
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors z-10" />
                    <Image
                        src="/images/projects/al-zafar-new.png"
                        alt="Al-Zafar App"
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-1000"
                        sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    {/* Mockup Floating Components */}
                    <div className="absolute top-6 left-6 z-20 flex flex-col gap-3">
                        {['Multi-Vendor', 'Real-time Inventory', 'Bi-lingual (RTL)'].map(tag => (
                            <div key={tag} className="px-3 py-1.5 glass-card bg-black/60 border-white/10 backdrop-blur-xl text-[9px] font-bold uppercase tracking-widest flex items-center gap-2">
                                <CheckCircle2 size={12} className="text-accent" /> {tag}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Project Content Area */}
                <div className="flex-1 p-8 lg:p-12 flex flex-col justify-center">
                    <div className="flex gap-4 mb-8 flex-wrap">
                        {['Kotlin', 'Jetpack Compose', 'Firebase', 'Clean Architecture', 'CI/CD'].map(tech => (
                            <span key={tech} className="px-3 py-1 rounded bg-secondary/10 text-secondary text-[10px] font-mono font-bold">{tech}</span>
                        ))}
                    </div>

                    <h3 className="text-2xl font-bold mb-6">UAE-Scale Marketplace Platform</h3>
                    <p className="opacity-60 mb-8 leading-relaxed">
                        Developing an enterprise-grade mobile solution for Al-Zafar Trading with an 8-engineer team.
                        The app features UAE-specific payment gateways, RTL support (Arabic/English), and offline-first data synchronization.
                    </p>

                    <div className="grid grid-cols-2 gap-x-8 gap-y-4 mb-10">
                        {[
                            { label: 'Contract Value', value: '$272,000 USD' },
                            { label: 'Team Size', value: '8 Engineers' },
                            { label: 'Launch Window', value: 'Q2 2026' },
                            { label: 'Current Progress', value: '75% (iOS), Active (Android)' }
                        ].map(item => (
                            <div key={item.label} className="border-l-2 border-primary/20 pl-4 py-1">
                                <p className="text-[10px] font-bold uppercase tracking-widest opacity-40 mb-1">{item.label}</p>
                                <p className="text-sm font-bold">{item.value}</p>
                            </div>
                        ))}
                    </div>

                    <div className="flex gap-4">
                        <Link href="/projects/al-zafar" className="btn-primary !px-6 !py-3 flex items-center gap-2 group/btn">
                            Case Study <ExternalLink size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};
