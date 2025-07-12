import { FiMail, FiLinkedin, FiZap } from "react-icons/fi";
import { motion } from "framer-motion";

export default function Contact() {
  return (
    <main className=" max-w-4xl w-full flex flex-col items-center justify-center text-center px-6 py-16 bg-gradient-to-tr from-[#0f172a] via-[#1e293b] to-[#111827] text-white relative overflow-hidden rounded-lg">
      {/* Floating Blurred Circles for background effect */}
      <div className="absolute top-0 left-0 w-80 h-80 bg-violet-400 rounded-full blur-[120px] opacity-20 -z-10" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-blue-500 rounded-full blur-[120px] opacity-20 -z-10" />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full space-y-12"
      >
        {/* Headline */}
        <div className="space-y-4">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
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
        <div className="flex flex-col sm:flex-row justify-center gap-6 w-full">
          <a
            href="mailto:guillaumenombro@gmail.com"
            className="flex flex-wrap items-center justify-center gap-3 px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 transition text-white/90 backdrop-blur-sm break-words text-center w-full sm:w-auto"
          >
            <FiMail className="text-xl shrink-0" />
            <span className="break-words">guillaumenombro@gmail.com</span>
          </a>

          <a
            href="https://www.linkedin.com/in/jeremie-nombro-2749b7239/"
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center gap-3 px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 transition text-white/90 backdrop-blur-sm text-center w-full sm:w-auto"
          >
            <FiLinkedin className="text-xl shrink-0" />
            Jeremie Nombro
          </a>
        </div>

        {/* Freelance Note */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="text-sm sm:text-base text-white/60 italic text-center px-4"
        >
          <div className="inline-flex flex-wrap gap-2 items-center justify-center">
            <FiZap className="text-pink-400 shrink-0" />
            <span className="break-words">
              P.S. I also take on occasional freelance work. If you’ve got a
              cool idea or project, feel free to reach out.
            </span>
          </div>
        </motion.div>
      </motion.div>
    </main>
  );
}
