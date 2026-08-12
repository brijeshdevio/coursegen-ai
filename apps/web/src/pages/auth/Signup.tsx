import { useState } from "react";
import {
  BookOpen,
  Eye,
  EyeOff,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Layers,
  Zap,
  Brain,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { useSignupFacade } from "@/features/auth/hooks/useSignup";
import { Logo } from "@/assets/Logo";
import { Link } from "react-router-dom";

// ── Stub types (replace with your actual facade hook) ────────────────────────
// useSignupFacade returns:
//   handleSubmit : (fn) => FormEventHandler
//   submit       : (data) => void
//   register     : (field) => InputHTMLAttributes
//   errors       : Record<string, { message?: string }>
//   isPending    : boolean

// ── Left panel feature list ──────────────────────────────────────────────────
const PANEL_FEATURES = [
  {
    icon: Brain,
    title: "AI-powered course generation",
    desc: "Full courses from a single topic — modules, topics, rich markdown.",
  },
  {
    icon: Layers,
    title: "Course → Module → Topic hierarchy",
    desc: "Professionally structured content, ready to publish or export.",
  },
  {
    icon: Zap,
    title: "Groq-accelerated inference",
    desc: "Powered by Llama 3.3 70B — entire courses in under 5 seconds.",
  },
];

// ── Google icon (inline SVG — no external icon dependency) ───────────────────
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

// ── Field wrapper with label + error ─────────────────────────────────────────
interface FieldProps {
  label: string;
  error?: string;
  children: React.ReactNode;
  required?: boolean;
}
function Field({ label, error, children, required }: FieldProps) {
  return (
    <div className="space-y-1.5">
      <Label
        className="text-sm font-medium text-foreground/80"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        {label}
        {required && <span className="ml-0.5 text-primary">*</span>}
      </Label>
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

// ── Main component ────────────────────────────────────────────────────────────
export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const { handleSubmit, submit, register, errors, isPending } =
    useSignupFacade();

  return (
    <div
      className="flex min-h-screen bg-background text-foreground"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      {/* ── Left decorative panel (hidden on mobile) ───────────────────────── */}
      <aside className="relative hidden w-120 shrink-0 flex-col overflow-hidden border-r border-border/40 lg:flex">
        {/* Background depth layers — matches Hero radial glow */}
        <div
          className="pointer-events-none absolute inset-0"
          aria-hidden="true"
        >
          <div
            className="absolute top-1/3 left-1/2 h-120 w-120 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-[0.09]"
            style={{
              background:
                "radial-gradient(circle, hsl(var(--primary)) 0%, transparent 70%)",
            }}
          />
          <div
            className="absolute bottom-1/4 left-1/4 h-60 w-60 rounded-full opacity-[0.05]"
            style={{
              background:
                "radial-gradient(circle, hsl(var(--primary)) 0%, transparent 70%)",
            }}
          />
          {/* Subtle grid — same as Home Hero */}
          <div
            className="absolute inset-0 opacity-[0.018]"
            style={{
              backgroundImage:
                "linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)",
              backgroundSize: "64px 64px",
            }}
          />
        </div>

        <div className="relative flex h-full flex-col p-10">
          {/* Logo */}
          <Logo />

          {/* Main copy */}
          <div className="flex flex-1 flex-col justify-center py-16">
            <div className="mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1.5 text-xs font-medium text-primary">
              <Sparkles className="h-3 w-3" />
              Free to start — no credit card
            </div>

            <h1
              className="mb-4 text-3xl leading-[1.1] font-extrabold tracking-tight text-foreground xl:text-4xl"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              Build courses at
              <br />
              <span className="text-primary">the speed of AI</span>
            </h1>
            <p className="mb-10 max-w-xs text-sm leading-relaxed text-muted-foreground">
              Join 2,400+ educators and creators already generating full
              AI-powered courses with CourseGen.
            </p>

            {/* Feature list */}
            <div className="space-y-5">
              {PANEL_FEATURES.map((f) => (
                <div key={f.title} className="flex items-start gap-4">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-primary/20 bg-primary/10">
                    <f.icon className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p
                      className="mb-0.5 text-sm font-semibold text-foreground"
                      style={{ fontFamily: "'Syne', sans-serif" }}
                    >
                      {f.title}
                    </p>
                    <p className="text-xs leading-relaxed text-muted-foreground">
                      {f.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom quote */}
          <div className="mt-auto border-l-2 border-primary/30 pl-4">
            <p className="text-sm leading-relaxed text-muted-foreground italic">
              "I built a full React course in under 5 minutes. The structure was
              so good I barely had to edit anything."
            </p>
            <div className="mt-3 flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-full border border-primary/20 bg-primary/10 text-[10px] font-bold text-primary">
                AS
              </div>
              <div>
                <p className="text-xs font-medium text-foreground">Ananya S.</p>
                <p className="text-[11px] text-muted-foreground">
                  Frontend Developer & Instructor
                </p>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* ── Right form panel ────────────────────────────────────────────────── */}
      <main className="relative flex flex-1 flex-col items-center justify-center overflow-hidden px-4 py-12 sm:px-8">
        {/* Mobile logo */}
        <div className="mb-8 flex items-center gap-2 self-start lg:hidden">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary shadow-lg shadow-primary/30">
            <BookOpen className="h-4 w-4 text-primary-foreground" />
          </div>
          <span
            className="text-[17px] font-bold tracking-tight text-foreground"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            CourseGen<span className="text-primary">AI</span>
          </span>
        </div>

        {/* SIGNATURE: card with near-invisible border + layered elevation */}
        <div className="w-full max-w-105">
          {/* Header */}
          <div className="mb-8">
            <h2
              className="mb-2 text-2xl font-bold tracking-tight text-foreground sm:text-3xl"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              Create your account
            </h2>
            <p className="text-sm text-muted-foreground">
              Already have one?{" "}
              <Link
                to="/auth/login"
                className="font-medium text-primary underline-offset-4 hover:underline"
              >
                Sign in
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
              or sign up with email
            </span>
            <Separator className="flex-1 bg-border/40" />
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit(submit)}
            noValidate
            className="space-y-4"
          >
            {/* Name row */}

            <Field label="First name" error={errors.name?.message} required>
              <Input
                {...register("name")}
                placeholder="Brijesh"
                autoComplete="given-name"
                className={cn(
                  "h-11 border-border/50 bg-card/40 text-sm transition-colors placeholder:text-muted-foreground/50 hover:border-border focus-visible:ring-primary/40",
                  errors.name &&
                    "border-destructive/60 focus-visible:ring-destructive/30"
                )}
              />
            </Field>

            {/* Email */}
            <Field label="Email address" error={errors.email?.message} required>
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
            <Field label="Password" error={errors.password?.message} required>
              <div className="relative">
                <Input
                  {...register("password")}
                  type={showPassword ? "text" : "password"}
                  placeholder="Min. 8 characters"
                  autoComplete="new-password"
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

              {/* Password strength hints */}
              {!errors.password && (
                <div className="mt-2 flex gap-3">
                  {["8+ chars", "1 number", "1 uppercase"].map((hint) => (
                    <span
                      key={hint}
                      className="flex items-center gap-1 text-[11px] text-muted-foreground/60"
                    >
                      <CheckCircle2 className="h-2.5 w-2.5 shrink-0" />
                      {hint}
                    </span>
                  ))}
                </div>
              )}
            </Field>

            {/* Terms */}
            <p className="pt-1 text-xs leading-relaxed text-muted-foreground">
              By creating an account you agree to our{" "}
              <a
                href="/terms"
                className="text-primary underline-offset-4 hover:underline"
              >
                Terms of Service
              </a>{" "}
              and{" "}
              <a
                href="/privacy"
                className="text-primary underline-offset-4 hover:underline"
              >
                Privacy Policy
              </a>
              .
            </p>

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
                  Creating account…
                </>
              ) : (
                <>
                  Create account
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </Button>
          </form>

          {/* Bottom trust badges */}
          <div className="mt-8 flex items-center justify-center gap-4">
            {["Free forever plan", "No credit card", "Cancel anytime"].map(
              (t, i) => (
                <span
                  key={t}
                  className="flex items-center gap-1.5 text-[11px] text-muted-foreground/60"
                >
                  {i > 0 && <span className="h-3 w-px bg-border/50" />}
                  <CheckCircle2 className="h-2.5 w-2.5 shrink-0 text-primary/60" />
                  {t}
                </span>
              )
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
