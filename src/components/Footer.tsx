import { FiGithub, FiLinkedin } from "react-icons/fi";

export default function Footer() {
  return (
    <footer className="w-full bg-gradient-to-tr from-[#0f172a] via-[#1e293b] to-[#111827] border-t border-white/10 backdrop-blur text-white">
      <div className="mx-auto max-w-5xl px-6 py-4 flex flex-col md:flex-row items-center gap-4">
        <p className="text-sm text-white/70 select-none">
          &copy; {new Date().getFullYear()} Jeremie Nombro. All rights reserved.
        </p>

        {/* Spacer */}
        <div className="flex-grow"></div>

        {/* Right - social icons */}
        <div className="flex gap-6 text-white/80">
          <a
            href="https://github.com/GuiNom16"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="hover:text-pink-500 transition-colors"
          >
            <FiGithub size={24} />
          </a>
          <a
            href="https://www.linkedin.com/in/jeremie-nombro-2749b7239"
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="hover:text-pink-500 transition-colors"
          >
            <FiLinkedin size={24} />
          </a>
        </div>
      </div>
    </footer>
  );
}
