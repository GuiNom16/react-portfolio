import { LiveProvider, LiveEditor, LiveError, LivePreview } from "react-live";
import { Card } from "@/components/ui/card";
import * as React from "react";
import { Nudge } from "react-nudge-ui";
import { motion } from "framer-motion";

const scope = {
  React,
  Nudge,
};

type LivePlaygroundProps = {
  code: string;
};

export default function LivePlayground({ code }: LivePlaygroundProps) {
  return (
    <main className="min-h-screen bg-gradient-to-tr from-[#0f172a] via-[#1e293b] to-[#111827] text-white py-16 rounded-lg overflow-hidden">
      <div className="w-full px-4 sm:px-6 lg:px-8 space-y-10 max-w-7xl mx-auto">
        {/* Title and Description */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-2"
        >
          <h1 className="text-3xl font-bold text-white">Live Playground</h1>
          <p className="text-white/70 max-w-xl mx-auto">
            Test out{" "}
            <code className="bg-white/10 px-2 py-1 rounded font-mono text-pink-400">
              react-nudge-ui
            </code>{" "}
            in real time. Edit, preview, and tweak with instant feedback.
          </p>
        </motion.div>

        {/* Live Editor and Preview Side-by-Side */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <LiveProvider code={code} noInline scope={scope}>
            <Card className="p-4 bg-[#1e293b] border border-white/10 shadow-md">
              <div className="flex flex-col md:flex-row gap-6 h-full">
                {/* Preview */}
                <div className="flex-1 rounded bg-muted p-4 border border-white/10 overflow-auto min-h-[300px]">
                  <LivePreview />
                </div>

                {/* Editor + Error */}
                <div className="flex flex-col flex-1  max-h-full">
                  <div className="bg-black text-white rounded text-sm p-3 font-mono overflow-auto flex-grow max-h-[700px]">
                    <LiveEditor />
                  </div>
                  <LiveError className="text-red-500 font-mono mt-2" />
                </div>
              </div>
            </Card>
          </LiveProvider>
        </motion.div>
      </div>
    </main>
  );
}
