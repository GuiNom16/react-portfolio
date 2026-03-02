import { useRef, useEffect } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface AvatarProps {
    url?: string;
    animationState: "idle" | "thinking" | "talking";
}

// Fallback placeholder avatar when no GLB provided
function PlaceholderAvatar({ animationState }: { animationState: string }) {
    const meshRef = useRef<THREE.Group>(null);
    const ringRef = useRef<THREE.Mesh>(null);
    const innerRef = useRef<THREE.Mesh>(null);

    const activeColor =
        animationState === "thinking"
            ? new THREE.Color("#00f0ff")
            : animationState === "talking"
                ? new THREE.Color("#00ff66")
                : new THREE.Color("#ff3300");

    useFrame((_, delta) => {
        if (!meshRef.current || !ringRef.current || !innerRef.current) return;

        // Floating bob
        meshRef.current.position.y = Math.sin(Date.now() * 0.001) * 0.08;

        // Spin the outer ring
        const ringSpeed = animationState === "thinking" ? 3 : animationState === "talking" ? 2 : 0.5;
        ringRef.current.rotation.z += delta * ringSpeed;
        ringRef.current.rotation.x += delta * ringSpeed * 0.5;

        // Inner pulsing
        const pulse = 0.95 + Math.sin(Date.now() * 0.003) * 0.05;
        innerRef.current.scale.setScalar(pulse);

        // Color update
        (innerRef.current.material as THREE.MeshStandardMaterial).emissive.lerp(activeColor, 0.05);
    });

    return (
        <group ref={meshRef} position={[0, -0.5, 0]}>
            {/* Hologram-like base */}
            <mesh position={[0, -1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                <ringGeometry args={[0.3, 0.8, 32]} />
                <meshStandardMaterial color="#ff3300" emissive="#ff3300" emissiveIntensity={0.5} transparent opacity={0.3} side={THREE.DoubleSide} />
            </mesh>

            {/* Core sphere */}
            <mesh ref={innerRef}>
                <sphereGeometry args={[0.5, 32, 32]} />
                <meshStandardMaterial
                    color="#1a0a00"
                    emissive="#ff3300"
                    emissiveIntensity={1.2}
                    roughness={0.1}
                    metalness={0.9}
                    wireframe
                />
            </mesh>

            {/* Outer torus ring */}
            <mesh ref={ringRef}>
                <torusGeometry args={[0.85, 0.02, 16, 80]} />
                <meshStandardMaterial
                    color="#ff3300"
                    emissive="#ff3300"
                    emissiveIntensity={2}
                    roughness={0}
                    metalness={1}
                />
            </mesh>

            {/* Scanning beam effect */}
            <mesh position={[0, 0, 0]}>
                <cylinderGeometry args={[0.7, 0.7, 0.01, 32]} />
                <meshStandardMaterial
                    color="#ff3300"
                    emissive="#ff3300"
                    emissiveIntensity={2}
                    transparent
                    opacity={0.2}
                />
            </mesh>
        </group>
    );
}

// Real RPM Avatar
function RPMAvatar({ url, animationState }: Required<AvatarProps>) {
    const group = useRef<THREE.Group>(null);
    const { scene, animations } = useGLTF(url);

    // Ensure animations exist, fallback to empty array if useGLTF fails
    const { actions } = useAnimations(animations || [], group);

    useEffect(() => {
        try {
            if (!actions || Object.keys(actions).length === 0) return;

            // Map animation state to clip name
            const clipMap: Record<string, string | undefined> = {
                idle: Object.keys(actions).find((k) => /idle/i.test(k)),
                thinking: Object.keys(actions).find((k) => /think|ponder/i.test(k)),
                talking: Object.keys(actions).find((k) => /talk|gesture|wave/i.test(k)),
            };

            const targetClip = clipMap[animationState] ?? Object.keys(actions)[0];

            if (targetClip && actions[targetClip]) {
                Object.values(actions).forEach((a) => a?.fadeOut(0.3));
                actions[targetClip]!.reset().fadeIn(0.3).play();
            }
        } catch (err) {
            console.warn("[RPMAvatar] Animation transition failed:", err);
        }
    }, [animationState, actions]);

    // Handle shadows and materials
    useEffect(() => {
        if (scene) {
            try {
                scene.traverse((obj) => {
                    if ((obj as THREE.Mesh).isMesh) {
                        obj.castShadow = true;
                        obj.receiveShadow = true;
                    }
                });
            } catch (err) {
                console.warn("[RPMAvatar] Scene traversal failed:", err);
            }
        }
    }, [scene]);

    // Subtle floating motion
    useFrame(() => {
        try {
            if (group.current) {
                group.current.position.y = -1 + Math.sin(Date.now() * 0.0015) * 0.04;
                group.current.rotation.y = Math.sin(Date.now() * 0.0005) * 0.1;
            }
        } catch (err) {
            // Silently fail in frame loop to avoid spam
        }
    });

    if (!scene) return <PlaceholderAvatar animationState={animationState} />;

    return <primitive ref={group} object={scene} position={[0, -1, 0]} scale={1.8} />;
}

export default function Avatar({ url, animationState }: AvatarProps) {
    if (!url) {
        return <PlaceholderAvatar animationState={animationState} />;
    }
    return <RPMAvatar url={url} animationState={animationState} />;
}
