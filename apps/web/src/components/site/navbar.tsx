import { Link, useNavigate } from "@tanstack/react-router";
import { Sparkles, LogOut, User as UserIcon, Menu } from "lucide-react";
import { useEffect, useState } from "react";
import { getUser, setUser, type User } from "@/lib/course-store";
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

function useUser() {
  const [user, setLocal] = useState<User | null>(null);
  useEffect(() => {
    setLocal(getUser());
    const h = () => setLocal(getUser());
    window.addEventListener("coursegen:user", h);
    window.addEventListener("storage", h);
    return () => {
      window.removeEventListener("coursegen:user", h);
      window.removeEventListener("storage", h);
    };
  }, []);
  return user;
}

function initialsOf(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
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
          ? "backdrop-blur-xl bg-background/70 border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Logo />
        <nav className="hidden items-center gap-8 md:flex">
          <a
            href="#how"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            How it works
          </a>
          <a
            href="#features"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Features
          </a>
          <a
            href="#example"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Example
          </a>
        </nav>
        <div className="hidden items-center gap-2 md:flex">
          <Button variant="ghost" size="lg">
            <Link to="/auth/login">Login</Link>
          </Button>
          <Button size="lg">
            <Link to="/auth/signup">Get started</Link>
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
                <Link to="/auth/login">Login</Link>
              </Button>
              <Button>
                <Link to="/auth/signup">Get started</Link>
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}

export function AppNavbar() {
  const user = useUser();
  const navigate = useNavigate();

  const logout = () => {
    setUser(null);
    navigate({ to: "/" });
  };

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
        <div className="flex items-center gap-8">
          <Logo />
          <nav className="hidden items-center gap-6 md:flex">
            <Link
              to="/"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              activeProps={{ className: "text-sm text-foreground font-medium" }}
            >
              My courses
            </Link>
            <Link
              to="/"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              activeProps={{ className: "text-sm text-foreground font-medium" }}
            >
              Generate
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-3">
          <Button size="sm" className="hidden sm:inline-flex">
            <Link to="/">+ New course</Link>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <button className="grid h-9 w-9 place-items-center rounded-full bg-elevated text-sm font-semibold ring-1 ring-border hover:ring-primary/40 transition">
                {user ? (
                  initialsOf(user.name)
                ) : (
                  <UserIcon className="h-4 w-4" />
                )}
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-56 bg-card border-border"
            >
              {user ? (
                <>
                  <DropdownMenuLabel className="flex flex-col">
                    <span className="text-sm font-medium">{user.name}</span>
                    <span className="text-xs text-muted-foreground">
                      {user.email}
                    </span>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout}>
                    <LogOut className="mr-2 h-4 w-4" /> Log out
                  </DropdownMenuItem>
                </>
              ) : (
                <>
                  <DropdownMenuItem onClick={() => navigate({ to: "/" })}>
                    Login
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate({ to: "/" })}>
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
