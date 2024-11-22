import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Heart, MessageCircle, Share2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";
import { BlogContent } from "@/components/blog/details/BlogContent";
import { BlogHeader } from "@/components/blog/details/BlogHeader";
import { BlogActions } from "@/components/blog/details/BlogActions";
import { BlogComments } from "@/components/blog/details/BlogComments";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

const BlogDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isOpen, setIsOpen] = useState(true);

  // Mock fetch blog data - Replace with actual API call
  const { data: blog, isLoading } = useQuery({
    queryKey: ['blog', id],
    queryFn: () => Promise.resolve({
      id: id,
      title: "Understanding Modern Web Development",
      content: `<p>Modern web development has evolved significantly over the past decade. 
                With the advent of powerful frameworks and tools, developers now have more 
                capabilities than ever before.</p>
                <h2>Key Concepts</h2>
                <p>React, TypeScript, and modern tooling have revolutionized how we build 
                web applications.</p>`,
      coverImage: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
      date: "March 15, 2024",
      author: "John Doe",
      authorImage: "https://api.dicebear.com/7.x/avatars/svg?seed=john",
      category: "Web Development",
      comments: [],
      isLiked: false,
      likesCount: 42
    }),
  });

  const handleClose = () => {
    setIsOpen(false);
    navigate(-1);
  };

  const handleLike = () => {
    toast.success("Blog post liked!");
  };

  const handleComment = () => {
    const commentsSection = document.getElementById('comments');
    commentsSection?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Link copied to clipboard!");
  };

  const handleAddComment = (text: string) => {
    toast.success("Comment added successfully!");
  };

  const handleLikeComment = (commentId: string) => {
    toast.success("Comment liked!");
  };

  if (isLoading) {
    return (
      <Dialog open={isOpen} onOpenChange={handleClose}>
        <DialogContent className="max-w-4xl w-full">
          <div className="flex items-center justify-center p-8">
            Loading...
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  if (!blog) {
    return (
      <Dialog open={isOpen} onOpenChange={handleClose}>
        <DialogContent className="max-w-4xl w-full">
          <div className="flex items-center justify-center p-8">
            Blog post not found
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleClose}
              className="h-8 w-8"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            Blog Details
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 px-4 md:px-6">
          <BlogHeader
            title={blog.title}
            author={blog.author}
            authorImage={blog.authorImage}
            date={blog.date}
            category={blog.category}
            onShare={handleShare}
          />

          <BlogContent
            content={blog.content}
            coverImage={blog.coverImage}
          />

          <BlogActions
            onLike={handleLike}
            onComment={handleComment}
            onShare={handleShare}
            isLiked={blog.isLiked}
            likesCount={blog.likesCount}
            commentsCount={blog.comments.length}
          />

          <BlogComments
            comments={blog.comments}
            onAddComment={handleAddComment}
            onLikeComment={handleLikeComment}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BlogDetails;