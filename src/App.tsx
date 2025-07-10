import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import LivePlayground from "./pages/LivePlayground";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import Contact from "./pages/Contact";

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
        ringColor="#8b5cf6"
        ringSize={3}
        duration={10000}
        hint="Go to documentation!"
        tooltipPosition="bottom"
        ringBorderRadius="6px"
      >
        <button 
          onClick={() => window.open('https://www.npmjs.com/package/react-nudge-ui', '_blank')}
          style={{
            padding: "0.5rem 1.25rem",
            backgroundColor: "#4f46e5",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer"
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
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
        <Route
          path="/playground"
          element={<LivePlayground code={playgroundCode} />}
        />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Layout>
  );
}

export default App;
