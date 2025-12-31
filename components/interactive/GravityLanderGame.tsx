'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Play, RotateCcw, Rocket, Zap, Crosshair } from 'lucide-react';

const GRAVITY = 0.05;
const THRUST_POWER = 0.12;
const ROTATION_SPEED = 0.05;
const SAFE_LANDING_SPEED = 1.5;
const SAFE_LANDING_ANGLE = 0.5; // Radians (~28 degrees)

interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    life: number;
    color: string;
}

interface Star {
    x: number;
    y: number;
    size: number;
    brightness: number;
}

export const GravityLanderGame = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [gameState, setGameState] = useState<'start' | 'playing' | 'landed' | 'crashed'>('start');
    const [fuel, setFuel] = useState(100);
    const [score, setScore] = useState(0);
    const [velocity, setVelocity] = useState({ x: 0, y: 0 });
    const [altitude, setAltitude] = useState(0);
    const [isFullscreen, setIsFullscreen] = useState(false);

    useEffect(() => {
        const handleFullscreenChange = () => setIsFullscreen(!!document.fullscreenElement);
        document.addEventListener('fullscreenchange', handleFullscreenChange);
        return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
    }, []);

    const stateRef = useRef({
        x: 0,
        y: 0,
        vx: 0,
        vy: 0,
        angle: 0,
        fuel: 100,
        thrusting: false,
        rotatingLeft: false,
        rotatingRight: false,
        particles: [] as Particle[],
        terrain: [] as { x: number; y: number }[],
        landingPad: { x: 0, y: 0, width: 0 },
        stars: [] as Star[],
        gameStatus: 'start' as 'start' | 'playing' | 'landed' | 'crashed'
    });

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (stateRef.current.gameStatus !== 'playing') return;
            if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Space'].includes(e.code)) {
                e.preventDefault();
            }

            if (e.code === 'ArrowUp' || e.code === 'Space') stateRef.current.thrusting = true;
            if (e.code === 'ArrowLeft') stateRef.current.rotatingLeft = true;
            if (e.code === 'ArrowRight') stateRef.current.rotatingRight = true;
        };

        const handleKeyUp = (e: KeyboardEvent) => {
            if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Space'].includes(e.code)) {
                e.preventDefault();
            }

            if (e.code === 'ArrowUp' || e.code === 'Space') stateRef.current.thrusting = false;
            if (e.code === 'ArrowLeft') stateRef.current.rotatingLeft = false;
            if (e.code === 'ArrowRight') stateRef.current.rotatingRight = false;
        };

        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
        };
    }, []);

    const generateTerrain = (width: number, height: number) => {
        const points = [];
        const segments = 10;
        const segmentWidth = width / segments;

        // Randomize Pad Position (avoid edges)
        const padSegment = Math.floor(Math.random() * (segments - 2)) + 1;

        points.push({ x: 0, y: height * 0.8 }); // Start left

        for (let i = 1; i <= segments; i++) {
            const x = i * segmentWidth;
            let y;

            if (i === padSegment || i === padSegment + 1) {
                // Landing Pad Area (Flat)
                y = height * 0.7; // Fixed height for pad
                if (i === padSegment) { // Start of pad
                    stateRef.current.landingPad = {
                        x: (i - 1) * segmentWidth,
                        y: y,
                        width: segmentWidth * 2 // Roughly 2 segments wide flat area 
                    };
                    // Actually, let's make the pad specifically strictly flat between points
                }
            } else {
                // Random terrain
                y = height * 0.6 + Math.random() * (height * 0.4);
            }
            points.push({ x, y });
        }

        // Ensure exact flatness for pad
        points[padSegment].y = points[padSegment - 1].y = height * 0.75;
        stateRef.current.landingPad = {
            x: points[padSegment - 1].x,
            y: points[padSegment - 1].y,
            width: points[padSegment].x - points[padSegment - 1].x
        };

        points.push({ x: width, y: height }); // Bottom right corner
        points.push({ x: 0, y: height }); // Bottom left corner

        return points;
    };

    const generateStars = (width: number, height: number) => {
        const stars = [];
        for (let i = 0; i < 50; i++) {
            stars.push({
                x: Math.random() * width,
                y: Math.random() * height,
                size: Math.random() * 2,
                brightness: Math.random()
            });
        }
        return stars;
    }

    const initGame = () => {
        if (!canvasRef.current) return;
        const width = canvasRef.current.offsetWidth;
        const height = canvasRef.current.offsetHeight;

        const terrain = generateTerrain(width, height);

        // Reset State
        stateRef.current = {
            ...stateRef.current,
            x: width / 2,
            y: 50,
            vx: 0,
            vy: 0,
            angle: 0,
            fuel: 100,
            thrusting: false,
            rotatingLeft: false,
            rotatingRight: false,
            particles: [],
            terrain: terrain,
            stars: generateStars(width, height),
            gameStatus: 'playing'
        };

        setGameState('playing');
        setFuel(100);
        setScore(0);

        requestAnimationFrame(gameLoop);
    };

    const spawnParticles = (x: number, y: number, amount: number, color: string, speed = 1) => {
        for (let i = 0; i < amount; i++) {
            const angle = Math.random() * Math.PI * 2;
            const vel = Math.random() * speed;
            stateRef.current.particles.push({
                x, y,
                vx: Math.cos(angle) * vel,
                vy: Math.sin(angle) * vel,
                life: 1.0,
                color
            });
        }
    };

    const checkCollision = (shipX: number, shipY: number, terrain: { x: number, y: number }[]) => {
        // Simple line intersection or point-in-polygon relative to ships legs?
        // Simplest: Check if Ship Y > Terrain Y at Ship X

        const state = stateRef.current;

        for (let i = 0; i < terrain.length - 1; i++) {
            const p1 = terrain[i];
            const p2 = terrain[i + 1];

            // Check if ship is horizontally within this segment
            if (shipX >= p1.x && shipX <= p2.x) {
                // Interpolate terrain height at shipX
                const t = (shipX - p1.x) / (p2.x - p1.x);
                const terrainY = p1.y + t * (p2.y - p1.y);

                // If ship touches terrain
                if (shipY + 15 >= terrainY) { // +15 is ship half height roughly
                    return { hit: true, terrainY };
                }
            }
        }
        return { hit: false, terrainY: 0 };
    };

    const gameLoop = () => {
        if (stateRef.current.gameStatus !== 'playing') return;

        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const width = canvas.width = canvas.offsetWidth;
        const height = canvas.height = canvas.offsetHeight;
        const state = stateRef.current;

        // --- PHYSICS ---

        // Rotation
        if (state.rotatingLeft) state.angle -= ROTATION_SPEED;
        if (state.rotatingRight) state.angle += ROTATION_SPEED;

        // Thrust
        if (state.thrusting && state.fuel > 0) {
            state.vx += Math.sin(state.angle) * THRUST_POWER;
            state.vy -= Math.cos(state.angle) * THRUST_POWER;
            state.fuel = Math.max(0, state.fuel - 0.2);

            // Thrust Particles
            const exhaustX = state.x - Math.sin(state.angle) * 15;
            const exhaustY = state.y + Math.cos(state.angle) * 15;
            spawnParticles(exhaustX, exhaustY, 2, '#FFA500', 2);
        }

        // Gravity
        state.vy += GRAVITY;

        // Move
        state.x += state.vx;
        state.y += state.vy;

        // Update React State for UI (throttled slightly ideally, but for now every frame is ok-ish or use REF for rendering logic usually)
        setVelocity({ x: state.vx, y: state.vy });
        setFuel(state.fuel);
        setAltitude(Math.max(0, height - state.y));

        // --- COLLISION ---
        // Screen Edges
        if (state.x < 0) { state.x = 0; state.vx *= -0.5; }
        if (state.x > width) { state.x = width; state.vx *= -0.5; }
        if (state.y < 0) { state.y = 0; state.vy = 0; } // Ceiling bounce?

        // Terrain
        const collision = checkCollision(state.x, state.y, state.terrain);

        if (collision.hit) {
            // Check Landing Conditions
            // Pad Detection: Widen by 15px to allow for ship radius (makes it feel fairer)
            const onPad = state.x > (state.landingPad.x - 10) && state.x < (state.landingPad.x + state.landingPad.width + 10);

            // Win Conditions (Very lenient per user request)
            const softLanding = state.vy < 3.0; // Was 1.5, now much faster is okay
            const upright = Math.abs(state.angle) < 0.8; // ~45 degrees allowed

            if (onPad) {
                if (softLanding && upright) {
                    // SUCCESS
                    state.gameStatus = 'landed';
                    setGameState('landed');
                    setScore(Math.floor(state.fuel * 100 + (1000 / (Math.abs(state.vx) + 1))));
                } else {
                    // Hit pad but too fast/tilted
                    state.gameStatus = 'crashed';
                    setGameState('crashed');
                    spawnParticles(state.x, state.y, 50, '#FF4444', 5);
                }
            } else {
                // Missed pad, hit terrain
                state.gameStatus = 'crashed';
                setGameState('crashed');
                spawnParticles(state.x, state.y, 50, '#FF4444', 5);
            }
        }

        // --- RENDER ---
        ctx.fillStyle = '#0B1015'; // Deep Space
        ctx.fillRect(0, 0, width, height);

        // Stars
        state.stars.forEach(star => {
            ctx.fillStyle = `rgba(255, 255, 255, ${star.brightness})`;
            ctx.fillRect(star.x, star.y, star.size, star.size);
        });

        // Terrain
        ctx.beginPath();
        if (state.terrain.length > 0) {
            ctx.moveTo(state.terrain[0].x, state.terrain[0].y);
            for (let i = 1; i < state.terrain.length; i++) {
                ctx.lineTo(state.terrain[i].x, state.terrain[i].y);
            }
        }
        ctx.fillStyle = 'var(--background-dark)'; // Using theme bg
        ctx.fill();
        ctx.strokeStyle = 'var(--primary)'; // Theme primary for neon edge
        ctx.lineWidth = 2;
        ctx.stroke();

        // Landing Pad Highlights
        if (state.landingPad) {
            ctx.strokeStyle = 'var(--accent)'; // Theme accent for safe zone
            ctx.lineWidth = 4;
            ctx.beginPath();
            ctx.moveTo(state.landingPad.x, state.landingPad.y);
            ctx.lineTo(state.landingPad.x + state.landingPad.width, state.landingPad.y);
            ctx.stroke();

            // Animated Markers
            ctx.fillStyle = `rgba(153, 184, 152, ${0.2 + Math.sin(Date.now() / 200) * 0.1})`; // Keeping slight green hint but with theme context
            ctx.fillRect(state.landingPad.x, state.landingPad.y - 40, state.landingPad.width, 40);
        }

        // Particles
        state.particles = state.particles.filter(p => p.life > 0);
        state.particles.forEach(p => {
            p.x += p.vx;
            p.y += p.vy;
            p.life -= 0.02;
            ctx.fillStyle = p.color;
            ctx.globalAlpha = p.life;
            ctx.beginPath();
            ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
            ctx.fill();
            ctx.globalAlpha = 1;
        });

        // Player Ship
        if (state.gameStatus === 'playing' || state.gameStatus === 'landed') {
            ctx.save();
            ctx.translate(state.x, state.y);
            ctx.rotate(state.angle);

            // Body
            ctx.fillStyle = '#FFF';
            ctx.beginPath();
            ctx.moveTo(0, -15);
            ctx.lineTo(10, 10);
            ctx.lineTo(0, 5);
            ctx.lineTo(-10, 10);
            ctx.closePath();
            ctx.fill();

            // Legs
            ctx.strokeStyle = '#999';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(-10, 10); ctx.lineTo(-12, 18);
            ctx.moveTo(10, 10); ctx.lineTo(12, 18);
            ctx.stroke();

            ctx.restore();
        }

        requestAnimationFrame(gameLoop);
    };

    return (
        <div className="w-full max-w-5xl mx-auto p-4">
            {/* Game Canvas */}
            <div className="relative aspect-[16/9] w-full bg-black rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
                {/* HUD Overlay (Inside Container for Fullscreen) */}
                <div className="absolute top-4 left-4 right-4 flex justify-between items-start z-20 pointer-events-none">
                    <div className="flex gap-4">
                        <div className="glass-card px-4 py-2 border border-white/10 flex flex-col items-center min-w-[100px] bg-black/40 backdrop-blur-sm">
                            <span className="text-[10px] text-white/50 uppercase tracking-widest mb-1">Fuel</span>
                            <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden mb-1">
                                <div className={`h-full ${fuel < 30 ? 'bg-red-500' : 'bg-[#E84A5F]'}`} style={{ width: `${fuel}%` }} />
                            </div>
                            <span className="text-xs font-mono">{Math.floor(fuel)}%</span>
                        </div>

                        <div className="glass-card px-4 py-2 border border-white/10 flex flex-col items-center min-w-[100px] bg-black/40 backdrop-blur-sm">
                            <span className="text-[10px] text-white/50 uppercase tracking-widest mb-1">Vertical v</span>
                            <span className={`text-lg font-mono font-bold ${velocity.y > SAFE_LANDING_SPEED ? 'text-primary' : 'text-accent'}`}>
                                {(velocity.y * 10).toFixed(1)}
                            </span>
                        </div>
                    </div>

                    {stateRef.current && (
                        <div className={`px-3 py-1 rounded border text-[10px] font-bold uppercase tracking-widest animate-pulse bg-black/40 backdrop-blur-sm
                            ${Math.abs(stateRef.current.angle) < SAFE_LANDING_ANGLE ? 'border-accent/50 text-accent' : 'border-primary/50 text-primary'}
                        `}>
                            angle check
                        </div>
                    )}
                </div>

                <canvas ref={canvasRef} className="w-full h-full block" />

                {/* Overlays */}
                {gameState === 'start' && (
                    <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center text-center p-8 z-10">
                        <div className="p-6 bg-white/5 rounded-full mb-6 ring-1 ring-white/10">
                            <Rocket size={48} className="text-[#E84A5F]" />
                        </div>
                        <h2 className="text-5xl font-black italic uppercase mb-2">Gravity Lander</h2>
                        <p className="text-white/50 max-w-sm mb-8 font-light">
                            Use <span className="text-white font-bold">Arrow Keys</span> to control thrust and rotation. Land gently on the <span className="text-[#99B898]">Green Pad</span>.
                        </p>
                        <button onClick={initGame} className="btn-primary flex items-center gap-2">
                            <Play size={18} fill="currentColor" /> Initiate Launch
                        </button>
                    </div>
                )}

                {gameState === 'crashed' && (
                    <div className="absolute inset-0 bg-red-900/60 backdrop-blur-sm flex flex-col items-center justify-center text-center z-10">
                        <h2 className="text-6xl font-black uppercase text-white mb-2">CRITICAL FAILURE</h2>
                        <p className="text-white/70 mb-8">Vessel destroyed on impact.</p>
                        <button onClick={initGame} className="px-8 py-3 bg-white text-black font-black uppercase tracking-widest hover:scale-105 transition-transform rounded-full">
                            Try Again
                        </button>
                    </div>
                )}

                {gameState === 'landed' && (
                    <div className="absolute inset-0 bg-[#99B898]/20 backdrop-blur-md flex flex-col items-center justify-center text-center z-10">
                        <h2 className="text-6xl font-black uppercase text-white mb-2">TOUCHDOWN</h2>
                        <div className="text-2xl font-mono text-[#99B898] mb-8">Score: {score}</div>
                        <button onClick={initGame} className="btn-primary">
                            Next Mission
                        </button>
                    </div>
                )}

                {/* Fullscreen Exit Button */}
                {isFullscreen && (
                    <button
                        onClick={() => document.exitFullscreen()}
                        className="absolute top-4 right-4 z-50 p-2 bg-black/50 hover:bg-red-500/80 rounded-full text-white/50 hover:text-white transition-all backdrop-blur-sm group"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 3v3a2 2 0 0 1-2 2H3" /><path d="M21 8h-3a2 2 0 0 1-2-2V3" /><path d="M3 16h3a2 2 0 0 1 2 2v3" /><path d="M16 21v-3a2 2 0 0 1 2-2h3" /></svg>
                        <span className="absolute right-full mr-2 top-1/2 -translate-y-1/2 px-2 py-1 bg-black/80 text-[10px] uppercase font-bold tracking-widest rounded opacity-0 group-hover:opacity-100 whitespace-nowrap pointer-events-none transition-opacity">
                            Exit Fullscreen
                        </span>
                    </button>
                )}
            </div>

            <div className="flex justify-end mt-2">
                <button
                    onClick={() => {
                        const elem = canvasRef.current?.parentElement;
                        if (!document.fullscreenElement && elem) {
                            elem.requestFullscreen().catch(err => {
                                console.error(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
                            });
                        } else {
                            document.exitFullscreen();
                        }
                    }}
                    className="text-[10px] uppercase font-bold tracking-widest text-white/30 hover:text-white flex items-center gap-2 transition-colors"
                >
                    [ Toggle Fullscreen ]
                </button>
            </div>
        </div>
    );
};
