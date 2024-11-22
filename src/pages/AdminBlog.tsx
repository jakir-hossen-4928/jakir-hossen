import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import { BlogCard } from "@/components/blog/BlogCard";
import { CreateBlogForm } from "@/components/blog/CreateBlogForm";

const AdminBlog = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [blogs, setBlogs] = useState([
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
          authorImage: "https://api.dicebear.com/7.x/avatars/svg?seed=Jane",
          date: "2024-02-21",
        },
      ],
    },
  ]);

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
          <BlogCard 
            key={blog.id} 
            {...blog} 
            isAdmin={true}
            onDelete={handleDeleteBlog}
          />
        ))}
      </div>
    </div>
  );
};

export default AdminBlog;