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
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

// Fake blog data for demonstration
const FAKE_BLOGS = [
  {
    id: 1,
    title: "Getting Started with React and TypeScript",
    content: "Learn how to set up a new React project with TypeScript...",
    date: "2024-02-20",
    author: "John Doe"
  },
  {
    id: 2,
    title: "Building Scalable APIs with Node.js",
    content: "Best practices for creating maintainable Node.js APIs...",
    date: "2024-02-19",
    author: "Jane Smith"
  }
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
    // Here you would typically save the blog post
    const newBlog = {
      id: blogs.length + 1,
      ...formData,
      date: new Date().toISOString().split('T')[0],
      author: "Current User"
    };
    setBlogs([newBlog, ...blogs]);
    toast.success("Blog post created successfully!");
    setIsDialogOpen(false);
    setFormData({ title: "", content: "" });
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
            <form onSubmit={handleSubmit} className="space-y-6">
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
                />
              </div>
              <Button type="submit" className="w-full">
                Create Post
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-6">
        {blogs.map((blog) => (
          <Card key={blog.id}>
            <CardHeader>
              <CardTitle>{blog.title}</CardTitle>
              <CardDescription>
                Published on {blog.date} by {blog.author}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                {blog.content.substring(0, 200)}...
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AdminBlog;