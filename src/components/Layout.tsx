import Footer from "./Footer";
import Navbar from "./Navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen bg-animated-gradient text-foreground relative z-0">

      <main className="flex-1 flex flex-col w-full pb-32 z-10">
        {children}
      </main>

      {/* We will refactor Navbar into floating Terminal Dock */}
      <Navbar />
      <Footer />
    </div>
  );
}
