import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { User, ThumbsUp as ThumbsUpIcon } from "lucide-react";
import { toast } from "sonner";
import { Comment } from "@/types/blog";

interface BlogCommentsProps {
  comments: Comment[];
  onAddComment: (text: string) => void;
  onLikeComment: (commentId: string) => void;
  onAddReply?: (commentId: string, text: string) => void;
}

export const BlogComments = ({
  comments,
  onAddComment,
  onLikeComment,
}: BlogCommentsProps) => {
  const [newComment, setNewComment] = useState("");
  const [mentionInput, setMentionInput] = useState("");
  const [showMentions, setShowMentions] = useState(false);

  // Mock users for mention functionality
  const users = [
    { id: "1", name: "John Doe" },
    { id: "2", name: "Jane Smith" },
    { id: "3", name: "Alice Johnson" }
  ];

  const handleAddComment = () => {
    if (!newComment.trim()) {
      toast.error("Please enter a comment");
      return;
    }
    onAddComment(newComment);
    setNewComment("");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setNewComment(value);

    // Check for @ symbol to show mentions
    if (value.includes("@")) {
      const mentionQuery = value.split("@").pop() || "";
      setMentionInput(mentionQuery);
      setShowMentions(true);
    } else {
      setShowMentions(false);
    }
  };

  const handleMention = (username: string) => {
    const commentWithoutCurrentMention = newComment.split("@")[0];
    setNewComment(`${commentWithoutCurrentMention}@${username} `);
    setShowMentions(false);
  };

  const renderComment = (comment: Comment) => (
    <div key={comment.id} className="flex flex-col md:flex-row gap-3 p-4 rounded-lg bg-accent/10 animate-fade-in">
      <div className="flex items-start gap-3 w-full">
        <Avatar className="h-10 w-10">
          <AvatarImage src={comment.authorImage} />
          <AvatarFallback><User className="h-4 w-4" /></AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0">
          <div className="flex flex-col md:flex-row md:items-center gap-2 justify-between">
            <span className="font-medium">{comment.author}</span>
            <span className="text-xs text-muted-foreground">{comment.date}</span>
          </div>
          <p className="mt-1 break-words">{comment.text}</p>
          <div className="mt-2">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => onLikeComment(comment.id)}
              className={comment.isLiked ? 'text-primary' : ''}
            >
              <ThumbsUpIcon className="h-4 w-4 mr-2" />
              {comment.likes} {comment.likes === 1 ? 'Like' : 'Likes'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div id="comments" className="mt-8 space-y-6 px-4 md:px-6 max-w-4xl mx-auto">
      <div className="flex flex-col md:flex-row gap-3">
        <Avatar className="h-8 w-8">
          <AvatarImage src="https://api.dicebear.com/7.x/avatars/svg?seed=current" />
          <AvatarFallback><User className="h-4 w-4" /></AvatarFallback>
        </Avatar>
        <div className="flex-1 flex flex-col md:flex-row gap-2 relative">
          <Input
            placeholder="Write a comment... Use @ to mention users"
            value={newComment}
            onChange={handleInputChange}
            className="flex-1"
          />
          <Button onClick={handleAddComment}>Comment</Button>
          
          {showMentions && (
            <div className="absolute top-full left-0 mt-1 w-full bg-background border rounded-md shadow-lg z-10">
              {users
                .filter(user => 
                  user.name.toLowerCase().includes(mentionInput.toLowerCase())
                )
                .map(user => (
                  <button
                    key={user.id}
                    className="w-full text-left px-4 py-2 hover:bg-accent/10 transition-colors"
                    onClick={() => handleMention(user.name)}
                  >
                    {user.name}
                  </button>
                ))}
            </div>
          )}
        </div>
      </div>

      <div className="space-y-4">
        {comments.map(comment => renderComment(comment))}
      </div>
    </div>
  );
};