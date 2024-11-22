import { useParams } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MessageCircle, ThumbsUp, Share2, User } from "lucide-react";
import { toast } from "sonner";

interface Comment {
  id: string;
  text: string;
  author: string;
  authorImage?: string;
  date: string;
}

const BlogDetails = () => {
  const { id } = useParams();
  const [newComment, setNewComment] = useState("");
  const [blog, setBlog] = useState({
    id: "1",
    title: "Getting Started with React and TypeScript",
    content: "Full blog content here...",
    coverImage: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
    date: "2024-02-20",
    author: "John Doe",
    category: "Development",
    tags: ["React", "TypeScript", "Web Development"],
    comments: [] as Comment[],
  });

  const handleAddComment = () => {
    if (!newComment.trim()) {
      toast.error("Please enter a comment");
      return;
    }

    const comment: Comment = {
      id: Date.now().toString(),
      text: newComment,
      author: "Current User",
      authorImage: "https://api.dicebear.com/7.x/avatars/svg?seed=current",
      date: new Date().toLocaleDateString(),
    };

    setBlog({
      ...blog,
      comments: [...blog.comments, comment],
    });
    setNewComment("");
    toast.success("Comment added successfully!");
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="space-y-8">
        <div className="relative h-[400px] w-full overflow-hidden rounded-lg">
          <img
            src={blog.coverImage}
            alt={blog.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-4 right-4">
            <span className="bg-primary/80 text-white px-3 py-1 rounded-full text-sm">
              {blog.category}
            </span>
          </div>
        </div>

        <div className="space-y-4">
          <h1 className="text-4xl font-bold">{blog.title}</h1>
          <div className="flex items-center gap-2 text-muted-foreground">
            <span>{blog.author}</span>
            <span>•</span>
            <span>{blog.date}</span>
          </div>

          <div className="flex flex-wrap gap-2">
            {blog.tags.map((tag) => (
              <span
                key={tag}
                className="bg-accent/10 text-accent px-2 py-1 rounded-full text-xs"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="prose prose-lg dark:prose-invert max-w-none" 
               dangerouslySetInnerHTML={{ __html: blog.content }} 
          />

          <div className="flex items-center gap-4 py-4 border-t border-b">
            <Button variant="ghost">
              <ThumbsUp className="h-4 w-4 mr-2" />
              Like
            </Button>
            <Button variant="ghost">
              <MessageCircle className="h-4 w-4 mr-2" />
              Comment
            </Button>
            <Button variant="ghost">
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
          </div>

          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Comments</h2>
            
            <div className="flex gap-3">
              <Avatar className="h-8 w-8">
                <AvatarImage src="https://api.dicebear.com/7.x/avatars/svg?seed=current" />
                <AvatarFallback>
                  <User className="h-4 w-4" />
                </AvatarFallback>
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
              {blog.comments.map((comment) => (
                <div key={comment.id} className="flex gap-3 p-4 rounded-lg bg-accent/5">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={comment.authorImage} />
                    <AvatarFallback>
                      <User className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <span className="font-medium">{comment.author}</span>
                      <span className="text-xs text-muted-foreground">{comment.date}</span>
                    </div>
                    <p className="mt-1">{comment.text}</p>
                    <div className="mt-2 flex gap-4">
                      <button className="text-sm text-muted-foreground hover:text-primary">
                        Like
                      </button>
                      <button className="text-sm text-muted-foreground hover:text-primary">
                        Reply
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;