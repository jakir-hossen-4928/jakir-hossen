import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";
import { AuthProvider } from "@/context/AuthContext";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { UserDashboardLayout } from "@/components/dashboard/UserDashboardLayout";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import AdminDashboard from "./pages/AdminDashboard";
import AdminProjects from "./pages/AdminProjects";
import AdminBlog from "./pages/AdminBlog";
import AdminUsers from "./pages/AdminUsers";
import AdminBooks from "./pages/AdminBooks";
import AdminAITools from "./pages/AdminAITools";
import UserDashboard from "./pages/user/UserDashboard";
import UserBlogs from "./pages/user/UserBlogs";
import UserBooks from "./pages/user/UserBooks";
import UserAITools from "./pages/user/UserAITools";
import CreateBlog from "./pages/user/CreateBlog";
import BlogDetails from "./pages/BlogDetails";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <AuthProvider>
        <TooltipProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<Login />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/blog/:id" element={<BlogDetails />} />
              <Route element={<DashboardLayout />}>
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/admin/projects" element={<AdminProjects />} />
                <Route path="/admin/blog" element={<AdminBlog />} />
                <Route path="/admin/users" element={<AdminUsers />} />
                <Route path="/admin/books" element={<AdminBooks />} />
                <Route path="/admin/ai-tools" element={<AdminAITools />} />
              </Route>
              <Route element={<UserDashboardLayout />}>
                <Route path="/user" element={<UserDashboard />} />
                <Route path="/user/blogs" element={<UserBlogs />} />
                <Route path="/user/books" element={<UserBooks />} />
                <Route path="/user/ai-tools" element={<UserAITools />} />
                <Route path="/user/create-blog" element={<CreateBlog />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </ThemeProvider>
    <Sonner />
  </QueryClientProvider>
);

export default App;