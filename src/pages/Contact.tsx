import { FiMail, FiLinkedin, FiZap } from "react-icons/fi";
import { motion } from "framer-motion";

export default function Contact() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="max-w-4xl w-full text-center space-y-12 bg-gradient-to-tr from-[#0f172a] via-[#1e293b] to-[#111827] text-white p-8 rounded-lg p-12"
    >
      {/* Headline */}
      <div className="space-y-4">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white">
          👋 Let’s Connect
        </h1>
        <p className="text-white/80 text-lg sm:text-xl leading-relaxed max-w-xl mx-auto">
          I’m actively looking for full-time opportunities in{" "}
          <span className="text-pink-400 font-medium">
            Full-stack development
          </span>{" "}
          — especially roles where I can work on meaningful products,
          collaborate closely with teams, and keep growing.
        </p>
      </div>

      {/* Contact Buttons */}
      <div className="flex flex-col sm:flex-row justify-center gap-6">
        <a
          href="mailto:guillaumenombro@gmail.com"
          className="flex items-center gap-3 px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 transition text-white/90 backdrop-blur-sm"
        >
          <FiMail className="text-xl" />
          guillaumenombro@gmail.com
        </a>

        <a
          href="https://www.linkedin.com/in/jeremie-nombro-2749b7239/"
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-3 px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 transition text-white/90 backdrop-blur-sm"
        >
          <FiLinkedin className="text-xl" />
          Jeremie Nombro
        </a>
      </div>

      {/* Freelance Note */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="text-sm sm:text-base text-white/60 italic"
      >
        <div className="inline-flex items-center gap-2 justify-center">
          <FiZap className="text-pink-400" />
          <span>
            P.S. I also take on occasional freelance work — if you’ve got a cool
            idea or project, feel free to reach out.
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
}
