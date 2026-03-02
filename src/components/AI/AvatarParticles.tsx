import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface AvatarParticlesProps {
    animationState: "idle" | "thinking" | "talking";
    count?: number;
}

export default function AvatarParticles({ animationState, count = 80 }: AvatarParticlesProps) {
    const meshRef = useRef<THREE.Points>(null);

    const { positions, speeds, radii, angles } = useMemo(() => {
        const positions = new Float32Array(count * 3);
        const speeds = new Float32Array(count);
        const radii = new Float32Array(count);
        const angles = new Float32Array(count);

        for (let i = 0; i < count; i++) {
            const radius = 1.2 + Math.random() * 1.4;
            const angle = Math.random() * Math.PI * 2;
            const height = (Math.random() - 0.5) * 3.5;

            positions[i * 3] = Math.cos(angle) * radius;
            positions[i * 3 + 1] = height;
            positions[i * 3 + 2] = Math.sin(angle) * radius;

            speeds[i] = 0.1 + Math.random() * 0.3;
            radii[i] = radius;
            angles[i] = angle;
        }

        return { positions, speeds, radii, angles };
    }, [count]);

    const geometry = useMemo(() => {
        const geo = new THREE.BufferGeometry();
        geo.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
        return geo;
    }, [positions]);

    const material = useMemo(
        () =>
            new THREE.PointsMaterial({
                color: animationState === "thinking" ? "#00f0ff" : "#ff3300",
                size: 0.025,
                transparent: true,
                opacity: animationState === "idle" ? 0.4 : 0.7,
                blending: THREE.AdditiveBlending,
                depthWrite: false,
            }),
        [animationState]
    );

    useFrame((_, delta) => {
        if (!meshRef.current) return;

        const posAttr = meshRef.current.geometry.attributes.position;
        const speedMultiplier =
            animationState === "thinking" ? 2.5 : animationState === "talking" ? 1.8 : 1.0;

        for (let i = 0; i < count; i++) {
            angles[i] += delta * speeds[i] * speedMultiplier;

            const targetRadius =
                animationState === "thinking"
                    ? radii[i] * 0.7 // converge inward
                    : animationState === "talking"
                        ? radii[i] * 1.15 // expand outward
                        : radii[i]; // normal orbit

            posAttr.setX(i, Math.cos(angles[i]) * targetRadius);
            posAttr.setZ(i, Math.sin(angles[i]) * targetRadius);
        }

        posAttr.needsUpdate = true;
    });

    return <points ref={meshRef} geometry={geometry} material={material} />;
}
