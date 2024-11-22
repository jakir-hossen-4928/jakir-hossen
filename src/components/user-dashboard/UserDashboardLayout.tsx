// Move content from src/components/dashboard/UserDashboardLayout.tsx
import { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import {
  LayoutDashboard,
  BookOpen,
  FileText,
  PenSquare,
  Menu,
  LogOut,
  Bot,
} from "lucide-react";
import { Sheet, SheetContent } from "@/components/ui/sheet";

const navigation = [
  { name: "Overview", href: "/user", icon: LayoutDashboard },
  { name: "Blogs", href: "/user/blogs", icon: FileText },
  { name: "Books", href: "/user/books", icon: BookOpen },
  { name: "AI Tools", href: "/user/ai-tools", icon: Bot },
  { name: "Create Blog", href: "/user/create-blog", icon: PenSquare },
];

export const UserDashboardLayout = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { logout } = useAuth();

  const isCurrentPath = (path: string) => {
    return location.pathname === path;
  };

  const NavLinks = ({ showLabels = true }) => (
    <>
      {navigation.map((item) => {
        const Icon = item.icon;
        return (
          <Link
            key={item.name}
            to={item.href}
            onClick={() => setIsMobileMenuOpen(false)}
            className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
              isCurrentPath(item.href)
                ? "bg-primary text-primary-foreground"
                : "hover:bg-accent"
            }`}
          >
            <Icon className="h-5 w-5" />
            {showLabels && <span>{item.name}</span>}
          </Link>
        );
      })}
    </>
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="flex items-center justify-between lg:hidden fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4 py-2 border-b">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsMobileMenuOpen(true)}
        >
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
        <Button
          variant="ghost"
          onClick={logout}
          className="flex items-center gap-2"
        >
          <LogOut className="h-5 w-5" />
          <span>Logout</span>
        </Button>
      </div>

      <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
        <SheetContent side="left" className="w-[240px] p-0">
          <div className="px-4 py-6 border-b">
            <h2 className="text-lg font-semibold text-primary">Dashboard</h2>
          </div>
          <nav className="flex flex-col gap-1 p-4">
            <NavLinks showLabels={true} />
          </nav>
        </SheetContent>
      </Sheet>

      <div className="hidden lg:flex fixed inset-y-0 flex-col w-64 border-r">
        <div className="p-6 border-b">
          <h2 className="text-2xl font-bold text-primary">Dashboard</h2>
        </div>
        <nav className="flex-1 space-y-1 p-4">
          <NavLinks showLabels={true} />
        </nav>
        <div className="p-4 border-t">
          <Button
            variant="ghost"
            onClick={logout}
            className="w-full flex items-center gap-2 justify-center"
          >
            <LogOut className="h-5 w-5" />
            <span>Logout</span>
          </Button>
        </div>
      </div>

      <div className="lg:pl-64 min-h-screen pt-14 lg:pt-0">
        <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
};