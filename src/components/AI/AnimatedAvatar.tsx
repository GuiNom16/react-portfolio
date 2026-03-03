import { motion, AnimatePresence, type Variants } from "framer-motion";

interface AnimatedAvatarProps {
    status: "idle" | "thinking" | "replying";
    emotion?: "neutral" | "unhappy" | "happy";
}

export default function AnimatedAvatar({ status, emotion = "neutral" }: AnimatedAvatarProps) {
    // Pulse animation variations based on status
    const ringVariants: Variants = {
        idle: {
            scale: [1, 1.05, 1],
            opacity: [0.3, 0.5, 0.3],
            borderColor: "rgba(255, 51, 0, 0.3)", // Reddish
            transition: { duration: 3, repeat: Infinity, ease: "easeInOut" }
        },
        thinking: {
            scale: [1, 1.1, 1],
            opacity: [0.6, 0.9, 0.6],
            borderColor: "rgba(0, 240, 255, 0.8)", // Cyan
            transition: { duration: 1.5, repeat: Infinity, ease: "easeInOut" }
        },
        replying: {
            scale: [1, 1.15, 1],
            opacity: [0.7, 1, 0.7],
            borderColor: "rgba(0, 255, 102, 0.8)", // Green
            transition: { duration: 0.8, repeat: Infinity, ease: "easeInOut" }
        }
    };

    // Inner glow that matches the status color
    const glowColors = {
        idle: "shadow-[0_0_15px_rgba(255,51,0,0.3)]",
        thinking: "shadow-[0_0_20px_rgba(0,240,255,0.6)]",
        replying: "shadow-[0_0_25px_rgba(0,255,102,0.6)]"
    };

    const getAvatarImage = () => {
        if (status === "thinking") return "/avatars/avatar_thinking.png";
        if (emotion === "unhappy") return "/avatars/avatar_unhappy.png";
        if (status === "replying" || emotion === "happy") return "/avatars/avatar_talking.png";
        return "/avatars/avatar_idle.png";
    };

    return (
        <div className="relative flex items-center justify-center">
            {/* Outer animated rings */}
            <motion.div
                className="absolute inset-[-4px] rounded-full border-[1.5px]"
                variants={ringVariants}
                animate={status}
                initial="idle"
            />
            <motion.div
                className="absolute inset-[-8px] rounded-full border-[1px]"
                variants={ringVariants}
                animate={status}
                initial="idle"
                style={{ opacity: 0.5, animationDelay: "0.2s" }}
            />

            {/* Avatar Container */}
            <div className={`relative z-10 w-10 h-10 rounded-full overflow-hidden border-2 border-white/10 ${glowColors[status]} transition-shadow duration-500 bg-[#1a0a00]`}>
                <AnimatePresence mode="wait">
                    <motion.img
                        key={getAvatarImage()}
                        src={getAvatarImage()}
                        alt="AI Representative"
                        className="absolute inset-0 w-full h-full object-cover"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4 }}
                    />
                </AnimatePresence>
            </div>

            {/* Status indicator icon (optional polish) */}
            <AnimatePresence mode="wait">
                {status === "thinking" && (
                    <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        className="absolute -bottom-1 -right-1 w-3 h-3 bg-[#00f0ff] rounded-full border border-black z-20"
                    />
                )}
                {status === "replying" && (
                    <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        className="absolute -bottom-1 -right-1 w-3 h-3 bg-[#00ff66] rounded-full border border-black z-20 flex pt-[1px] pl-[1px] items-center justify-center"
                    >
                        <motion.div
                            className="bg-black w-1 h-1 rounded-full"
                            animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                            transition={{ repeat: Infinity, duration: 0.8 }}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
