'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { Smartphone, Layout, Database, Terminal, Settings, Trophy, LucideIcon } from 'lucide-react';
import Image from 'next/image';

const SkillGroup = ({ title, icon: Icon, skills }: { title: string, icon: LucideIcon, skills: { name: string, level: number }[] }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="space-y-8"
    >
        <div className="flex items-center gap-4 mb-10">
            <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center text-primary">
                <Icon size={20} />
            </div>
            <h3 className="text-sm font-bold uppercase tracking-[0.3em] font-mono leading-none">{title}</h3>
        </div>
        <div className="space-y-5">
            {skills.map((skill) => (
                <div key={skill.name} className="group">
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium opacity-70 group-hover:opacity-100 transition-opacity">{skill.name}</span>
                        <div className="flex gap-1">
                            {[...Array(5)].map((_, i) => (
                                <div
                                    key={i}
                                    className={`w-3 h-1 rounded-full transition-all duration-500 ${i < skill.level ? 'bg-primary scale-x-110 shadow-[0_0_8px_rgba(232,74,95,0.5)]' : 'bg-primary/5'
                                        }`}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </motion.div>
);

export const Skills = () => {
    return (
        <section id="skills" className="section-padding py-32 bg-background-dark/30">
            <div className="text-center mb-24">
                <h2 className="section-title">Technical<br /><span className="text-gradient underline decoration-primary/20 underline-offset-8">Arsenal.</span></h2>
                <p className="max-w-2xl mx-auto opacity-50 text-sm font-light leading-relaxed">
                    Deep specialization in modern Android ecosystems, clean architecture, and highly performant codebases.
                </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-16 lg:gap-24">
                <SkillGroup
                    title="Mobile Stack"
                    icon={Smartphone}
                    skills={[
                        { name: "Kotlin", level: 5 },
                        { name: "Jetpack Compose", level: 5 },
                        { name: "Android SDK", level: 5 },
                        { name: "Flutter/Dart", level: 4 },
                        { name: "Unit Testing", level: 4 }
                    ]}
                />
                <SkillGroup
                    title="Architecture"
                    icon={Layout}
                    skills={[
                        { name: "MVVM / Clean", level: 5 },
                        { name: "Coroutines/Flow", level: 5 },
                        { name: "Dependency Injection", level: 5 },
                        { name: "Multi-modular", level: 5 },
                        { name: "Performance Ops", level: 4 }
                    ]}
                />
                <SkillGroup
                    title="Backend"
                    icon={Database}
                    skills={[
                        { name: "Firebase Suite", level: 5 },
                        { name: "Node.js/Express", level: 4 },
                        { name: "RESTful APIs", level: 5 },
                        { name: "Postman", level: 5 },
                        { name: "CI/CD Pipeline", level: 4 }
                    ]}
                />
                <SkillGroup
                    title="Core & Tools"
                    icon={Terminal}
                    skills={[
                        { name: "Git / GitHub", level: 5 },
                        { name: "Java", level: 4 },
                        { name: "Python", level: 3 },
                        { name: "JS/TS", level: 4 },
                        { name: "Docker", level: 3 }
                    ]}
                />
            </div>

            {/* Engineering Depth Badge */}
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                className="mt-32 relative rounded-[40px] overflow-hidden group min-h-[300px] flex items-center"
            >
                {/* Background Image Overlay */}
                <div className="absolute inset-0 z-0 bg-background-dark">
                    <Image
                        src="/images/tech-lab-new.png"
                        alt="High-Performance Mobile Infrastructure Lab"
                        fill
                        className="object-cover grayscale opacity-20 group-hover:scale-110 transition-transform duration-1000 mix-blend-overlay"
                        sizes="(max-width: 768px) 100vw, 80vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-background-dark via-background-dark/95 to-transparent z-10" />
                </div>

                <div className="relative z-20 w-full p-12 flex flex-col md:flex-row items-center justify-between gap-12">
                    <div className="flex items-center gap-8">
                        <div className="p-6 rounded-2xl bg-primary/20 backdrop-blur-xl text-primary animate-float border border-white/10">
                            <Trophy size={40} />
                        </div>
                        <div>
                            <h4 className="text-2xl font-black uppercase tracking-tighter mb-2 text-white italic">Computational Excellence</h4>
                            <p className="opacity-60 text-base font-light max-w-xl group-hover:opacity-100 transition-opacity text-gray-200">Experience with Open Source internals and 300+ algorithmic solutions focused on memory safety and runtime optimization.</p>
                        </div>
                    </div>
                    <div className="flex flex-col items-center md:items-end">
                        <span className="text-6xl font-black text-primary leading-none mb-2 tracking-tighter shadow-xl">300+</span>
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] opacity-40">System Benchmarks</span>
                    </div>
                </div>
            </motion.div>
        </section>
    );
};
