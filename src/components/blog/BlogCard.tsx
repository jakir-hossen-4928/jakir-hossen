import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageCircle, ThumbsUp, Share2 } from "lucide-react";
import { toast } from "sonner";

interface Comment {
  id: string;
  text: string;
  author: string;
  date: string;
}

interface BlogCardProps {
  id: string;
  title: string;
  description: string;
  coverImage: string;
  author: string;
  date: string;
  category: string;
  tags: string[];
  comments: Comment[];
}

export const BlogCard = ({
  title,
  description,
  coverImage,
  author,
  date,
  category,
  tags,
  comments: initialComments,
}: BlogCardProps) => {
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [newComment, setNewComment] = useState("");

  const handleAddComment = () => {
    if (!newComment.trim()) {
      toast.error("Please enter a comment");
      return;
    }

    const comment: Comment = {
      id: Date.now().toString(),
      text: newComment,
      author: "Current User", // This should be replaced with actual user data
      date: new Date().toLocaleDateString(),
    };

    setComments([...comments, comment]);
    setNewComment("");
    toast.success("Comment added successfully!");
  };

  return (
    <Card className="hover-card glass-card overflow-hidden">
      <div className="relative h-48 w-full overflow-hidden">
        <img
          src={coverImage || "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b"}
          alt={title}
          className="w-full h-full object-cover transition-transform hover:scale-105"
        />
        <div className="absolute top-4 right-4">
          <span className="bg-primary/80 text-white px-3 py-1 rounded-full text-sm">
            {category}
          </span>
        </div>
      </div>

      <CardHeader>
        <CardTitle className="text-xl font-bold hover:text-primary transition-colors">
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
        <p className="text-muted-foreground line-clamp-3">{description}</p>
        
        <div className="flex flex-wrap gap-2 mt-4">
          {tags.map((tag) => (
            <span
              key={tag}
              className="bg-accent/10 text-accent px-2 py-1 rounded-full text-xs"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-6 space-y-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm">
              <ThumbsUp className="h-4 w-4 mr-2" />
              Like
            </Button>
            <Button variant="ghost" size="sm">
              <MessageCircle className="h-4 w-4 mr-2" />
              {comments.length} Comments
            </Button>
            <Button variant="ghost" size="sm">
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
          </div>

          <div className="space-y-4">
            {comments.map((comment) => (
              <div key={comment.id} className="p-3 rounded-lg bg-accent/5">
                <div className="flex justify-between items-start">
                  <span className="font-medium">{comment.author}</span>
                  <span className="text-xs text-muted-foreground">{comment.date}</span>
                </div>
                <p className="mt-1 text-sm">{comment.text}</p>
              </div>
            ))}
          </div>

          <div className="flex gap-2">
            <Input
              placeholder="Add a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="flex-1"
            />
            <Button onClick={handleAddComment}>Comment</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};