import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

const AdminRoute = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();
  const location = useLocation();

  if (!user?.isAdmin) {
    return <Navigate to="/dashboard" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default AdminRoute;