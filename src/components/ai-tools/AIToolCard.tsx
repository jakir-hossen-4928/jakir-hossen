import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bot, ExternalLink, Edit, Trash } from "lucide-react";
import { AITool } from "@/types/aiTools";

interface AIToolCardProps {
  tool: AITool;
  isAdmin?: boolean;
  onEdit?: (tool: AITool) => void;
  onDelete?: (id: string) => void;
}

export const AIToolCard = ({ tool, isAdmin, onEdit, onDelete }: AIToolCardProps) => {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader className="space-y-0 pb-2">
        <CardTitle className="text-xl flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bot className="h-5 w-5" />
            {tool.name}
          </div>
          {isAdmin && (
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onEdit?.(tool)}
              >
                <Edit className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onDelete?.(tool.id)}
              >
                <Trash className="h-4 w-4" />
              </Button>
            </div>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="aspect-video relative overflow-hidden rounded-md">
            <img
              src={tool.logoUrl}
              alt={tool.name}
              className="object-cover w-full h-full"
            />
          </div>
          <p className="text-muted-foreground">{tool.description}</p>
          <Button asChild variant="outline" className="w-full">
            <a
              href={tool.websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2"
            >
              <ExternalLink className="h-4 w-4" />
              Visit Website
            </a>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};