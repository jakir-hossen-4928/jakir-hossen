import { Github } from "lucide-react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";

interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  technologies: string[];
  githubUrl: string;
  features: string[];
}

export const ProjectCard = ({ 
  title, 
  description, 
  image, 
  technologies, 
  githubUrl,
  features 
}: ProjectCardProps) => {
  return (
    <Card className="glass-card hover-card overflow-hidden">
      <div className="h-48 overflow-hidden">
        <img src={image} alt={title} className="w-full h-full object-cover" />
      </div>
      <CardHeader>
        <CardTitle className="text-xl text-primary">{title}</CardTitle>
        <CardDescription className="text-gray-400">{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-wrap gap-2">
          {technologies.map((tech) => (
            <Badge key={tech} variant="secondary">
              {tech}
            </Badge>
          ))}
        </div>
        <div className="space-y-2">
          <h4 className="font-semibold">Key Features:</h4>
          <ul className="list-disc list-inside space-y-1 text-sm text-gray-400">
            {features.map((feature) => (
              <li key={feature}>{feature}</li>
            ))}
          </ul>
        </div>
        <Button className="w-full flex items-center justify-center gap-2" asChild>
          <a href={githubUrl} target="_blank" rel="noopener noreferrer">
            <Github size={20} />
            View on GitHub
          </a>
        </Button>
      </CardContent>
    </Card>
  );
};