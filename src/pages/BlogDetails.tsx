import { useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { BlogHeader } from "@/components/blog/details/BlogHeader";
import { BlogContent } from "@/components/blog/details/BlogContent";
import { BlogActions } from "@/components/blog/details/BlogActions";
import { BlogComments } from "@/components/blog/details/BlogComments";
import { Card } from "@/components/ui/card";
import { Blog } from "@/types/blog";

const BlogDetails = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState<Blog>({
    id: "1",
    title: "Getting Started with React and TypeScript",
    content: "Full blog content here...",
    coverImage: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
    date: "2024-02-20",
    author: "John Doe",
    authorImage: "https://api.dicebear.com/7.x/avatars/svg?seed=john",
    category: "Development",
    comments: [],
    isLiked: false,
    likesCount: 0,
  });

  const handleShare = () => {
    navigator.share?.({
      title: blog.title,
      text: blog.content.substring(0, 100),
      url: window.location.href,
    }).catch(() => {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard!");
    });
  };

  const handleLike = () => {
    setBlog(prev => ({
      ...prev,
      isLiked: !prev.isLiked,
      likesCount: prev.isLiked ? prev.likesCount - 1 : prev.likesCount + 1
    }));
  };

  const handleComment = () => {
    document.getElementById("comments")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleAddComment = (text: string) => {
    const comment = {
      id: Date.now().toString(),
      text,
      author: "Current User",
      authorImage: "https://api.dicebear.com/7.x/avatars/svg?seed=current",
      date: new Date().toLocaleDateString(),
      likes: 0,
      replies: [],
      isLiked: false
    };

    setBlog(prev => ({
      ...prev,
      comments: [...prev.comments, comment],
    }));
    toast.success("Comment added successfully!");
  };

  const handleLikeComment = (commentId: string) => {
    setBlog(prev => ({
      ...prev,
      comments: prev.comments.map(comment => {
        if (comment.id === commentId) {
          return {
            ...comment,
            likes: comment.isLiked ? comment.likes - 1 : comment.likes + 1,
            isLiked: !comment.isLiked
          };
        }
        return comment;
      })
    }));
  };

  const handleAddReply = (commentId: string, text: string) => {
    const reply = {
      id: Date.now().toString(),
      text,
      author: "Current User",
      authorImage: "https://api.dicebear.com/7.x/avatars/svg?seed=current",
      date: new Date().toLocaleDateString(),
      likes: 0,
      replies: [],
      isLiked: false
    };

    setBlog(prev => ({
      ...prev,
      comments: prev.comments.map(comment => {
        if (comment.id === commentId) {
          return {
            ...comment,
            replies: [...comment.replies, reply]
          };
        }
        return comment;
      })
    }));
    toast.success("Reply added successfully!");
  };

  return (
    <div className="container max-w-4xl mx-auto px-4 py-8">
      <Card className="p-4 md:p-6 lg:p-8 space-y-6 md:space-y-8 glass-card hover-card">
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
          onAddReply={handleAddReply}
          onLikeComment={handleLikeComment}
        />
      </Card>
    </div>
  );
};

export default BlogDetails;