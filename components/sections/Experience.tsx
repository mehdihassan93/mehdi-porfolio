import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Briefcase, GraduationCap, MapPin, Terminal, Cpu, History, Zap, CheckCircle2 } from 'lucide-react';
import Image from 'next/image';

const experiences = [
    {
        type: 'work',
        role: 'Android Developer',
        company: 'AIDEON Limited',
        location: 'London, UK',
        date: '2023 - Present',
        description: [
            'Architecting and scaling mobile infrastructure for Middle-Eastern retail markets.',
            'Secured $272K enterprise contract with Al-Zafar Trading for full-stack digital transformation.',
            'Implementing high-performance UI using Jetpack Compose and custom rendering engines.',
            'Leading a team of 4+ engineers to deliver 120FPS native Android experiences.'
        ],
        tech: ['Kotlin', 'Compose', 'Coroutines', 'Clean Arch']
    },
    {
        type: 'education',
        role: 'M.Sc. Web Development',
        company: 'University of Roehampton',
        location: 'London, UK',
        date: '2023',
        description: [
            'Awarded Best Project for a real-time Disaster Management platform.',
            'Specialized in low-latency systems and proactive state management.',
            'Graduated with Merit, focusing on Enterprise Architecture and Agile scale.'
        ],
        tech: ['Merit', 'Best Project', 'Architecture']
    },
    {
        type: 'work',
        role: 'Full Stack Developer',
        company: 'EGuidance Labs',
        location: 'Remote',
        date: '2021 - 2022',
        description: [
            'Developed large-scale educational platforms serving 10K+ active users.',
            'Built reactive cross-platform mobile apps using Flutter and Node.js backend.',
            'Optimized data pipelines to reduce server latency by 45%.'
        ],
        tech: ['Flutter', 'Node.js', 'MongoDB']
    },
    {
        type: 'work',
        role: 'Mobile Developer',
        company: 'Spanlecs Services',
        location: 'Remote',
        date: '2020 - 2021',
        description: [
            'Successfully migrated legacy web platforms to native mobile environments.',
            'Advocated for high-performance Flutter adoption over hybrid alternatives.',
            'Integrated real-time analytics and crash-reporting infrastructure.'
        ],
        tech: ['Flutter', 'Dart', 'Firebase']
    },
    {
        type: 'education',
        role: 'B.Tech Computer Science',
        company: 'NEFTU',
        location: 'India',
        date: '2016 - 2020',
        description: [
            'Rooted in core CS fundamentals: Data Structures, OS, and Algorithms.',
            'Primary Focus on JVM-based development and software design patterns.',
            'Led college technical society and organized multiple hackathons.'
        ],
        tech: ['Java', 'Algorithms', 'Software Eng']
    }
];

export const Experience = () => {
    const sectionRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start start", "end end"]
    });

    // Optimized physics for a responsive, non-floaty feel
    const smoothProgress = useSpring(scrollYProgress, { stiffness: 90, damping: 30, restDelta: 0.001 });

    // Adjusted translation for compact cards to prevent over-scrolling
    const yTranslation = useTransform(smoothProgress, [0, 1], ["0%", "-80%"]);

    // Header stays perfectly visible until section end, then fades
    const leftOpacity = useTransform(smoothProgress, [0, 0.02, 0.98, 1], [0, 1, 1, 0]);
    const leftScale = useTransform(smoothProgress, [0, 0.5, 1], [0.95, 1, 0.95]);
    const leftRotate = useTransform(smoothProgress, [0, 1], [0, -1]);

    // Spine and Node Opacity - fade out at the very end
    const spineOpacity = useTransform(smoothProgress, [0, 0.02, 0.98, 1], [0, 1, 1, 0]);

    return (
        <section
            id="experience"
            ref={sectionRef}
            className="relative lg:h-[350vh] min-h-screen bg-background-dark/80 selection:bg-primary/20 py-20 lg:py-0"
        >
            {/* on Mobile: Normal flow. On Desktop: Sticky scroll wrapper */}
            <div className="relative w-full flex flex-col lg:flex-row items-start lg:items-center lg:sticky lg:top-0 lg:h-screen lg:overflow-hidden">

                {/* Visual Anchor Background */}
                <div className="absolute inset-0 tech-grid opacity-[0.05] -z-10" />
                <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-primary/5 blur-[120px] -z-10 hidden lg:block" />

                <div className="max-w-7xl mx-auto px-6 md:px-12 w-full pt-4">
                    <div className="grid lg:grid-cols-[0.8fr_1.2fr] gap-12 lg:gap-20 items-start relative">

                        {/* THE ANCHOR: Narrative Column (Top on mobile, Left on desktop) */}
                        <motion.div
                            style={{
                                opacity: typeof window !== 'undefined' && window.innerWidth > 1024 ? leftOpacity : 1,
                                scale: typeof window !== 'undefined' && window.innerWidth > 1024 ? leftScale : 1
                            }}
                            className="space-y-8 lg:space-y-12 mb-12 lg:mb-0"
                        >
                            <div className="space-y-6 lg:space-y-8">
                                <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/[0.03] border border-white/10 text-primary text-[10px] font-black uppercase tracking-[0.4em] backdrop-blur-md">
                                    <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse shadow-[0_0_8px_#E84A5F]" />
                                    SYSTEM.REGISTRY_ACTIVE
                                </div>

                                <div className="space-y-0">
                                    <h2 className="text-xl lg:text-2xl font-black uppercase tracking-[0.2em] opacity-40 font-mono italic">// RECORD.</h2>
                                    <h2 className="text-6xl md:text-8xl lg:text-[110px] font-black uppercase tracking-tighter leading-[0.85] lg:leading-[0.75] italic text-white drop-shadow-2xl">
                                        THE<br />REGISTRY<span className="text-primary italic">.</span>
                                    </h2>
                                </div>

                                <p className="text-gray-400 text-base lg:text-lg leading-relaxed font-light max-w-sm italic border-l-[3px] border-primary/40 pl-6 lg:pl-8 py-2">
                                    A multi-layered audit of professional milestones, architectural deployments, and academic deep-dives.
                                </p>
                            </div>

                            {/* Narrative Image Card */}
                            <div className="relative rounded-[30px] lg:rounded-[50px] overflow-hidden border border-white/10 bg-black/60 shadow-[0_0_60px_rgba(0,0,0,0.5)] group aspect-[4/3] w-full max-w-sm mx-auto lg:mx-0">
                                <Image
                                    src="/images/community-new.png"
                                    alt="Engineering Culture"
                                    fill
                                    className="object-cover grayscale opacity-60 lg:opacity-30 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000"
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-background-dark/95 via-transparent to-transparent pointer-events-none" />
                                <div className="absolute bottom-6 left-6 right-6 p-5 glass-card bg-black/60 border-white/10 backdrop-blur-md">
                                    <div className="flex items-center justify-between">
                                        <div className="space-y-1">
                                            <span className="block text-[8px] font-black uppercase tracking-[0.3em] text-primary">ENGR_CELL.LOCATION</span>
                                            <span className="text-[10px] font-black text-white/50 tracking-widest uppercase italic">LONDON_HQ_HUB</span>
                                        </div>
                                        <History size={18} className="text-primary/60" />
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* THE DYNAMIC: Scrolling Archive (Bottom on mobile, Right on desktop) */}
                        {/* On Mobile: Normal vertical stack. On Desktop: Scroll-tied animation container */}
                        <div className="relative lg:h-[85vh] lg:pl-16 w-full">

                            {/* Industrial Spine (Desktop Only) */}
                            <div className="hidden lg:block absolute left-0 top-0 bottom-0 w-[1px] bg-white/10">
                                <motion.div
                                    style={{ height: useTransform(smoothProgress, [0, 1], ["0%", "100%"]) }}
                                    className="absolute top-0 left-[-1.5px] w-[4px] bg-primary shadow-[0_0_30px_#E84A5F]"
                                />
                                <motion.div
                                    style={{ top: useTransform(smoothProgress, [0, 1], ["0%", "100%"]) }}
                                    className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-primary border-4 border-background-dark shadow-[0_0_20px_#E84A5F] z-10 flex items-center justify-center"
                                >
                                    <Zap size={8} className="text-white fill-white" />
                                </motion.div>
                            </div>

                            {/* Mobile Spine */}
                            <div className="lg:hidden absolute left-4 top-0 bottom-0 w-[1px] bg-white/10" />

                            <div className="h-full lg:overflow-hidden lg:mask-fade-edges relative">
                                <motion.div
                                    style={{
                                        y: typeof window !== 'undefined' && window.innerWidth > 1024 ? yTranslation : 0
                                    }}
                                    className="space-y-12 lg:space-y-24 py-0 lg:py-12 pl-12 lg:pl-16"
                                >
                                    {experiences.map((item, i) => (
                                        <motion.div
                                            key={i}
                                            style={{
                                                opacity: typeof window !== 'undefined' && window.innerWidth > 1024
                                                    ? useTransform(smoothProgress, [i * 0.2 - 0.1, i * 0.2, (i + 1) * 0.2, (i + 1) * 0.2 + 0.1], [0.3, 1, 1, 0.3])
                                                    : 1,
                                                scale: typeof window !== 'undefined' && window.innerWidth > 1024
                                                    ? useTransform(smoothProgress, [i * 0.2 - 0.1, i * 0.2, (i + 1) * 0.2, (i + 1) * 0.2 + 0.1], [0.95, 1, 1, 0.95])
                                                    : 1,
                                            }}
                                            className="relative group lg:pr-6"
                                        >
                                            <div className="glass-card !p-0 overflow-hidden bg-white/[0.03] border border-white/10 group-hover:bg-white/[0.06] group-hover:border-primary/40 transition-all duration-700 shadow-2xl">
                                                {/* Header Layer */}
                                                <div className="p-6 border-b border-white/5 relative">
                                                    <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 blur-[40px] group-hover:bg-primary/10 transition-colors" />
                                                    <div className="flex flex-col gap-6 relative z-10">
                                                        <div className="flex justify-between items-start">
                                                            <div className="flex items-center gap-4">
                                                                <div className="w-10 h-10 rounded-[14px] bg-primary/20 border border-primary/20 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white group-hover:scale-105 transition-all duration-700 shadow-xl">
                                                                    {item.type === 'work' ? <Briefcase size={18} /> : <GraduationCap size={18} />}
                                                                </div>
                                                                <div className="flex flex-col gap-0.5">
                                                                    <span className="text-[8px] font-black uppercase tracking-[0.5em] text-white/30">{item.type}</span>
                                                                    <span className="text-[10px] font-black text-primary tracking-widest">{item.date}</span>
                                                                </div>
                                                            </div>
                                                            <div className="hidden md:flex items-center gap-2 text-[8px] font-bold uppercase tracking-[0.2em] text-white/40 px-3 py-1.5 rounded-lg border border-white/5 bg-black/40 backdrop-blur-md">
                                                                <MapPin size={10} className="text-secondary/60" /> {item.location}
                                                            </div>
                                                        </div>

                                                        <div className="space-y-1.5">
                                                            <h3 className="text-xl md:text-3xl lg:text-4xl font-black uppercase tracking-tighter italic leading-tight text-white group-hover:text-primary transition-colors duration-700">
                                                                {item.role}
                                                            </h3>
                                                            <p className="text-sm md:text-lg font-black italic text-gray-500 opacity-80">
                                                                // {item.company}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Content Layer */}
                                                <div className="p-6 bg-black/30">
                                                    <ul className="space-y-2">
                                                        {item.description.map((bullet, bi) => (
                                                            <li key={bi} className="flex gap-4 text-xs md:text-sm text-gray-400 font-light leading-relaxed group-hover:text-white/95 transition-colors duration-500">
                                                                <CheckCircle2 size={12} className="mt-1 shrink-0 text-primary/40 group-hover:text-primary transition-colors" />
                                                                {bullet}
                                                            </li>
                                                        ))}
                                                    </ul>

                                                    <div className="flex flex-wrap gap-2 mt-6 border-t border-white/5 pt-6">
                                                        {item.tech.map(t => (
                                                            <span key={t} className="px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/10 text-[8px] font-black uppercase tracking-[0.3em] text-white/40 group-hover:text-primary group-hover:border-primary/40 group-hover:bg-primary/5 transition-all duration-700">
                                                                {t}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </motion.div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
                @media (min-width: 1024px) {
                    .mask-fade-edges {
                        mask-image: linear-gradient(to bottom, transparent, black 10%, black 95%, transparent);
                        -webkit-mask-image: linear-gradient(to bottom, transparent, black 10%, black 95%, transparent);
                    }
                }
            `}</style>
        </section>
    );
};
