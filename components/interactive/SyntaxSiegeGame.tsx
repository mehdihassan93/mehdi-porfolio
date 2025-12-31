'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Play, RotateCcw, Trophy, Keyboard, Skull, Zap } from 'lucide-react';

const WORDS = [
    'const', 'let', 'var', 'function', 'return', 'interface', 'type', 'class',
    'import', 'export', 'default', 'async', 'await', 'promise', 'try', 'catch',
    'throw', 'new', 'this', 'void', 'null', 'undefined', 'true', 'false',
    'if', 'else', 'switch', 'case', 'break', 'continue', 'while', 'for',
    'map', 'filter', 'reduce', 'push', 'pop', 'shift', 'unshift', 'splice',
    'react', 'nextjs', 'node', 'typescript', 'javascript', 'css', 'html',
    'component', 'props', 'state', 'hook', 'effect', 'ref', 'context'
];

interface Enemy {
    id: number;
    word: string;
    x: number;
    y: number;
    speed: number;
    color: string;
    matchedChars: number; // How many chars typed so far
}

interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    life: number;
    color: string;
}

export const SyntaxSiegeGame = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [gameState, setGameState] = useState<'start' | 'playing' | 'gameover'>('start');
    const [score, setScore] = useState(0);
    const [highScore, setHighScore] = useState(0);
    const [health, setHealth] = useState(100);
    const [inputValue, setInputValue] = useState('');
    const [isFullscreen, setIsFullscreen] = useState(false);

    useEffect(() => {
        const handleFullscreenChange = () => setIsFullscreen(!!document.fullscreenElement);
        document.addEventListener('fullscreenchange', handleFullscreenChange);
        return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
    }, []);

    // Game Loop Refs (to avoid closure staleness)
    const stateRef = useRef({
        enemies: [] as Enemy[],
        particles: [] as Particle[],
        lastSpawn: 0,
        spawnRate: 2000,
        score: 0,
        health: 100,
        gameStatus: 'start' as 'start' | 'playing' | 'gameover'
    });

    useEffect(() => {
        const saved = localStorage.getItem('syntax-siege-highscore');
        if (saved) setHighScore(parseInt(saved));

        const handleKeyDown = (e: KeyboardEvent) => {
            if (stateRef.current.gameStatus !== 'playing') return;

            // Prevent default backspace if we want to block it, but usually standard typing needs it
            // Actually, for this game, we might just capture keypresses directly 
            // but binding to a hidden input or just window keydown is easier.

            const key = e.key;
            if (key.length === 1 && /[a-zA-Z]/.test(key)) {
                processInput(key.toLowerCase());
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    const processInput = (char: string) => {
        const { enemies } = stateRef.current;

        // Find active target or find new target
        // Simple logic: Find ANY enemy that matches the next char in their word?
        // Or strictly typed? Better: Type the WHOLE word.
        // Let's go with: Type the first letter of a word to lock on? 
        // Or simpler: Just update a global input buffer?

        // "ZType" style: Type letters. If multiple words start with 'f', visually highlight all. 
        // Then if 'u' is typed, narrow down.

        // Let's implement: Active Target.
        // If no active target, buffer searches for enemies starting with char.
        // If multiple, closest one is picked.

        // Actually simplest for React implementation:
        // Just check all enemies. If any enemy's NEXT required char matches input, advance it.
        // Prioritize the closest enemy if simple collision.

        let target = enemies.find(e => e.word.startsWith(char) && e.matchedChars === 0);

        // Priority: If we already have partially typed words, continue them.
        const activeEnemies = enemies.filter(e => e.matchedChars > 0);

        if (activeEnemies.length > 0) {
            // We are locked onto these.
            let hit = false;
            activeEnemies.forEach(e => {
                if (e.word[e.matchedChars] === char) {
                    e.matchedChars++;
                    hit = true;
                    if (e.matchedChars === e.word.length) {
                        destroyEnemy(e);
                    }
                }
            });

            // If we typed a wrong char for the active word, maybe penalty? Or just ignore.
            // ZType resets if you type wrong on an active word? No, that's too hard.
            // We'll just ignore wrong keys on active words.
        } else {
            // No active words, look for new starts.
            const potentialTargets = enemies.filter(e => e.word.startsWith(char));
            if (potentialTargets.length > 0) {
                // Pick the closest one (lowest Y usually, or closest to player center)
                // Let's pick ONE closest to bottom to lock on if we want single-lock
                // OR we can activate ALL matching starts (ZType style)
                potentialTargets.forEach(e => e.matchedChars++);
                // Check instant win (1 letter words? unlikely)
            }
        }
    };

    const destroyEnemy = (enemy: Enemy) => {
        const state = stateRef.current;
        state.enemies = state.enemies.filter(e => e.id !== enemy.id);
        state.score += enemy.word.length * 10;
        setScore(state.score);

        // Spawn Particles
        for (let i = 0; i < 8; i++) {
            state.particles.push({
                x: enemy.x,
                y: enemy.y,
                vx: (Math.random() - 0.5) * 5,
                vy: (Math.random() - 0.5) * 5,
                life: 1.0,
                color: enemy.color
            });
        }
    };

    const startGame = () => {
        stateRef.current = {
            enemies: [],
            particles: [],
            lastSpawn: 0,
            spawnRate: 2000,
            score: 0,
            health: 100,
            gameStatus: 'playing'
        };
        setScore(0);
        setHealth(100);
        setGameState('playing');
        requestAnimationFrame(gameLoop);
    };

    const gameLoop = (timestamp: number) => {
        if (stateRef.current.gameStatus !== 'playing') return;

        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const state = stateRef.current;
        const width = canvas.width = canvas.offsetWidth;
        const height = canvas.height = canvas.offsetHeight;

        // Clear
        ctx.fillStyle = '#111'; // Dark bg
        ctx.fillRect(0, 0, width, height);

        // Draw Grid (Retro effect)
        ctx.strokeStyle = '#222';
        ctx.lineWidth = 1;
        for (let x = 0; x < width; x += 40) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, height); ctx.stroke(); }
        for (let y = 0; y < height; y += 40) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(width, y); ctx.stroke(); }

        // Spawn Logic
        if (timestamp - state.lastSpawn > state.spawnRate) {
            const word = WORDS[Math.floor(Math.random() * WORDS.length)];
            const color = ['var(--primary)', 'var(--accent)', 'var(--secondary)', 'var(--secondary-dark)'][Math.floor(Math.random() * 4)];
            state.enemies.push({
                id: Math.random(),
                word: word,
                x: Math.random() * (width - 100) + 50, // padding
                y: -50,
                speed: 0.5 + (state.score / 5000), // Scaling difficulty
                color: color,
                matchedChars: 0
            });
            state.lastSpawn = timestamp;
            state.spawnRate = Math.max(500, 2000 - (state.score / 10)); // Cap speed
        }

        // Update & Draw Enemies
        state.enemies.forEach((enemy) => {
            enemy.y += enemy.speed;

            // Hit Player Logic
            if (enemy.y > height - 50) {
                state.health -= 10;
                setHealth(state.health);
                state.enemies = state.enemies.filter(e => e.id !== enemy.id);
                // Shake effect?

                if (state.health <= 0) {
                    state.gameStatus = 'gameover';
                    setGameState('gameover');
                    if (state.score > highScore) {
                        setHighScore(state.score);
                        localStorage.setItem('syntax-siege-highscore', state.score.toString());
                    }
                }
            }

            // Draw Enemy Word
            ctx.font = 'bold 20px monospace';
            const textWidth = ctx.measureText(enemy.word).width;

            // Glow
            ctx.shadowBlur = 10;
            ctx.shadowColor = enemy.color;

            // Draw Matched Part (white/bright)
            const matched = enemy.word.substring(0, enemy.matchedChars);
            const remaining = enemy.word.substring(enemy.matchedChars);

            ctx.fillStyle = '#FFF';
            ctx.fillText(matched, enemy.x - textWidth / 2, enemy.y);

            // Draw Remaining Part (colored)
            ctx.fillStyle = enemy.color;
            ctx.fillText(remaining, enemy.x - textWidth / 2 + ctx.measureText(matched).width, enemy.y);

            // Reset Glow
            ctx.shadowBlur = 0;

            // Draw "Bug" Icon/Shape above word
            ctx.beginPath();
            ctx.arc(enemy.x, enemy.y - 25, 12, 0, Math.PI * 2);
            ctx.fillStyle = enemy.color;
            ctx.fill();
        });

        // Update & Draw Particles
        state.particles = state.particles.filter(p => p.life > 0);
        state.particles.forEach(p => {
            p.x += p.vx;
            p.y += p.vy;
            p.life -= 0.02;

            ctx.globalAlpha = p.life;
            ctx.fillStyle = p.color;
            ctx.beginPath();
            ctx.arc(p.x, p.y, 3, 0, Math.PI * 2);
            ctx.fill();
            ctx.globalAlpha = 1;
        });

        // Player Base (Visual Only)
        ctx.fillStyle = 'var(--background-dark)';
        ctx.fillRect(0, height - 10, width, 10);
        // Health Bar line
        ctx.fillStyle = state.health > 50 ? 'var(--accent)' : 'var(--primary)';
        ctx.fillRect(0, height - 5, width * (state.health / 100), 5);

        requestAnimationFrame(gameLoop);
    };

    return (
        <div className="w-full max-w-5xl mx-auto p-4">
            {/* HUD */}
            <div className="flex justify-between items-end mb-4 font-mono text-sm uppercase tracking-widest gap-8">
                <div className="glass-card px-6 py-3 bg-primary/10 border-primary/20 flex flex-col items-center">
                    <span className="text-primary text-[10px] mb-1">Current Score</span>
                    <span className="text-3xl font-black text-white">{score}</span>
                </div>

                {/* Health Bar Visual */}
                <div className="flex-1 pb-4">
                    <div className="flex justify-between text-[10px] text-white/40 mb-1">
                        <span>System Integrity</span>
                        <span>{health}%</span>
                    </div>
                    <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                        <div
                            className="h-full transition-all duration-300 ease-out"
                            style={{
                                width: `${health}%`,
                                backgroundColor: health > 50 ? '#99B898' : '#E84A5F'
                            }}
                        />
                    </div>
                </div>

                <div className="glass-card px-6 py-3 bg-accent/10 border-accent/20 flex flex-col items-center">
                    <span className="text-accent text-[10px] mb-1">High Score</span>
                    <span className="text-3xl font-black text-white">{highScore}</span>
                </div>
            </div>

            {/* Game Container */}
            <div className="relative aspect-[16/9] w-full bg-black rounded-3xl overflow-hidden border border-white/10 shadow-2xl group cursor-none">
                <canvas
                    ref={canvasRef}
                    className="w-full h-full block"
                />

                {/* Overlays */}
                {gameState === 'start' && (
                    <div className="absolute inset-0 bg-black/80 backdrop-blur-sm flex flex-col items-center justify-center p-8 text-center z-10">
                        <div className="mb-6 rounded-full bg-[#E84A5F]/20 p-6 animate-pulse">
                            <Keyboard size={48} className="text-[#E84A5F]" />
                        </div>
                        <h2 className="text-4xl md:text-6xl font-black italic uppercase text-white mb-2">Syntax Siege</h2>
                        <p className="text-white/50 max-w-md mb-8 font-light">
                            Defend the core from buggy code. Type the keywords to neutralize incoming threats.
                        </p>
                        <button
                            onClick={startGame}
                            className="btn-primary flex items-center gap-2 group/btn"
                        >
                            <Play size={18} className="fill-current" />
                            Initialize System
                        </button>
                    </div>
                )}

                {gameState === 'gameover' && (
                    <div className="absolute inset-0 bg-red-900/40 backdrop-blur-md flex flex-col items-center justify-center p-8 text-center z-10">
                        <div className="mb-6 rounded-full bg-white/10 p-6">
                            <Skull size={48} className="text-white" />
                        </div>
                        <h2 className="text-5xl font-black text-white mb-2 tracking-widest">SYSTEM FAILURE</h2>
                        <div className="text-8xl font-black text-[#E84A5F] mb-8 font-mono">{score}</div>
                        <button
                            onClick={startGame}
                            className="px-8 py-3 bg-white text-black font-black uppercase tracking-widest hover:scale-105 transition-transform rounded-full flex items-center gap-2"
                        >
                            <RotateCcw size={18} />
                            Reboot System
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

            <div className="flex justify-between items-center mt-4">
                <div className="text-[10px] text-white/20 uppercase tracking-[0.5em]">
                    Type to eliminate targets
                </div>
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
