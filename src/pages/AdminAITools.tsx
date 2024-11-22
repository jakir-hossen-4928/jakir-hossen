import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Edit, Trash, Robot } from "lucide-react";
import { AIToolForm } from "@/components/dashboard/AIToolForm";
import { toast } from "sonner";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

interface AITool {
  id: string;
  name: string;
  description: string;
  url: string;
  category: string;
  imageUrl: string;
}

const AdminAITools = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTool, setEditingTool] = useState<AITool | null>(null);
  const queryClient = useQueryClient();

  // Mock data - replace with actual API calls
  const { data: tools = [], isLoading } = useQuery({
    queryKey: ['ai-tools'],
    queryFn: () => Promise.resolve([]), // Replace with actual API call
  });

  const addToolMutation = useMutation({
    mutationFn: (tool: Omit<AITool, "id">) => {
      // Replace with actual API call
      return Promise.resolve({ ...tool, id: Date.now().toString() });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ai-tools'] });
      setIsFormOpen(false);
      toast.success("AI Tool added successfully!");
    },
  });

  const updateToolMutation = useMutation({
    mutationFn: (tool: AITool) => {
      // Replace with actual API call
      return Promise.resolve(tool);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ai-tools'] });
      setEditingTool(null);
      toast.success("AI Tool updated successfully!");
    },
  });

  const deleteToolMutation = useMutation({
    mutationFn: (id: string) => {
      // Replace with actual API call
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
      )}

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {tools.map((tool: AITool) => (
          <Card key={tool.id} className="relative group">
            <CardHeader className="space-y-0 pb-2">
              <CardTitle className="text-xl flex items-center gap-2">
                <Robot className="h-5 w-5" />
                {tool.name}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">{tool.description}</p>
              <div className="flex justify-between items-center">
                <a
                  href={tool.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  Try it out
                </a>
                <div className="space-x-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setEditingTool(tool)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => deleteToolMutation.mutate(tool.id)}
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AdminAITools;