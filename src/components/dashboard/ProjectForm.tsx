import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

interface ProjectFormProps {
  onSubmit: (project: any) => void;
  initialData?: any;
  mode?: "add" | "edit";
}

export const ProjectForm = ({ onSubmit, initialData, mode = "add" }: ProjectFormProps) => {
  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    description: initialData?.description || "",
    image: initialData?.image || "",
    technologies: initialData?.technologies?.join(", ") || "",
    githubUrl: initialData?.githubUrl || "",
    features: initialData?.features?.join("\n") || "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const project = {
      ...formData,
      technologies: formData.technologies.split(",").map(tech => tech.trim()),
      features: formData.features.split("\n").filter(feature => feature.trim()),
    };
    onSubmit(project);
    toast.success(`Project ${mode === "add" ? "added" : "updated"} successfully!`);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        placeholder="Project Title"
        value={formData.title}
        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        required
      />
      <Textarea
        placeholder="Project Description"
        value={formData.description}
        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        required
      />
      <Input
        placeholder="Image URL"
        value={formData.image}
        onChange={(e) => setFormData({ ...formData, image: e.target.value })}
        required
      />
      <Input
        placeholder="Technologies (comma-separated)"
        value={formData.technologies}
        onChange={(e) => setFormData({ ...formData, technologies: e.target.value })}
        required
      />
      <Input
        placeholder="GitHub URL"
        value={formData.githubUrl}
        onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
        required
      />
      <Textarea
        placeholder="Features (one per line)"
        value={formData.features}
        onChange={(e) => setFormData({ ...formData, features: e.target.value })}
        required
      />
      <Button type="submit" className="w-full">
        {mode === "add" ? "Add Project" : "Update Project"}
      </Button>
    </form>
  );
};