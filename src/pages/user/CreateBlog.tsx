import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import JoditEditor from "jodit-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Tag {
  id: string;
  text: string;
}

const CreateBlog = () => {
  const navigate = useNavigate();
  const editor = useRef(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState<Tag[]>([]);
  const [newTag, setNewTag] = useState("");

  const handleAddTag = () => {
    if (newTag.trim()) {
      setTags([...tags, { id: Date.now().toString(), text: newTag.trim() }]);
      setNewTag("");
    }
  };

  const handleRemoveTag = (tagId: string) => {
    setTags(tags.filter((tag) => tag.id !== tagId));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim() || !content.trim() || !category.trim()) {
      toast.error("Please fill in all required fields");
      return;
    }

    // Here you would typically save the blog post
    console.log("Saving blog post:", { 
      title, 
      content, 
      coverImage, 
      category, 
      tags: tags.map(tag => tag.text) 
    });
    
    toast.success("Blog post created successfully!");
    navigate("/user/blogs");
  };

  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-3xl font-bold">Create New Blog Post</CardTitle>
      </CardHeader>

      <CardContent>
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
            <label htmlFor="coverImage" className="text-sm font-medium">
              Cover Image URL
            </label>
            <Input
              id="coverImage"
              value={coverImage}
              onChange={(e) => setCoverImage(e.target.value)}
              placeholder="Enter cover image URL"
            />
            {coverImage && (
              <div className="mt-2 relative h-48 rounded-lg overflow-hidden">
                <img
                  src={coverImage}
                  alt="Cover preview"
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="category" className="text-sm font-medium">
              Category
            </label>
            <Input
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="Enter blog category"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Tags</label>
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
            <div className="flex flex-wrap gap-2 mt-2">
              {tags.map((tag) => (
                <span
                  key={tag.id}
                  className="bg-accent/10 text-accent px-3 py-1 rounded-full text-sm flex items-center gap-2"
                >
                  {tag.text}
                  <button
                    type="button"
                    onClick={() => handleRemoveTag(tag.id)}
                    className="hover:text-red-500"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Content</label>
            <JoditEditor
              ref={editor}
              value={content}
              onChange={newContent => setContent(newContent)}
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
                enableDragAndDropFileToEditor: true,
                askBeforePasteHTML: false,
                askBeforePasteFromWord: false,
                defaultActionOnPaste: 'insert_clear_html',
                removeButtons: ['about'],
                showXPathInStatusbar: false,
                showCharsCounter: false,
                showWordsCounter: false,
                toolbarAdaptive: false,
              }}
            />
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
      </CardContent>
    </Card>
  );
};

export default CreateBlog;