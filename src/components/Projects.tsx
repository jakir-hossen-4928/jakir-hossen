import { ProjectCard } from "./ProjectCard";

const PROJECTS = [
  {
    title: "Project One",
    description: "A beautiful web application built with React and TypeScript",
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=800&q=80",
    technologies: ["React", "TypeScript", "Tailwind"],
  },
  {
    title: "Project Two",
    description: "Full-stack application with real-time features",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=800&q=80",
    technologies: ["Next.js", "Node.js", "MongoDB"],
  },
];

export const Projects = () => {
  return (
    <section className="py-20 px-6">
      <h2 className="text-3xl font-bold mb-12 text-center">
        Featured <span className="text-primary">Projects</span>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {PROJECTS.map((project) => (
          <ProjectCard key={project.title} {...project} />
        ))}
      </div>
    </section>
  );
};