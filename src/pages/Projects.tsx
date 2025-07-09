import * as Tabs from "@radix-ui/react-tabs";
import { motion } from "framer-motion";
import ProjectCard from "@/components/ProjectCard";

export default function Projects() {
  const professionalProjects = [
    {
      title: "Internal Dashboard",
      description:
        "Built a role-based dashboard for operations and logistics during my time at Company X. Improved reporting speed by 40%.",
      tech: ["React", "Redux", "REST API"],
    },
    {
      title: "Legacy System Migration",
      description:
        "Migrated internal .NET Framework apps to .NET Core, reducing technical debt and improving maintainability.",
      tech: [".NET Core", "SQL Server", "Azure DevOps"],
    },
  ];

  const personalProjects = [
    {
      title: "react-nudge-ui",
      description:
        "A lightweight React component to nudge attention to UI elements.",
      tech: ["React", "TypeScript", "NPM"],
      github: "https://github.com/yourusername/react-nudge-ui",
      npm: "https://www.npmjs.com/package/react-nudge-ui",
    },
    {
      title: "Portfolio Website",
      description:
        "This portfolio! Built with modern tools and beautiful gradients.",
      tech: ["React", "TailwindCSS", "Framer Motion"],
      github: "https://github.com/yourusername/portfolio",
      live: "https://your-portfolio.vercel.app",
    },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-tr from-[#0f172a] via-[#1e293b] to-[#111827] text-white px-6 py-16">
      <div className="max-w-5xl mx-auto">
        <Tabs.Root defaultValue="professional" className="space-y-8">
          {/* Tabs List */}
          <Tabs.List className="flex justify-center gap-4 mb-8">
            <Tabs.Trigger
              value="professional"
              className="px-6 py-2 rounded-full font-medium bg-white/10 text-white/80 hover:text-white hover:bg-white/20 data-[state=active]:bg-violet-600 data-[state=active]:text-white transition"
            >
              💼 Professional Projects
            </Tabs.Trigger>
            <Tabs.Trigger
              value="personal"
              className="px-6 py-2 rounded-full font-medium bg-white/10 text-white/80 hover:text-white hover:bg-white/20 data-[state=active]:bg-violet-600 data-[state=active]:text-white transition"
            >
              🛠️ Personal Projects
            </Tabs.Trigger>
          </Tabs.List>

          {/* Professional Tab */}
          <Tabs.Content value="professional">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="grid md:grid-cols-2 gap-8"
            >
              {professionalProjects.map((project, idx) => (
                <ProjectCard key={idx} {...project} />
              ))}
            </motion.div>
          </Tabs.Content>

          {/* Personal Tab */}
          <Tabs.Content value="personal">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="grid md:grid-cols-2 gap-8"
            >
              {personalProjects.map((project, idx) => (
                <ProjectCard key={idx} {...project} />
              ))}
            </motion.div>
          </Tabs.Content>
        </Tabs.Root>
      </div>
    </main>
  );
}
