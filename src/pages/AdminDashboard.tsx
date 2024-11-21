import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Users, FileText, FolderKanban } from "lucide-react";

const stats = [
  {
    name: "Total Projects",
    value: "12",
    icon: FolderKanban,
    change: "+2",
  },
  {
    name: "Active Users",
    value: "450",
    icon: Users,
    change: "+23",
  },
  {
    name: "Blog Posts",
    value: "8",
    icon: FileText,
    change: "+1",
  },
  {
    name: "Total Views",
    value: "1,234",
    icon: BarChart,
    change: "+201",
  },
];

const AdminDashboard = () => {
  const { logout } = useAuth();

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="hidden md:block text-3xl font-bold">Dashboard Overview</h1>
        <Button onClick={logout} variant="destructive">
          Logout
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.name}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.name}
                </CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">
                  {stat.change} from last month
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default AdminDashboard;