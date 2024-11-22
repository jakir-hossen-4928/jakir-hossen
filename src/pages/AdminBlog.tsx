import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import JoditEditor from "jodit-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { BlogCard } from "@/components/blog/BlogCard";
import { Plus } from "lucide-react";

const AdminBlog = () => {
  const navigate = useNavigate();
  const editor = useRef(null);
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
      comments: [],
    },
  ]);

  const [newBlog, setNewBlog] = useState({
    title: "",
    content: "",
    coverImage: "",
    category: "",
    tags: [] as string[],
    author: "Admin User",
  });

  const [newTag, setNewTag] = useState("");

  const handleAddTag = () => {
    if (newTag.trim()) {
      setNewBlog({
        ...newBlog,
        tags: [...newBlog.tags, newTag.trim()],
      });
      setNewTag("");
    }
  };

  const handleCreateBlog = () => {
    if (!newBlog.title.trim() || !newBlog.content.trim()) {
      toast.error("Please fill in all required fields");
      return;
    }

    const blog = {
      id: String(blogs.length + 1),
      ...newBlog,
      date: new Date().toISOString().split('T')[0],
      comments: [],
    };

    setBlogs([blog, ...blogs]);
    setNewBlog({
      title: "",
      content: "",
      coverImage: "",
      category: "",
      tags: [],
      author: "Admin User",
    });
    setIsDialogOpen(false);
    toast.success("Blog post created successfully!");
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
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">Title</label>
                <Input
                  value={newBlog.title}
                  onChange={(e) => setNewBlog({ ...newBlog, title: e.target.value })}
                  placeholder="Enter blog title"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Cover Image URL</label>
                <Input
                  value={newBlog.coverImage}
                  onChange={(e) => setNewBlog({ ...newBlog, coverImage: e.target.value })}
                  placeholder="Enter cover image URL"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Category</label>
                <Input
                  value={newBlog.category}
                  onChange={(e) => setNewBlog({ ...newBlog, category: e.target.value })}
                  placeholder="Enter blog category"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Content</label>
                <JoditEditor
                  ref={editor}
                  value={newBlog.content}
                  onChange={content => setNewBlog({ ...newBlog, content })}
                  config={{
                    readonly: false,
                    height: 500,
                    buttons: [
                      'source', '|',
                      'bold', 'italic', 'underline', '|',
                      'ul', 'ol', '|',
                      'font', 'fontsize', 'brush', 'paragraph', '|',
                      'image', 'table', 'link', '|',
                      'left', 'center', 'right', 'justify', '|',
                      'undo', 'redo', '|',
                      'hr', 'eraser', 'fullsize',
                    ],
                  }}
                />
              </div>

              <Button onClick={handleCreateBlog} className="w-full">
                Create Post
              </Button>
            </div>
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