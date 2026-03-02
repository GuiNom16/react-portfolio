import { useEffect } from "react";
import { motion } from "framer-motion";
import { Cpu, Activity } from "lucide-react";
import AvatarStage from "@/components/AI/AvatarStage";
import ChatPanel from "@/components/AI/ChatPanel";
import Navbar from "@/components/Navbar";
import ErrorBoundary from "@/components/ErrorBoundary";
import { useChatAI } from "@/hooks/useChatAI";

// Optional: set this to your RPM avatar URL once downloaded
// e.g. "/models/avatar.glb"
// Optional: set this to your RPM avatar URL
// You can create your own at https://readyplayer.me
const AVATAR_URL: string | undefined = "https://models.readyplayer.me/65a8dba831b23abb4f401bae.glb";

export default function AIPage() {
    const { messages, isLoading, isStreaming, animationState, sendMessage } = useChatAI();

    // Override page title
    useEffect(() => {
        const original = document.title;
        document.title = "The Representative · Jeremie.dev";
        return () => { document.title = original; };
    }, []);

    return (
        <div className="relative min-h-screen w-full bg-[#050000] text-white overflow-hidden">
            {/* Animated background gradient */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_40%_50%,rgba(255,0,60,0.06)_0%,transparent_70%)]" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_70%_40%,rgba(0,240,255,0.04)_0%,transparent_70%)]" />
                {/* Subtle scanlines */}
                <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_3px,rgba(255,255,255,0.01)_3px,rgba(255,255,255,0.01)_4px)]" />
            </div>

            {/* Top bar — system identity */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-8 py-4 border-b border-white/5"
            >
                <div className="flex items-center gap-3">
                    <Cpu className="w-4 h-4 text-[#ff3300]" />
                    <span className="font-mono text-[11px] tracking-[0.3em] text-white/40 uppercase">
                        jeremie.dev / ai-representative
                    </span>
                </div>

                <div className="flex items-center gap-2">
                    <Activity className="w-3.5 h-3.5 text-[#00ff66]" />
                    <div className="flex gap-1 items-end h-4">
                        {[3, 5, 4, 7, 3, 6, 5, 4, 8, 5].map((h, i) => (
                            <motion.div
                                key={i}
                                className="w-0.5 bg-[#00ff66] rounded-full"
                                animate={{ height: [h * 2, h * 3, h * 2] }}
                                transition={{
                                    duration: 0.8 + i * 0.1,
                                    repeat: Infinity,
                                    repeatType: "mirror",
                                    ease: "easeInOut",
                                }}
                                style={{ height: h * 2 }}
                            />
                        ))}
                    </div>
                    <span className="font-mono text-[10px] text-[#00ff66] tracking-widest ml-1">LIVE</span>
                </div>
            </motion.div>

            {/* Main content grid */}
            <div className="relative z-10 flex flex-col lg:flex-row min-h-screen pt-16 pb-28">

                {/* Left: 3D Avatar Stage (60%) */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
                    className="w-full lg:w-[58%] relative flex flex-col"
                    style={{ minHeight: "min(60vh, 500px)" }}
                >
                    <ErrorBoundary name="AvatarStage">
                        <div className="flex-1">
                            <AvatarStage animationState={animationState} avatarUrl={AVATAR_URL} />
                        </div>
                    </ErrorBoundary>

                    {/* Avatar label — bottom-left */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 1, duration: 0.6 }}
                        className="absolute bottom-20 left-8 z-20 pointer-events-none lg:bottom-12"
                    >
                        <div className="flex flex-col gap-1">
                            <span className="font-mono text-[10px] text-white/30 tracking-[0.35em] uppercase">
                                Digital Twin
                            </span>
                            <div className="flex items-baseline gap-2">
                                <span className="font-black text-2xl text-white tracking-tight">
                                    Jeremie
                                </span>
                                <span className="font-mono text-xs text-[#ff3300] tracking-widest">
                                    v2.0
                                </span>
                            </div>
                            <span className="font-mono text-[10px] text-white/20 tracking-widest">
                                .NET & React Engineer
                            </span>
                        </div>
                    </motion.div>

                    {/* Divider line on large screens */}
                    <div className="hidden lg:block absolute right-0 top-[15%] h-[70%] w-[1px] bg-gradient-to-b from-transparent via-[#ff3300]/20 to-transparent" />
                </motion.div>

                {/* Right: Chat Panel (40%) */}
                <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5, duration: 0.7, ease: "easeOut" }}
                    className="w-full lg:w-[42%] flex flex-col px-6 py-6 lg:px-8 lg:py-8"
                    style={{ height: "calc(100vh - 7rem)", maxHeight: "900px" }}
                >
                    <ChatPanel
                        messages={messages}
                        isLoading={isLoading}
                        isStreaming={isStreaming}
                        onSend={sendMessage}
                    />
                </motion.div>
            </div>

            {/* Navbar */}
            <Navbar />
        </div>
    );
}
