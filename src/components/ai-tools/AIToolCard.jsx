import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bot, ExternalLink, Edit, Trash } from "lucide-react";

export const AIToolCard = ({ tool, isAdmin, onEdit, onDelete }) => {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader className="flex items-center justify-between">
        <div className="flex items-center">
          <Bot className="h-5 w-5" />
          <CardTitle className="ml-2 text-lg">{tool.name}</CardTitle>
        </div>
        {isAdmin && (
          <div className="flex gap-2">
            <Button variant="ghost" size="icon" onClick={() => onEdit(tool)}>
              <Edit className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" onClick={() => onDelete(tool.id)}>
              <Trash className="h-4 w-4" />
            </Button>
          </div>
        )}
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <p className="text-muted-foreground">{tool.description}</p>
          <a href={tool.websiteUrl} target="_blank" rel="noopener noreferrer">
            <Button variant="outline" className="w-full flex items-center gap-2">
              <ExternalLink className="h-4 w-4" />
              Visit Website
            </Button>
          </a>
        </div>
      </CardContent>
    </Card>
  );
};
