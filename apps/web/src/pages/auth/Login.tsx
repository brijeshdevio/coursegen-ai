// Login.tsx — CourseGen AI
// Matches Home.tsx + Signup.tsx design system exactly:
//   Fonts  : Syne (display) + DM Sans (body) — must be loaded in index.html
//   Accent : hsl(var(--primary))   → violet
//   Borders: near-invisible (border/40 – border/50)
//   Depth  : bg-background → bg-card/40 → bg-card elevation layers
// SIGNATURE: Centered single-column card with floating course-stat sidebar widget
//            — different spatial composition from Signup's split-panel

import { useState } from "react";
import { Eye, EyeOff, ArrowRight, Zap, Layers, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { useLoginFacade } from "@/features/auth/hooks/useLogin";
import { Logo } from "@/assets/Logo";
import { Link } from "react-router-dom";

// ── Google icon ───────────────────────────────────────────────────────────────
function GoogleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
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
    </svg>
  );
}

// ── Field wrapper ─────────────────────────────────────────────────────────────
interface FieldProps {
  label: string;
  error?: string;
  children: React.ReactNode;
  action?: React.ReactNode;
}
function Field({ label, error, children, action }: FieldProps) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <Label
          className="text-sm font-medium text-foreground/80"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          {label}
        </Label>
        {action}
      </div>
      {children}
      {error && (
        <p className="flex items-center gap-1.5 pt-0.5 text-xs text-destructive">
          <span className="inline-block h-1 w-1 shrink-0 rounded-full bg-destructive" />
          {error}
        </p>
      )}
    </div>
  );
}

// ── Recent activity widget — floating sidebar on desktop ──────────────────────
// SIGNATURE element: small glassmorphic sidebar card that breaks the centered grid
const RECENT_COURSES = [
  {
    title: "React + Node.js Full-Stack",
    modules: 6,
    topics: 24,
    color: "bg-primary/10 text-primary border-primary/20",
    initial: "R",
  },
  {
    title: "Machine Learning Fundamentals",
    modules: 5,
    topics: 18,
    color: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    initial: "M",
  },
  {
    title: "System Design for Developers",
    modules: 4,
    topics: 14,
    color: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    initial: "S",
  },
];

function RecentCoursesWidget() {
  return (
    <div className="absolute top-1/2 right-[calc(50%-560px)] hidden w-56 -translate-y-1/2 xl:block">
      <div className="rounded-xl border border-border/40 bg-card/60 p-4 shadow-xl shadow-black/20 backdrop-blur-sm">
        <div className="mb-4 flex items-center gap-2">
          <Layers className="h-3.5 w-3.5 text-primary" />
          <p
            className="text-xs font-semibold text-foreground"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            Recent courses
          </p>
        </div>
        <div className="space-y-3">
          {RECENT_COURSES.map((c) => (
            <div key={c.title} className="flex items-start gap-2.5">
              <div
                className={cn(
                  "flex h-7 w-7 shrink-0 items-center justify-center rounded-md border text-[11px] font-bold",
                  c.color
                )}
              >
                {c.initial}
              </div>
              <div className="min-w-0">
                <p className="truncate text-xs leading-tight font-medium text-foreground">
                  {c.title}
                </p>
                <p className="mt-0.5 text-[10px] text-muted-foreground">
                  {c.modules} modules · {c.topics} topics
                </p>
              </div>
            </div>
          ))}
        </div>
        <Separator className="my-3 bg-border/40" />
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <Clock className="h-3 w-3 text-muted-foreground" />
            <span className="text-[10px] text-muted-foreground">Avg. gen</span>
          </div>
          <span
            className="text-xs font-bold text-primary"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            3.2s
          </span>
        </div>
      </div>
      {/* Floating stat bubble */}
      <div className="mt-3 flex items-center gap-3 rounded-xl border border-primary/20 bg-primary/5 p-3">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10">
          <Zap className="h-4 w-4 text-primary" />
        </div>
        <div>
          <p
            className="text-sm leading-none font-bold text-foreground"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            2,400+
          </p>
          <p className="mt-0.5 text-[10px] text-muted-foreground">
            courses generated
          </p>
        </div>
      </div>
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────
export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const { handleSubmit, submit, register, errors, isPending } =
    useLoginFacade();

  return (
    <div
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-background px-4 py-12 text-foreground"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      {/* Background radial glow — identical to Home Hero */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div
          className="absolute top-1/3 left-1/2 h-160 w-160 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-[0.06]"
          style={{
            background:
              "radial-gradient(circle, hsl(var(--primary)) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute right-1/3 bottom-1/4 h-70 w-70 rounded-full opacity-[0.04]"
          style={{
            background:
              "radial-gradient(circle, hsl(var(--primary)) 0%, transparent 70%)",
          }}
        />
        {/* Subtle grid texture */}
        <div
          className="absolute inset-0 opacity-[0.018]"
          style={{
            backgroundImage:
              "linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />
      </div>

      {/* Floating sidebar widget */}
      <RecentCoursesWidget />

      {/* ── Form card ─────────────────────────────────────────────────────── */}
      <div className="relative w-full max-w-100">
        {/* Logo */}
        <Logo />

        {/* Header */}
        <div className="my-8">
          <h1
            className="mb-2 text-2xl leading-tight font-bold tracking-tight text-foreground sm:text-3xl"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            Sign in to your
          </h1>
          <p className="text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link
              to="/auth/signup"
              className="font-medium text-primary underline-offset-4 hover:underline"
            >
              Sign up free
            </Link>
          </p>
        </div>

        {/* OAuth */}
        <Button
          type="button"
          variant="outline"
          className="mb-6 h-11 w-full gap-3 border-border/60 text-sm font-medium hover:bg-card/60"
          onClick={() => {
            /* TODO: Google OAuth handler */
          }}
        >
          <GoogleIcon />
          Continue with Google
        </Button>

        {/* Divider */}
        <div className="relative mb-6 flex items-center gap-3">
          <Separator className="flex-1 bg-border/40" />
          <span className="shrink-0 text-xs text-muted-foreground select-none">
            or sign in with email
          </span>
          <Separator className="flex-1 bg-border/40" />
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(submit)} noValidate className="space-y-4">
          {/* Email */}
          <Field label="Email address" error={errors.email?.message}>
            <Input
              {...register("email")}
              type="email"
              placeholder="you@example.com"
              autoComplete="email"
              className={cn(
                "h-11 border-border/50 bg-card/40 text-sm transition-colors placeholder:text-muted-foreground/50 hover:border-border focus-visible:ring-primary/40",
                errors.email &&
                  "border-destructive/60 focus-visible:ring-destructive/30"
              )}
            />
          </Field>

          {/* Password */}
          <Field
            label="Password"
            error={errors.password?.message}
            action={
              <a
                href="/forgot-password"
                className="text-xs text-primary underline-offset-4 hover:underline"
              >
                Forgot password?
              </a>
            }
          >
            <div className="relative">
              <Input
                {...register("password")}
                type={showPassword ? "text" : "password"}
                placeholder="Your password"
                autoComplete="current-password"
                className={cn(
                  "h-11 border-border/50 bg-card/40 pr-11 text-sm transition-colors placeholder:text-muted-foreground/50 hover:border-border focus-visible:ring-primary/40",
                  errors.password &&
                    "border-destructive/60 focus-visible:ring-destructive/30"
                )}
              />
              <button
                type="button"
                onClick={() => setShowPassword((p) => !p)}
                className="absolute top-1/2 right-3 -translate-y-1/2 p-0.5 text-muted-foreground transition-colors hover:text-foreground"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
          </Field>

          {/* Submit */}
          <Button
            type="submit"
            disabled={isPending}
            className="mt-2 h-12 w-full gap-2 text-sm font-semibold shadow-lg shadow-primary/20"
          >
            {isPending ? (
              <>
                <span
                  className="h-4 w-4 shrink-0 animate-spin rounded-full border-2 border-primary-foreground/30 border-t-primary-foreground"
                  aria-hidden="true"
                />
                Signing in…
              </>
            ) : (
              <>
                Sign in
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </Button>
        </form>

        {/* Footer trust line */}
        <p className="mt-8 text-center text-[11px] leading-relaxed text-muted-foreground/50">
          Protected by industry-standard encryption.{" "}
          <a
            href="/privacy"
            className="text-muted-foreground underline-offset-4 transition-colors hover:text-primary hover:underline"
          >
            Privacy policy
          </a>
        </p>
      </div>
    </div>
  );
}
