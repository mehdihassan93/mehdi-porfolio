'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const WelcomeLoader = () => {
    const [isLoading, setIsLoading] = useState(true);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [progress, setProgress] = useState(0);

    // State for the "Fly to Header" animation
    const [isFlying, setIsFlying] = useState(false);
    const [logoDest, setLogoDest] = useState({ x: 0, y: 0, scale: 1 });

    const handleAnimationComplete = () => {
        // Calculate destination (The logo in the nav bar)
        const navLogo = document.getElementById('nav-logo-container');
        if (navLogo) {
            const rect = navLogo.getBoundingClientRect();
            // We want to fly to the center of the nav logo
            // Current center is window.innerWidth/2, window.innerHeight/2
            const destX = rect.left + rect.width / 2 - window.innerWidth / 2;
            const destY = rect.top + rect.height / 2 - window.innerHeight / 2;

            // Adjust X to shift it slightly right to align perfectly with "MEHDI." text start
            // The loader text is centered, but the nav logo is left aligned in its container
            const adjustedDestX = destX + 20;

            // Scale diff: The loader text is huge (text-9xl), nav is small (text-2xl)
            // Approx scale down factor
            setLogoDest({ x: adjustedDestX, y: destY, scale: 0.12 });
            setIsFlying(true);

            // Hide loader background after flight starts
            setTimeout(() => {
                sessionStorage.setItem('has-visited', 'true');
                setIsLoading(false);
            }, 1000); // Shorter wait for flight
        } else {
            // Fallback if nav not found
            sessionStorage.setItem('has-visited', 'true');
            setIsLoading(false);
        }
    };

    // Trigger when progress hits 100
    useEffect(() => {
        if (progress === 100 && !isFlying) {
            // Small delay to let user see 100%
            setTimeout(handleAnimationComplete, 200);
        }
    }, [progress]);

    useEffect(() => {
        // Check session storage to show only once per session
        const hasVisited = sessionStorage.getItem('has-visited');
        if (hasVisited) {
            setIsLoading(false);
            return;
        }

        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Set canvas size
        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resize();
        window.addEventListener('resize', resize);

        // Rain particles
        const drops: { x: number; y: number; speed: number; length: number }[] = [];
        const dropCount = 100;

        // Water Level
        let waterLevel = 0;
        const fillSpeed = canvas.height / 180; // Slightly faster

        // Brand Palette
        const BRAND_PINK = '#E84A5F';
        const BRAND_GLOW = '#fb7185';
        const BRAND_DARK = '#881337'; // Deep red/burgundy

        // Initialize drops
        for (let i = 0; i < dropCount; i++) {
            drops.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                speed: 8 + Math.random() * 15,
                length: 15 + Math.random() * 30
            });
        }

        let animationId: number;
        let isFinished = false;

        const animate = () => {
            if (isFinished) return;

            // Clear with heavy trail effect for "Neon" feel
            ctx.fillStyle = 'rgba(10, 10, 10, 0.2)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Update Water Level
            waterLevel += fillSpeed;
            const currentProgress = Math.min(100, Math.floor((waterLevel / canvas.height) * 100));
            setProgress(currentProgress);

            // Draw Rising Liquid (Neon Plasma)
            const waterY = canvas.height - waterLevel;

            // Liquid Gradient
            const gradient = ctx.createLinearGradient(0, waterY, 0, canvas.height);
            gradient.addColorStop(0, BRAND_PINK);     // Hot Pink top
            gradient.addColorStop(0.4, BRAND_DARK);   // Dark Red middle
            gradient.addColorStop(1, '#000000');      // Black bottom
            ctx.fillStyle = gradient;
            ctx.fillRect(0, waterY, canvas.width, waterLevel);

            // Surface Line (Intense Glow)
            ctx.shadowBlur = 30;
            ctx.shadowColor = BRAND_PINK;
            ctx.fillStyle = '#ffffff';
            ctx.fillRect(0, waterY, canvas.width, 3);
            ctx.shadowBlur = 0;

            // Draw Digital Drops
            ctx.lineCap = 'round';

            drops.forEach(drop => {
                // Move drop
                drop.y += drop.speed;

                // Reset drop if it hits liquid
                if (drop.y > waterY) {
                    // Slight Splash Visual (Circle)
                    ctx.beginPath();
                    ctx.arc(drop.x, waterY, Math.random() * 3, 0, Math.PI * 2);
                    ctx.fillStyle = BRAND_GLOW;
                    ctx.fill();

                    drop.y = -drop.length;
                    drop.x = Math.random() * canvas.width;
                }

                // Draw drop (Gradient Stroke)
                const dropGrad = ctx.createLinearGradient(drop.x, drop.y, drop.x, drop.y + drop.length);
                dropGrad.addColorStop(0, 'rgba(232, 74, 95, 0)');
                dropGrad.addColorStop(1, BRAND_PINK);

                ctx.beginPath();
                ctx.moveTo(drop.x, drop.y);
                ctx.lineTo(drop.x, drop.y + drop.length);
                ctx.strokeStyle = dropGrad;
                ctx.lineWidth = 2;
                ctx.stroke();
            });

            // Check completion
            if (waterLevel >= canvas.height + 50) {
                isFinished = true;
                // Don't close immediately here, wait for React effect to trigger flight
            } else {
                animationId = requestAnimationFrame(animate);
            }
        };

        animationId = requestAnimationFrame(animate);

        return () => {
            window.removeEventListener('resize', resize);
            cancelAnimationFrame(animationId);
        };
    }, []);

    return (
        <AnimatePresence>
            {isLoading && (
                <motion.div
                    className="fixed inset-0 z-[9999] bg-black flex items-center justify-center overflow-hidden"
                    // Make background transparent during flight so we see site behind
                    animate={{ backgroundColor: isFlying ? 'rgba(0,0,0,0)' : '#000000' }}
                    transition={{ duration: 0.8 }}
                >
                    {/* Canvas fades out first */}
                    {!isFlying && <canvas ref={canvasRef} className="absolute inset-0 z-0" />}

                    <div className="relative z-10 flex flex-col items-center gap-2 mix-blend-screen">

                        {/* Container that Morphs and Flies */}
                        <motion.div
                            className="flex items-baseline"
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={isFlying ? {
                                x: logoDest.x,
                                y: logoDest.y,
                                scale: logoDest.scale,
                                opacity: 0 // Fade out at the very end to swap with real logo
                            } : {
                                scale: 1,
                                opacity: 1
                            }}
                            transition={isFlying ? {
                                duration: 1.2,
                                ease: [0.76, 0, 0.24, 1] // Custom bezier for "Flight" feel
                            } : { duration: 0.5 }}
                        >
                            {/* Morph Logic: Swap 100% with MEHDI. text */}
                            {!isFlying ? (
                                <>
                                    <span className="text-8xl md:text-[12rem] font-black text-[#E84A5F] tracking-tighter shadow-neon">
                                        {progress}
                                    </span>
                                    <span className="text-4xl md:text-6xl font-black text-white ml-2">%</span>
                                </>
                            ) : (
                                // This appears instantly when flight starts (Morph)
                                <div className="text-[12rem] font-black italic tracking-tighter flex items-center gap-4 text-white">
                                    MEHDI<span className="text-[#E84A5F] italic">.</span>
                                </div>
                            )}
                        </motion.div>

                        {!isFlying && (
                            <p className="text-[#E84A5F] text-xs font-black tracking-[0.8em] uppercase animate-pulse">
                                INITIALIZING SYSTEM
                            </p>
                        )}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
