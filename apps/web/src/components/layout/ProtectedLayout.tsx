import { Outlet, Navigate, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Home,
  BookOpen,
  Sparkles,
  Settings,
  User,
  LogOut,
  Bell,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Loading } from "../loading";

const sidebarItems = [
  { to: "/courses", icon: Home, label: "Dashboard", end: true },
  { to: "/courses", icon: BookOpen, label: "My Courses", end: true },
  {
    to: "/courses/generate",
    icon: Sparkles,
    label: "Generate Course",
    accent: true,
  },
  { to: "/settings", icon: Settings, label: "Settings" },
  { to: "/profile", icon: User, label: "Profile" },
];

export function ProtectedLayout() {
  const { isAuthenticated, isLoading, user } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (isLoading) {
    return <Loading />;
  }

  if (!isAuthenticated) {
    return <Navigate to={"/auth/login"} />;
  }

  const initials = user?.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "U";

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/auth/login";
  };

  return (
    <TooltipProvider>
      <div className="flex min-h-screen bg-background">
        {/* Mobile sidebar overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-40 bg-black/50 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <aside
          className={cn(
            "fixed inset-y-0 left-0 z-50 flex w-[240px] flex-col border-r border-border bg-card transition-transform duration-200 lg:translate-x-0",
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          )}
        >
          {/* Sidebar header / Logo */}
          <div className="flex h-16 shrink-0 items-center gap-2 border-b border-border px-6">
            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary font-display text-sm font-bold text-primary-foreground">
              CG
            </div>
            <span className="font-display text-lg font-bold tracking-tight">
              CourseGen AI
            </span>
          </div>

          {/* Nav items */}
          <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
            {sidebarItems.map((item) => (
              <Tooltip key={item.label}>
                <TooltipTrigger>
                  <NavLink
                    to={item.to}
                    end={item.end}
                    onClick={() => setSidebarOpen(false)}
                    className={({ isActive }) =>
                      cn(
                        "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                        isActive
                          ? "bg-primary/10 text-primary"
                          : "text-muted-foreground hover:bg-muted hover:text-foreground",
                        item.accent &&
                          !isActive &&
                          "text-primary hover:bg-primary/10"
                      )
                    }
                  >
                    <item.icon className="h-5 w-5 shrink-0" />
                    <span>{item.label}</span>
                  </NavLink>
                </TooltipTrigger>
                <TooltipContent side="right" className="lg:hidden">
                  {item.label}
                </TooltipContent>
              </Tooltip>
            ))}
          </nav>

          {/* Logout at bottom */}
          <div className="shrink-0 border-t border-border px-3 py-4">
            <button
              onClick={handleLogout}
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
            >
              <LogOut className="h-5 w-5 shrink-0" />
              <span>Logout</span>
            </button>
          </div>
        </aside>

        {/* Main area (offset by sidebar) */}
        <div className="flex min-h-screen flex-1 flex-col lg:ml-[240px]">
          {/* Top Header */}
          <header className="sticky top-0 z-30 flex h-16 shrink-0 items-center justify-between border-b border-border bg-background/80 px-6 backdrop-blur-md">
            <div className="flex items-center gap-4">
              {/* Mobile menu toggle */}
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="-ml-2 rounded-lg p-2 transition-colors hover:bg-muted lg:hidden"
              >
                {sidebarOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </button>
            </div>

            <div className="flex items-center gap-3">
              {/* Notification bell */}
              <Tooltip>
                <TooltipTrigger>
                  <button className="relative rounded-lg p-2 transition-colors hover:bg-muted">
                    <Bell className="h-5 w-5 text-muted-foreground" />
                    <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-primary" />
                  </button>
                </TooltipTrigger>
                <TooltipContent>Notifications</TooltipContent>
              </Tooltip>

              {/* User avatar dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <button className="flex items-center gap-2 rounded-lg p-1 transition-colors hover:bg-muted">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-primary/10 text-sm font-semibold text-primary">
                        {initials}
                      </AvatarFallback>
                    </Avatar>
                    <span className="hidden max-w-[120px] truncate text-sm font-medium md:inline-block">
                      {user?.name}
                    </span>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem onClick={() => navigate("/profile")}>
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate("/settings")}>
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="text-destructive"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </header>

          {/* Page content */}
          <main className="flex-1 p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </TooltipProvider>
  );
}
