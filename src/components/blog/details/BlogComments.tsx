import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { User, Reply } from "lucide-react";
import { toast } from "sonner";
import { Comment } from "@/types/blog";

interface BlogCommentsProps {
  comments: Comment[];
  onAddComment: (text: string) => void;
  onAddReply: (commentId: string, text: string) => void;
  onLikeComment: (commentId: string) => void;
}

export const BlogComments = ({
  comments,
  onAddComment,
  onAddReply,
  onLikeComment,
}: BlogCommentsProps) => {
  const [newComment, setNewComment] = useState("");
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyText, setReplyText] = useState("");

  const handleAddComment = () => {
    if (!newComment.trim()) {
      toast.error("Please enter a comment");
      return;
    }
    onAddComment(newComment);
    setNewComment("");
  };

  const handleAddReply = (commentId: string) => {
    if (!replyText.trim()) {
      toast.error("Please enter a reply");
      return;
    }
    onAddReply(commentId, replyText);
    setReplyText("");
    setReplyingTo(null);
  };

  const renderComment = (comment: Comment, isReply = false) => (
    <div key={comment.id} className={`flex gap-3 p-4 rounded-lg ${isReply ? 'ml-12 bg-accent/5' : 'bg-accent/10'}`}>
      <Avatar className="h-10 w-10">
        <AvatarImage src={comment.authorImage} />
        <AvatarFallback><User className="h-4 w-4" /></AvatarFallback>
      </Avatar>
      <div className="flex-1">
        <div className="flex justify-between items-start">
          <span className="font-medium">{comment.author}</span>
          <span className="text-xs text-muted-foreground">{comment.date}</span>
        </div>
        <p className="mt-1">{comment.text}</p>
        <div className="mt-2 flex gap-4">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => onLikeComment(comment.id)}
            className={comment.isLiked ? 'text-primary' : ''}
          >
            <ThumbsUp className="h-4 w-4 mr-2" />
            {comment.likes} {comment.likes === 1 ? 'Like' : 'Likes'}
          </Button>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => setReplyingTo(comment.id)}
          >
            <Reply className="h-4 w-4 mr-2" />
            Reply
          </Button>
        </div>
        
        {replyingTo === comment.id && (
          <div className="mt-3 flex gap-2">
            <Input
              placeholder="Write a reply..."
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              className="flex-1"
            />
            <Button onClick={() => handleAddReply(comment.id)}>Reply</Button>
          </div>
        )}

        {comment.replies.length > 0 && (
          <div className="mt-4 space-y-4">
            {comment.replies.map(reply => renderComment(reply, true))}
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div id="comments" className="mt-8 space-y-6">
      <div className="flex gap-3">
        <Avatar className="h-8 w-8">
          <AvatarImage src="https://api.dicebear.com/7.x/avatars/svg?seed=current" />
          <AvatarFallback><User className="h-4 w-4" /></AvatarFallback>
        </Avatar>
        <div className="flex-1 flex gap-2">
          <Input
            placeholder="Write a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="flex-1"
          />
          <Button onClick={handleAddComment}>Comment</Button>
        </div>
      </div>

      <div className="space-y-4">
        {comments.map(comment => renderComment(comment))}
      </div>
    </div>
  );
};