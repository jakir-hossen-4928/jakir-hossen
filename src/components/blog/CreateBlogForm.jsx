import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RichTextEditor } from "@/components/editor/RichTextEditor";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const formSchema = {
  name: z.string().min(3, "Name must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  logoUrl: z.string().url("Please enter a valid URL"),
  websiteUrl: z.string().url("Please enter a valid URL"),
  category: z.string().min(2, "Category is required"),
};

export const CreateBlogForm = ({ onSubmit }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState([]);
  const [newTag, setNewTag] = useState("");

  const handleAddTag = () => {
    if (newTag.trim()) {
      setTags([...tags, newTag.trim()]);
      setNewTag("");
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim() || !content.trim() || !category.trim()) {
      toast.error("Please fill in all required fields");
      return;
    }

    onSubmit({
      title,
      content,
      coverImage,
      category,
      tags,
    });

    setTitle("");
    setContent("");
    setCoverImage("");
    setCategory("");
    setTags([]);
    toast.success("Blog post created successfully!");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter blog title"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="coverImage">Cover Image URL</Label>
        <Input
          id="coverImage"
          value={coverImage}
          onChange={(e) => setCoverImage(e.target.value)}
          placeholder="Enter cover image URL"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="category">Category</Label>
        <Input
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="Enter blog category"
          required
        />
      </div>

      <div className="space-y-2">
        <Label>Tags</Label>
        <div className="flex gap-2">
          <Input
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            placeholder="Add a tag"
            onKeyPress={(e) => e.key === 'Enter' && handleAddTag()}
          />
          <Button type="button" onClick={handleAddTag}>
            Add Tag
          </Button>
        </div>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <span key={index} className="bg-accent/10 text-accent px-3 py-1 rounded-full flex items-center">
              {tag}
              <button type="button" onClick={() => handleRemoveTag(tag)} className="ml-1 hover:text-red-500">×</button>
            </span>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <Label>Content</Label>
        <RichTextEditor onChange={setContent} initialContent={content} />
      </div>

      <Button type="submit" className="w-full">Create Post</Button>
    </form>
  );
};
