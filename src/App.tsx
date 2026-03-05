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
        ringColor="#00f0ff"
        ringSize={3}
        duration={10000}
        hint="Go to documentation!"
        zIndex={45}
        tooltipPosition="bottom"
        ringBorderRadius="6px"
        tooltipBgColor="#ffffff"
        tooltipTextColor="#000000"
      >
        <button 
          onClick={() => window.open('https://www.npmjs.com/package/react-nudge-ui', '_blank')}
          style={{
            padding: "0.5rem 1.25rem",
            backgroundColor: "#ff003c",
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

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Layout>
            <Suspense fallback={<div className="min-h-screen bg-black w-full flex items-center justify-center text-[#ff3300] font-mono animate-pulse">SYSTEM.LOADING...</div>}>
              <div className="flex flex-col w-full relative">
                <Home />
                <Projects />
                <LivePlayground code={playgroundCode} />
                <Contact />
              </div>
            </Suspense>
          </Layout>
        }
      />
    </Routes>
  );
}

export default App;
