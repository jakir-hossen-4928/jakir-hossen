import React from "react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";
import { toast } from "sonner";

export const TechnologyInput = ({ 
  selectedTechnologies, 
  setSelectedTechnologies 
}) => {
  const [newTech, setNewTech] = React.useState("");

  const addTechnology = (tech) => {
    if (!tech.trim()) return;
    if (selectedTechnologies.includes(tech.trim())) {
      toast.error("Technology already added");
      return;
    }
    setSelectedTechnologies([...selectedTechnologies, tech.trim()]);
    setNewTech("");
  };

  const removeTechnology = (tech) => {
    setSelectedTechnologies(selectedTechnologies.filter(t => t !== tech));
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
      <Input
        value={newTech}
        onChange={(e) => setNewTech(e.target.value)}
        placeholder="Type a technology and press Enter..."
        className="flex-1"
        onKeyPress={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            addTechnology(newTech);
          }
        }}
      />
    </div>
  );
};
