import { FiMail, FiLinkedin, FiTerminal, FiPower } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export default function Contact() {
  const [isDeepWorkMode, setIsDeepWorkMode] = useState(false);

  return (
    <motion.section
      id="contact"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true, margin: "-100px" }}
      className="w-full text-white py-32 relative overflow-hidden z-20"
    >
      {/* Void Radial Gradient Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#1a0005_0%,transparent_60%)] pointer-events-none" />

      {/* Floating Blurred Circles for background effect */}
      <div className={`absolute top-10 left-10 w-96 h-96 transition-all duration-1000 ${isDeepWorkMode ? 'bg-[radial-gradient(circle_at_center,_#ff003c_0%,_transparent_70%)]' : 'bg-[radial-gradient(circle_at_center,_#ff3300_0%,_transparent_70%)]'} opacity-20 pointer-events-none will-change-transform`} />
      <div className={`absolute bottom-10 right-10 w-96 h-96 transition-all duration-1000 ${isDeepWorkMode ? 'bg-[radial-gradient(circle_at_center,_#00ff88_0%,_transparent_70%)]' : 'bg-[radial-gradient(circle_at_center,_#ff003c_0%,_transparent_70%)]'} opacity-20 pointer-events-none will-change-transform`} />

      {/* Inner Constrained Grid Container */}
      <div className="max-w-7xl mx-auto w-full px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch min-h-[500px]">

          {/* LEFT: Dynamic Content (Let's Connect OR Deep Work Lofi) */}
          <div className="relative h-full flex flex-col justify-center w-full min-h-[500px]">
            <AnimatePresence mode="wait">
              {!isDeepWorkMode ? (
                <motion.div
                  key="contact-card"
                  initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
                  animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                  exit={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
                  transition={{ duration: 0.5 }}
                  className="flex flex-col items-center justify-center text-center p-6 sm:p-10 md:p-14 bg-black/60 backdrop-blur-xl border border-white/5 rounded-2xl shadow-[0_0_50px_rgba(255,51,0,0.05)] h-full lg:absolute inset-0 w-full"
                >
                  <div className="w-full space-y-8 sm:space-y-10">
                    {/* Headline */}
                    <div className="space-y-6">
                      <div className="inline-flex items-center gap-2 bg-[#ff3300]/10 border border-[#ff3300]/30 px-4 py-1.5 rounded-full">
                        <span className="w-2 h-2 rounded-full bg-[#ff3300] animate-pulse" />
                        <span className="text-[#ff3300] text-[10px] font-mono tracking-widest uppercase">Connection Protocol</span>
                      </div>
                      <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight font-sans text-transparent bg-clip-text bg-gradient-to-br from-white to-white/60 leading-tight">
                        Let’s Connect
                      </h1>
                      <p className="text-white/60 text-sm sm:text-base md:text-lg leading-relaxed max-w-xl mx-auto font-sans">
                        I’m always open to hearing about{" "}
                        <span className="text-[#ff3300] font-medium border-b border-[#ff3300]/40 pb-1">
                          cool ideas and collaborations
                        </span>{" "}
                        — whether you want to build something together, discuss new tech,
                        or just share a visionary project, I'd love to chat.
                      </p>
                    </div>

                    {/* Contact Buttons */}
                    <div className="flex flex-col sm:flex-row justify-center gap-4 w-full pt-2">
                      <a
                        href="mailto:guillaumenombro@gmail.com"
                        className="group flex flex-wrap items-center justify-center gap-3 px-6 py-3 rounded-xl bg-white/5 border border-white/10 hover:border-[#ff3300]/50 hover:bg-[#ff3300]/10 transition-all duration-300 text-white/90 break-words text-center w-full sm:w-auto shadow-[0_0_15px_rgba(0,0,0,0.5)]"
                      >
                        <FiMail className="text-lg shrink-0 group-hover:text-[#ff3300] transition-colors" />
                        <span className="break-words font-mono text-xs tracking-wide">guillaumenombro@gmail.com</span>
                      </a>

                      <a
                        href="https://www.linkedin.com/in/jeremie-nombro-2749b7239/"
                        target="_blank"
                        rel="noreferrer"
                        className="group flex items-center justify-center gap-3 px-6 py-3 rounded-xl bg-white/5 border border-white/10 hover:border-[#ff3300]/50 hover:bg-[#ff3300]/10 transition-all duration-300 text-white/90 text-center w-full sm:w-auto shadow-[0_0_15px_rgba(0,0,0,0.5)]"
                      >
                        <FiLinkedin className="text-lg shrink-0 group-hover:text-[#ff3300] transition-colors" />
                        <span className="font-mono text-xs tracking-wide">Jeremie Nombro</span>
                      </a>
                    </div>

                    {/* Freelance Note */}
                    <div className="text-xs text-white/40 text-center px-4 font-mono tracking-widest pt-8 border-t border-white/5 mx-auto">
                      <div className="inline-flex flex-wrap gap-2 items-center justify-center">
                        <FiTerminal className="text-[#ff003c] shrink-0" />
                        <span className="break-words uppercase">
                          P.S. Got a wild project in mind? Let's make it happen.
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="chaos-mode"
                  initial={{ opacity: 0, scale: 0.95, filter: "blur(20px)" }}
                  animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                  exit={{ opacity: 0, scale: 0.95, filter: "blur(20px)" }}
                  transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
                  className="flex flex-col items-center justify-center bg-black/80 backdrop-blur-3xl border-2 border-green-500/50 rounded-2xl shadow-[0_0_100px_rgba(0,255,100,0.2)] h-full lg:absolute inset-0 w-full overflow-hidden p-2"
                >
                  {/* Decorative Lofi Terminal Header */}
                  <div className="w-full bg-black/50 border-b border-green-500/30 px-4 py-2 flex items-center justify-between z-10 rounded-t-xl mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                      <span className="text-green-400 text-[10px] font-mono tracking-widest uppercase font-bold">LIVE: DEEP WORK ESTABLISHED</span>
                    </div>
                    <span className="text-white/30 text-[10px] font-mono">10:00:00</span>
                  </div>

                  {/* Embedded LoFi Stream */}
                  {/* Using standard reliable parameters to ensure video loads perfectly embedded. */}
                  <div className="relative w-full h-full flex-1 rounded-xl overflow-hidden shadow-[inset_0_0_50px_rgba(0,0,0,0.8)] border border-white/5 bg-black">
                    <iframe
                      className="absolute top-0 left-0 w-full h-full object-cover scale-[1.05] pointer-events-none"
                      src="https://www.youtube.com/embed/jfKfPfyJRdk?autoplay=1&mute=0&controls=0&showinfo=0&rel=0&loop=1&playlist=jfKfPfyJRdk&modestbranding=1"
                      title="Lofi Girl Radio"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>

                    {/* VHS/Scanline effect overlay over the video */}
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:100%_4px] mix-blend-overlay pointer-events-none" />
                    <div className="absolute inset-0 shadow-[inset_0_0_100px_rgba(0,0,0,0.9)] pointer-events-none" />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* RIGHT: Deep Work Control Terminal */}
          <div className={`flex flex-col justify-center items-center p-8 md:p-12 rounded-2xl border backdrop-blur-xl transition-all duration-700 h-full ${isDeepWorkMode
            ? 'bg-green-950/20 border-green-500/50 shadow-[0_0_80px_rgba(0,255,100,0.15)]'
            : 'bg-black/60 border-white/10 shadow-[0_0_50px_rgba(255,51,0,0.05)] hover:border-[#ff3300]/30'
            }`}>
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-col items-center text-center space-y-10 w-full"
            >

              <div className="space-y-4">
                <div className={`inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br shadow-xl mb-2 sm:mb-4 transition-colors duration-700 ${isDeepWorkMode ? 'from-green-500/20 to-green-600/5 shadow-[0_0_30px_rgba(0,255,100,0.3)]' : 'from-[#ff3300]/20 to-[#ff003c]/5'
                  }`}>
                  <FiPower className={`w-6 h-6 sm:w-8 sm:h-8 transition-colors duration-700 ${isDeepWorkMode ? 'text-green-500' : 'text-[#ff3300]'}`} />
                </div>

                <h2 className="text-2xl sm:text-3xl font-black tracking-tight font-sans text-transparent bg-clip-text bg-gradient-to-br from-white to-white/60">
                  Focus Engine
                </h2>

                <p className="text-white/40 text-xs sm:text-sm font-mono uppercase tracking-widest max-w-xs mx-auto leading-relaxed h-auto sm:h-[60px]">
                  {isDeepWorkMode
                    ? "Warning: Sensory isolation protocols engaged. No distractions allowed."
                    : "Activate to initiate deep work sequence. Use with extreme caution."}
                </p>
              </div>

              {/* Massive Toggle Switch */}
              <div className="relative flex flex-col items-center">
                <button
                  onClick={() => setIsDeepWorkMode(!isDeepWorkMode)}
                  className={`w-40 h-16 rounded-full p-2 relative transition-colors duration-500 ease-in-out flex items-center focus:outline-none ring-offset-black ${isDeepWorkMode
                    ? "bg-green-500/20 border-2 border-green-500/50 shadow-[0_0_40px_rgba(0,255,100,0.3)]"
                    : "bg-white/5 border-2 border-white/10 shadow-[inset_0_4px_10px_rgba(0,0,0,0.5)]"
                    }`}
                >
                  {/* Sliding Knob */}
                  <motion.div
                    className={`h-12 w-12 rounded-full absolute flex items-center justify-center shadow-[0_4px_15px_rgba(0,0,0,0.6)] ${isDeepWorkMode
                      ? 'bg-gradient-to-br from-green-400 to-green-600'
                      : 'bg-gradient-to-br from-gray-300 to-gray-500'
                      }`}
                    animate={{
                      x: isDeepWorkMode ? 96 : 4, // 160px width - 48px knob - 16px padding = ~96px slide
                    }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  >
                    {/* Inner texture detail on the knob */}
                    <div className="w-6 h-6 rounded-full border border-white/20 bg-white/10" />
                  </motion.div>
                </button>

                <div className={`mt-6 font-mono font-bold tracking-[0.3em] uppercase transition-colors duration-500 ${isDeepWorkMode ? "text-green-400 drop-shadow-[0_0_10px_rgba(0,255,100,0.8)]" : "text-white/30"
                  }`}>
                  {isDeepWorkMode ? "Chaos Active" : "Deep Work OFF"}
                </div>
              </div>

            </motion.div>
          </div>

        </div>
      </div>
    </motion.section>
  );
}
