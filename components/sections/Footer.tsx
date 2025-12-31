import Link from 'next/link';
import { Github, Linkedin, Mail } from 'lucide-react';

export const Footer = () => {
    return (
        <footer className="py-12 border-t border-border mt-32">
            <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-10">
                <div>
                    <Link href="/" className="text-2xl font-black italic tracking-tighter mb-2 hover:text-primary transition-colors block">
                        MEHDI<span className="text-primary italic">.</span>
                    </Link>
                    <p className="opacity-30 text-[10px] uppercase tracking-[0.4em] font-bold">FAANG-Tier Android Engineering</p>
                </div>

                <div className="flex flex-col items-center md:items-end gap-4">
                    <div className="flex gap-6">
                        <a href="https://www.github.com/mehdihassan93" target="_blank" rel="noopener noreferrer" aria-label="GitHub Profile" className="opacity-40 hover:opacity-100 transition-opacity"><Github size={18} /></a>
                        <a href="https://www.linkedin.com/in/mehdihassan93" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn Profile" className="opacity-40 hover:opacity-100 transition-opacity"><Linkedin size={18} /></a>
                        <a href="mailto:mehdihassan22@gmail.com" aria-label="Email Me" className="opacity-40 hover:opacity-100 transition-opacity"><Mail size={18} /></a>
                    </div>
                    <p className="text-[9px] uppercase tracking-[0.3em] opacity-30 italic">© 2024 MEHDI HASSAN. ALL RIGHTS RESERVED.</p>
                </div>
            </div>

            {/* Bottom Legal bar */}
            <div className="max-w-7xl mx-auto px-6 md:px-12 mt-12 pt-8 border-t border-white/5 flex flex-wrap justify-between gap-4 text-[9px] font-bold uppercase tracking-widest opacity-20">
                <div className="flex gap-8">
                    <Link href="/privacy" className="hover:opacity-100">Privacy Policy</Link>
                    <Link href="/terms" className="hover:opacity-100">Terms of Service</Link>
                </div>
                <div>Designed in UK • Built with React & Three.js</div>
            </div>
        </footer>
    );
};
