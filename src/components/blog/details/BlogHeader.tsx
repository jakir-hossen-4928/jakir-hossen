import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Share2, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface BlogHeaderProps {
  title: string;
  author: string;
  authorImage?: string;
  date: string;
  category: string;
  onShare: () => void;
}

export const BlogHeader = ({
  title,
  author,
  authorImage,
  date,
  category,
  onShare,
}: BlogHeaderProps) => {
  return (
    <div className="space-y-4 animate-fade-in">
      <h1 className="text-3xl md:text-4xl font-bold tracking-tight">{title}</h1>
      
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Avatar className="h-10 w-10 border-2 border-primary/20">
            <AvatarImage src={authorImage} />
            <AvatarFallback>
              <User className="h-4 w-4" />
            </AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <p className="text-sm font-medium leading-none">{author}</p>
            <p className="text-sm text-muted-foreground">{date}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="rounded-full">
            {category}
          </Badge>
          <Button variant="ghost" size="icon" onClick={onShare}>
            <Share2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};