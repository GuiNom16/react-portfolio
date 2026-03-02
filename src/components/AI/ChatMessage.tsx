import { motion } from "framer-motion";
import { Bot, User } from "lucide-react";

export interface Message {
    id: string;
    role: "user" | "assistant";
    content: string;
    timestamp: Date;
}

interface ChatMessageProps {
    message: Message;
    isLatest?: boolean;
}

function TypingDots() {
    return (
        <div className="flex items-center gap-1 px-1 py-0.5">
            {[0, 1, 2].map((i) => (
                <motion.div
                    key={i}
                    className="w-1.5 h-1.5 rounded-full bg-white/40"
                    animate={{ opacity: [0.3, 1, 0.3], y: [0, -3, 0] }}
                    transition={{
                        duration: 0.8,
                        repeat: Infinity,
                        delay: i * 0.18,
                        ease: "easeInOut",
                    }}
                />
            ))}
        </div>
    );
}

export function TypingIndicator() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            className="flex items-end gap-2.5"
        >
            <div className="w-7 h-7 rounded-full bg-[#ff003c]/20 border border-[#ff3300]/30 flex items-center justify-center flex-shrink-0">
                <Bot className="w-3.5 h-3.5 text-[#ff3300]" />
            </div>
            <div className="glass-panel rounded-2xl rounded-bl-sm px-4 py-2.5 border-white/10 max-w-fit">
                <TypingDots />
            </div>
        </motion.div>
    );
}

export default function ChatMessage({ message, isLatest }: ChatMessageProps) {
    const isUser = message.role === "user";

    return (
        <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className={`flex items-end gap-2.5 ${isUser ? "flex-row-reverse" : "flex-row"}`}
        >
            {/* Avatar icon */}
            <div
                className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 ${isUser
                        ? "bg-white/10 border border-white/20"
                        : "bg-[#ff003c]/20 border border-[#ff3300]/30"
                    }`}
            >
                {isUser ? (
                    <User className="w-3.5 h-3.5 text-white/60" />
                ) : (
                    <Bot className="w-3.5 h-3.5 text-[#ff3300]" />
                )}
            </div>

            {/* Bubble */}
            <div
                className={`max-w-[75%] px-4 py-2.5 text-sm leading-relaxed font-sans ${isUser
                        ? "bg-gradient-to-br from-[#ff3300]/25 to-[#ff003c]/15 border border-[#ff3300]/30 rounded-2xl rounded-br-sm text-white/90"
                        : "glass-panel border-white/10 rounded-2xl rounded-bl-sm text-white/85"
                    }`}
            >
                {message.content}

                {/* Streaming cursor for latest AI message in progress */}
                {!isUser && isLatest && (
                    <span className="inline-block w-0.5 h-3.5 bg-[#ff3300] ml-0.5 align-middle animate-pulse" />
                )}
            </div>
        </motion.div>
    );
}
