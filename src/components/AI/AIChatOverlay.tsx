import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import ChatPanel from "./ChatPanel";
import { useChatAI } from "../../hooks/useChatAI";

interface AIChatOverlayProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function AIChatOverlay({ isOpen, onClose }: AIChatOverlayProps) {
    const { messages, isLoading, isStreaming, sendMessage } = useChatAI();

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100]"
                    />

                    {/* Sliding Drawer */}
                    <motion.div
                        initial={{ x: "100%", opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: "100%", opacity: 0 }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="fixed top-0 right-0 bottom-0 w-full sm:w-[450px] md:w-[500px] lg:w-[600px] z-[101] bg-black/80 backdrop-blur-xl border-l border-white/10 shadow-2xl flex flex-col"
                    >
                        {/* Header Area with Close Button */}
                        <div className="flex justify-end p-4 absolute top-0 right-0 z-[102]">
                            <button
                                onClick={onClose}
                                className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-white/50 hover:text-white transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Chat Panel Content */}
                        <div className="flex-1 overflow-hidden pt-12 p-4 sm:p-6 pb-24">
                            <ChatPanel
                                messages={messages}
                                isLoading={isLoading}
                                isStreaming={isStreaming}
                                onSend={sendMessage}
                            />
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
