import { Button } from "@/components/ui/button";
import { Heart, MessageCircle, Share2 } from "lucide-react";

interface BlogActionsProps {
  onLike: () => void;
  onComment: () => void;
  onShare: () => void;
  isLiked?: boolean;
  likesCount?: number;
  commentsCount?: number;
}

export const BlogActions = ({
  onLike,
  onComment,
  onShare,
  isLiked = false,
  likesCount = 0,
  commentsCount = 0,
}: BlogActionsProps) => {
  return (
    <div className="flex items-center gap-2 py-6 animate-fade-in">
      <Button 
        variant={isLiked ? "default" : "ghost"} 
        size="sm"
        onClick={onLike}
        className="gap-2"
      >
        <Heart className={cn("h-4 w-4", isLiked && "fill-current")} />
        {likesCount > 0 && likesCount}
      </Button>
      
      <Button 
        variant="ghost" 
        size="sm"
        onClick={onComment}
        className="gap-2"
      >
        <MessageCircle className="h-4 w-4" />
        {commentsCount > 0 && commentsCount}
      </Button>
      
      <Button 
        variant="ghost" 
        size="sm"
        onClick={onShare}
      >
        <Share2 className="h-4 w-4" />
      </Button>
    </div>
  );
};