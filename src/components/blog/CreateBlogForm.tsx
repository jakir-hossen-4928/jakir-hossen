import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RichTextEditor } from "@/components/editor/RichTextEditor";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

interface CreateBlogFormProps {
  onSubmit: (blogData: any) => void;
}

export const CreateBlogForm = ({ onSubmit }: CreateBlogFormProps) => {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    coverImage: "",
    category: "",
    tags: [] as string[],
    author: "Admin User", // This could be dynamic based on the logged-in user
  });

  const [newTag, setNewTag] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title.trim() || !formData.content.trim()) {
      toast.error("Please fill in all required fields");
      return;
    }

    onSubmit(formData);
    setFormData({
      title: "",
      content: "",
      coverImage: "",
      category: "",
      tags: [],
      author: "Admin User",
    });
  };

  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && newTag.trim()) {
      e.preventDefault();
      setFormData({
        ...formData,
        tags: [...formData.tags, newTag.trim()]
      });
      setNewTag("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter(tag => tag !== tagToRemove)
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          placeholder="Enter blog title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="coverImage">Cover Image URL</Label>
        <Input
          id="coverImage"
          placeholder="Enter cover image URL"
          value={formData.coverImage}
          onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="category">Category</Label>
        <Input
          id="category"
          placeholder="Enter blog category"
          value={formData.category}
          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="tags">Tags (Press Enter to add)</Label>
        <Input
          id="tags"
          placeholder="Add tags"
          value={newTag}
          onChange={(e) => setNewTag(e.target.value)}
          onKeyPress={handleAddTag}
        />
        <div className="flex flex-wrap gap-2 mt-2">
          {formData.tags.map((tag, index) => (
            <span
              key={index}
              className="bg-accent/10 text-accent px-3 py-1 rounded-full text-sm flex items-center gap-2"
            >
              {tag}
              <button
                type="button"
                onClick={() => removeTag(tag)}
                className="hover:text-destructive"
              >
                ×
              </button>
            </span>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <Label>Content</Label>
        <div className="min-h-[400px]">
          <RichTextEditor
            onChange={(content) => setFormData({ ...formData, content })}
            initialContent={formData.content}
          />
        </div>
      </div>

      <Button type="submit" className="w-full">
        Create Post
      </Button>
    </form>
  );
};