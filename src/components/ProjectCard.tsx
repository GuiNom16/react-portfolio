import { FiGithub, FiGlobe, FiPackage } from "react-icons/fi";
import { motion } from "framer-motion";

type ProjectCardProps = {
  title: string;
  description: string;
  tech: string[];
  github?: string;
  live?: string;
  npm?: string;
};

export default function ProjectCard({
  title,
  description,
  tech,
  github,
  live,
  npm,
}: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="relative w-full h-full group cursor-pointer"
    >
      <div
        className="glass-panel w-full h-full rounded-xl p-8 flex flex-col justify-between border-white/5 bg-black/40 relative overflow-hidden transition-all duration-700 hover:border-[#ff3300]/40 hover:shadow-[0_0_30px_rgba(255,0,60,0.15)]"
      >
        {/* Subtle Background Glow on Hover */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[#ff003c] rounded-full blur-[120px] opacity-0 group-hover:opacity-10 transition-opacity duration-700 pointer-events-none" />

        {/* Content front */}
        <div className="relative z-10 flex-1 flex flex-col transition-all duration-500 group-hover:scale-[0.98] group-hover:opacity-30">
          <h3 className="text-2xl font-black text-white mb-4 tracking-tight font-sans uppercase">
            {title}
          </h3>
          <p className="text-white/60 mb-6 leading-relaxed flex-1 text-sm font-sans tracking-wide">
            {description}
          </p>

          <div className="flex flex-wrap gap-2 mb-8 mt-auto">
            {tech.slice(0, 3).map((t) => (
              <span
                key={t}
                className="bg-white/5 border border-white/10 text-[10px] uppercase font-bold tracking-wider text-white/70 px-2 py-1 rounded"
              >
                {t}
              </span>
            ))}
            {tech.length > 3 && (
              <span className="bg-white/5 border border-white/10 text-[10px] uppercase font-bold tracking-wider text-[#ff3300] px-2 py-1 rounded">
                +{tech.length - 3} MORE
              </span>
            )}
          </div>
        </div>

        {/* Slide-Up Tech Data Panel on Hover */}
        <div className="absolute inset-0 z-20 bg-gradient-to-t from-[#0a0000] via-[#0a0000]/95 to-[#1a0005]/90 border-t border-[#ff3300]/30 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] flex flex-col justify-end p-8">

          {/* Analyze Header */}
          <div className="flex items-center gap-2 text-[#ff3300] font-mono text-xs tracking-widest mb-6 border-b border-[#ff3300]/20 pb-4">
            <span className="animate-pulse shadow-[0_0_10px_#ff3300] w-2 h-2 rounded-full bg-[#ff3300]" />
            <span>SYSTEM.ANALYZE()</span>
          </div>

          <div className="space-y-6 mb-4">
            <div>
              <div className="text-[10px] text-white/40 font-mono tracking-widest mb-2 uppercase">Core Title</div>
              <h4 className="text-white font-bold text-xl font-sans tracking-tight leading-none">{title}</h4>
            </div>

            <div>
              <div className="text-[10px] text-white/40 font-mono tracking-widest mb-3 uppercase">Tech Stack Dependencies</div>
              <div className="flex flex-wrap gap-2">
                {tech.map((t) => (
                  <span key={t} className="bg-[#ff003c]/10 border border-[#ff3300]/30 text-[10px] font-mono tracking-widest text-[#ff3300] px-3 py-1.5 rounded-[4px] shadow-[0_0_10px_rgba(255,0,60,0.1)]">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Action Links (Always visible at bottom, but lifted above overlay) */}
        <div className="relative z-30 flex items-center justify-between mt-auto pt-4 border-t border-white/5">
          <div className="text-[10px] text-white/30 font-mono tracking-widest">
            ID:{Math.random().toString(36).substring(7).toUpperCase()}
          </div>

          <div className="flex gap-4 text-white/50 text-xl pointer-events-auto">
            {github && (
              <a href={github} target="_blank" rel="noreferrer" className="hover:text-[#ff3300] transition-colors hover:drop-shadow-[0_0_10px_rgba(255,51,0,0.8)]" title="GitHub">
                <FiGithub />
              </a>
            )}
            {live && (
              <a href={live} target="_blank" rel="noreferrer" className="hover:text-[#ff3300] transition-colors hover:drop-shadow-[0_0_10px_rgba(255,51,0,0.8)]" title="Live">
                <FiGlobe />
              </a>
            )}
            {npm && (
              <a href={npm} target="_blank" rel="noreferrer" className="hover:text-[#ff3300] transition-colors hover:drop-shadow-[0_0_10px_rgba(255,51,0,0.8)]" title="NPM">
                <FiPackage />
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
