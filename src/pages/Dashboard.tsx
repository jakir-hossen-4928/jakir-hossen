import { useState } from "react";
import { ProjectForm } from "@/components/dashboard/ProjectForm";
import { ProjectCard } from "@/components/ProjectCard";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Dashboard = () => {
  const [projects, setProjects] = useState([
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
      technologies: ["React", "Tailwind CSS", "Appwrite", "Node.js", "MongoDB"],
      githubUrl: "https://github.com/jakir-hossen-4928/Icst-Hostel",
      features: [
        "Student Dashboard",
        "Admin Dashboard",
        "Room Management",
        "Fee Management",
        "Notice Board"
      ]
    }
  ]);
  const [editingProject, setEditingProject] = useState<any>(null);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    toast.success("Logged out successfully!");
    navigate("/");
  };

  const handleAddProject = (project: any) => {
    setProjects([...projects, project]);
  };

  const handleEditProject = (project: any) => {
    setProjects(projects.map(p => p.title === editingProject.title ? project : p));
    setEditingProject(null);
  };

  const handleDeleteProject = (projectTitle: string) => {
    setProjects(projects.filter(p => p.title !== projectTitle));
    toast.success("Project deleted successfully!");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <Button onClick={handleLogout} variant="destructive">Logout</Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="glass-card p-6">
          <h2 className="text-2xl font-semibold mb-4">
            {editingProject ? "Edit Project" : "Add New Project"}
          </h2>
          <ProjectForm
            onSubmit={editingProject ? handleEditProject : handleAddProject}
            initialData={editingProject}
            mode={editingProject ? "edit" : "add"}
          />
        </div>

        <div className="space-y-6">
          <h2 className="text-2xl font-semibold">Your Projects</h2>
          {projects.map((project) => (
            <div key={project.title} className="relative">
              <ProjectCard {...project} />
              <div className="absolute top-4 right-4 space-x-2">
                <Button
                  size="sm"
                  onClick={() => setEditingProject(project)}
                >
                  Edit
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => handleDeleteProject(project.title)}
                >
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
