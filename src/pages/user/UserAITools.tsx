import { AIToolCard } from "@/components/ai-tools/AIToolCard";
import { useQuery } from "@tanstack/react-query";
import { AITool } from "@/types/aiTools";

// Mock data - replace with actual API call
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

const UserAITools = () => {
  const { data: tools = [], isLoading } = useQuery({
    queryKey: ['ai-tools'],
    queryFn: () => Promise.resolve(mockTools), // Replace with actual API call
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">AI Tools</h1>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {tools.map((tool) => (
          <AIToolCard key={tool.id} tool={tool} />
        ))}
      </div>
    </div>
  );
};

export default UserAITools;