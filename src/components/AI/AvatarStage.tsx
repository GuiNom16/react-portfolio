import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, ContactShadows, Environment, Stars } from "@react-three/drei";
import Avatar from "./Avatar";
import AvatarParticles from "./AvatarParticles";

interface AvatarStageProps {
    animationState: "idle" | "thinking" | "talking";
    avatarUrl?: string;
}

function LoadingFallback() {
    return (
        <mesh>
            <sphereGeometry args={[0.3, 16, 16]} />
            <meshStandardMaterial color="#ff3300" emissive="#ff3300" emissiveIntensity={2} wireframe />
        </mesh>
    );
}

export default function AvatarStage({ animationState, avatarUrl }: AvatarStageProps) {
    return (
        <div className="w-full h-full relative">
            {/* Ambient glow orbs behind canvas */}
            <div className="absolute inset-0 pointer-events-none z-0">
                <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full blur-[120px] opacity-20 bg-[#ff3300] mix-blend-screen" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] rounded-full blur-[80px] opacity-10 bg-[#00f0ff] mix-blend-screen" />
            </div>

            <Canvas
                className="relative z-10"
                camera={{ position: [0, 0.5, 3.5], fov: 45 }}
                shadows
                gl={{ antialias: true, alpha: true }}
                style={{ background: "transparent" }}
                onCreated={({ gl }) => {
                    gl.setClearColor(0x000000, 0);
                }}
                onError={(err) => console.error("[AvatarStage] Canvas Error:", err)}
            >
                {/* Lighting rig */}
                <ambientLight intensity={0.3} />

                {/* Key light — warm, from front-left */}
                <directionalLight
                    position={[-3, 4, 3]}
                    intensity={1.5}
                    color="#fff5e0"
                    castShadow
                />

                {/* Fill light — cool, from right */}
                <pointLight position={[3, 2, -2]} intensity={0.8} color="#c0e8ff" />

                {/* Rim light — dramatic from behind */}
                <pointLight position={[0, 3, -4]} intensity={1.2} color="#ff3300" />

                {/* Accent underglow */}
                <pointLight
                    position={[0, -1.5, 1]}
                    intensity={animationState === "talking" ? 1.5 : 0.5}
                    color={animationState === "thinking" ? "#00f0ff" : "#ff003c"}
                />

                {/* Stars in background */}
                <Stars radius={50} depth={50} count={800} factor={2} saturation={0} fade speed={0.5} />

                {/* Environment for reflections — wrapped in Suspense so it doesn't block the avatar */}
                <Suspense fallback={null}>
                    <Environment preset="city" />
                </Suspense>

                {/* Avatar + particles */}
                <Suspense fallback={<LoadingFallback />}>
                    <Avatar url={avatarUrl} animationState={animationState} />
                    <AvatarParticles animationState={animationState} count={100} />
                </Suspense>

                {/* Ground contact shadow */}
                <ContactShadows
                    position={[0, -1.5, 0]}
                    opacity={0.4}
                    scale={6}
                    blur={2}
                    color="#ff3300"
                />

                {/* Camera controls — limited to subtle horizontal rotation only */}
                <OrbitControls
                    enableZoom={false}
                    enablePan={false}
                    minPolarAngle={Math.PI / 3}
                    maxPolarAngle={Math.PI / 1.8}
                    minAzimuthAngle={-Math.PI / 6}
                    maxAzimuthAngle={Math.PI / 6}
                    dampingFactor={0.05}
                    enableDamping
                    autoRotate
                    autoRotateSpeed={0.5}
                />
            </Canvas>

            {/* State indicator overlay */}
            {animationState !== "idle" && (
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
                    <div className="flex items-center gap-2 glass-panel rounded-full px-4 py-1.5 border-[#ff3300]/20">
                        <div
                            className={`w-1.5 h-1.5 rounded-full animate-pulse ${animationState === "thinking" ? "bg-[#00f0ff]" : "bg-[#00ff66]"
                                }`}
                        />
                        <span className="font-mono text-[10px] tracking-widest text-white/60">
                            {animationState === "thinking" ? "PROCESSING_QUERY" : "TRANSMITTING_RESPONSE"}
                        </span>
                    </div>
                </div>
            )}
        </div>
    );
}
