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
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState<any>(null);
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

  const handleEdit = (blog: any) => {
    setSelectedBlog(blog);
    setFormData({
      title: blog.title,
      content: blog.content,
    });
    setIsEditDialogOpen(true);
  };

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.content.trim()) {
      toast.error("Please fill in all fields");
      return;
    }

    const updatedBlogs = blogs.map((blog) =>
      blog.id === selectedBlog.id
        ? {
            ...blog,
            title: formData.title,
            content: formData.content,
          }
        : blog
    );

    setBlogs(updatedBlogs);
    toast.success("Blog post updated successfully!");
    setIsEditDialogOpen(false);
    setSelectedBlog(null);
    setFormData({ title: "", content: "" });
  };

  const BlogForm = ({ onSubmit, isEdit = false }: { onSubmit: (e: React.FormEvent) => void, isEdit?: boolean }) => (
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
        {isEdit ? "Update Post" : "Create Post"}
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

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Blog Post</DialogTitle>
          </DialogHeader>
          <BlogForm onSubmit={handleUpdate} isEdit />
        </DialogContent>
      </Dialog>

      <div className="grid gap-6">
        {blogs.map((blog) => (
          <Card key={blog.id} className="relative">
            <CardHeader>
              <CardTitle>{blog.title}</CardTitle>
              <CardDescription>
                Published on {blog.date} by {blog.author}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-muted-foreground" dangerouslySetInnerHTML={{ __html: blog.content }} />
              <Button 
                variant="outline" 
                className="mt-4"
                onClick={() => handleEdit(blog)}
              >
                Edit Post
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AdminBlog;