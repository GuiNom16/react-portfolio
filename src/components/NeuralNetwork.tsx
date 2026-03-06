import React, { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useUI } from '../context/UIContext';

interface NeuralNetworkProps {
    count: number;
    maxDistance: number;
    speed: number;
}

const NeuralNetwork: React.FC<NeuralNetworkProps> = ({ count, maxDistance, speed }) => {
    const { mouse, viewport } = useThree();
    const { isChatOpen } = useUI();
    const instancedNodesRef = useRef<THREE.InstancedMesh>(null!);
    const linesRef = useRef<THREE.LineSegments>(null!);

    // Cluster configuration
    const clusterCount = 8;
    const clusterCenters = useMemo(() => {
        return Array.from({ length: clusterCount }).map(() => ({
            x: (Math.random() - 0.5) * 50,
            y: (Math.random() - 0.5) * 50,
            z: (Math.random() - 0.5) * 50,
            phase: Math.random() * Math.PI * 2
        }));
    }, []);

    // Initialize particles with clustering
    const particles = useMemo(() => {
        const temp = [];
        for (let i = 0; i < count; i++) {
            // Pick a random cluster center
            const cluster = clusterCenters[Math.floor(Math.random() * clusterCount)];

            // Random offset within the cluster
            const radius = 5 + Math.random() * 10;
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(2 * Math.random() - 1);

            const x = cluster.x + radius * Math.sin(phi) * Math.cos(theta);
            const y = cluster.y + radius * Math.sin(phi) * Math.sin(theta);
            const z = cluster.z + radius * Math.cos(phi);

            // Random velocity
            const vx = (Math.random() - 0.5) * 0.08;
            const vy = (Math.random() - 0.5) * 0.08;
            const vz = (Math.random() - 0.5) * 0.08;

            // Phase for harmonic drifting
            const phase = Math.random() * Math.PI * 2;

            temp.push({ x, y, z, vx, vy, vz, phase, cluster });
        }
        return temp;
    }, [count, clusterCenters]);

    // Shared matrix for instanced rendering
    const dummy = useMemo(() => new THREE.Object3D(), []);

    // Buffers for threads
    const linePositions = useMemo(() => new Float32Array(count * 60 * 3), [count]); // Safety buffer
    const lineColors = useMemo(() => new Float32Array(count * 60 * 3), [count]);

    useFrame((state) => {
        if (isChatOpen) return;

        const time = state.clock.getElapsedTime();
        let lineIdx = 0;
        const lineColor = new THREE.Color('#ff003c'); // Red theme

        // Update node positions and instances
        for (let i = 0; i < count; i++) {
            const p = particles[i];

            // Cluster movement influence
            const cDriftX = Math.sin(time * 0.2 + p.cluster.phase) * 0.01;
            const cDriftY = Math.cos(time * 0.2 + p.cluster.phase) * 0.01;

            // Individual harmonic drift
            const driftX = Math.sin(time * speed + p.phase) * 0.02;
            const driftY = Math.cos(time * speed * 0.8 + p.phase) * 0.02;
            const driftZ = Math.sin(time * speed * 1.2 + p.phase) * 0.02;

            p.x += p.vx * speed + driftX + cDriftX;
            p.y += p.vy * speed + driftY + cDriftY;
            p.z += p.vz * speed + driftZ;

            // Mouse interaction: Gentle attraction/repulsion
            const targetX = (mouse.x * viewport.width) / 2;
            const targetY = (mouse.y * viewport.height) / 2;

            const dx = p.x - targetX;
            const dy = p.y - targetY;
            const distToMouse = Math.sqrt(dx * dx + dy * dy);

            if (distToMouse < 12) {
                const force = (12 - distToMouse) * 0.003;
                p.x += dx * force;
                p.y += dy * force;
            }

            // Boundary check with soft bounce
            const bounds = 40;
            if (Math.abs(p.x) > bounds) p.vx *= -1;
            if (Math.abs(p.y) > bounds) p.vy *= -1;
            if (Math.abs(p.z) > bounds) p.vz *= -1;

            // Update Instanced Mesh
            dummy.position.set(p.x, p.y, p.z);
            // Nodes slightly pulse in size
            const scale = 0.2 + Math.sin(time * 2 + p.phase) * 0.05;
            dummy.scale.set(scale, scale, scale);
            dummy.updateMatrix();
            instancedNodesRef.current.setMatrixAt(i, dummy.matrix);
        }

        instancedNodesRef.current.instanceMatrix.needsUpdate = true;

        // Optimized connection calculation (only check a window of nodes or limited connections for performance)
        // For visual quality with high count, we iterate carefully.
        const skip = Math.max(1, Math.floor(count / 150)); // Optimization: check fewer neighbors if count is very high
        const maxDistSq = maxDistance * maxDistance;

        for (let i = 0; i < count; i += skip) {
            let connections = 0;
            const pi = particles[i];

            for (let j = i + 1; j < count; j++) {
                // Limit connections per node to keep line density readable and performant
                if (connections > 6) break;

                const pj = particles[j];
                const dx = pi.x - pj.x;
                const dy = pi.y - pj.y;
                const dz = pi.z - pj.z;

                // Quick boundary check before full distance calculation to save multiplications
                if (Math.abs(dx) > maxDistance || Math.abs(dy) > maxDistance || Math.abs(dz) > maxDistance) continue;

                const distSq = dx * dx + dy * dy + dz * dz;

                if (distSq < maxDistSq) {
                    // Optimized alpha mapping (avoiding sqrt and pow for performance)
                    const alpha = 1.0 - (distSq / maxDistSq);

                    if (lineIdx + 6 < linePositions.length) {
                        linePositions[lineIdx] = pi.x;
                        linePositions[lineIdx + 1] = pi.y;
                        linePositions[lineIdx + 2] = pi.z;

                        linePositions[lineIdx + 3] = pj.x;
                        linePositions[lineIdx + 4] = pj.y;
                        linePositions[lineIdx + 5] = pj.z;

                        const intensity = alpha * 0.8;
                        lineColors[lineIdx] = lineColor.r * intensity;
                        lineColors[lineIdx + 1] = lineColor.g * intensity;
                        lineColors[lineIdx + 2] = lineColor.b * intensity;
                        lineColors[lineIdx + 3] = lineColor.r * intensity;
                        lineColors[lineIdx + 4] = lineColor.g * intensity;
                        lineColors[lineIdx + 5] = lineColor.b * intensity;

                        lineIdx += 6;
                        connections++;
                    }
                }
            }
        }

        linesRef.current.geometry.attributes.position.needsUpdate = true;
        linesRef.current.geometry.attributes.color.needsUpdate = true;
        linesRef.current.geometry.setDrawRange(0, lineIdx / 3);

        // Slow cinematic auto-rotation
        state.camera.position.x = Math.sin(time * 0.05) * 55;
        state.camera.position.z = Math.cos(time * 0.05) * 55;
        state.camera.lookAt(0, 0, 0);
    });

    return (
        <group>
            {/* Low-poly Nodes using InstancedMesh for performance */}
            <instancedMesh ref={instancedNodesRef} args={[undefined, undefined, count]}>
                <icosahedronGeometry args={[1, 1]} />
                <meshBasicMaterial
                    color="#ff3300" // Red theme
                    toneMapped={false}
                />
            </instancedMesh>

            {/* Threads */}
            <lineSegments ref={linesRef}>
                <bufferGeometry>
                    <bufferAttribute
                        attach="attributes-position"
                        args={[linePositions, 3]}
                    />
                    <bufferAttribute
                        attach="attributes-color"
                        args={[lineColors, 3]}
                    />
                </bufferGeometry>
                <lineBasicMaterial vertexColors transparent linewidth={1} opacity={0.4} blending={THREE.AdditiveBlending} />
            </lineSegments>

            {/* Ambient and Point Lights for Depth */}
            <ambientLight intensity={0.2} />
            <pointLight position={[10, 10, 10]} intensity={0.5} color="#ff3300" />
        </group>
    );
};

export default NeuralNetwork;
