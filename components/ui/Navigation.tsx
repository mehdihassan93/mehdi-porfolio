'use client';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, Menu, X, Smartphone } from 'lucide-react';
const navItems = [
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Games', href: '#games' },
    { name: 'Skills', href: '#skills' },
    { name: 'Experience', href: '#experience' },
    { name: 'Contact', href: '#contact' },
];

export const Navigation = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${isScrolled
            ? 'bg-background-dark/80 backdrop-blur-xl border-b border-white/5 py-4 shadow-2xl text-white'
            : 'bg-transparent py-8 text-white'
            }`}>
            <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center w-full">
                {/* Logo Container - ID used for FLIP animation target */}
                <div id="nav-logo-container" className="relative z-50">
                    <motion.a
                        href="/"
                        // Initial hidden state if waiting for loader opacity: 0
                        // But we want it to "land" here.
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 4.5, duration: 1 }} // Wait for loader animation (approx 4s)
                        className="text-2xl font-black italic tracking-tighter hover:text-primary transition-colors flex items-center gap-2"
                    >
                        MEHDI<span className="text-primary italic">.</span>
                    </motion.a>
                </div>

                {/* Desktop Menu */}
                <div className="hidden lg:flex items-center gap-12">
                    <div className="flex gap-10 text-[10px] font-black uppercase tracking-[0.4em]">
                        {navItems.map((item) => (
                            <a key={item.name} href={item.href} className="hover:text-primary transition-all hover:translate-y-[-2px] opacity-60 hover:opacity-100">
                                {item.name}
                            </a>
                        ))}
                    </div>
                </div>

                <div className="hidden lg:flex items-center gap-6">
                    <div className="h-4 w-px bg-white/10" />
                    <a
                        href="/resume.pdf"
                        className="btn-primary !px-8 !py-3 !text-[10px] flex items-center gap-2"
                    >
                        Resume <Download size={14} />
                    </a>
                </div>

                {/* Mobile Toggle */}
                <div className="lg:hidden flex items-center gap-4">
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="w-12 h-12 flex items-center justify-center bg-white/5 backdrop-blur-md border border-white/10 rounded-full transition-all active:scale-95"
                        aria-label={isMobileMenuOpen ? "Close Menu" : "Open Menu"}
                    >
                        {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="lg:hidden bg-background-dark/95 backdrop-blur-2xl border-b border-white/5 overflow-hidden"
                    >
                        <div className="p-12 flex flex-col gap-10 text-[14px] font-black uppercase tracking-[0.5em] items-center">
                            {navItems.map((item, idx) => (
                                <motion.a
                                    key={item.name}
                                    href={item.href}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: idx * 0.05 }}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="hover:text-primary transition-colors italic"
                                >
                                    {item.name}
                                </motion.a>
                            ))}
                            <motion.a
                                href="/resume.pdf"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className="w-full text-center btn-primary flex items-center justify-center gap-3"
                            >
                                Download CV <Download size={16} />
                            </motion.a>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav >
    );
};
