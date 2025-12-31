'use client';

import { Suspense, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import confetti from 'canvas-confetti';

// Layout & UI
import { Navigation } from '@/components/ui/Navigation';
import { Footer } from '@/components/sections/Footer';

// Sections
import { Hero } from '@/components/sections/Hero';
import { About } from '@/components/sections/About';
import { FeaturedProject } from '@/components/sections/FeaturedProject';
import { Projects } from '@/components/sections/Projects';
import { Games } from '@/components/sections/Games';
import { Skills } from '@/components/sections/Skills';
import { Experience } from '@/components/sections/Experience';
import { Contact } from '@/components/sections/Contact';

// 3D
import { BirdFlock } from '@/components/three/BirdFlock';

// Hooks
import { useTheme } from '@/hooks/use-theme';
import { useKonamiCode } from '@/hooks/use-konami-code';
import { WelcomeLoader } from '@/components/ui/WelcomeLoader';

const ScrollProgress = () => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (winScroll / height) * 100;
            setProgress(scrolled);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="fixed top-0 left-0 w-full h-[2px] z-[110] pointer-events-none">
            <motion.div
                className="h-full bg-primary shadow-[0_0_10px_#3b82f6]"
                style={{ width: `${progress}%` }}
            />
        </div>
    );
};

export default function Home() {
    const { theme } = useTheme();
    const konamiTriggered = useKonamiCode();
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        document.documentElement.classList.add('dark');
    }, []);

    // Konami Code Effect
    useEffect(() => {
        if (konamiTriggered) {
            confetti({
                particleCount: 200,
                spread: 160,
                origin: { y: 0.6 },
                colors: ['#3b82f6', '#8b5cf6', '#10b981']
            });
        }
    }, [konamiTriggered]);

    if (!isMounted) return null;

    return (
        <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] selection:bg-primary selection:text-white transition-colors duration-300">
            <WelcomeLoader />
            <ScrollProgress />

            {/* 3D Scene Layer - Boids */}
            <div id="canvas-container" className="fixed inset-0 z-0 pointer-events-none opacity-40">
                <BirdFlock />
            </div>

            <Navigation />

            <main className="relative z-10">
                <Hero />
                <About />
                <FeaturedProject />
                <Projects />
                <Games />
                <Skills />
                <Experience />
                <Contact />
            </main>

            <Footer />
        </div>
    );
}
