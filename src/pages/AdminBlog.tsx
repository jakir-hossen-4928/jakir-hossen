import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { BlogCard } from "@/components/blog/BlogCard";
import { CreateBlogForm } from "@/components/blog/CreateBlogForm";

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
  const [blogs, setBlogs] = useState(FAKE_BLOGS);

  const handleCreateBlog = (blogData: any) => {
    const newBlog = {
      id: String(blogs.length + 1),
      ...blogData,
      date: new Date().toISOString().split('T')[0],
      comments: [],
    };
    
    setBlogs([newBlog, ...blogs]);
    toast.success("Blog post created successfully!");
    setIsDialogOpen(false);
  };

  const handleDeleteBlog = (blogId: string) => {
    setBlogs(blogs.filter(blog => blog.id !== blogId));
    toast.success("Blog post deleted successfully!");
  };

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
            <CreateBlogForm onSubmit={handleCreateBlog} />
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {blogs.map((blog) => (
          <div key={blog.id} className="relative group">
            <BlogCard {...blog} />
            <Button
              variant="destructive"
              size="icon"
              className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={() => handleDeleteBlog(blog.id)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminBlog;