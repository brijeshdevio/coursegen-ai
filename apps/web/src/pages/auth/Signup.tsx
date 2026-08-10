import { Link } from "react-router-dom";
import { useSignupFacade } from "@/features/auth/hooks/useSignup";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, CheckCircle2, Loader2, Zap } from "lucide-react";
import { Logo } from "@/assets/Logo";

export default function Signup() {
  const { handleSubmit, submit, register, errors, isPending, isSuccess } =
    useSignupFacade();

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      {/* Left Panel: Brand Panel */}
      <div className="relative hidden flex-col justify-between overflow-hidden bg-zinc-950 p-10 text-zinc-50 lg:flex">
        {/* Subtle background glow */}
        <div className="pointer-events-none absolute top-0 left-0 h-full w-full overflow-hidden">
          <div className="absolute top-[-20%] left-[-10%] h-[70%] w-[70%] rounded-full bg-primary/20 blur-[120px]" />
        </div>

        <Logo />

        <div className="relative z-10 mx-auto my-auto w-full max-w-md">
          <h1 className="mb-6 font-display text-4xl leading-tight font-bold md:text-5xl">
            Build the future of learning, instantly.
          </h1>
          <p className="mb-12 text-lg text-zinc-400">
            Join thousands of creators using AI to generate high-quality
            courses, interactive quizzes, and rich media content in seconds.
          </p>

          {/* Floating Course Card */}
          <div className="relative -rotate-2 transform transition-transform duration-500 hover:rotate-0">
            <Card className="overflow-hidden border-zinc-800 bg-zinc-900/80 shadow-2xl backdrop-blur-xl">
              <div className="h-1 w-full bg-linear-to-r from-primary to-accent" />
              <CardContent className="p-6">
                <div className="mb-6 flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/20">
                    <BookOpen className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-zinc-100">
                      Advanced AI & Machine Learning
                    </h3>
                    <p className="text-sm text-zinc-400">
                      Generated for Data Science Professionals
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-sm text-zinc-300">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                    <span>Module 1: Neural Networks Fundamentals</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-zinc-300">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                    <span>Module 2: Deep Learning Architectures</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-zinc-300">
                    <Zap className="h-4 w-4 text-amber-500" />
                    <span className="font-medium text-zinc-100">
                      Generating Module 3...
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Decorative background cards */}
            <div className="absolute top-4 -right-4 -z-10 h-full w-full rotate-[4deg] rounded-xl border border-zinc-800 bg-zinc-900 opacity-50" />
          </div>
        </div>

        <div className="relative z-10 text-sm text-zinc-500">
          © {new Date().getFullYear()} CourseGen AI Inc.
        </div>
      </div>

      {/* Right Panel: Form Panel */}
      <div className="flex items-center justify-center bg-background p-8">
        <div className="mx-auto w-full max-w-md">
          {/* Mobile Logo */}
          <div className="mb-10 flex items-center gap-2 lg:hidden">
            <Logo />
          </div>

          <div className="mb-8 text-center lg:text-left">
            <h2 className="mb-2 font-display text-3xl font-bold tracking-tight">
              Create an account
            </h2>
            <p className="text-muted-foreground">
              Enter your details to get started with CourseGen.
            </p>
          </div>

          {isSuccess ? (
            <div className="animate-in rounded-xl border border-primary/20 bg-primary/10 p-6 text-center duration-300 fade-in zoom-in">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/20">
                <CheckCircle2 className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 text-xl font-bold">Account created!</h3>
              <p className="text-sm text-muted-foreground">
                You are being redirected to login...
              </p>
              <Loader2 className="mx-auto mt-4 h-5 w-5 animate-spin text-primary" />
            </div>
          ) : (
            <>
              <form onSubmit={handleSubmit(submit)} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    placeholder="Jane Doe"
                    {...register("name")}
                    className={
                      errors.name
                        ? "border-destructive focus-visible:ring-destructive"
                        : ""
                    }
                  />
                  {errors.name && (
                    <p className="mt-1 text-xs text-destructive">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="jane@example.com"
                    {...register("email")}
                    className={
                      errors.email
                        ? "border-destructive focus-visible:ring-destructive"
                        : ""
                    }
                  />
                  {errors.email && (
                    <p className="mt-1 text-xs text-destructive">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    {...register("password")}
                    className={
                      errors.password
                        ? "border-destructive focus-visible:ring-destructive"
                        : ""
                    }
                  />

                  {/* Password Strength Indicator */}

                  {errors.password && (
                    <p className="mt-1 text-xs text-destructive">
                      {errors.password.message}
                    </p>
                  )}
                </div>

                <div className="flex space-x-2 pt-2">
                  <Checkbox id="terms" required />
                  <Label
                    htmlFor="terms"
                    className="text-sm font-normal text-muted-foreground"
                  >
                    I agree to the Terms of Service and Privacy Policy .
                  </Label>
                </div>

                <Button
                  type="submit"
                  className="mt-6 w-full"
                  disabled={isPending}
                >
                  {isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creating account...
                    </>
                  ) : (
                    "Create account"
                  )}
                </Button>
              </form>

              <div className="relative my-8">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-border" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">
                    Or continue with Google
                  </span>
                </div>
              </div>

              <Button variant="outline" type="button" className="w-full">
                <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                  <path d="M1 1h22v22H1z" fill="none" />
                </svg>
                Google
              </Button>

              <p className="mt-8 text-center text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link
                  to="/auth/login"
                  className="font-semibold text-primary hover:underline"
                >
                  Log in
                </Link>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
