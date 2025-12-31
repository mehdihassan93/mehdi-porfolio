'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle2, Terminal, Code2, GitBranch, BookOpen, Layers } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function OpenSourceCaseStudy() {
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
                    <div className="text-xl font-black italic tracking-tighter">
                        CPYTHON<span className="text-primary italic">.</span>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/images/projects/open-source-new.png"
                        alt="Open Source"
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
                        Community Contribution
                    </motion.span>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-5xl md:text-7xl font-black mb-6 tracking-tighter italic uppercase"
                    >
                        Python Core<br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Internals</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-lg opacity-70 font-medium max-w-2xl mx-auto leading-relaxed text-gray-200"
                    >
                        Contributing to the fundamental C-API and documentation of the Python programming language,
                        impacting millions of developers worldwide.
                    </motion.p>
                </div>
            </section>

            {/* Stats Grid */}
            <section className="section-padding py-20 border-y border-white/10">
                <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
                    {[
                        { label: 'Project', value: 'CPython' },
                        { label: 'Role', value: 'Contributor' },
                        { label: 'Tech', value: 'C / ReST' },
                        { label: 'Impact', value: 'Global' }
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
                                The Python interpreter is a massive, decades-old codebase written in C. Navigating its
                                internal logic, memory management, and extensive API surface is notoriously difficult
                                for newcomers.
                            </p>
                            <p>
                                My goal was to improve the technical documentation and clarify C-API architecture
                                to lower the barrier to entry for future contributors and extension authors.
                            </p>
                        </div>

                        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {[
                                { icon: Code2, title: 'Complexity', desc: 'Legacy C Codebase' },
                                { icon: BookOpen, title: 'Clarity', desc: 'Technical Writing' },
                                { icon: GitBranch, title: 'Workflow', desc: 'Strict Upstream Reviews' },
                                { icon: Layers, title: 'Architecture', desc: 'Internal API Design' }
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
                            <h3 className="text-2xl font-black mb-6 italic uppercase tracking-tighter">Key Contributions</h3>
                            <ul className="space-y-6">
                                {[
                                    'Refactored C-API documentation for better readability',
                                    'Standardized function signatures across core modules',
                                    'Addressed legacy technical debt in header files',
                                    'Collaborated with core developers on architectural decisions',
                                    'Reviewed Pull Requests from the community'
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

                        <div className="relative rounded-[40px] overflow-hidden aspect-video shadow-2xl bg-black/50">
                            <Image
                                src="/images/projects/open-source-new.png"
                                alt="GitHub Screenshot"
                                fill
                                className="object-cover opacity-80"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-background-dark to-transparent flex items-end p-10">
                                <div>
                                    <p className="text-[10px] font-black uppercase tracking-widest text-primary mb-2">GitHub</p>
                                    <h4 className="text-xl font-bold text-white">Contribution Graph & PRs</h4>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Call to Action */}
            <section className="section-padding py-32 bg-secondary/5">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-4xl md:text-6xl font-black mb-10 italic uppercase tracking-tighter">View Source?</h2>
                    <p className="text-xl opacity-60 mb-12 font-light">
                        Explore the code that powers the world's most popular programming language.
                    </p>
                    <Link href="https://github.com/mehdihassan93" target="_blank" rel="noopener noreferrer" className="btn-primary !px-12 !py-5 flex items-center gap-2 justify-center mx-auto">
                        <Terminal size={16} /> GitHub Profile
                    </Link>
                </div>
            </section>
        </main>
    );
}
