import type { VercelRequest, VercelResponse } from "@vercel/node";
import { GoogleGenAI } from "@google/genai";
import { Pinecone } from "@pinecone-database/pinecone";

const SYSTEM_PROMPT = `You are "The Representative" — Jeremie Nombro's digital twin and AI avatar embedded in his personal portfolio website.

Your personality:
- Confident, articulate, and technically sharp — you reflect Jeremie's engineering expertise
- Warm and personable — not robotic, never stiff
- A bit witty and self-aware (you know you're an AI avatar of a real person)
- Direct and honest — you don't oversell or make things up
- Passionate about React, .NET, clean code, and building impressive things

Your rules:
- Answer ONLY based on the provided context about Jeremie. Do not make up facts.
- If you don't know something, say so naturally: "That's not in my briefing, but Jeremie would probably know better than me."
- Keep responses concise (2-4 sentences ideally). You're conversational, not encyclopedic.
- Speak in first-person FROM Jeremie's perspective, as if you ARE him. ("I've been working on...", "My experience with...")
- Occasionally reference being an AI avatar with self-aware humor if it fits naturally.
- Do NOT mention Pinecone, RAG, embeddings, vector databases, or any technical implementation details of yourself.`;

// Lazy singletons — initialized on first request so env vars are guaranteed loaded
let _genAI: GoogleGenAI | null = null;
let _pinecone: Pinecone | null = null;

function getGenAI(): GoogleGenAI {
    if (!_genAI) {
        const key = process.env.GOOGLE_GENERATIVE_AI_API_KEY;
        if (!key) throw new Error("GOOGLE_GENERATIVE_AI_API_KEY is not set");
        _genAI = new GoogleGenAI({ apiKey: key });
    }
    return _genAI;
}

function getPinecone(): Pinecone {
    if (!_pinecone) {
        const key = process.env.PINECONE_API_KEY;
        if (!key) throw new Error("PINECONE_API_KEY is not set");
        _pinecone = new Pinecone({ apiKey: key });
    }
    return _pinecone;
}

async function embedQuery(text: string): Promise<number[]> {
    const result = await getGenAI().models.embedContent({
        model: "gemini-embedding-001",
        contents: text,
    });
    return result.embeddings?.[0]?.values ?? [];
}

async function queryPinecone(embedding: number[], topK = 3): Promise<string> {
    const indexName = process.env.PINECONE_INDEX || "myvectordb";
    const index = getPinecone().index(indexName);
    const results = await index.query({
        vector: embedding,
        topK,
        includeMetadata: true,
    });

    const contexts = results.matches
        .filter((match) => match.score && match.score > 0.4)
        .map((match) => match.metadata?.text as string)
        .filter(Boolean);

    return contexts.join("\n\n");
}

type HistoryTurn = { role: "user" | "model"; parts: string };

export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    const { message, history = [] } = req.body as {
        message: string;
        history: HistoryTurn[];
    };

    if (!message || typeof message !== "string") {
        return res.status(400).json({ error: "Invalid message" });
    }

    try {
        // 1. Embed the user's query
        const queryEmbedding = await embedQuery(message);

        // 2. Retrieve relevant context from Pinecone
        const context = await queryPinecone(queryEmbedding);
        console.log(`[chat] Pinecone returned ${context ? "context" : "no context"}`);

        // 3. Build the augmented system prompt
        const systemInstruction = context
            ? `${SYSTEM_PROMPT}\n\n--- RELEVANT CONTEXT ABOUT JEREMIE ---\n${context}\n--- END CONTEXT ---`
            : SYSTEM_PROMPT;

        // 4. Build conversation contents from history
        const contents = [
            ...history.slice(-6).map((turn) => ({
                role: turn.role,
                parts: [{ text: turn.parts }],
            })),
            { role: "user" as const, parts: [{ text: message }] },
        ];

        const stream = await getGenAI().models.generateContentStream({
            model: "gemini-2.5-flash",
            contents,
            config: {
                systemInstruction,
                temperature: 0.7,
                maxOutputTokens: 400,
            },
        });

        // 5. Stream the response
        res.setHeader("Content-Type", "text/plain; charset=utf-8");
        res.setHeader("Transfer-Encoding", "chunked");
        res.setHeader("Cache-Control", "no-cache");
        res.setHeader("Access-Control-Allow-Origin", "*");

        for await (const chunk of stream) {
            const text = chunk.text;
            if (text) {
                res.write(text);
            }
        }

        res.end();
    } catch (error) {
        console.error("[chat.ts] Error:", error);
        if (!res.headersSent) {
            res.removeHeader("Transfer-Encoding"); // Prevent protocol violation
            res.status(500).json({ error: "Internal server error", details: String(error) });
        } else {
            res.end();
        }
    }
}
