import { useTypewriter, Cursor } from "react-simple-typewriter";
import { motion } from "framer-motion";
import { ArrowRight, Code2, Terminal } from "lucide-react";
import { Canvas } from "@react-three/fiber";
import NeuralNetwork from "@/components/NeuralNetwork";
import { useInView } from "react-intersection-observer";

export default function Home() {
  const [text] = useTypewriter({
    words: [
      "REACT SPECIALIST;",
      "FULL-STACK DEVELOPER;",
      ".NET ENGINEER;",
    ],
    loop: true,
    delaySpeed: 2000,
  });

  const scrollTo = (id: string) => {
    const section = document.getElementById(id);
    if (section) section.scrollIntoView({ behavior: "smooth" });
  };

  const { ref: homeRef, inView } = useInView({
    threshold: 0,
    rootMargin: '100px 0px 100px 0px' // Keep alive slightly out of bounds
  });

  return (
    <motion.section
      id="home"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="min-h-screen w-full flex flex-col items-center justify-center text-center px-6 pt-24 pb-16 text-white relative overflow-hidden"
    >
      {/* 3D Neural Network Background */}
      <div ref={homeRef} className="absolute inset-0 w-full h-full -z-10 pointer-events-none">
        {inView && (
          <Canvas camera={{ position: [0, 0, 50], fov: 60 }}>
            <NeuralNetwork count={200} maxDistance={15} speed={1.5} />
          </Canvas>
        )}
      </div>

      {/* Deep Red/Orange Glowing Orbs for Techy Inspiration */}
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-[radial-gradient(circle_at_center,_#ff3300_0%,_transparent_70%)] opacity-20 pointer-events-none -z-10 mix-blend-screen will-change-transform" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-[radial-gradient(circle_at_center,_#ff003c_0%,_transparent_70%)] opacity-20 pointer-events-none -z-10 mix-blend-screen will-change-transform" />

      {/* Content Container */}
      <div className="relative w-full max-w-4xl mx-auto flex flex-col items-center justify-center z-10">
        <motion.div
          initial={{ scale: 0.8, opacity: 0, y: 30 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 20 }}
          className="relative group mb-12"
        >
          {/* Elegant Circular Image Frame */}
          <div className="w-48 h-48 mx-auto rounded-full p-1 bg-gradient-to-b from-[#ff3300]/80 to-[#ff003c]/20 shadow-[0_0_50px_rgba(255,0,60,0.4)] relative z-10">
            <div className="w-full h-full rounded-full overflow-hidden bg-black">
              <img
                src="/profilepic.jpg"
                alt="Guillaume Nombro"
                className="w-full h-full object-cover transition-all duration-700 ease-in-out mix-blend-normal opacity-100 md:mix-blend-luminosity md:opacity-90 group-hover:scale-105 group-hover:mix-blend-normal group-hover:opacity-100"
              />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="space-y-6"
        >
          <div className="flex items-center justify-center gap-2 text-[#ff3300] font-mono text-sm tracking-widest mb-6">
            <Terminal className="w-4 h-4" />
            <span>SYSTEM.INITIALIZE()</span>
          </div>

          <h1 className="text-5xl sm:text-7xl md:text-8xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white via-white/90 to-white/40 mb-2 drop-shadow-2xl leading-none">
            Jeremie.dev
          </h1>

          <div className="h-12 flex items-center justify-center mb-8">
            <h2 className="text-2xl md:text-3xl font-mono text-[#ff003c] drop-shadow-[0_0_10px_rgba(255,0,60,0.5)] tracking-tight font-bold">
              {text}
              <Cursor cursorStyle="_" cursorColor="#ff3300" />
            </h2>
          </div>

          <p className="text-base md:text-lg lg:text-xl text-white/50 max-w-2xl mx-auto font-sans leading-relaxed tracking-wide px-4 sm:px-0">
            Architecting modern, scalable web ecosystems. Merging high-performance <span className="text-white/90 font-medium">.NET</span> microservices with fluid <span className="text-white/90 font-medium">React</span> interactive experiences.
          </p>

          <div className="flex flex-wrap gap-6 justify-center mt-12">
            <motion.button
              onClick={() => scrollTo("projects")}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="group relative px-8 py-4 bg-[#ff003c]/10 backdrop-blur-md border border-[#ff3300]/30 rounded-lg overflow-hidden flex items-center gap-3 transition-all hover:bg-[#ff003c]/20 hover:border-[#ff3300]/60 shadow-[0_0_20px_rgba(255,0,60,0.1)] hover:shadow-[0_0_30px_rgba(255,0,60,0.3)]"
            >
              <Code2 className="w-5 h-5 text-[#ff3300] group-hover:animate-pulse relative z-10" />
              <span className="font-mono font-medium tracking-widest relative z-10 text-white leading-none">INITIALIZE_PROJECTS</span>
              <ArrowRight className="w-4 h-4 opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all relative z-10 text-[#ff3300]" />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
