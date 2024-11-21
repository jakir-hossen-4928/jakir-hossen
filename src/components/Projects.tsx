import { ProjectCard } from "./ProjectCard";

const PROJECTS = [
  {
    title: "📚 Customized Vocabulary App for EPS Workers",
    description: "A comprehensive Korean vocabulary book designed for EPS workers with features like pronunciation, offline favorites, and grammar images.",
    image: "https://i.ibb.co/CbPBXV0/korea.jpg",
    technologies: ["React Native", "JavaScript", "Google Translate API"],
    githubUrl: "https://github.com/jakir-hossen-4928/eps-bangla-vocabulary-mobile-app",
    features: [
      "Listen to Korean Words",
      "Offline Favorites",
      "Grammar Images",
      "Search Bar",
      "Google Translation"
    ]
  },
  {
    title: "🌐 Icst-Hostel Management System",
    description: "A comprehensive Hostel Management System designed for polytechnic students with student and admin dashboards.",
    image: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=800&q=80",
    technologies: ["React", "Tailwind CSS", "Appwrite", "JWT"],
    githubUrl: "https://github.com/jakir-hossen-4928/Icst-Hostel",
    features: [
      "Student Dashboard",
      "Admin Dashboard",
      "Room Management",
      "Fee Management",
      "Notice Board"
    ]
  }
];

export const Projects = () => {
  return (
    <section className="py-20 px-6">
      <h2 className="text-3xl font-bold mb-12 text-center">
        Featured <span className="text-primary">Projects</span>
      </h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {PROJECTS.map((project) => (
          <ProjectCard key={project.title} {...project} />
        ))}
      </div>
    </section>
  );
};