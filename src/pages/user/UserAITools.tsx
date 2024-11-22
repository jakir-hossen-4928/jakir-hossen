import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Robot } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

interface AITool {
  id: string;
  name: string;
  description: string;
  url: string;
  category: string;
  imageUrl: string;
}

const UserAITools = () => {
  const { data: tools = [], isLoading } = useQuery({
    queryKey: ['ai-tools'],
    queryFn: () => Promise.resolve([]), // Replace with actual API call
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">AI Tools</h1>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {tools.map((tool: AITool) => (
          <Card key={tool.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="space-y-0 pb-2">
              <CardTitle className="text-xl flex items-center gap-2">
                <Robot className="h-5 w-5" />
                {tool.name}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">{tool.description}</p>
              <a
                href={tool.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                Try it out
              </a>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default UserAITools;