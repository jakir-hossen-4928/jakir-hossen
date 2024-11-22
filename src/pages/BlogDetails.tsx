import { useParams } from "react-router-dom";
import { BlogCard } from "@/components/blog/BlogCard";
import { useState } from "react";

const BlogDetails = () => {
  const { id } = useParams();
  const [blog] = useState({
    id: "1",
    title: "Getting Started with React and TypeScript",
    description: "Learn how to set up a new React project with TypeScript and build your first component. We'll cover the basics of TypeScript and how it can improve your React development experience.",
    content: "Full blog content here...",
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
  });

  console.log("Viewing blog with ID:", id);

  return (
    <div className="container mx-auto px-4 py-8">
      <BlogCard {...blog} isDetailView={true} />
    </div>
  );
};

export default BlogDetails;