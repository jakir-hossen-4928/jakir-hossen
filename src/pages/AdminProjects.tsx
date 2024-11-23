import { useState } from "react";
import { ProjectForm } from "@/components/dashboard/ProjectForm"; // The form to add a project
import { ProjectCard } from "@/components/ProjectCard"; // The card component to display each project
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { projectsService } from "@/services/projects"; // Service to interact with Firestore
import { toast } from "sonner";

const AdminProjects = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const queryClient = useQueryClient();

  // Query to fetch all projects
  const { data: projects = [], isLoading, isError, error } = useQuery({
    queryKey: ["projects"],
    queryFn: projectsService.getAllProjects,
    staleTime: 1000 * 60 * 5, // Cache data for 5 minutes
    refetchOnWindowFocus: false, // Prevent refetching when the window is focused
    onError: (err) => {
      console.error("Error fetching projects:", err); // Log the error
      toast.error("Failed to load projects. Please try again later.");
    },
  });

  // Mutation for adding a new project
  const addProjectMutation = useMutation({
    mutationFn: projectsService.addProject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      setIsDialogOpen(false);
      toast.success("Project added successfully!");
    },
    onError: () => {
      toast.error("Failed to add project");
    },
  });

  const handleAddProject = (project: any) => {
    addProjectMutation.mutate(project);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[200px] text-gray-600">
        <p>Loading projects, please wait...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center min-h-[200px] text-red-500">
        <p>Failed to load projects. Please try again later.</p>
        {error && <p>{error.message}</p>}
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl sm:text-3xl font-bold">Projects</h1>

        {/* Dialog for adding new project */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Project
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Add New Project</DialogTitle>
            </DialogHeader>
            <div className="mt-4">
              <ProjectForm onSubmit={handleAddProject} mode="add" />
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Displaying all projects */}
        {projects.length === 0 ? (
          <div className="text-center text-gray-500">No projects available.</div>
        ) : (
          projects.map((project: any) => (
            <ProjectCard key={project.id} {...project} />
          ))
        )}
      </div>
    </div>
  );
};

export default AdminProjects;

