import { FiGithub, FiGlobe, FiPackage } from "react-icons/fi";

type ProjectCardProps = {
  title: string;
  description: string;
  tech: string[];
  github?: string;
  live?: string;
  npm?: string;
};

export default function ProjectCard({
  title,
  description,
  tech,
  github,
  live,
  npm,
}: ProjectCardProps) {
  return (
    <div className="rounded-xl p-6 bg-[#1e293b] border border-white/10 shadow-md hover:shadow-pink-500/20 transition-shadow duration-300">
      {/* Title */}
      <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>

      {/* Description */}
      <p className="text-white/80 mb-4 leading-relaxed">{description}</p>

      {/* Tech Stack */}
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

      {/* Action Icons */}
      <div className="flex gap-4 text-white/70 text-xl">
        {github && (
          <a
            href={github}
            target="_blank"
            rel="noreferrer"
            className="hover:text-pink-500 transition-colors"
            title="View on GitHub"
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
            title="Live Demo"
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
            title="View on NPM"
          >
            <FiPackage />
          </a>
        )}
      </div>
    </div>
  );
}
