import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";

const AdminDashboard = () => {
  const { logout } = useAuth();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <Button onClick={logout} variant="destructive">
          Logout
        </Button>
      </div>
      <div className="grid gap-6">
        {/* Add your admin dashboard content here */}
        <div className="p-6 bg-card rounded-lg shadow">
          <h2 className="text-2xl font-semibold mb-4">Welcome to Admin Dashboard</h2>
          <p>This is a protected admin area.</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;