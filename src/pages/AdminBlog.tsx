import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import { RichTextEditor } from "@/components/editor/RichTextEditor";
import { BlogCard } from "@/components/blog/BlogCard";

// Fake blog data for demonstration
const FAKE_BLOGS = [
  {
    id: "1",
    title: "Getting Started with React and TypeScript",
    description: "Learn how to set up a new React project with TypeScript and build your first component. We'll cover the basics of TypeScript and how it can improve your React development experience.",
    coverImage: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
    date: "2024-02-20",
    author: "John Doe",
    category: "Development",
    tags: ["React", "TypeScript", "Web Development"],
    comments: [
      {
        id: "1",
        text: "Great article! Very helpful for beginners.",
        author: "Jane Smith",
        date: "2024-02-21",
      },
    ],
  },
  {
    id: "2",
    title: "Building Modern UIs with Tailwind CSS",
    description: "Discover how to create beautiful and responsive user interfaces using Tailwind CSS. This guide covers the fundamentals and advanced techniques for efficient UI development.",
    coverImage: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7",
    date: "2024-02-19",
    author: "Jane Smith",
    category: "Design",
    tags: ["Tailwind", "CSS", "UI Design"],
    comments: [],
  },
];

const AdminBlog = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
  });
  const [blogs, setBlogs] = useState(FAKE_BLOGS);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.content.trim()) {
      toast.error("Please fill in all fields");
      return;
    }
    
    const newBlog = {
      id: String(blogs.length + 1),
      title: formData.title,
      description: formData.content,
      coverImage: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
      date: new Date().toISOString().split('T')[0],
      author: "Admin User",
      category: "General",
      tags: ["New"],
      comments: [],
    };
    
    setBlogs([newBlog, ...blogs]);
    toast.success("Blog post created successfully!");
    setIsDialogOpen(false);
    setFormData({ title: "", content: "" });
  };

  const BlogForm = ({ onSubmit }: { onSubmit: (e: React.FormEvent) => void }) => (
    <form onSubmit={onSubmit} className="space-y-6">
      <Input
        placeholder="Post Title"
        value={formData.title}
        onChange={(e) =>
          setFormData({ ...formData, title: e.target.value })
        }
        required
      />
      <div className="min-h-[400px]">
        <RichTextEditor
          onChange={(content) => setFormData({ ...formData, content })}
          initialContent={formData.content}
        />
      </div>
      <Button type="submit" className="w-full">
        Create Post
      </Button>
    </form>
  );

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Blog Posts</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New Post
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Create New Blog Post</DialogTitle>
            </DialogHeader>
            <BlogForm onSubmit={handleSubmit} />
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {blogs.map((blog) => (
          <BlogCard key={blog.id} {...blog} />
        ))}
      </div>
    </div>
  );
};

export default AdminBlog;