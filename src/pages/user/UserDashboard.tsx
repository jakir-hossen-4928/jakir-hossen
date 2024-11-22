import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, BookOpen } from "lucide-react";

const stats = [
  {
    name: "Your Blogs",
    value: "3",
    icon: FileText,
    change: "Published this month",
  },
  {
    name: "Available Books",
    value: "24",
    icon: BookOpen,
    change: "In the library",
  },
];

const UserDashboard = () => {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Welcome to Your Dashboard</h1>

      <div className="grid gap-4 md:grid-cols-2">
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
                  {stat.change}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default UserDashboard;