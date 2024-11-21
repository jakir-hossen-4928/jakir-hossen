import { useState, useEffect } from "react";
import { ProjectForm } from "@/components/dashboard/ProjectForm";
import { ProjectCard } from "@/components/ProjectCard";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { projectsService } from "@/services/projects";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const Dashboard = () => {
  const [editingProject, setEditingProject] = useState<any>(null);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: projects = [], isLoading } = useQuery({
    queryKey: ['projects'],
    queryFn: projectsService.getAllProjects,
  });

  const addProjectMutation = useMutation({
    mutationFn: projectsService.addProject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      toast.success("Project added successfully!");
    },
    onError: (error) => {
      toast.error("Failed to add project");
      console.error(error);
    },
  });

  const updateProjectMutation = useMutation({
    mutationFn: ({ id, project }: { id: string; project: any }) => 
      projectsService.updateProject(id, project),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      setEditingProject(null);
      toast.success("Project updated successfully!");
    },
    onError: (error) => {
      toast.error("Failed to update project");
      console.error(error);
    },
  });

  const deleteProjectMutation = useMutation({
    mutationFn: projectsService.deleteProject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      toast.success("Project deleted successfully!");
    },
    onError: (error) => {
      toast.error("Failed to delete project");
      console.error(error);
    },
  });

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    toast.success("Logged out successfully!");
    navigate("/");
  };

  const handleAddProject = (project: any) => {
    addProjectMutation.mutate(project);
  };

  const handleEditProject = (project: any) => {
    if (editingProject?.id) {
      updateProjectMutation.mutate({ id: editingProject.id, project });
    }
  };

  const handleDeleteProject = (projectId: string) => {
    deleteProjectMutation.mutate(projectId);
  };

  if (isLoading) {
    return <div className="container mx-auto px-4 py-8">Loading...</div>;
  }

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
          {projects.map((project: any) => (
            <div key={project.$id} className="relative">
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
                  onClick={() => handleDeleteProject(project.$id)}
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