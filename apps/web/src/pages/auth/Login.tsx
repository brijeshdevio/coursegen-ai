import { useState } from "react";
import { Link } from "react-router-dom";
import { Brain, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Placeholder for login logic
    setTimeout(() => setIsLoading(false), 1000);
  };

  return (
    <div className="flex min-h-screen bg-background">
      {/* Left Pane - Branding (Desktop only) */}
      <div className="relative hidden w-1/2 flex-col justify-between overflow-hidden bg-primary/5 p-12 lg:flex">
        {/* Decorative Background */}
        <div className="absolute inset-0 dark:bg-[radial-gradient(ellipse_70%_70%_at_50%_-20%,rgba(124,58,237,0.25),rgba(0,0,0,0))]"></div>

        <div className="relative z-10">
          <Link
            to="/"
            className="flex items-center gap-2 text-2xl font-bold tracking-tight text-foreground transition-opacity hover:opacity-90"
          >
            <div className="flex size-10 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
              <Brain className="size-6" />
            </div>
            CourseGen AI
          </Link>
        </div>

        <div className="relative z-10 max-w-md">
          <h1 className="mb-6 text-4xl font-bold tracking-tight text-foreground">
            Welcome back to your learning dashboard.
          </h1>
          <p className="text-lg leading-relaxed text-muted-foreground">
            Pick up right where you left off, or generate a brand new course in
            seconds.
          </p>
        </div>

        <div className="relative z-10">
          <p className="text-sm font-medium text-foreground">
            Your personal curriculum awaits.
          </p>
        </div>
      </div>

      {/* Right Pane - Form */}
      <div className="flex w-full flex-col justify-center px-8 sm:px-12 md:px-24 lg:w-1/2">
        {/* Mobile Header (Hidden on Desktop) */}
        <div className="mb-12 flex items-center justify-center lg:hidden">
          <Link
            to="/"
            className="flex items-center gap-2 text-2xl font-bold tracking-tight"
          >
            <div className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm">
              <Brain className="size-5" />
            </div>
            CourseGen AI
          </Link>
        </div>

        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-bold tracking-tight">Log in</h1>
            <p className="text-sm text-muted-foreground">
              Enter your email and password to access your account
            </p>
          </div>

          <form onSubmit={onSubmit} className="grid gap-5">
            <div className="grid gap-2">
              <label
                htmlFor="email"
                className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="name@example.com"
                autoCapitalize="none"
                autoComplete="email"
                autoCorrect="off"
                disabled={isLoading}
                required
                className="flex h-10 w-full rounded-md border-input px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:font-medium placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>

            <div className="grid gap-2">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Password
                </label>
                <Link
                  to="/forgot-password"
                  className="text-xs font-medium text-primary underline-offset-4 hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                autoComplete="current-password"
                disabled={isLoading}
                required
                className="flex h-10 w-full rounded-md border-input px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:font-medium placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>

            <Button
              disabled={isLoading}
              className="mt-2 w-full font-medium"
              type="submit"
            >
              {isLoading ? (
                <div className="mr-2 size-4 animate-spin rounded-full border-2 border-primary-foreground border-r-transparent"></div>
              ) : null}
              Sign in
              {!isLoading && <ArrowRight className="ml-2 size-4" />}
            </Button>
          </form>

          <p className="px-8 text-center text-sm text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Link
              to="/signup"
              className="underline-offset-4 transition-colors hover:text-primary hover:underline"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
