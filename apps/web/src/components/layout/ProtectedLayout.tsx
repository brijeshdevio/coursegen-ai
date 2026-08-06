import { Outlet, Link } from "react-router-dom";
import { Logo } from "@/assets/Logo";
import { Button } from "@/components/ui/button";

export function ProtectedLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
        <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <Logo />
          <nav className="flex items-center gap-4">
            <Link to="/courses">
              <Button variant="ghost" className="rounded-full font-medium">
                Courses
              </Button>
            </Link>
          </nav>
        </div>
      </header>

      <main className="container mx-auto max-w-7xl flex-1 px-6 py-12 lg:py-20">
        <Outlet />
      </main>

      <footer className="border-t border-border bg-background py-8">
        <div className="container mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 text-sm text-muted-foreground md:flex-row">
          <div>
            &copy; {new Date().getFullYear()} CourseGen AI. All rights reserved.
          </div>
          <div className="flex gap-6">
            <Link to="#" className="transition-colors hover:text-foreground">
              Terms
            </Link>
            <Link to="#" className="transition-colors hover:text-foreground">
              Privacy
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
