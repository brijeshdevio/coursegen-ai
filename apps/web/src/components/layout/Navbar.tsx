import { Sparkles, LogOut, User as UserIcon, Menu } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link to="/" className={`flex items-center gap-2 ${className}`}>
      <span className="grid h-8 w-8 place-items-center rounded-lg bg-primary/15 text-primary ring-1 ring-primary/30">
        <Sparkles className="h-4 w-4" />
      </span>
      <span className="font-display text-lg font-bold tracking-tight">
        CourseGen <span className="text-primary">AI</span>
      </span>
    </Link>
  );
}

export function MarketingNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 transition-all ${
        scrolled
          ? "border-b border-border bg-background/70 backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Logo />
        <nav className="hidden items-center gap-8 md:flex">
          <a
            href="#how"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            How it works
          </a>
          <a
            href="#features"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            Features
          </a>
          <a
            href="#example"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            Example
          </a>
        </nav>
        <div className="hidden items-center gap-2 md:flex">
          <Button variant="ghost" size="lg">
            <Link to="/login">Login</Link>
          </Button>
          <Button size="lg">
            <Link to="/signup">Get started</Link>
          </Button>
        </div>
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="border-border bg-card">
            <SheetHeader>
              <SheetTitle>
                <Logo />
              </SheetTitle>
            </SheetHeader>
            <div className="mt-8 flex flex-col gap-3">
              <a
                href="#how"
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-2 hover:bg-elevated"
              >
                How it works
              </a>
              <a
                href="#features"
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-2 hover:bg-elevated"
              >
                Features
              </a>
              <a
                href="#example"
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-2 hover:bg-elevated"
              >
                Example
              </a>
              <Button variant="outline">
                <Link to="/login">Login</Link>
              </Button>
              <Button>
                <Link to="/signup">Get started</Link>
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}

export function AppNavbar() {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();

  const getActiveStyle = (isActive: boolean = false): string => {
    return isActive
      ? "text-sm text-foreground font-medium"
      : "text-sm text-muted-foreground transition-colors hover:text-foreground";
  };

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
        <div className="flex items-center gap-8">
          <Logo />
          <nav className="hidden items-center gap-6 md:flex">
            <NavLink
              to="/courses"
              className={({ isActive }) => getActiveStyle(isActive)}
            >
              My courses
            </NavLink>
            <NavLink
              to="/courses/generate"
              className={({ isActive }) => getActiveStyle(isActive)}
            >
              Generate
            </NavLink>
          </nav>
        </div>
        <div className="flex items-center gap-3">
          <Button size="sm" className="hidden sm:inline-flex">
            <Link to="/courses/generate">+ New course</Link>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <button className="grid h-9 w-9 place-items-center rounded-full bg-elevated text-sm font-semibold ring-1 ring-border transition hover:ring-primary/40">
                <UserIcon className="h-4 w-4" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-56 border-border bg-card"
            >
              {isAuthenticated ? (
                <>
                  <DropdownMenuLabel className="flex flex-col">
                    <span className="text-sm font-medium">{user?.name}</span>
                    <span className="text-xs text-muted-foreground">
                      {user?.email}
                    </span>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <LogOut className="mr-2 h-4 w-4" /> Log out
                  </DropdownMenuItem>
                </>
              ) : (
                <>
                  <DropdownMenuItem onClick={() => navigate("/login")}>
                    Login
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate("/signup")}>
                    Sign up
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
