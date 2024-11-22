import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { PenSquare } from "lucide-react";
import { BlogCard } from "@/components/blog/BlogCard";
import { SearchBar } from "@/components/SearchBar";

const UserBlogs = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [blogs] = useState([
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
  ]);

  const filteredBlogs = blogs.filter(blog =>
    blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    blog.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    blog.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    blog.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">My Blogs</h1>
        <Button onClick={() => navigate("/user/create-blog")}>
          <PenSquare className="mr-2 h-4 w-4" />
          Write New Blog
        </Button>
      </div>

      <SearchBar 
        value={searchQuery}
        onChange={setSearchQuery}
        placeholder="Search blogs..."
      />

      <div className="grid gap-6 md:grid-cols-2">
        {filteredBlogs.map((blog) => (
          <BlogCard key={blog.id} {...blog} />
        ))}
      </div>
    </div>
  );
};

export default UserBlogs;