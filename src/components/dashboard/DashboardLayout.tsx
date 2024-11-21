import { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  Users,
  FileText,
  FolderKanban,
  Menu,
} from "lucide-react";
import { Sheet, SheetContent } from "@/components/ui/sheet";

const navigation = [
  { name: "Overview", href: "/admin", icon: LayoutDashboard },
  { name: "Projects", href: "/admin/projects", icon: FolderKanban },
  { name: "Blog", href: "/admin/blog", icon: FileText },
  { name: "Users", href: "/admin/users", icon: Users },
];

export const DashboardLayout = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isCurrentPath = (path: string) => {
    return location.pathname === path;
  };

  const NavLinks = () => (
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
            <span className="hidden md:inline">{item.name}</span>
          </Link>
        );
      })}
    </>
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile Menu Button */}
      <Button
        variant="ghost"
        size="icon"
        className="lg:hidden fixed top-4 left-4 z-50"
        onClick={() => setIsMobileMenuOpen(true)}
      >
        <Menu className="h-5 w-5" />
        <span className="sr-only">Toggle menu</span>
      </Button>

      {/* Mobile Navigation */}
      <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
        <SheetContent side="left" className="w-[240px] p-0">
          <div className="px-4 py-6 border-b">
            <h2 className="text-lg font-semibold text-primary">Admin Panel</h2>
          </div>
          <nav className="flex flex-col gap-1 p-4">
            <NavLinks />
          </nav>
        </SheetContent>
      </Sheet>

      {/* Desktop Navigation */}
      <div className="hidden lg:flex fixed inset-y-0 flex-col w-64 border-r">
        <div className="p-6 border-b">
          <h2 className="text-2xl font-bold text-primary">Admin Panel</h2>
        </div>
        <nav className="flex-1 space-y-1 p-4">
          <NavLinks />
        </nav>
      </div>

      {/* Main Content */}
      <div className="lg:pl-64 min-h-screen">
        <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
};