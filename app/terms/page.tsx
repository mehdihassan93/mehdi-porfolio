'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Scale } from 'lucide-react';

export default function TermsOfService() {
    return (
        <main className="min-h-screen bg-background-light dark:bg-background-dark py-20 px-6">
            <div className="max-w-4xl mx-auto">
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-xs font-black uppercase tracking-widest hover:bg-primary hover:text-white transition-all mb-12"
                >
                    <ArrowLeft size={14} /> Return Home
                </Link>

                <div className="glass-card p-12 border-none">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="p-4 rounded-2xl bg-primary/10 text-primary">
                            <Scale size={32} />
                        </div>
                        <h1 className="text-4xl font-black italic tracking-tighter uppercase">Terms of Service</h1>
                    </div>

                    <div className="prose dark:prose-invert max-w-none opacity-80 font-light space-y-8">
                        <p className="text-lg">Last Updated: December 2025</p>

                        <section>
                            <h2 className="text-2xl font-bold mb-4 text-foreground">1. Agreement to Terms</h2>
                            <p>
                                By accessing specific areas of www.mehdi-hassan.com, you agree to these Terms of Service.
                                This website is a personal portfolio showcasing the professional work and open-source contributions of Mehdi Hassan.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold mb-4 text-foreground">2. Intellectual Property</h2>
                            <p>
                                All content on this site, including but not limited to code snippets, project descriptions,
                                case studies, and 3D graphics, is the intellectual property of Mehdi Hassan unless otherwise stated.
                            </p>
                            <ul className="list-disc pl-6 space-y-2 mt-4">
                                <li><strong>Open Source:</strong> Code explicitly linked to public GitHub repositories is subject to the specific licenses (MIT, Apache 2.0, etc.) contained within those repositories.</li>
                                <li><strong>Proprietary Work:</strong> Case studies regarding enterprise work (e.g., Al-Zafar) are representations of professional experience and do not disclose confidential trade secrets.</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold mb-4 text-foreground">3. Disclaimer</h2>
                            <p>
                                The materials on this website are provided "as is". I make no warranties, expressed or implied,
                                regarding the accuracy or reliability of the demonstrations or code samples provided for educational purposes.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold mb-4 text-foreground">4. Governing Law</h2>
                            <p>
                                These terms are governed by and construed in accordance with the laws of the United Kingdom.
                                Any disputes relating to these terms will be subject to the jurisdiction of the courts of London, UK.
                            </p>
                        </section>
                    </div>
                </div>
            </div>
        </main>
    );
}
