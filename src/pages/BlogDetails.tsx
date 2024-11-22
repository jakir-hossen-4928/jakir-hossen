import { useParams } from "react-router-dom";
import { useState } from "react";
import { toast } from "sonner";
import { BlogHeader } from "@/components/blog/details/BlogHeader";
import { BlogContent } from "@/components/blog/details/BlogContent";
import { BlogActions } from "@/components/blog/details/BlogActions";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MessageCircle, ThumbsUp, Share2, User, Reply } from "lucide-react";

interface Comment {
  id: string;
  text: string;
  author: string;
  authorImage?: string;
  date: string;
  likes: number;
  replies: Comment[];
  isLiked?: boolean;
}

const BlogDetails = () => {
  const { id } = useParams();
  const [newComment, setNewComment] = useState("");
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyText, setReplyText] = useState("");

  const [blog, setBlog] = useState({
    id: "1",
    title: "Getting Started with React and TypeScript",
    content: "Full blog content here...",
    coverImage: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
    date: "2024-02-20",
    author: "John Doe",
    authorImage: "https://api.dicebear.com/7.x/avatars/svg?seed=john",
    category: "Development",
    tags: ["React", "TypeScript", "Web Development"],
    comments: [] as Comment[],
    isLiked: false,
    likesCount: 0,
  });

  const handleShare = () => {
    // Share functionality
    navigator.share?.({
      title: blog.title,
      text: blog.content.substring(0, 100),
      url: window.location.href,
    }).catch(() => {
      // Fallback if Web Share API is not available
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
    // Scroll to comments section
    document.getElementById("comments")?.scrollIntoView({ behavior: "smooth" });
  };

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
      likes: 0,
      replies: [],
      isLiked: false
    };

    setBlog({
      ...blog,
      comments: [...blog.comments, comment],
    });
    setNewComment("");
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

  const handleAddReply = (commentId: string) => {
    if (!replyText.trim()) {
      toast.error("Please enter a reply");
      return;
    }

    const reply: Comment = {
      id: Date.now().toString(),
      text: replyText,
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

    setReplyText("");
    setReplyingTo(null);
    toast.success("Reply added successfully!");
  };

  const renderComment = (comment: Comment, isReply = false) => (
    <div key={comment.id} className={`flex gap-3 p-4 rounded-lg ${isReply ? 'ml-12 bg-accent/5' : 'bg-accent/10'}`}>
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
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => handleLikeComment(comment.id)}
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
    <div className="container max-w-4xl mx-auto px-4 py-8">
      <Card className="p-6 md:p-8 space-y-8 glass-card hover-card">
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
      </Card>

      <div id="comments" className="mt-8">
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
          {blog.comments.map(comment => renderComment(comment))}
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;
