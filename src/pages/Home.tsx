import { useNavigate } from "react-router-dom";
import { useTypewriter, Cursor } from "react-simple-typewriter";
import { FadeInSection } from "../components/FadeInSection";
import { motion } from "framer-motion";

export default function Home() {
  const [text] = useTypewriter({
    words: ["Full-stack Developer", "React Specialist", ".NET Engineer"],
    loop: true,
    delaySpeed: 2000,
  });

  const navigate = useNavigate();

  return (
    <main className="min-h-[75vh] max-w-4xl w-full flex flex-col items-center justify-center text-center px-6 py-16 bg-gradient-to-tr from-[#0f172a] via-[#1e293b] to-[#111827] text-white relative overflow-hidden rounded-lg">
      {/* Floating Blurred Circles */}
      <div className="absolute top-0 left-0 w-80 h-80 bg-violet-400 rounded-full blur-[120px] opacity-20 -z-10"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-blue-500 rounded-full blur-[120px] opacity-20 -z-10"></div>

      <FadeInSection>
        <div className="w-40 h-40 mx-auto rounded-full overflow-hidden border-4 border-pink-400 shadow-2xl shadow-black/40 bg-white mb-6">
          <img
            src="/profilepic.jpg"
            alt="Guillaume Nombro"
            className="w-full h-full object-cover"
          />
        </div>
      </FadeInSection>

      <div className="max-w-4xl space-y-6">
        <FadeInSection>
          <h1 className="text-5xl md:text-6xl font-extrabold">
            Jeremie Nombro
          </h1>
        </FadeInSection>

        <h2 className="text-2xl md:text-3xl text-pink-400 font-medium h-10">
          {text}
          <Cursor cursorStyle="|" />
        </h2>

        <FadeInSection>
          <p className="text-lg text-white/80 max-w-xl mx-auto">
            I design and build modern, scalable web apps with React and .NET.
            Focused on UX, performance, and clean architecture.
          </p>

          <div className="flex flex-wrap gap-4 justify-center mt-4">
            <motion.button
              onClick={() => navigate("/projects")}
              whileHover={{
                scale: 1.05,
                boxShadow: "0 0 15px rgba(236, 72, 153, 0.7)",
              }}
              transition={{ type: "spring", stiffness: 300 }}
              className="bg-gradient-to-r from-pink-500 to-violet-400 px-6 py-3 rounded-full shadow-md shadow-pink-400/30 text-white font-semibold transition-transform"
            >
              View Projects
            </motion.button>

            <motion.button
              onClick={() => navigate("/contact")}
              whileHover={{
                scale: 1.05,
                boxShadow: "0 0 10px rgba(255, 255, 255, 0.5)",
              }}
              transition={{ type: "spring", stiffness: 300 }}
              className="border border-white/20 px-6 py-3 rounded-full text-white hover:bg-white/10 transition"
            >
              Contact Me
            </motion.button>
          </div>

          {/* Skills Strip */}
          <div className="flex flex-wrap justify-center gap-3 mt-10">
            {["React", "TypeScript", ".NET", "AI/ML", "Clean coding"].map(
              (skill) => (
                <motion.span
                  key={skill}
                  whileHover={{
                    scale: 1.15,
                    backgroundColor: "#ec4899",
                    color: "#fff",
                    boxShadow: "0 0 8px rgba(236, 72, 153, 0.7)",
                  }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="bg-white/10 text-sm px-4 py-1 rounded-full backdrop-blur border border-white/20 cursor-pointer select-none"
                >
                  {skill}
                </motion.span>
              )
            )}
          </div>
        </FadeInSection>
      </div>
    </main>
  );
}
