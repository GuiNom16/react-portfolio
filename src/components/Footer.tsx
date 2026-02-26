import { FiGithub, FiLinkedin } from "react-icons/fi";
import { Terminal } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full bg-[#050000] border-t border-[#ff3300]/20 text-white pb-24 pt-12 relative overflow-hidden flex flex-col items-center">
      {/* Background Tech Scanline Effect */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,51,0,0.02)_1px,transparent_1px)] bg-[size:100%_4px] pointer-events-none z-0" />

      <div className="w-full max-w-5xl px-6 flex flex-col justify-center sm:flex-row items-center sm:justify-between gap-8 relative z-10 pt-4">

        {/* Left - System Status */}
        <div className="flex flex-col items-center sm:items-start space-y-2">
          <div className="flex items-center gap-2 text-[#ff3300] font-mono text-xs tracking-widest opacity-80">
            <Terminal className="w-4 h-4" />
            <span>SYSTEM.TERMINATE()</span>
          </div>
          <p className="text-[10px] text-white/30 font-mono tracking-widest uppercase">
            SESSION_ID: {Math.random().toString(36).substring(7).toUpperCase()} // END_OF_FILE
          </p>
          <p className="text-[10px] text-white/20 font-mono mt-2 pt-2 border-t border-white/5">
            &copy; {new Date().getFullYear()} JEREMIE NOMBRO. ARCHIVED.
          </p>
        </div>

        {/* Right - Social Nodes */}
        <div className="flex items-center gap-6">
          <div className="hidden sm:block h-[1px] w-12 bg-gradient-to-r from-transparent to-[#ff3300]/40 mr-4" />

          <a
            href="https://github.com/GuiNom16"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub Repository Access"
            className="group relative p-3 bg-white/5 border border-white/10 rounded-lg hover:border-[#ff3300]/50 hover:bg-[#ff3300]/10 transition-all duration-300"
          >
            <FiGithub className="text-white/60 group-hover:text-[#ff3300] w-5 h-5 transition-colors" />
            <div className="absolute -top-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-black border border-[#ff3300]/30 text-[#ff3300] text-[9px] tracking-widest font-mono px-2 py-1 rounded shadow-[0_0_10px_rgba(255,51,0,0.2)] whitespace-nowrap pointer-events-none">
              FETCH /GITHUB
            </div>
          </a>

          <a
            href="https://www.linkedin.com/in/jeremie-nombro-2749b7239"
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn Profile Access"
            className="group relative p-3 bg-white/5 border border-white/10 rounded-lg hover:border-[#ff3300]/50 hover:bg-[#ff3300]/10 transition-all duration-300"
          >
            <FiLinkedin className="text-white/60 group-hover:text-[#ff3300] w-5 h-5 transition-colors" />
            <div className="absolute -top-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-black border border-[#ff3300]/30 text-[#ff3300] text-[9px] tracking-widest font-mono px-2 py-1 rounded shadow-[0_0_10px_rgba(255,51,0,0.2)] whitespace-nowrap pointer-events-none">
              FETCH /LINKEDIN
            </div>
          </a>
        </div>

      </div>

      {/* Bottom Glowing Bar */}
      <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#ff3300]/50 to-transparent opacity-30 shadow-[0_0_20px_#ff3300]" />
    </footer>
  );
}
