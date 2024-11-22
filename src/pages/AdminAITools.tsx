import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Bot } from "lucide-react";
import { AIToolForm } from "@/components/ai-tools/AIToolForm";
import { AIToolCard } from "@/components/ai-tools/AIToolCard";
import { toast } from "sonner";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { AITool } from "@/types/aiTools";

// Mock data - replace with actual API calls
const mockTools: AITool[] = [
  {
    id: "1",
    name: "ChatGPT",
    description: "Advanced language model for natural conversations and text generation",
    logoUrl: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e",
    websiteUrl: "https://chat.openai.com",
    category: "Text Generation"
  },
  {
    id: "2",
    name: "DALL-E",
    description: "AI system that creates realistic images and art from natural language descriptions",
    logoUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5",
    websiteUrl: "https://openai.com/dall-e-2",
    category: "Image Generation"
  }
];

const AdminAITools = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTool, setEditingTool] = useState<AITool | null>(null);
  const queryClient = useQueryClient();

  const { data: tools = [], isLoading } = useQuery({
    queryKey: ['ai-tools'],
    queryFn: () => Promise.resolve(mockTools),
  });

  const addToolMutation = useMutation({
    mutationFn: (newTool: Omit<AITool, "id">) => {
      // Ensure all required fields are present
      const tool: AITool = {
        id: Date.now().toString(),
        name: newTool.name,
        description: newTool.description,
        logoUrl: newTool.logoUrl,
        websiteUrl: newTool.websiteUrl,
        category: newTool.category
      };
      console.log("Adding new AI tool:", tool);
      return Promise.resolve(tool);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ai-tools'] });
      setIsFormOpen(false);
      toast.success("AI Tool added successfully!");
    },
  });

  const updateToolMutation = useMutation({
    mutationFn: (updatedTool: AITool) => {
      console.log("Updating AI tool:", updatedTool);
      return Promise.resolve(updatedTool);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ai-tools'] });
      setEditingTool(null);
      toast.success("AI Tool updated successfully!");
    },
  });

  const deleteToolMutation = useMutation({
    mutationFn: (id: string) => {
      console.log("Deleting AI tool:", id);
      return Promise.resolve();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ai-tools'] });
      toast.success("AI Tool deleted successfully!");
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">AI Tools Management</h1>
        <Button onClick={() => setIsFormOpen(true)} className="flex items-center gap-2">
          <Plus className="h-4 w-4" /> Add New Tool
        </Button>
      </div>

      {(isFormOpen || editingTool) && (
        <Card>
          <CardHeader>
            <CardTitle>{editingTool ? "Edit AI Tool" : "Add New AI Tool"}</CardTitle>
          </CardHeader>
          <CardContent>
            <AIToolForm
              onSubmit={(data) => {
                if (editingTool) {
                  updateToolMutation.mutate({ ...data, id: editingTool.id });
                } else {
                  addToolMutation.mutate(data);
                }
              }}
              onCancel={() => {
                setIsFormOpen(false);
                setEditingTool(null);
              }}
              initialData={editingTool}
            />
          </CardContent>
        </Card>
      )}

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {tools.map((tool) => (
          <AIToolCard
            key={tool.id}
            tool={tool}
            isAdmin={true}
            onEdit={setEditingTool}
            onDelete={(id) => deleteToolMutation.mutate(id)}
          />
        ))}
      </div>
    </div>
  );
};

export default AdminAITools;