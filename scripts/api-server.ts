import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";
import * as path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, "../.env.local") });

const app = express();
app.use(cors({ origin: "*" }));
app.use(express.json());

// Health check
app.get("/api/ping", (_req, res) => {
    res.json({
        status: "ok",
        env: {
            google: !!process.env.GOOGLE_GENERATIVE_AI_API_KEY,
            pinecone: !!process.env.PINECONE_API_KEY,
            pineconeIndex: process.env.PINECONE_INDEX || "myvectordb",
        },
    });
});

// Chat handler — dynamically imported to ensure env is loaded first
app.post("/api/chat", async (req, res) => {
    try {
        const { default: chatHandler } = await import("../api/chat.js");
        await chatHandler(req as never, res as never);
    } catch (err) {
        console.error("[api-server] Handler error:", err);
        if (!res.headersSent) {
            res.status(500).json({ error: String(err) });
        }
    }
});

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`\n🚀 API server running → http://localhost:${PORT}`);
    console.log("   GET  /api/ping — Health check");
    console.log("   POST /api/chat — The Representative RAG endpoint\n");
});

// Keep process alive on unhandled errors
process.on("unhandledRejection", (reason) => {
    console.error("[api-server] Unhandled rejection:", reason);
});
