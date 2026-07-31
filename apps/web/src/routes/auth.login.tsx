import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowRight, Eye, EyeOff, Loader2, AlertCircle } from "lucide-react";
import { useState } from "react";
import { AuthShell } from "#/components/site/auth-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { setUser } from "@/lib/course-store";

const schema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(1, "Enter your password"),
});
type Values = z.infer<typeof schema>;

export const Route = createFileRoute("/auth/login")({
  head: () => ({
    meta: [
      { title: "Login — CourseGen AI" },
      {
        name: "description",
        content: "Welcome back — login to access your CourseGen AI courses.",
      },
      { property: "og:title", content: "Login — CourseGen AI" },
      {
        property: "og:description",
        content: "Login to access your generated courses.",
      },
    ],
  }),
  component: Login,
});

function Login() {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [banner, setBanner] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Values>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (v: Values) => {
    setBanner(null);
    await new Promise((r) => setTimeout(r, 700));
    // Mock auth — accept anything
    const name = v.email.split("@")[0].replace(/[._-]/g, " ");
    setUser({
      name: name.charAt(0).toUpperCase() + name.slice(1),
      email: v.email,
    });
    navigate({ to: "/courses" });
  };

  return (
    <AuthShell
      title="Welcome back"
      subtitle="Login to access your courses."
      footer={
        <>
          Don't have an account?{" "}
          <Link to="/auth/signup" className="text-primary hover:underline">
            Sign up
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {banner && (
          <div className="flex items-start gap-2 rounded-lg border border-destructive/40 bg-destructive/10 p-3 text-sm text-destructive">
            <AlertCircle className="mt-0.5 h-4 w-4" />
            <span>{banner}</span>
          </div>
        )}

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="you@domain.com"
            {...register("email")}
            aria-invalid={!!errors.email}
          />
          {errors.email && (
            <p className="text-xs text-destructive">{errors.email.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
            <button
              type="button"
              className="text-xs text-muted-foreground hover:text-foreground"
            >
              Forgot password?
            </button>
          </div>
          <div className="relative">
            <Input
              id="password"
              type={show ? "text" : "password"}
              placeholder="Your password"
              {...register("password")}
              aria-invalid={!!errors.password}
            />
            <button
              type="button"
              onClick={() => setShow((s) => !s)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              tabIndex={-1}
            >
              {show ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>
          {errors.password && (
            <p className="text-xs text-destructive">
              {errors.password.message}
            </p>
          )}
        </div>

        <Button
          type="submit"
          className="w-full gap-2"
          size="lg"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <>
              Login <ArrowRight className="h-4 w-4" />
            </>
          )}
        </Button>
      </form>
    </AuthShell>
  );
}
