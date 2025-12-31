'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Linkedin, Github, Send, MapPin, Download, ExternalLink, BrainCircuit, CheckCircle2, Loader2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import Image from 'next/image';

export const Contact = () => {
    const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        purpose: 'Job Opportunity',
        message: ''
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('sending');

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) throw new Error('Failed to send');

            // Trigger success confetti
            const end = Date.now() + 3 * 1000;
            const colors = ['#00F2FF', '#006AFF', '#ffffff'];

            (function frame() {
                confetti({
                    particleCount: 3,
                    angle: 60,
                    spread: 55,
                    origin: { x: 0 },
                    colors: colors
                });
                confetti({
                    particleCount: 3,
                    angle: 120,
                    spread: 55,
                    origin: { x: 1 },
                    colors: colors
                });

                if (Date.now() < end) {
                    requestAnimationFrame(frame);
                }
            }());

            setStatus('success');
            setFormData({ name: '', email: '', purpose: 'Job Opportunity', message: '' });

            // Reset status after 5 seconds
            setTimeout(() => setStatus('idle'), 5000);
        } catch (error) {
            console.error('Submission error:', error);
            setStatus('error');
            setTimeout(() => setStatus('idle'), 5000);
        }
    };

    return (
        <section id="contact" className="section-padding py-32 scroll-mt-20">
            <div className="relative glass-card border-none bg-primary/5 p-12 lg:p-20 rounded-[40px] overflow-hidden">
                {/* Background Image Overlay */}
                <div className="absolute inset-0 z-0 bg-background-dark">
                    <Image
                        src="/images/contact-bg.png"
                        alt="Contact Network"
                        fill
                        className="object-cover opacity-20 group-hover:scale-105 transition-transform duration-1000 mix-blend-overlay"
                        sizes="100vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-background-dark via-background-dark/95 to-transparent z-10" />
                </div>

                {/* Legacy Accents (Kept for depth) */}
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/10 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2 z-10" />

                <div className="grid lg:grid-cols-2 gap-20 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <span className="text-primary text-[10px] font-bold uppercase tracking-[0.3em] mb-4 inline-block">Transmission</span>
                        <h2 className="text-5xl md:text-6xl font-black tracking-tighter mb-8 uppercase italic leading-none">
                            Let&apos;s Build <br />
                            <span className="text-gradient">Something Big.</span>
                        </h2>
                        <p className="opacity-60 text-lg mb-12 max-w-md leading-relaxed font-light">
                            I&apos;m actively seeking Android Developer opportunities at FAANG companies and exciting high-scale freelance projects.
                        </p>

                        <div className="space-y-8">
                            {[
                                { icon: Mail, label: 'Email Address', value: 'mehdihassan22@gmail.com' },
                                { icon: Linkedin, label: 'LinkedIn Profile', value: 'linkedin.com/in/mehdihassan93' },
                                { icon: MapPin, label: 'Location', value: 'London, UK SE7 7QF' }
                            ].map((item, i) => (
                                <div key={i} className="flex items-center gap-6 group">
                                    <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-primary group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all shadow-lg border border-white/10">
                                        <item.icon size={20} />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-bold uppercase tracking-widest opacity-60 text-white">{item.label}</p>
                                        <p className="text-lg font-bold text-white/90 break-all">{item.value}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-16 flex gap-4">
                            <a href="https://www.github.com/mehdihassan93" target="_blank" rel="noopener noreferrer" aria-label="GitHub Profile" className="p-4 rounded-xl bg-white/10 backdrop-blur-md border border-white/10 hover:scale-110 hover:bg-primary/20 transition-all">
                                <Github size={20} className="text-white" />
                            </a>
                            <a href="https://www.linkedin.com/in/mehdihassan93" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn Profile" className="p-4 rounded-xl bg-white/10 backdrop-blur-md border border-white/10 hover:scale-110 hover:bg-primary/20 transition-all">
                                <Linkedin size={20} className="text-white" />
                            </a>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <form onSubmit={handleSubmit} className="glass-card bg-black/40 border-white/5 p-8 lg:p-12 space-y-6 relative overflow-hidden">
                            <AnimatePresence mode="wait">
                                {status === 'success' ? (
                                    <motion.div
                                        key="success"
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 1.1 }}
                                        className="absolute inset-0 z-20 bg-background-dark/95 backdrop-blur-xl flex flex-col items-center justify-center text-center p-8"
                                    >
                                        <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mb-6">
                                            <CheckCircle2 size={40} className="text-primary" />
                                        </div>
                                        <h3 className="text-2xl font-black uppercase italic mb-2">Transmission Received</h3>
                                        <p className="opacity-60 font-light">Thank you for reaching out. I&apos;ll get back to you across the digital void shortly.</p>
                                        <button
                                            type="button"
                                            onClick={() => setStatus('idle')}
                                            className="mt-8 text-[10px] font-bold uppercase tracking-widest text-primary hover:underline"
                                        >
                                            Send another message
                                        </button>
                                    </motion.div>
                                ) : null}
                            </AnimatePresence>

                            <div className="space-y-4">
                                <label htmlFor="name" className="text-[10px] font-bold uppercase tracking-widest opacity-50 ml-2 text-white">Full Name</label>
                                <input
                                    id="name"
                                    type="text"
                                    required
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    placeholder="John Doe"
                                    className="w-full glass-card bg-black/30 border-white/10 p-5 outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all text-sm text-white placeholder:text-white/20"
                                />
                            </div>
                            <div className="space-y-4">
                                <label htmlFor="email" className="text-[10px] font-bold uppercase tracking-widest opacity-50 ml-2 text-white">Email Address</label>
                                <input
                                    id="email"
                                    type="email"
                                    required
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    placeholder="john@example.com"
                                    className="w-full glass-card bg-black/30 border-white/10 p-5 outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all text-sm text-white placeholder:text-white/20"
                                />
                            </div>
                            <div className="space-y-4">
                                <label htmlFor="purpose" className="text-[10px] font-bold uppercase tracking-widest opacity-50 ml-2 text-white">Purpose</label>
                                <div className="relative">
                                    <select
                                        id="purpose"
                                        value={formData.purpose}
                                        onChange={handleInputChange}
                                        className="w-full glass-card bg-black/30 border-white/10 p-5 outline-none focus:border-primary transition-all text-sm appearance-none text-white cursor-pointer"
                                    >
                                        <option value="Job Opportunity" className="bg-background-dark">Job Opportunity</option>
                                        <option value="Freelance Project" className="bg-background-dark">Freelance Project</option>
                                        <option value="Collaboration" className="bg-background-dark">Collaboration</option>
                                        <option value="Other" className="bg-background-dark">Other</option>
                                    </select>
                                    <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none opacity-40">
                                        <ExternalLink size={14} />
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <label htmlFor="message" className="text-[10px] font-bold uppercase tracking-widest opacity-50 ml-2 text-white">Message</label>
                                <textarea
                                    id="message"
                                    required
                                    rows={4}
                                    value={formData.message}
                                    onChange={handleInputChange}
                                    placeholder="How can I help you build the future?"
                                    className="w-full glass-card bg-black/30 border-white/10 p-5 outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all text-sm resize-none text-white placeholder:text-white/20"
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={status === 'sending'}
                                className="w-full btn-primary group flex items-center justify-center gap-3 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {status === 'sending' ? (
                                    <>Extrapolating... <Loader2 size={16} className="animate-spin" /></>
                                ) : (
                                    <>Send Transmission <Send size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" /></>
                                )}
                            </button>
                        </form>
                    </motion.div>
                </div>
            </div>

            {/* Quick Links Footer */}
            <div className="mt-20 flex flex-wrap justify-center gap-12 border-t border-white/5 pt-20 overflow-hidden">
                {[
                    { label: 'Download Resume (PDF)', icon: Download, href: '/resume.pdf' },
                    { label: 'View GitHub Profile', icon: ExternalLink, href: 'https://www.github.com/mehdihassan93' },
                    { label: 'LeetCode Profile', icon: BrainCircuit, href: '#' }
                ].map((link, idx) => (
                    <a key={idx} href={link.href} target={link.href !== '#' ? "_blank" : undefined} rel={link.href !== '#' ? "noopener noreferrer" : undefined} className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] opacity-40 hover:opacity-100 hover:text-primary transition-all">
                        <link.icon size={16} /> {link.label}
                    </a>
                ))}
            </div>
        </section>
    );
};
