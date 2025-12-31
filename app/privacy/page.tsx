'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Shield } from 'lucide-react';

export default function PrivacyPolicy() {
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
                            <Shield size={32} />
                        </div>
                        <h1 className="text-4xl font-black italic tracking-tighter uppercase">Privacy Policy</h1>
                    </div>

                    <div className="prose dark:prose-invert max-w-none opacity-80 font-light space-y-8">
                        <p className="text-lg">Last Updated: December 2025</p>

                        <section>
                            <h2 className="text-2xl font-bold mb-4 text-foreground">1. Introduction</h2>
                            <p>
                                Welcome to <strong>Mehi Hassan's Portfolio</strong>. This Privacy Policy explains how I handle any information
                                collected when you visit www.mehdi-hassan.com. As a personal portfolio, my priority is showcasing my work,
                                not collecting your data.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold mb-4 text-foreground">2. Information Collection</h2>
                            <p>
                                I do not actively collect personal data through cookies or tracking pixels for marketing purposes.
                                The only information I receive is what you voluntarily provide when:
                            </p>
                            <ul className="list-disc pl-6 space-y-2 mt-4">
                                <li>You click on email links to contact me directly.</li>
                                <li>You interact with my linked social media profiles (LinkedIn/GitHub).</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold mb-4 text-foreground">3. Usage of Information</h2>
                            <p>
                                Any contact information you provide via email is used solely to reply to your inquiries regarding
                                potential projects, employment opportunities, or open-source collaboration. I do not sell, rent,
                                or share your contact details with third parties.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold mb-4 text-foreground">4. External Links</h2>
                            <p>
                                This website contains links to external sites (e.g., GitHub, LinkedIn, Project Deployments).
                                I am not responsible for the content or privacy practices of these third-party sites.
                                Please review their respective privacy policies.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold mb-4 text-foreground">5. Contact</h2>
                            <p>
                                If you have any questions about this policy, please contact me at:
                                <br />
                                <span className="font-bold text-primary">mehdihassan22@gmail.com</span>
                            </p>
                        </section>
                    </div>
                </div>
            </div>
        </main>
    );
}
