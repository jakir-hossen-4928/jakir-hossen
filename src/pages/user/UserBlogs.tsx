import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { PenSquare } from "lucide-react";

const UserBlogs = () => {
  const navigate = useNavigate();
  const [blogs] = useState([
    {
      id: 1,
      title: "My First Blog Post",
      content: "This is my first blog post content...",
      date: "2024-02-20",
    },
    {
      id: 2,
      title: "Learning React",
      content: "Today I learned about React hooks...",
      date: "2024-02-19",
    },
  ]);

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">My Blogs</h1>
        <Button onClick={() => navigate("/user/create-blog")}>
          <PenSquare className="mr-2 h-4 w-4" />
          Write New Blog
        </Button>
      </div>

      <div className="grid gap-6">
        {blogs.map((blog) => (
          <Card key={blog.id}>
            <CardHeader>
              <CardTitle>{blog.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Published on {blog.date}
              </p>
              <p className="text-muted-foreground">{blog.content}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default UserBlogs;