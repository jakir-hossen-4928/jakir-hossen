import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { User, ThumbsUp, MessageCircle } from "lucide-react";
import { toast } from "sonner";
import { Comment } from "@/types/blog";
import { cn } from "@/lib/utils";

interface BlogCommentsProps {
  comments: Comment[];
  onAddComment: (text: string) => void;
  onLikeComment: (commentId: string) => void;
}

export const BlogComments = ({
  comments,
  onAddComment,
  onLikeComment,
}: BlogCommentsProps) => {
  const [newComment, setNewComment] = useState("");

  const handleAddComment = () => {
    if (!newComment.trim()) {
      toast.error("Please enter a comment");
      return;
    }
    onAddComment(newComment);
    setNewComment("");
  };

  const renderComment = (comment: Comment) => (
    <div key={comment.id} className="group relative">
      <div className="flex flex-col space-y-4 p-6 rounded-lg bg-accent/5 hover:bg-accent/10 transition-colors">
        <div className="flex items-start space-x-4">
          <Avatar className="h-10 w-10 ring-2 ring-primary/10">
            <AvatarImage src={comment.authorImage} />
            <AvatarFallback><User className="h-4 w-4" /></AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium">{comment.author}</p>
              <time className="text-xs text-muted-foreground">{comment.date}</time>
            </div>
            <p className="mt-1 text-sm text-foreground/90 leading-relaxed">{comment.text}</p>
            <div className="mt-4 flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                className={cn(
                  "flex items-center space-x-2",
                  comment.isLiked && "text-primary"
                )}
                onClick={() => onLikeComment(comment.id)}
              >
                <ThumbsUp className="h-4 w-4" />
                <span>{comment.likes}</span>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="flex items-center space-x-2"
              >
                <MessageCircle className="h-4 w-4" />
                <span>{comment.replies?.length || 0}</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-8">
      <div className="flex items-start space-x-4">
        <Avatar className="h-8 w-8">
          <AvatarImage src="https://api.dicebear.com/7.x/avatars/svg?seed=current" />
          <AvatarFallback><User className="h-4 w-4" /></AvatarFallback>
        </Avatar>
        <div className="flex-1 space-y-2">
          <Input
            placeholder="Write a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="w-full"
          />
          <Button onClick={handleAddComment} size="sm">
            Post Comment
          </Button>
        </div>
      </div>

      <div className="space-y-6">
        {comments.map(renderComment)}
      </div>
    </div>
  );
};