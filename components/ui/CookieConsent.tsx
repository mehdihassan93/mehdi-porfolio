'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Cookie, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

export const CookieConsent = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Check if user has already made a choice
        const consent = localStorage.getItem('cookie-consent');
        if (!consent) {
            // Small delay for better UX
            const timer = setTimeout(() => setIsVisible(true), 1500);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem('cookie-consent', 'accepted');
        setIsVisible(false);
    };

    const handleDecline = () => {
        localStorage.setItem('cookie-consent', 'declined');
        setIsVisible(false);
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    className="fixed bottom-4 left-4 right-4 md:left-auto md:right-8 md:bottom-8 z-[200] max-w-md w-full"
                >
                    <div className="glass-card border-white/10 p-6 rounded-2xl shadow-2xl relative overflow-hidden group">
                        {/* Background Glow */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-[50px] rounded-full pointer-events-none group-hover:bg-primary/20 transition-all duration-500" />

                        <div className="relative z-10 flex flex-col gap-4">
                            <div className="flex items-start justify-between gap-4">
                                <div className="flex items-center gap-3 text-primary">
                                    <ShieldCheck size={24} />
                                    <span className="font-bold text-sm tracking-widest uppercase">GDPR Compliance</span>
                                </div>
                                <button
                                    onClick={handleDecline}
                                    className="text-white/40 hover:text-white transition-colors"
                                >
                                    <X size={18} />
                                </button>
                            </div>

                            <p className="text-sm text-gray-400 leading-relaxed">
                                We use cookies to enhance your browsing experience and analyze traffic.
                                By clicking "Accept", you consent to our use of cookies as described in our{' '}
                                <Link href="/privacy" className="text-primary hover:underline underline-offset-4">
                                    Privacy Policy
                                </Link>.
                            </p>

                            <div className="flex items-center justify-end gap-3 mt-2">
                                <button
                                    onClick={handleDecline}
                                    className="px-4 py-2 text-xs font-bold uppercase tracking-wider text-white/60 hover:text-white hover:bg-white/5 rounded-lg transition-all"
                                >
                                    Decline
                                </button>
                                <button
                                    onClick={handleAccept}
                                    className="px-6 py-2.5 bg-primary hover:bg-primary/90 text-background font-bold text-xs uppercase tracking-wider rounded-lg shadow-lg hover:shadow-primary/25 transition-all flex items-center gap-2"
                                >
                                    <Cookie size={14} />
                                    Accept All
                                </button>
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
