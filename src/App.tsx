import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";

const Home = lazy(() => import("./pages/Home"));
const Projects = lazy(() => import("./pages/Projects"));
const LivePlayground = lazy(() => import("./pages/LivePlayground"));
const Contact = lazy(() => import("./pages/Contact"));
const playgroundCode = `
function Demo() {
  return (
    <div style={{
      padding: "2rem",
      maxWidth: "400px",
      margin: "0 auto",
      backgroundColor: "#1e293b",
      borderRadius: "12px",
      boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
      color: "white",
      fontFamily: "sans-serif"
    }}>
      <h2 style={{ marginBottom: "1rem", fontSize: "1.25rem" }}>Settings</h2>
      <p style={{ marginBottom: "1.5rem", color: "#cbd5e1" }}>
        Install our helper package to enhance your UI experience.
      </p>
      
      <Nudge
        ringColor="#ff3300"
        ringSize={3}
        persistent={true}
        hint="Go to documentation!"
        zIndex={45}
        tooltipPosition="bottom"
        ringBorderRadius="6px"
        tooltipBgColor="#0f172a"
        tooltipTextColor="#ffffff"
      >
        <button 
          onClick={() => window.open('https://www.npmjs.com/package/react-nudge-ui', '_blank')}
          style={{
            padding: "0.5rem 1.25rem",
            backgroundColor: "#ff3300",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Install react-nudge-ui
        </button>
      </Nudge>
    </div>
  );
}

render(<Demo />);
`;

import { useInView } from "react-intersection-observer";

const LazySection = ({ children, height = "100vh" }: { children: React.ReactNode, height?: string }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    rootMargin: "100px 0px", // Reduced margin to prevent eager loading of next section
  });

  return (
    <div ref={ref} className="w-full relative" style={{ minHeight: inView ? "auto" : height }}>
      {inView ? children : (
        <div
          className="w-full flex items-center justify-center bg-black/20"
          style={{ height }}
        >
          <div className="w-8 h-8 rounded-full border-2 border-[#ff3300]/20 border-t-[#ff3300] animate-spin" />
        </div>
      )}
    </div>
  );
};

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Layout>
            <Suspense fallback={<div className="min-h-screen bg-black w-full flex items-center justify-center text-[#ff3300] font-mono animate-pulse">SYSTEM.LOADING...</div>}>
              <div className="flex flex-col w-full relative">
                <LazySection height="100vh">
                  <Home />
                </LazySection>
                <LazySection height="100vh">
                  <Projects />
                </LazySection>
                <LazySection height="85vh">
                  <LivePlayground code={playgroundCode} />
                </LazySection>
                <LazySection height="100vh">
                  <Contact />
                </LazySection>
              </div>
            </Suspense>
          </Layout>
        }
      />
    </Routes>
  );
}

export default App;
