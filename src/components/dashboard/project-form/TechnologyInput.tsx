import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";
import { toast } from "sonner";

interface TechnologyInputProps {
  selectedTechnologies: string[];
  setSelectedTechnologies: (technologies: string[]) => void;
}

const SUGGESTED_TECHNOLOGIES = [
  "React", "Next.js", "TypeScript", "JavaScript", "Node.js", "Express", 
  "MongoDB", "PostgreSQL", "Tailwind CSS", "Firebase", "AWS", "Docker",
  "Vue.js", "Angular", "Svelte", "Python", "Django", "Flask",
  "GraphQL", "REST API", "Redis", "Kubernetes", "CI/CD", "Jest",
  "React Native", "Flutter", "Swift", "Kotlin", "Java", "Spring Boot"
];

export const TechnologyInput = ({ 
  selectedTechnologies, 
  setSelectedTechnologies 
}: TechnologyInputProps) => {
  const [newTech, setNewTech] = React.useState("");

  const addTechnology = (tech: string) => {
    if (!tech.trim()) return;
    if (selectedTechnologies.includes(tech.trim())) {
      toast.error("Technology already added");
      return;
    }
    setSelectedTechnologies([...selectedTechnologies, tech.trim()]);
    setNewTech("");
  };

  const removeTechnology = (tech: string) => {
    setSelectedTechnologies(selectedTechnologies.filter(t => t !== tech));
  };

  const handleSuggestionClick = (tech: string) => {
    setNewTech(tech);
    addTechnology(tech);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2 mb-2 min-h-[40px] p-2 border rounded-md bg-background">
        {selectedTechnologies.map((tech) => (
          <Badge key={tech} variant="secondary" className="gap-1">
            {tech}
            <button
              type="button"
              onClick={() => removeTechnology(tech)}
              className="ml-1 hover:text-destructive"
            >
              <X className="h-3 w-3" />
            </button>
          </Badge>
        ))}
      </div>
      <div className="flex gap-2">
        <Input
          value={newTech}
          onChange={(e) => setNewTech(e.target.value)}
          placeholder="Add a technology..."
          className="flex-1"
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              addTechnology(newTech);
            }
          }}
        />
        <Button 
          type="button"
          variant="outline"
          onClick={() => addTechnology(newTech)}
        >
          Add
        </Button>
      </div>
      <div className="mt-2">
        <p className="text-sm text-muted-foreground mb-2">Suggested technologies:</p>
        <div className="flex flex-wrap gap-2">
          {SUGGESTED_TECHNOLOGIES.map((tech) => (
            <Badge
              key={tech}
              variant="outline"
              className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
              onClick={() => handleSuggestionClick(tech)}
            >
              {tech}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
};