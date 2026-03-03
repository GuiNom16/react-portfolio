import { useState } from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";
import AIChatOverlay from "./AI/AIChatOverlay";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-animated-gradient text-foreground relative z-0">

      <main className="flex-1 flex flex-col w-full pb-32 z-10">
        {children}
      </main>

      <Navbar onToggleChat={() => setIsChatOpen(!isChatOpen)} />
      <Footer />

      <AIChatOverlay isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </div>
  );
}
