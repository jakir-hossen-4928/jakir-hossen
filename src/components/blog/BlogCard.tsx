import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageCircle, ThumbsUp, Share2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface BlogCardProps {
  id: string;
  title: string;
  description: string;
  coverImage: string;
  author: string;
  date: string;
  category: string;
  tags: string[];
  isAdmin?: boolean;
  onDelete?: (id: string) => void;
}

export const BlogCard = ({
  id,
  title,
  description,
  coverImage,
  author,
  date,
  category,
  tags,
  isAdmin = false,
  onDelete,
}: BlogCardProps) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/blog/${id}`);
  };

  return (
    <Card className="hover:shadow-lg transition-shadow duration-200 overflow-hidden">
      <div className="relative h-48 w-full overflow-hidden">
        <img
          src={coverImage || "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b"}
          alt={title}
          className="w-full h-full object-cover transition-transform hover:scale-105"
        />
        <div className="absolute top-4 right-4 flex gap-2">
          <span className="bg-primary/80 text-white px-3 py-1 rounded-full text-sm">
            {category}
          </span>
          {isAdmin && onDelete && (
            <Button
              variant="destructive"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                onDelete(id);
              }}
            >
              Delete
            </Button>
          )}
        </div>
      </div>

      <CardHeader>
        <CardTitle 
          className="text-xl font-bold hover:text-primary transition-colors cursor-pointer"
          onClick={handleCardClick}
        >
          {title}
        </CardTitle>
        <CardDescription>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>{author}</span>
            <span>•</span>
            <span>{date}</span>
          </div>
        </CardDescription>
      </CardHeader>

      <CardContent>
        <p className="text-muted-foreground line-clamp-2 mb-4">
          {description}
        </p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag) => (
            <span
              key={tag}
              className="bg-accent/10 text-accent px-2 py-1 rounded-full text-xs"
            >
              {tag}
            </span>
          ))}
        </div>

        <Button 
          variant="ghost" 
          size="sm" 
          className="w-full"
          onClick={handleCardClick}
        >
          Read More
        </Button>
      </CardContent>
    </Card>
  );
};