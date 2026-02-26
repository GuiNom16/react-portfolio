import { useState, useEffect } from "react";
import { Home, FolderGit2, Terminal, Mail, Bot } from "lucide-react";
import { motion } from "framer-motion";

const navItems = [
  { id: "home", label: "Home", icon: Home },
  { id: "projects", label: "Projects", icon: FolderGit2 },
  { id: "playground", label: "Playground", icon: Terminal },
  { id: "contact", label: "Contact", icon: Mail },
];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map((item) => document.getElementById(item.id));
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(navItems[i].id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const section = document.getElementById(id);
    if (section) {
      window.scrollTo({
        top: section.offsetTop,
        behavior: "smooth",
      });
    }
  };

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.5, type: "spring", stiffness: 200, damping: 20 }}
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 pointer-events-auto"
    >
      <div className="glass-panel rounded-full px-6 py-3 flex items-center gap-4 border-white/10 bg-black/60 shadow-[0_0_30px_rgba(255,51,0,0.1)]">
        {navItems.map((item) => {
          const isActive = activeSection === item.id;
          const Icon = item.icon;
          return (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => handleNavClick(e, item.id)}
              className={`relative group flex flex-col items-center justify-center w-12 h-12 rounded-full transition-all duration-300 ${isActive ? "text-[#ff3300]" : "text-white/40 hover:text-white"}`}
            >
              {isActive && (
                <motion.div
                  layoutId="dock-indicator"
                  className="absolute inset-0 bg-[#ff003c]/20 rounded-full border border-[#ff3300]/40 shadow-[0_0_20px_rgba(255,51,0,0.4)]"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <Icon className="w-5 h-5 relative z-10" />

              {/* Tooltip */}
              <span className="absolute -top-12 scale-0 group-hover:scale-100 transition-transform bg-black/90 backdrop-blur-md border border-[#ff3300]/30 text-white text-[10px] tracking-widest px-3 py-1.5 rounded-md whitespace-nowrap font-mono shadow-[0_0_15px_rgba(255,0,60,0.3)]">
                {item.label}
              </span>
            </a>
          );
        })}

        <div className="w-[1px] h-8 bg-white/10 mx-2" />

        {/* AI Agent Placeholder Button */}
        <button
          className="relative group flex flex-col items-center justify-center w-12 h-12 rounded-full text-white/30 hover:text-[#ff3300] transition-colors cursor-not-allowed"
          aria-label="AI Agent Offline"
        >
          {/* Subtle offline pulse ring */}
          <div className="absolute inset-0 rounded-full border border-white/5 group-hover:border-[#ff3300]/20 transition-colors" />

          <Bot className="w-5 h-5 group-hover:animate-pulse group-hover:drop-shadow-[0_0_8px_rgba(255,51,0,0.8)]" />

          {/* Futuristic Tooltip */}
          <span className="absolute -top-12 scale-0 group-hover:scale-100 transition-transform bg-black/90 backdrop-blur-md border border-[#ff3300]/40 text-[#ff3300] text-[10px] tracking-widest px-3 py-1.5 rounded-md whitespace-nowrap font-mono shadow-[0_0_15px_rgba(255,0,60,0.3)] flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#ff3300] animate-pulse" />
            [ AI_AGENT // OFFLINE ]
          </span>
        </button>
      </div>
    </motion.div>
  );
}
