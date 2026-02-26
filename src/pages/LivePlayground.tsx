import { LiveProvider, LiveEditor, LiveError, LivePreview } from "react-live";
import * as React from "react";
import { Nudge } from "react-nudge-ui";
import { motion } from "framer-motion";
import { Activity, Cpu, Network, Terminal as TerminalIcon } from "lucide-react";

const scope = {
  React,
  Nudge,
};

type LivePlaygroundProps = {
  code: string;
};

// Mock System Health Dashboard
function SystemHealth() {
  const [latency, setLatency] = React.useState(12);
  const [renderSpeed, setRenderSpeed] = React.useState(1.4);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setLatency(10 + Math.floor(Math.random() * 8));
      setRenderSpeed(1.2 + Math.random() * 0.5);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col gap-4 font-mono">
      <div className="glass-panel border-white/5 bg-black/40 p-4 rounded-lg flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Network className="w-5 h-5 text-[#ff3300]" />
          <span className="text-white/50 text-[10px] tracking-widest uppercase">Network Latency</span>
        </div>
        <span className="text-[#ff3300] font-bold text-sm">{latency}ms</span>
      </div>
      <div className="glass-panel border-white/5 bg-black/40 p-4 rounded-lg flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Activity className="w-5 h-5 text-[#ff003c]" />
          <span className="text-white/50 text-[10px] tracking-widest uppercase">React Render</span>
        </div>
        <span className="text-[#ff003c] font-bold text-sm">{renderSpeed.toFixed(2)}ms</span>
      </div>
      <div className="glass-panel border-white/5 bg-black/40 p-4 rounded-lg flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Cpu className="w-5 h-5 text-white/80" />
          <span className="text-white/50 text-[10px] tracking-widest uppercase">CPU Usage</span>
        </div>
        <span className="text-white/80 font-bold text-sm">14%</span>
      </div>
    </div>
  );
}

export default function LivePlayground({ code }: LivePlaygroundProps) {
  return (
    <motion.section
      id="playground"
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true, margin: "-100px" }}
      className="min-h-[85vh] w-full max-w-7xl mx-auto text-white py-12 px-6 rounded-xl border border-[#ff3300]/10 shadow-[0_0_50px_rgba(255,0,60,0.05)] relative overflow-hidden z-10"
    >
      {/* Background Tech Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,51,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,51,0,0.03)_1px,transparent_1px)] bg-[size:30px_30px] pointer-events-none" />

      <div className="h-full max-w-[1400px] mx-auto flex flex-col relative z-10 space-y-8">
        {/* Header */}
        <header className="flex items-center justify-between border-b border-[#ff3300]/20 pb-6">
          <div className="flex items-center gap-3 text-[#ff3300]">
            <TerminalIcon className="w-6 h-6" />
            <h1 className="text-2xl font-bold font-mono tracking-widest uppercase">Live IDE_</h1>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[#ff003c] animate-pulse shadow-[0_0_10px_#ff003c]" />
            <span className="text-[10px] font-mono tracking-widest text-[#ff3300]/60 uppercase">System Online</span>
          </div>
        </header>

        <LiveProvider code={code} noInline scope={scope} theme={undefined}>
          <div className="flex flex-col lg:flex-row gap-8 flex-1 min-h-[600px]">

            {/* Left Column: System Health & Code Editor */}
            <div className="w-full lg:w-[40%] flex flex-col gap-8">

              {/* System Health Widget */}
              <div className="bg-black/40 backdrop-blur-md rounded-xl border border-white/5 p-6">
                <h3 className="text-[10px] font-mono text-white/40 mb-5 tracking-widest uppercase">System Diagnostics</h3>
                <SystemHealth />
              </div>

              {/* Code Editor */}
              <div className="flex-1 bg-black/60 backdrop-blur-md rounded-xl border border-white/5 flex flex-col overflow-hidden shadow-[inset_0_0_20px_rgba(0,0,0,1)]">
                <div className="bg-white/5 px-4 py-3 border-b border-white/5 flex items-center justify-between">
                  <span className="text-[10px] text-[#ff3300]/70 tracking-widest font-mono">APP.TSX</span>
                  <div className="flex gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-white/20" />
                    <div className="w-2.5 h-2.5 rounded-full bg-white/20" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#ff003c]/60 shadow-[0_0_5px_#ff003c]" />
                  </div>
                </div>
                <div className="flex-1 overflow-auto p-5 font-mono text-sm max-h-[400px] text-white/80 selection:bg-[#ff3300]/30 selection:text-white">
                  <LiveEditor className="focus-visible:outline-none" />
                </div>
              </div>
            </div>

            {/* Right Column: Preview Area */}
            <div className="w-full lg:w-[60%] flex flex-col">
              <div className="flex-1 bg-black/40 backdrop-blur-md rounded-xl border border-[#ff3300]/20 flex flex-col overflow-hidden relative group">
                {/* Glowing border effect for Preview */}
                <div className="absolute inset-0 rounded-xl border-2 border-[#ff3300]/10 group-hover:border-[#ff3300]/30 transition-colors pointer-events-none" />
                <div className="absolute inset-0 rounded-xl shadow-[0_0_50px_rgba(255,0,60,0.05)] pointer-events-none" />

                <div className="bg-[#ff003c]/5 px-4 py-3 border-b border-[#ff3300]/20 flex items-center">
                  <span className="text-[10px] text-[#ff3300] font-mono tracking-widest uppercase flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#ff3300] inline-block" />
                    Output Render
                  </span>
                </div>

                <div className="flex-1 overflow-auto flex items-center justify-center p-8 relative">
                  <LivePreview className="w-full relative z-20" />
                  {/* Background Nudge highlight pulse */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#ff3300]/5 rounded-full blur-[100px] pointer-events-none z-0" />
                </div>
              </div>

              <div className="mt-6">
                <LiveError className="bg-red-950/40 text-red-400 border border-red-900/50 p-4 rounded-lg font-mono text-xs tracking-wide" />
              </div>
            </div>

          </div>
        </LiveProvider>
      </div>
    </motion.section>
  );
}
