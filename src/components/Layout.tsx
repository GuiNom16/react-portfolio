import Footer from "./Footer";
import Navbar from "./Navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-foreground bg-violet-400">
      <Navbar />
      <main className="max-w-4xl mx-auto px-6 py-8">{children}</main>
      <Footer />
    </div>
  );
}
