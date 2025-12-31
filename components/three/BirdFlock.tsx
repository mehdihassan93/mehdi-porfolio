'use client';

import React, { useMemo, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { Environment } from '@react-three/drei';

const BIRD_COUNT = 150;
const VISUAL_RADIUS = 5;
const BASE_SPEED = 0.08;
const MAX_FORCE = 0.003;

function Birds() {
    const meshRef = useRef<THREE.InstancedMesh>(null);
    const { viewport } = useThree();

    // 1. Initialize ALL Data Structures
    const [data] = useMemo(() => {
        // Physics
        const pos = new Float32Array(BIRD_COUNT * 3);
        const vel = new Float32Array(BIRD_COUNT * 3);
        const acc = new Float32Array(BIRD_COUNT * 3);

        // Traits
        const speedMult = new Float32Array(BIRD_COUNT); // Individual speed limits
        const isLeader = new Uint8Array(BIRD_COUNT);    // Boolean flag
        const wanderState = new Float32Array(BIRD_COUNT * 2); // For smooth wondering (theta, phi)

        for (let i = 0; i < BIRD_COUNT; i++) {
            const i3 = i * 3;
            // Position
            pos[i3] = (Math.random() - 0.5) * 20;
            pos[i3 + 1] = (Math.random() - 0.5) * 10;
            pos[i3 + 2] = (Math.random() - 0.5) * 10;

            // Velocity
            vel[i3] = (Math.random() - 0.5) * BASE_SPEED;
            vel[i3 + 1] = (Math.random() - 0.5) * BASE_SPEED;
            vel[i3 + 2] = (Math.random() - 0.5) * BASE_SPEED;

            // Traits
            speedMult[i] = 0.8 + Math.random() * 0.4; // 0.8x to 1.2x variation
            isLeader[i] = Math.random() < 0.05 ? 1 : 0; // 5% Leaders

            // Wander seed
            wanderState[i * 2] = Math.random() * Math.PI * 2;
            wanderState[i * 2 + 1] = Math.random() * Math.PI;
        }

        return [{ pos, vel, acc, speedMult, isLeader, wanderState }];
    }, []);

    const dummy = useMemo(() => new THREE.Object3D(), []);
    const tempColor = useMemo(() => new THREE.Color(), []);

    useFrame((state) => {
        if (!meshRef.current) return;
        const { pos, vel, acc, speedMult, isLeader, wanderState } = data;

        // Apply Colors on first frame (hacky but reliable for this constrained env)
        if (meshRef.current.instanceColor === null) {
            const colors = new Float32Array(BIRD_COUNT * 3);
            for (let i = 0; i < BIRD_COUNT; i++) {
                if (isLeader[i]) tempColor.set('#FFD700'); // Gold for Leaders
                else tempColor.set('#E84A5F'); // Pink for followers

                colors[i * 3] = tempColor.r;
                colors[i * 3 + 1] = tempColor.g;
                colors[i * 3 + 2] = tempColor.b;
            }
            meshRef.current.instanceColor = new THREE.InstancedBufferAttribute(colors, 3);
            meshRef.current.instanceColor.needsUpdate = true;
        }

        for (let i = 0; i < BIRD_COUNT; i++) {
            const i3 = i * 3;
            acc[i3] = 0; acc[i3 + 1] = 0; acc[i3 + 2] = 0;

            // --- BEHAVIORS ---

            // 1. Separation / Alignment / Cohesion
            let sepX = 0, sepY = 0, sepZ = 0;
            let aliX = 0, aliY = 0, aliZ = 0;
            let cohX = 0, cohY = 0, cohZ = 0;
            let count = 0;

            const px = pos[i3], py = pos[i3 + 1], pz = pos[i3 + 2];
            const vx = vel[i3], vy = vel[i3 + 1], vz = vel[i3 + 2];

            for (let j = 0; j < BIRD_COUNT; j++) {
                if (i === j) continue;
                const j3 = j * 3;
                const dx = px - pos[j3];
                const dy = py - pos[j3 + 1];
                const dz = pz - pos[j3 + 2];
                const distSq = dx * dx + dy * dy + dz * dz;

                if (distSq < VISUAL_RADIUS * VISUAL_RADIUS && distSq > 0.001) {
                    const dist = Math.sqrt(distSq);

                    // Leader Influence: Neighbors who are leaders carry 2.5x weight
                    const influence = isLeader[j] ? 2.5 : 1.0;

                    // Separation
                    const repel = (1.0 / dist) * influence;
                    sepX += (dx / dist) * repel;
                    sepY += (dy / dist) * repel;
                    sepZ += (dz / dist) * repel;

                    // Alignment & Cohesion (Accumulate)
                    aliX += vel[j3] * influence;
                    aliY += vel[j3 + 1] * influence;
                    aliZ += vel[j3 + 2] * influence;

                    cohX += pos[j3] * influence;
                    cohY += pos[j3 + 1] * influence;
                    cohZ += pos[j3 + 2] * influence;

                    count += influence;
                }
            }

            if (count > 0) {
                // Average Cohesion
                cohX = (cohX / count) - px;
                cohY = (cohY / count) - py;
                cohZ = (cohZ / count) - pz;

                // Average Alignment
                aliX /= count; aliY /= count; aliZ /= count;

                // Normalize Steers
                const steer = (x: number, y: number, z: number) => {
                    const m = Math.sqrt(x * x + y * y + z * z);
                    if (m > 0) return [x / m, y / m, z / m];
                    return [0, 0, 0];
                };

                // Alignment Steering
                const [aliSx, aliSy, aliSz] = steer(aliX, aliY, aliZ);
                // Cohesion Steering
                const [cohSx, cohSy, cohSz] = steer(cohX, cohY, cohZ);

                // Apply Weights
                acc[i3] += sepX * 1.5 + (aliSx - (vx * 0.5)) * 1.2 + (cohSx - (vx * 0.5)) * 1.0;
                acc[i3 + 1] += sepY * 1.5 + (aliSy - (vy * 0.5)) * 1.2 + (cohSy - (vy * 0.5)) * 1.0;
                acc[i3 + 2] += sepZ * 1.5 + (aliSz - (vz * 0.5)) * 1.2 + (cohSz - (vz * 0.5)) * 1.0;
            }

            // 2. Smooth Random Wander
            // Change direction slowly
            const WANDER_STRENGTH = 0.5;
            wanderState[i * 2] += (Math.random() - 0.5) * 0.1; // Update theta
            wanderState[i * 2 + 1] += (Math.random() - 0.5) * 0.1; // Update phi

            const wx = Math.sin(wanderState[i * 2]) * Math.cos(wanderState[i * 2 + 1]);
            const wy = Math.sin(wanderState[i * 2]) * Math.sin(wanderState[i * 2 + 1]);
            const wz = Math.cos(wanderState[i * 2]);

            acc[i3] += wx * WANDER_STRENGTH;
            acc[i3 + 1] += wy * WANDER_STRENGTH;
            acc[i3 + 2] += wz * WANDER_STRENGTH;

            // 3. Center Return (Soft Bounds)
            const dCenterSq = px * px + py * py + pz * pz;
            if (dCenterSq > 400) { // Radius 20
                const pull = 0.0001;
                acc[i3] -= px * pull;
                acc[i3 + 1] -= py * pull;
                acc[i3 + 2] -= pz * pull;
            }

            // --- INTEGRATION ---
            vel[i3] += acc[i3];
            vel[i3 + 1] += acc[i3 + 1];
            vel[i3 + 2] += acc[i3 + 2];

            // Limit Speed (Individual)
            const vSq = vel[i3] * vel[i3] + vel[i3 + 1] * vel[i3 + 1] + vel[i3 + 2] * vel[i3 + 2];
            const maxS = BASE_SPEED * speedMult[i] * (isLeader[i] ? 1.2 : 1.0); // Leaders fast
            if (vSq > maxS * maxS) {
                const vLen = Math.sqrt(vSq);
                vel[i3] = (vel[i3] / vLen) * maxS;
                vel[i3 + 1] = (vel[i3 + 1] / vLen) * maxS;
                vel[i3 + 2] = (vel[i3 + 2] / vLen) * maxS;
            }

            pos[i3] += vel[i3];
            pos[i3 + 1] += vel[i3 + 1];
            pos[i3 + 2] += vel[i3 + 2];

            // Render
            dummy.position.set(pos[i3], pos[i3 + 1], pos[i3 + 2]);

            // Orientation + Banking
            // Look ahead
            const lookTarget = new THREE.Vector3(
                pos[i3] + vel[i3],
                pos[i3 + 1] + vel[i3 + 1],
                pos[i3 + 2] + vel[i3 + 2]
            );
            dummy.lookAt(lookTarget);

            // Banking: Roll based on turn acceleration (Sideways acceleration component)
            // Simplified: Roll based on horizontal turn rate vs vertical
            // We can approximate banking by rotating Z based on Y-axis rotation change, or just noise
            // Let's rely on lookAt for pitch/yaw, and add slight roll based on "wander" state for personality
            const roll = (wanderState[i * 2] - Math.PI) * 0.2;
            dummy.rotateZ(roll);

            dummy.updateMatrix();
            meshRef.current.setMatrixAt(i, dummy.matrix);
        }
        meshRef.current.instanceMatrix.needsUpdate = true;
    });

    return (
        <instancedMesh ref={meshRef} args={[undefined, undefined, BIRD_COUNT]}>
            {/* Flattened sphere to show orientation/banking */}
            <sphereGeometry args={[0.08, 8, 8]} />
            <meshStandardMaterial
                color="#ffffff" // Base color driven by instanceColor
                emissive="#ffffff"
                emissiveIntensity={0.5}
                roughness={0.2}
                metalness={0.8}
            />
        </instancedMesh>
    );
}

export const BirdFlock = () => {
    return (
        <div className="w-full h-full absolute inset-0 z-0 pointer-events-none">
            <Canvas camera={{ position: [0, 0, 20], fov: 45 }}>
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} />
                <Birds />
                <fog attach="fog" args={['#000000', 10, 40]} />
            </Canvas>
        </div>
    );
};
