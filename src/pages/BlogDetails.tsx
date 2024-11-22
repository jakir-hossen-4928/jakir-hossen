import { useNavigate } from "react-router-dom";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const BlogDetails = () => {
  const navigate = useNavigate();

  return (
    <DashboardLayout>
      <div className="p-4">
        <Button
          variant="ghost"
          className="mb-4"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <h1 className="text-2xl font-bold">Blog Title</h1>
        <p className="mt-2 text-gray-700">This is the content of the blog.</p>
      </div>
    </DashboardLayout>
  );
};

export default BlogDetails;
