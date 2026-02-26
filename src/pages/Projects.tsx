import * as Tabs from "@radix-ui/react-tabs";
import { motion } from "framer-motion";
import ProjectCard from "@/components/ProjectCard";

export default function Projects() {
  const professionalProjects = [
    {
      title: "Gen AI Squad Initiative",
      description:
        "Led a project to reduce time spent by testers creating test cases. Integrated TDD and used Azure OpenAI APIs for automatic test case generation, reducing test case creation time by 60%. Developed with a Flask backend.",
      tech: ["Python", "Flask", "Azure OpenAI", "TDD", "Test Automation"],
    },
    {
      title: "Timesheet Project",
      description:
        "Developed a PowerApps and SharePoint List based solution to solve employee uncompeted project time logging.",
      tech: ["PowerApps", "SharePoint", "Employee Time Tracking"],
    },
    {
      title: "Invasive Starfish Population Control",
      description:
        "CSR project aimed at regulating invasive starfish species population. Developed frontend with React and TypeScript, backend with Node.js.",
      tech: ["React", "TypeScript", "Node.js", "CSR"],
    },
    {
      title: "Garbage Spotter",
      description:
        "CSR project to locate waste on the island for cleanup efforts. Frontend built with React and TypeScript, backend developed using .NET with hexagonal architecture.",
      tech: ["React", "TypeScript", ".NET", "Hexagonal Architecture", "CSR"],
    },
  ];

  const personalProjects = [
    {
      title: "DevNotes",
      description:
        "Full-stack note-taking app with clean architecture (.NET 8, CQRS, PostgreSQL). Includes AI-powered Flask microservice integrating OpenAI and Hugging Face models.",
      tech: [
        ".NET 8",
        "MediatR",
        "PostgreSQL",
        "Flask",
        "OpenAI",
        "Hugging Face",
        "React",
        "Docker",
      ],
      github: "https://github.com/GuiNom16/devnotes",
    },
    {
      title: "PromptCraft",
      description:
        "A structured prompt builder for LLMs. Helps engineers reuse prompt components (instructions, examples, variables). Live preview and export ready.",
      tech: [
        "React",
        "TypeScript",
        "Framer Motion",
        "Vite",
        "LLMs",
      ],
      github: "https://github.com/GuiNom16/promptcraft",
      live: "https://promptcraft-blush.vercel.app/",
    },
    {
      title: "react-nudge-ui",
      description:
        "A React component to subtly attract attention to UI elements with animated rings and tooltips. Ideal for onboarding, feature highlights, or user guidance.",
      tech: [
        "React",
        "TypeScript",
        "NPM",
        "Component Library",
      ],
      github: "https://github.com/GuiNom16/react-nudge-ui",
      npm: "https://www.npmjs.com/package/react-nudge-ui",
    },
    {
      title: "Student Helper App",
      description:
        "Mobile app to assist students with mental health and academic questions using a chatbot. React Native frontend, Node.js backend, and fine-tuned LLMs.",
      tech: [
        "React Native",
        "Node.js",
        "LLM Fine-Tuning",
        "Chatbot",
      ],
      github: "https://github.com/GuiNom16/Student-Helper-Chatbot",
    },
  ];

  return (
    <motion.section
      id="projects"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true, margin: "-100px" }}
      className="min-h-screen w-full relative z-10 pt-24 pb-32"
    >
      <div className="w-full max-w-7xl mx-auto px-6">

        {/* Section Header */}
        <div className="flex flex-col items-center justify-center mb-16 text-center">
          <div className="w-12 h-1 bg-[#ff3300] rounded-full mb-4 shadow-[0_0_15px_#ff003c]" />
          <h2 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-white/60 tracking-tight font-mono uppercase">
            Project Archives
          </h2>
        </div>

        <Tabs.Root defaultValue="professional" className="space-y-12">
          {/* Tabs List */}
          <Tabs.List className="flex justify-center gap-4">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <Tabs.Trigger
                value="professional"
                className="px-6 py-3 rounded-lg font-mono text-sm tracking-widest bg-white/5 border border-white/10 text-white/50 hover:bg-white/10 hover:text-white transition-all duration-300 data-[state=active]:bg-[#ff003c]/10 data-[state=active]:border-[#ff3300]/50 data-[state=active]:text-[#ff3300] data-[state=active]:shadow-[0_0_20px_rgba(255,0,60,0.15)] outline-none"
              >
                PROFESSIONAL
              </Tabs.Trigger>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <Tabs.Trigger
                value="personal"
                className="px-6 py-3 rounded-lg font-mono text-sm tracking-widest bg-white/5 border border-white/10 text-white/50 hover:bg-white/10 hover:text-white transition-all duration-300 data-[state=active]:bg-[#ff003c]/10 data-[state=active]:border-[#ff3300]/50 data-[state=active]:text-[#ff3300] data-[state=active]:shadow-[0_0_20px_rgba(255,0,60,0.15)] outline-none"
              >
                PERSONAL
              </Tabs.Trigger>
            </motion.div>
          </Tabs.List>

          {/* Professional Tab */}
          <Tabs.Content value="professional" className="outline-none">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-full"
            >
              {professionalProjects.map((project, idx) => (
                <ProjectCard key={idx} {...project} />
              ))}
            </motion.div>
          </Tabs.Content>

          {/* Personal Tab */}
          <Tabs.Content value="personal" className="outline-none">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-full"
            >
              {personalProjects.map((project, idx) => (
                <ProjectCard key={idx} {...project} />
              ))}
            </motion.div>
          </Tabs.Content>
        </Tabs.Root>
      </div>
    </motion.section>
  );
}
