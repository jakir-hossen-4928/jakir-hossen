import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import { AdminDashboardLayout } from "@/components/admin-dashboard/AdminDashboardLayout";
import { UserDashboardLayout } from "@/components/user-dashboard/UserDashboardLayout";
import Loading from "@/components/ui/loading";
import PrivateRoute from "./privateRoute/PrivateRoute";
import AdminRoute from "./adminRoute/AdminRoute";

// Eagerly loaded components
import Index from "@/pages/Index";
import Login from "@/pages/Login";
import Dashboard from "@/pages/Dashboard";

// Lazy loaded components
const AdminDashboard = lazy(() => import("@/pages/AdminDashboard"));
const AdminProjects = lazy(() => import("@/pages/AdminProjects"));
const AdminBlog = lazy(() => import("@/pages/AdminBlog"));
const AdminUsers = lazy(() => import("@/pages/AdminUsers"));
const AdminBooks = lazy(() => import("@/pages/AdminBooks"));
const AdminAITools = lazy(() => import("@/pages/AdminAITools"));
const UserDashboard = lazy(() => import("@/pages/user/UserDashboard"));
const UserBlogs = lazy(() => import("@/pages/user/UserBlogs"));
const UserBooks = lazy(() => import("@/pages/user/UserBooks"));
const UserAITools = lazy(() => import("@/pages/user/UserAITools"));
const CreateBlog = lazy(() => import("@/pages/user/CreateBlog"));
const BlogDetails = lazy(() => import("@/pages/BlogDetails"));

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <Index />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/blog/:id",
    element: (
      <Suspense fallback={<Loading />}>
        <BlogDetails />
      </Suspense>
    ),
  },
  {
    path: "/admin",
    element: (
      <PrivateRoute>
        <AdminRoute>
          <AdminDashboardLayout />
        </AdminRoute>
      </PrivateRoute>
    ),
    children: [
      {
        path: "/admin",
        element: (
          <Suspense fallback={<Loading />}>
            <AdminDashboard />
          </Suspense>
        ),
      },
      {
        path: "/admin/projects",
        element: (
          <Suspense fallback={<Loading />}>
            <AdminProjects />
          </Suspense>
        ),
      },
      {
        path: "/admin/blog",
        element: (
          <Suspense fallback={<Loading />}>
            <AdminBlog />
          </Suspense>
        ),
      },
      {
        path: "/admin/users",
        element: (
          <Suspense fallback={<Loading />}>
            <AdminUsers />
          </Suspense>
        ),
      },
      {
        path: "/admin/books",
        element: (
          <Suspense fallback={<Loading />}>
            <AdminBooks />
          </Suspense>
        ),
      },
      {
        path: "/admin/ai-tools",
        element: (
          <Suspense fallback={<Loading />}>
            <AdminAITools />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "/user",
    element: (
      <PrivateRoute>
        <UserDashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        path: "/user",
        element: (
          <Suspense fallback={<Loading />}>
            <UserDashboard />
          </Suspense>
        ),
      },
      {
        path: "/user/blogs",
        element: (
          <Suspense fallback={<Loading />}>
            <UserBlogs />
          </Suspense>
        ),
      },
      {
        path: "/user/books",
        element: (
          <Suspense fallback={<Loading />}>
            <UserBooks />
          </Suspense>
        ),
      },
      {
        path: "/user/ai-tools",
        element: (
          <Suspense fallback={<Loading />}>
            <UserAITools />
          </Suspense>
        ),
      },
      {
        path: "/user/create-blog",
        element: (
          <Suspense fallback={<Loading />}>
            <CreateBlog />
          </Suspense>
        ),
      },
    ],
  },
]);