import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import LivePlayground from "./components/LivePlayground";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import Contact from "./pages/Contact";

const playgroundCode = `
function Demo() {
  return (
    <div style={{ padding: "2rem" }}>
      <Nudge
        ringColor="#8b5cf6"
        ringSize={3}
        duration={10000}
        hint="Go to documentation!"
        position="top"
        ringBorderRadius="6px"
      >
        <button 
         onClick={() => window.open('https://www.npmjs.com/package/react-nudge-ui', '_blank')}
        style={{
          padding: "0.5rem 1rem",
          backgroundColor: "#4f46e5",
          color: "white",
          border: "none",
          borderRadius: "6px"
        }}>
          react-nudge-ui
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
