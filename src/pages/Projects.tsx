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
      techImages: [
        "/tech-images/python_logo.webp",
        "/tech-images/flask_logo.png",
        "/tech-images/azure_logo.jpg",
      ],
    },
    {
      title: "Timesheet Project",
      description:
        "Developed a PowerApps and SharePoint List based solution to solve employee uncompeted project time logging.",
      tech: ["PowerApps", "SharePoint", "Employee Time Tracking"],
      techImages: ["/tech-images/powerapps_logo.webp"],
    },
    {
      title: "Invasive Starfish Population Control",
      description:
        "CSR project aimed at regulating invasive starfish species population. Developed frontend with React and TypeScript, backend with Node.js.",
      tech: ["React", "TypeScript", "Node.js", "CSR"],
      techImages: [
        "/tech-images/react_logo.png",
        "/tech-images/typescript_logo.png",
        "/tech-images/nodejs_logo.webp",
      ],
    },
    {
      title: "Garbage Spotter",
      description:
        "CSR project to locate waste on the island for cleanup efforts. Frontend built with React and TypeScript, backend developed using .NET with hexagonal architecture.",
      tech: ["React", "TypeScript", ".NET", "Hexagonal Architecture", "CSR"],
      techImages: [
        "/tech-images/react_logo.png",
        "/tech-images/typescript_logo.png",
        "/tech-images/dotnet_logo.png",
      ],
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
        "Tailwind",
        "Docker",
      ],
      techImages: [
        "/tech-images/dotnet_logo.png",
        "/tech-images/flask_logo.png",
        "/tech-images/react_logo.png",
      ],
      github: "https://github.com/yourusername/devnotes",
    },
    {
      title: "PromptCraft",
      description:
        "A structured prompt builder for LLMs. Helps engineers reuse prompt components (instructions, examples, variables). Live preview and export ready.",
      tech: [
        "React",
        "TypeScript",
        "Prompt Engineering",
        "TailwindCSS",
        "Framer Motion",
        "Vite",
        "LLMs",
      ],
      techImages: [
        "/tech-images/react_logo.png",
        "/tech-images/typescript_logo.png",
        "/tech-images/vite_logo.jpg",
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
        "Onboarding",
        "UX",
        "Component Library",
      ],
      techImages: [
        "/tech-images/react_logo.png",
        "/tech-images/typescript_logo.png",
        "/tech-images/npm_logo.png",
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
        "Mental Health",
        "Express",
      ],
      techImages: [
        "/tech-images/react_logo.png",
        "/tech-images/nodejs_logo.webp",
        "/tech-images/openai_logo.png",
      ],
      github: "https://github.com/GuiNom16/Student-Helper-Chatbot",
    },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-tr from-[#0f172a] via-[#1e293b] to-[#111827] text-white py-16 rounded-lg">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Tabs.Root defaultValue="professional" className="space-y-8">
          {/* Tabs List */}
          <Tabs.List className="flex justify-center gap-4 mb-8">
            <Tabs.Trigger
              value="professional"
              className="px-6 py-2 rounded-lg font-medium bg-[#2c2f3f] text-white hover:bg-[#3c3f4f] transition-all duration-200 shadow-sm data-[state=active]:bg-violet-600 data-[state=active]:text-white data-[state=active]:shadow-lg"
            >
              💼 Professional Projects
            </Tabs.Trigger>

            <Tabs.Trigger
              value="personal"
              className="px-6 py-2 rounded-lg font-medium bg-[#2c2f3f] text-white hover:bg-[#3c3f4f] transition-all duration-200 shadow-sm data-[state=active]:bg-violet-600 data-[state=active]:text-white data-[state=active]:shadow-lg"
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
              className="flex flex-col gap-10 max-w-full"
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
              className="flex flex-col gap-10 max-w-full"
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
