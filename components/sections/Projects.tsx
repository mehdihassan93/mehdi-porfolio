'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Terminal, Database, ShieldAlert, BrainCircuit, ArrowUpRight, Github } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const otherProjects = [
    {
        title: "Disaster Management App",
        icon: ShieldAlert,
        subtitle: "Best Project Award - Roehampton",
        description: "Real-time alert system with location-based notifications and emergency contact management. Built during M.Sc Web Development.",
        tech: ["Flutter", "Firebase", "Google Maps API"],
        image: "/images/projects/disaster-new.png",
        href: "/projects/disaster-management"
    },
    {
        title: "Open Source Development",
        icon: Terminal,
        subtitle: "Technical Contributor",
        description: "Contributed to the Python core codebase, improving architecture documentation and technical clarity for globally used modules.",
        tech: ["Python", "C", "Git", "Documentation"],
        image: "/images/projects/open-source-new.png",
        href: "/projects/open-source"
    },
    {
        title: "Algorithm Visualizer",
        icon: BrainCircuit,
        subtitle: "CS Education Tool (Developing)",
        description: "Interactive application visualizing complex sorting and pathfinding algorithms with real-time performance metrics.",
        tech: ["React", "TypeScript", "Canvas API"],
        image: "/images/projects/algo-new.png",
        href: "/projects/algorithm-visualizer"
    },
    {
        title: "Pharma Price Comparison",
        icon: Database,
        subtitle: "Indian Market Concept",
        description: "Concept for comparing medicine prices across pharmacies to help users optimize healthcare costs in local markets.",
        tech: ["Flutter", "REST APIs", "Geolocation"],
        image: "/images/projects/pharma-new.png",
        href: "/projects/pharma-compare"
    }
];

export const Projects = () => {
    const targetRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
    });

    // Smooth out the scroll for a premium feel
    const smoothProgress = useSpring(scrollYProgress, { stiffness: 60, damping: 20, restDelta: 0.001 });

    // Map vertical scroll to horizontal scroll
    // We scroll from 0 to -75% assuming 4 items need ~25% screen width each relative to track
    const x = useTransform(smoothProgress, [0, 1], ["2%", "-75%"]);

    // Parallax elements
    const titleOpacity = useTransform(smoothProgress, [0, 0.2], [1, 0]);
    const titleScale = useTransform(smoothProgress, [0, 0.2], [1, 0.8]);

    return (
        <section ref={targetRef} className="relative h-[300vh] bg-background-dark">
            <div className="sticky top-0 h-screen flex items-center overflow-hidden">

                {/* Visual Background Elements */}
                <div className="absolute inset-0 w-full h-full bg-background-dark -z-20" />
                <div className="absolute inset-0 tech-grid opacity-[0.05] -z-10" />
                <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-primary/10 blur-[120px] rounded-full -z-10" />

                {/* Section Title - Fades out as you scroll */}
                <motion.div
                    style={{ opacity: titleOpacity, scale: titleScale }}
                    className="absolute top-12 left-12 md:left-24 z-20"
                >
                    <h2 className="text-7xl md:text-9xl font-black uppercase text-white/5 tracking-tighter">
                        Archive
                    </h2>
                    <div className="absolute top-1/2 left-2 text-2xl md:text-4xl font-bold uppercase tracking-[0.4em] text-white">
                        Select_Works
                    </div>
                </motion.div>

                {/* Horizontal Scroll Track */}
                <motion.div style={{ x }} className="flex gap-16 pl-[10vw] pr-[20vw] items-center">
                    {otherProjects.map((project, i) => (
                        <div
                            key={project.title}
                            className="group relative w-[85vw] md:w-[600px] h-[70vh] flex-shrink-0"
                        >
                            {/* Card Container - Updated Palette */}
                            <div className="h-full w-full rounded-[40px] overflow-hidden bg-[#2A363B] border border-white/5 hover:border-primary/50 transition-colors duration-500 shadow-2xl relative">

                                {/* Image Half (Top/Background) */}
                                <div className="absolute inset-0 h-1/2 md:h-[55%] overflow-hidden">
                                    <Image
                                        src={project.image}
                                        alt={project.title}
                                        fill
                                        className="object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700 ease-out"
                                        sizes="(max-width: 768px) 85vw, (max-width: 1200px) 50vw, 33vw"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#2A363B]" />
                                </div>

                                {/* Content Half (Bottom) */}
                                <div className="absolute inset-x-0 bottom-0 h-1/2 md:h-[45%] bg-[#2A363B] p-8 md:p-10 flex flex-col justify-between">

                                    <div>
                                        <div className="flex justify-between items-start mb-6">
                                            <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                                                <project.icon size={24} />
                                            </div>
                                            <div className="px-4 py-1 rounded-full border border-white/10 text-[10px] uppercase tracking-widest text-white/40">
                                                0{i + 1}
                                            </div>
                                        </div>

                                        <h3 className="text-3xl md:text-4xl font-bold mb-3 text-white group-hover:text-primary transition-colors tracking-tight leading-none">
                                            {project.title}
                                        </h3>
                                        <p className="text-xs font-black uppercase tracking-[0.3em] text-white/30 mb-6">
                                            {project.subtitle}
                                        </p>
                                    </div>

                                    <div className="space-y-6">
                                        <p className="text-sm text-gray-400 font-light leading-relaxed line-clamp-3">
                                            {project.description}
                                        </p>

                                        <div className="flex justify-between items-end border-t border-white/5 pt-6">
                                            <div className="flex flex-wrap gap-2">
                                                {project.tech.map(t => (
                                                    <span key={t} className="text-[10px] uppercase font-bold text-white/40 bg-white/5 px-2 py-1 rounded">
                                                        {t}
                                                    </span>
                                                ))}
                                            </div>

                                            <Link
                                                href={project.href}
                                                target={project.href.startsWith('http') ? "_blank" : undefined}
                                                className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white/50 hover:bg-white hover:text-black hover:scale-110 transition-all duration-300"
                                            >
                                                <ArrowUpRight size={20} />
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}

                    {/* End Card - Encourage Action */}
                    <div className="w-[40vw] md:w-[300px] h-[70vh] flex-shrink-0 flex flex-col justify-center items-center gap-6 border-l border-white/10 ml-10 bg-[#2A363B]/20 rounded-[40px] backdrop-blur-sm">
                        <span className="text-6xl text-white/5">END</span>
                        <div className="text-center">
                            <h4 className="text-2xl font-bold text-white mb-2">Want to see more?</h4>
                            <a href="https://github.com/mehdi-hassan" target="_blank" className="text-primary hover:text-white transition-colors flex items-center gap-2 justify-center">
                                <Github size={20} />
                                GitHub Profile
                            </a>
                        </div>
                    </div>

                </motion.div>
            </div>
        </section>
    );
};
