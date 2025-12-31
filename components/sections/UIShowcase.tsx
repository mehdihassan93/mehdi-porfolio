'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface UIComponentProps {
    title: string;
    description: string;
    // For now we use placeholders, but in real life this would be actual images or even rendered code components
    gradient?: string;
    isDark?: boolean;
    imageSrc?: string;
}

const UIComponentCard = ({ title, description, gradient = "from-[#E84A5F] to-pink-600", isDark = true, imageSrc }: UIComponentProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="group relative rounded-3xl overflow-hidden bg-[#1a1f24] border border-white/5 shadow-2xl"
        >
            {/* Mockup Header */}
            <div className="h-10 border-b border-white/5 flex items-center px-4 bg-white/5 gap-2 relative z-20 backdrop-blur-md">
                <div className="w-2.5 h-2.5 rounded-full bg-red-400/50" />
                <div className="w-2.5 h-2.5 rounded-full bg-amber-400/50" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-400/50" />
            </div>

            {/* Content Area */}
            <div className={`h-[300px] flex items-center justify-center relative overflow-hidden ${isDark ? 'bg-[#0B1015]' : 'bg-white'}`}>
                {imageSrc ? (
                    <div className="absolute inset-0 group-hover:scale-105 transition-transform duration-700 ease-out">
                        <Image
                            src={imageSrc}
                            alt={title}
                            fill
                            className="object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                            sizes="(max-width: 768px) 100vw, 33vw"
                        />
                        <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
                    </div>
                ) : (
                    <>
                        {/* Fallback Abstract UI Representation */}
                        <div className={`absolute top-0 right-0 w-64 h-64 bg-gradient-to-br ${gradient} opacity-20 blur-[80px] rounded-full translate-x-12 -translate-y-12`} />

                        <div className="relative z-10 w-full max-w-[200px] space-y-3 p-4 rounded-xl border border-white/10 bg-white/5 backdrop-blur-md transform group-hover:-translate-y-2 transition-transform duration-500">
                            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-white/20 to-white/5 mb-4" />
                            <div className="h-2 w-3/4 bg-white/20 rounded-full" />
                            <div className="h-2 w-1/2 bg-white/20 rounded-full" />
                            <div className="mt-4 pt-4 border-t border-white/10 flex justify-between">
                                <div className="h-6 w-16 bg-[#E84A5F] rounded-md" />
                            </div>
                        </div>

                        {/* Floating Elements */}
                        <div className="absolute top-1/2 left-1/4 w-32 p-3 rounded-lg border border-white/10 bg-[#1a1f24] shadow-xl transform -translate-x-4 translate-y-8 group-hover:translate-y-6 transition-transform duration-700 delay-75">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-white/10" />
                                <div className="space-y-1">
                                    <div className="h-1.5 w-12 bg-white/30 rounded-full" />
                                    <div className="h-1.5 w-8 bg-white/10 rounded-full" />
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>

            {/* Footer */}
            <div className="p-6 bg-white/5 relative z-20">
                <h4 className="text-lg font-bold text-white mb-1">{title}</h4>
                <p className="text-xs text-white/50">{description}</p>
            </div>
        </motion.div>
    );
};

export const UIShowcase = () => {
    return (
        <section className="section-padding py-20">
            <div className="max-w-7xl mx-auto">
                <div className="mb-12">
                    <h2 className="text-3xl font-black italic uppercase tracking-tighter mb-4">Interface <span className="text-[#E84A5F]">System</span></h2>
                    <p className="text-white/60 max-w-2xl">
                        A modular design system constructed with atomic principles. Each component is designed for
                        maximum reusability and accessibility across the application ecosystem.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <UIComponentCard
                        title="Auth Module"
                        description="Biometric-ready login screens with seamless fallback logic."
                        gradient="from-blue-500 to-cyan-500"
                        imageSrc="/images/ui/auth.png"
                    />
                    <UIComponentCard
                        title="Payment Gateway"
                        description="Secure, PCI-compliant card input with localized validation."
                        gradient="from-emerald-500 to-teal-500"
                        imageSrc="/images/ui/payment.png"
                    />
                    <UIComponentCard
                        title="Data Visualization"
                        description="Interactive charting components for real-time inventory tracking."
                        gradient="from-purple-500 to-indigo-500"
                        imageSrc="/images/ui/dashboard.png"
                    />
                </div>
            </div>
        </section>
    );
};
