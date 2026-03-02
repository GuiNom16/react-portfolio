import { useState, useCallback, useRef } from "react";
import type { Message } from "@/components/AI/ChatMessage";

type AnimationState = "idle" | "thinking" | "talking";
type GeminiTurn = { role: "user" | "model"; parts: string };

export function useChatAI() {
    const [messages, setMessages] = useState<Message[]>([
        {
            id: "intro",
            role: "assistant",
            content:
                "Hey, I'm Jeremie's Representative. Ask me anything about his experience, projects, or what makes him tick. I've got the full briefing.",
            timestamp: new Date(),
        },
    ]);
    const [isLoading, setIsLoading] = useState(false);
    const [isStreaming, setIsStreaming] = useState(false);
    const [animationState, setAnimationState] = useState<AnimationState>("idle");
    const historyRef = useRef<GeminiTurn[]>([]);

    const sendMessage = useCallback(async (userText: string) => {
        if (!userText.trim() || isLoading) return;

        const userMsg: Message = {
            id: `user-${Date.now()}`,
            role: "user",
            content: userText,
            timestamp: new Date(),
        };

        setMessages((prev) => [...prev, userMsg]);
        setIsLoading(true);
        setAnimationState("thinking");

        // Optimistic assistant message that we'll stream into
        const assistantId = `assistant-${Date.now()}`;
        const assistantMsg: Message = {
            id: assistantId,
            role: "assistant",
            content: "",
            timestamp: new Date(),
        };

        try {
            const response = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    message: userText,
                    history: historyRef.current,
                }),
            });

            if (!response.ok || !response.body) {
                throw new Error(`API error: ${response.status}`);
            }

            // Start streaming — add placeholder and switch to talking
            setMessages((prev) => [...prev, assistantMsg]);
            setIsStreaming(true);
            setAnimationState("talking");
            setIsLoading(false);

            const reader = response.body.getReader();
            const decoder = new TextDecoder();
            let fullResponse = "";

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;

                const chunk = decoder.decode(value, { stream: true });
                fullResponse += chunk;

                setMessages((prev) =>
                    prev.map((m) =>
                        m.id === assistantId ? { ...m, content: fullResponse } : m
                    )
                );
            }

            // Update history for multi-turn context
            const newTurns: GeminiTurn[] = [
                { role: "user" as const, parts: userText },
                { role: "model" as const, parts: fullResponse },
            ];
            historyRef.current = [...historyRef.current, ...newTurns].slice(-12);

        } catch (error) {
            console.error("[useChatAI] Error:", error);
            const errorMsg: Message = {
                id: `error-${Date.now()}`,
                role: "assistant",
                content:
                    "Hmm, seems my signal cut out. Try asking again — I'm still here.",
                timestamp: new Date(),
            };
            setMessages((prev) => {
                // Remove empty assistant placeholder if it exists
                const filtered = prev.filter((m) => m.id !== assistantId || m.content);
                return [...filtered, errorMsg];
            });
        } finally {
            setIsLoading(false);
            setIsStreaming(false);
            setAnimationState("idle");
        }
    }, [isLoading]);

    return { messages, isLoading, isStreaming, animationState, sendMessage };
}
