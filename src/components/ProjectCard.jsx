import { Github } from "lucide-react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";

export const ProjectCard = ({ 
  title, 
  description, 
  image, 
  technologies, 
  githubUrl,
  features 
}) => {
  return (
    <Card className="glass-card hover-card overflow-hidden theme-transition h-full">
      <div className="h-40 overflow-hidden">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" 
        />
      </div>
      <CardHeader className="space-y-2">
        <CardTitle className="text-lg text-primary theme-transition">{title}</CardTitle>
        <CardDescription className="text-sm text-muted-foreground theme-transition">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-wrap gap-1.5">
          {technologies.map((tech) => (
            <Badge 
              key={tech} 
              variant="secondary" 
              className="theme-transition text-xs"
            >
              {tech}
            </Badge>
          ))}
        </div>
        <div className="space-y-2">
          <h4 className="text-sm font-semibold theme-transition">Key Features:</h4>
          <ul className="list-disc list-inside space-y-1 text-xs text-muted-foreground theme-transition">
            {features.map((feature) => (
              <li key={feature}>{feature}</li>
            ))}
          </ul>
        </div>
        <Button 
          className="w-full flex items-center justify-center gap-2 theme-transition text-sm" 
          size="sm"
          asChild
        >
          <a href={githubUrl} target="_blank" rel="noopener noreferrer">
            <Github size={16} />
            View on GitHub
          </a>
        </Button>
      </CardContent>
    </Card>
  );
};