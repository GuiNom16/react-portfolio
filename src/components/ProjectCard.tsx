import { FiGithub, FiGlobe, FiPackage } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

type ProjectCardProps = {
  title: string;
  description: string;
  tech: string[];
  techImages?: string[];
  github?: string;
  live?: string;
  npm?: string;
};

export default function ProjectCard({
  title,
  description,
  tech,
  techImages = [],
  github,
  live,
  npm,
}: ProjectCardProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (techImages.length === 0) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % techImages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [techImages]);

  return (
    <motion.div
      className="w-full rounded-xl p-6 bg-[#1e293b] border border-white/10 shadow-md hover:shadow-pink-500/20 transition-shadow duration-300"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
        {/* Left side - Text content */}
        <div className="flex-1">
          <h3 className="text-2xl font-semibold text-white mb-2">{title}</h3>
          <p className="text-white/80 mb-4 leading-relaxed">{description}</p>

          <div className="flex flex-wrap gap-2 mb-4">
            {tech.map((t) => (
              <span
                key={t}
                className="bg-[#334155] text-xs font-medium text-white/80 px-3 py-1 rounded-full"
              >
                {t}
              </span>
            ))}
          </div>

          <div className="flex gap-4 text-white/70 text-xl">
            {github && (
              <a
                href={github}
                target="_blank"
                rel="noreferrer"
                className="hover:text-pink-500 transition-colors"
                title="GitHub"
              >
                <FiGithub />
              </a>
            )}
            {live && (
              <a
                href={live}
                target="_blank"
                rel="noreferrer"
                className="hover:text-pink-500 transition-colors"
                title="Live"
              >
                <FiGlobe />
              </a>
            )}
            {npm && (
              <a
                href={npm}
                target="_blank"
                rel="noreferrer"
                className="hover:text-pink-500 transition-colors"
                title="NPM"
              >
                <FiPackage />
              </a>
            )}
          </div>
        </div>

        {/* Right side - Rotating tech logo */}
        {techImages.length > 0 && (
          <div className="flex-shrink-0 w-full md:w-56 lg:w-64 flex justify-center items-center relative h-28">
            <AnimatePresence mode="wait">
              <motion.img
                key={techImages[currentIndex]}
                src={techImages[currentIndex]}
                alt={`Tech ${currentIndex + 1}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="rounded-lg object-contain h-28 w-28 absolute"
              />
            </AnimatePresence>
          </div>
        )}
      </div>
    </motion.div>
  );
}
