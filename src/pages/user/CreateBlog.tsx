import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { RichTextEditor } from "@/components/editor/RichTextEditor";

const CreateBlog = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim() || !content.trim()) {
      toast.error("Please fill in all fields");
      return;
    }

    // Here you would typically save the blog post
    console.log("Saving blog post:", { title, content });
    toast.success("Blog post created successfully!");
    navigate("/user/blogs");
  };

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Create New Blog Post</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label htmlFor="title" className="text-sm font-medium">
            Title
          </label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter your blog title"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Content</label>
          <div className="min-h-[400px]">
            <RichTextEditor
              onChange={setContent}
              initialContent={content}
            />
          </div>
        </div>

        <div className="flex gap-4">
          <Button type="submit">Publish Post</Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate("/user/blogs")}
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateBlog;