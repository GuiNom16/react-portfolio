import { useRef, useEffect, useState, type KeyboardEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Zap } from "lucide-react";
import ChatMessage, { TypingIndicator } from "./ChatMessage";
import type { Message } from "./ChatMessage";
import AnimatedAvatar from "./AnimatedAvatar";

interface ChatPanelProps {
    messages: Message[];
    isLoading: boolean;
    isStreaming: boolean;
    onSend: (text: string) => void;
}

const SUGGESTIONS = [
    "What's Jeremie's main tech stack?",
    "Tell me about ProphetRFP",
    "What are your hobbies outside coding?",
    "How do you approach clean code?",
];

export default function ChatPanel({ messages, isLoading, isStreaming, onSend }: ChatPanelProps) {
    const [input, setInput] = useState("");
    const [showSuggestions, setShowSuggestions] = useState(true);
    const bottomRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLTextAreaElement>(null);

    // Auto-scroll on new messages
    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const handleSend = () => {
        const text = input.trim();
        if (!text || isLoading) return;
        setShowSuggestions(false);
        setInput("");
        onSend(text);
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    const handleSuggestion = (text: string) => {
        setShowSuggestions(false);
        onSend(text);
    };

    // Basic sentiment calculation based on the latest message
    const getEmotion = (): "neutral" | "unhappy" | "happy" => {
        const lastMsg = messages[messages.length - 1];
        if (!lastMsg || lastMsg.role !== "assistant") return "neutral";

        const text = lastMsg.content.toLowerCase();
        const unhappyWords = ["sorry", "unfortunately", "sad", "issue", "bad", "error", "fail"];
        if (unhappyWords.some(w => text.includes(w))) return "unhappy";

        const happyWords = ["great", "awesome", "love", "happy", "excellent", "excited", "glad", "clean"];
        if (happyWords.some(w => text.includes(w))) return "happy";

        return "neutral";
    };

    const emotion = getEmotion();
    const avatarStatus = isStreaming ? "replying" : isLoading ? "thinking" : "idle";

    return (
        <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, type: "spring", stiffness: 200, damping: 25 }}
            className="flex flex-col h-full"
        >
            {/* Header */}
            <div className="glass-panel rounded-2xl rounded-b-none p-4 border-white/10 border-b-white/5 flex items-center gap-4 flex-shrink-0">
                <AnimatedAvatar status={avatarStatus} emotion={emotion} />

                <div className="flex-1 ml-2">
                    <p className="font-mono text-xs tracking-widest text-[#ff3300] leading-none mb-0.5">
                        THE REPRESENTATIVE
                    </p>
                    <p className="font-sans text-[10px] text-white/40 tracking-wide">
                        Jeremie's Digital Twin · RAG-Powered
                    </p>
                </div>

                <div className="flex items-center gap-1.5 bg-[#00ff66]/10 border border-[#00ff66]/20 rounded-full px-2.5 py-1">
                    <Zap className="w-3 h-3 text-[#00ff66]" />
                    <span className="font-mono text-[9px] text-[#00ff66] tracking-widest">ONLINE</span>
                </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 glass-panel rounded-none border-x border-x-white/10 border-y-0 scrollbar-hide min-h-0">
                {messages.map((msg, idx) => {
                    const isLastMessageStreaming = isStreaming && msg.role === "assistant";
                    return (
                        <ChatMessage
                            key={msg.id}
                            message={msg}
                            isLatest={idx === messages.length - 1 && isLastMessageStreaming}
                        />
                    );
                })}

                <AnimatePresence>
                    {isLoading && !isStreaming && <TypingIndicator />}
                </AnimatePresence>

                <div ref={bottomRef} />
            </div>

            {/* Suggestions */}
            <AnimatePresence>
                {showSuggestions && messages.length === 1 && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="glass-panel rounded-none border-x border-x-white/10 border-y-0 px-4 py-3 border-b border-b-white/5"
                    >
                        <p className="text-[10px] font-mono text-white/30 tracking-widest mb-2">
                            TRY ASKING:
                        </p>
                        <div className="flex flex-wrap gap-2">
                            {SUGGESTIONS.map((s) => (
                                <button
                                    key={s}
                                    onClick={() => handleSuggestion(s)}
                                    className="text-[11px] font-sans text-white/50 hover:text-white bg-white/5 hover:bg-[#ff3300]/10 border border-white/10 hover:border-[#ff3300]/30 rounded-full px-3 py-1 transition-all duration-200 cursor-pointer"
                                >
                                    {s}
                                </button>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Input bar */}
            <div className="glass-panel rounded-2xl rounded-t-none border-white/10 border-t-white/5 p-3 flex-shrink-0">
                <div className="flex items-end gap-2">
                    <textarea
                        ref={inputRef}
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        disabled={isLoading}
                        rows={1}
                        placeholder="Ask me anything about Jeremie..."
                        className="flex-1 resize-none bg-transparent text-white/80 placeholder-white/25 text-sm font-sans outline-none border-none leading-relaxed max-h-24 scrollbar-hide disabled:opacity-50"
                        style={{ fieldSizing: "content" } as React.CSSProperties}
                    />
                    <motion.button
                        onClick={handleSend}
                        disabled={!input.trim() || isLoading}
                        whileTap={{ scale: 0.92 }}
                        whileHover={{ scale: 1.05 }}
                        className="flex-shrink-0 w-9 h-9 rounded-full bg-[#ff003c]/20 border border-[#ff3300]/40 flex items-center justify-center text-[#ff3300] hover:bg-[#ff003c]/30 hover:border-[#ff3300]/60 hover:shadow-[0_0_15px_rgba(255,0,60,0.4)] transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                    >
                        <Send className="w-3.5 h-3.5" />
                    </motion.button>
                </div>
                <p className="text-[9px] font-mono text-white/15 tracking-widest mt-2 text-center">
                    ↵ ENTER TO SEND · SHIFT+ENTER FOR NEW LINE
                </p>
            </div>
        </motion.div>
    );
}
