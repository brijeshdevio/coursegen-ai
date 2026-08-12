// Home.tsx — CourseGen AI Landing Page
// Design: Dark editorial, violet accent, near-invisible borders, layered elevation
// Font: Requires "Syne" (display) + "DM Sans" (body) — add to index.html or layout.tsx:
// <link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&display=swap" rel="stylesheet">

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  BookOpen,
  Sparkles,
  Layers,
  Cpu,
  ChevronRight,
  CheckCircle2,
  Menu,
  X,
  ArrowRight,
  Zap,
  FileText,
  Brain,
  LayoutDashboard,
  Star,
  GraduationCap,
  Code2,
  Briefcase,
  Play,
  Clock,
  Users,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Logo } from "@/assets/Logo";
import { Link } from "react-router-dom";

// ─── Design tokens (mapped to Shadcn CSS vars) ───────────────────────────────
// bg: hsl(var(--background))        → near-black
// card: hsl(var(--card))            → slightly elevated
// border: hsl(var(--border))        → near-invisible
// accent: violet via hsl(var(--primary))
// text: hsl(var(--foreground)) / hsl(var(--muted-foreground))

// ─── Navbar ──────────────────────────────────────────────────────────────────
const NAV_LINKS = [
  { label: "Features", href: "#features" },
  { label: "How it works", href: "#how-it-works" },
  { label: "Pricing", href: "#pricing" },
  { label: "Blog", href: "#blog" },
];

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 right-0 left-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-border/50 bg-background/90 backdrop-blur-md"
          : "bg-transparent"
      )}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        {/* Logo */}
        <Logo />

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="rounded-md px-4 py-2 text-sm text-muted-foreground transition-colors hover:bg-card hover:text-foreground"
            >
              {l.label}
            </a>
          ))}
        </nav>

        {/* CTA group */}
        <div className="hidden items-center gap-3 md:flex">
          <Link to="/auth/login">
            <Button variant="ghost" size="sm" className="text-sm">
              Sign in
            </Button>
          </Link>
          <Link to="/auth/signup">
            <Button
              size="sm"
              className="gap-2 text-sm shadow-md shadow-primary/20"
            >
              Start free
              <ArrowRight className="h-3.5 w-3.5" />
            </Button>
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="rounded-md p-2 text-muted-foreground transition-colors hover:bg-card hover:text-foreground md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-b border-border/50 bg-background/95 px-4 pb-4 backdrop-blur-md md:hidden">
          {NAV_LINKS.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="block border-b border-border/30 py-3 text-sm text-muted-foreground last:border-0 hover:text-foreground"
              onClick={() => setMobileOpen(false)}
            >
              {l.label}
            </a>
          ))}
          <div className="mt-4 flex gap-3">
            <Button variant="outline" size="sm" className="flex-1 text-sm">
              Sign in
            </Button>
            <Button size="sm" className="flex-1 text-sm">
              Start free
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}

// ─── Section 1: Hero ─────────────────────────────────────────────────────────
function HeroSection() {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 pt-16 pb-24">
      {/* Background radial glow — signature element */}
      {/* SIGNATURE: Layered radial mesh using pseudo-divs to create depth without images */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div
          className="absolute top-1/3 left-1/2 h-150 w-150 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-[0.07]"
          style={{
            background:
              "radial-gradient(circle, hsl(var(--primary)) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute top-1/2 left-1/4 h-75 w-75 rounded-full opacity-[0.04]"
          style={{
            background:
              "radial-gradient(circle, hsl(var(--primary)) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute right-1/4 bottom-1/3 h-50 w-50 rounded-full opacity-[0.04]"
          style={{
            background:
              "radial-gradient(circle, hsl(var(--primary)) 0%, transparent 70%)",
          }}
        />
        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage:
              "linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-4xl text-center">
        {/* Pill badge */}
        <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-medium text-primary">
          <Sparkles className="h-3 w-3" />
          Powered by Llama 3.3 70B via Groq
        </div>

        {/* Hero headline */}
        <h1
          className="mb-6 text-4xl leading-[1.05] font-extrabold tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl"
          style={{ fontFamily: "'Syne', sans-serif" }}
        >
          Generate full courses
          <br />
          <span className="text-primary">in seconds with AI</span>
        </h1>

        {/* Subheadline */}
        <p
          className="mx-auto mb-10 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          CourseGen AI turns any topic into a structured, markdown-rich course —
          complete with modules, topics, and content — instantly. Built for
          educators, creators, and developers.
        </p>

        {/* CTAs */}
        <div className="mb-16 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link to="/courses/generate">
            <Button
              size="lg"
              className="h-12 gap-2 px-8 text-base shadow-xl shadow-primary/25"
            >
              <Zap className="h-4 w-4" />
              Generate your first course
            </Button>
          </Link>

          <Button
            variant="outline"
            size="lg"
            className="h-12 gap-2 border-border/60 px-8 text-base"
          >
            <Play className="h-4 w-4" />
            Watch demo
          </Button>
        </div>

        {/* Social proof strip */}
        <div className="flex flex-col items-center justify-center gap-6 text-sm text-muted-foreground sm:flex-row">
          <div className="flex items-center gap-2">
            <div className="flex -space-x-2">
              {["#7c3aed", "#6d28d9", "#5b21b6", "#4c1d95"].map((c, i) => (
                <div
                  key={i}
                  className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-background text-[10px] font-medium text-white"
                  style={{ background: c }}
                >
                  {["A", "R", "S", "K"][i]}
                </div>
              ))}
            </div>
            <span>2,400+ courses created</span>
          </div>
          <Separator orientation="vertical" className="hidden h-4 sm:block" />
          <div className="flex items-center gap-1.5">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-3.5 w-3.5 fill-primary text-primary" />
            ))}
            <span>4.9 · 340 reviews</span>
          </div>
          <Separator orientation="vertical" className="hidden h-4 sm:block" />
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="h-3.5 w-3.5 text-primary" />
            <span>No credit card required</span>
          </div>
        </div>
      </div>

      {/* Hero card preview — floating UI mockup */}
      <div className="relative mx-auto mt-20 w-full max-w-3xl">
        <div className="overflow-hidden rounded-xl border border-border/50 bg-card shadow-2xl shadow-black/30">
          {/* Window chrome */}
          <div className="flex items-center gap-2 border-b border-border/50 bg-card/80 px-4 py-3">
            <div className="h-3 w-3 rounded-full bg-red-500/60" />
            <div className="h-3 w-3 rounded-full bg-yellow-500/60" />
            <div className="h-3 w-3 rounded-full bg-green-500/60" />
            <div className="mx-4 flex-1">
              <div className="rounded-md bg-background/60 px-3 py-1 text-center font-mono text-xs text-muted-foreground">
                coursegen.ai/generate
              </div>
            </div>
          </div>
          {/* Mock course output */}
          <div className="space-y-4 bg-background/40 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="mb-1 text-xs text-muted-foreground">
                  Generated course
                </p>
                <h3
                  className="text-lg font-bold text-foreground"
                  style={{ fontFamily: "'Syne', sans-serif" }}
                >
                  Full-Stack Web Development with React & Node.js
                </h3>
              </div>
              <Badge className="border-primary/20 bg-primary/10 text-xs text-primary">
                AI Generated
              </Badge>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {[
                { icon: Layers, label: "6 modules" },
                { icon: FileText, label: "24 topics" },
                { icon: Clock, label: "~18 hrs" },
              ].map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="flex items-center gap-2 rounded-lg border border-border/30 bg-card/60 px-3 py-2"
                >
                  <Icon className="h-3.5 w-3.5 shrink-0 text-primary" />
                  <span className="text-xs text-muted-foreground">{label}</span>
                </div>
              ))}
            </div>
            <div className="space-y-2">
              {[
                "Introduction to Modern Web Development",
                "React Fundamentals & Component Architecture",
                "State Management with Context & Zustand",
              ].map((title, i) => (
                <div
                  key={i}
                  className="group flex cursor-pointer items-center gap-3 rounded-lg border border-border/30 bg-card/40 p-3 transition-colors hover:bg-card/70"
                >
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-primary/10">
                    <span className="text-[10px] font-bold text-primary">
                      {i + 1}
                    </span>
                  </div>
                  <span className="flex-1 text-sm text-foreground">
                    {title}
                  </span>
                  <ChevronRight className="h-4 w-4 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
                </div>
              ))}
              <div className="flex items-center gap-3 rounded-lg border border-dashed border-border/30 p-3 opacity-40">
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-muted">
                  <span className="text-[10px] font-bold text-muted-foreground">
                    4
                  </span>
                </div>
                <div className="h-3 w-48 rounded-full bg-muted" />
              </div>
            </div>
          </div>
        </div>
        {/* Floating stats card — grid-breaking element */}
        <div className="absolute -right-4 -bottom-6 hidden sm:block">
          <div className="w-44 rounded-xl border border-border/50 bg-card p-4 shadow-xl shadow-black/20">
            <p className="mb-1 text-xs text-muted-foreground">
              Generation time
            </p>
            <p
              className="text-2xl font-bold text-primary"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              3.2s
            </p>
            <p className="mt-0.5 text-xs text-muted-foreground">
              avg. for full course
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Section 2: Features ─────────────────────────────────────────────────────
const FEATURES = [
  {
    icon: Brain,
    title: "AI-powered course generation",
    description:
      "Enter a topic and get a fully structured course with modules, topics, and rich markdown content — generated by Llama 3.3 70B in seconds.",
    tag: "Core",
  },
  {
    icon: Layers,
    title: "Course → Module → Topic hierarchy",
    description:
      "Professionally structured content following a natural learning hierarchy. Each topic gets deep markdown content with examples, explanations, and code snippets.",
    tag: "Structure",
  },
  {
    icon: Cpu,
    title: "Groq-accelerated inference",
    description:
      "Runs on Groq's LPU inference engine — the fastest LLM runtime available. Get full course content without the typical AI wait times.",
    tag: "Performance",
  },
  {
    icon: LayoutDashboard,
    title: "Creator dashboard",
    description:
      "Manage all your generated courses in one place. Edit titles, reorder modules, regenerate individual topics, and export — all from a clean dashboard.",
    tag: "Management",
  },
  {
    icon: FileText,
    title: "Markdown-rich content",
    description:
      "Every topic is generated with structured markdown — headings, bullet points, code blocks, and more. Ready to publish, embed, or export anywhere.",
    tag: "Content",
  },
  {
    icon: Zap,
    title: "Zod-validated output",
    description:
      "AI responses are validated against strict Zod schemas. No broken JSON, no malformed content — every generated course is structurally guaranteed.",
    tag: "Reliability",
  },
];

function FeaturesSection() {
  return (
    <section id="features" className="relative px-4 py-24">
      <div className="mx-auto max-w-6xl">
        {/* Section header */}
        <div className="mb-16 max-w-2xl">
          <Badge
            variant="outline"
            className="mb-4 border-primary/30 bg-primary/5 text-primary"
          >
            Features
          </Badge>
          <h2
            className="mb-4 text-3xl leading-tight font-bold text-foreground sm:text-4xl md:text-5xl"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            Everything you need to
            <br />
            <span className="text-primary">ship courses fast</span>
          </h2>
          <p className="text-base leading-relaxed text-muted-foreground">
            CourseGen AI handles the heavy lifting — structure, content,
            formatting. You focus on what matters: teaching.
          </p>
        </div>

        {/* Feature grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f, i) => (
            <Card
              key={f.title}
              className={cn(
                "group border-border/40 bg-card/40 transition-all duration-200 hover:bg-card/70",
                i === 0 && "sm:col-span-2 lg:col-span-1"
              )}
            >
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 transition-colors group-hover:bg-primary/20">
                    <f.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="mb-2 flex items-center gap-2">
                      <h3
                        className="text-base font-semibold text-foreground"
                        style={{ fontFamily: "'Syne', sans-serif" }}
                      >
                        {f.title}
                      </h3>
                    </div>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {f.description}
                    </p>
                    <Badge
                      variant="secondary"
                      className="mt-3 px-2 py-0.5 text-xs"
                    >
                      {f.tag}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Section 3: How It Works ──────────────────────────────────────────────────
const STEPS = [
  {
    step: "01",
    icon: FileText,
    title: "Enter a topic",
    description:
      'Type any subject — "Machine Learning for beginners", "Advanced React patterns", or "Digital Marketing 101". Add optional context to shape the output.',
  },
  {
    step: "02",
    icon: Sparkles,
    title: "AI generates the structure",
    description:
      "CourseGen AI creates a full course outline — modules, topics, learning objectives — all organized logically for progressive learning.",
  },
  {
    step: "03",
    icon: Brain,
    title: "Content gets generated",
    description:
      "Each topic gets deep markdown content via Groq's ultra-fast Llama 3.3 70B. Code examples, explanations, and summaries — all included.",
  },
  {
    step: "04",
    icon: LayoutDashboard,
    title: "Edit, publish, or export",
    description:
      "Review and tweak any module or topic from your dashboard. Regenerate individual sections, reorder content, and publish or export when ready.",
  },
];

function HowItWorksSection() {
  return (
    <section id="how-it-works" className="bg-card/20 px-4 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <Badge
            variant="outline"
            className="mb-4 border-primary/30 bg-primary/5 text-primary"
          >
            How it works
          </Badge>
          <h2
            className="mb-4 text-3xl font-bold text-foreground sm:text-4xl md:text-5xl"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            From idea to course
            <br />
            <span className="text-primary">in four steps</span>
          </h2>
          <p className="text-base text-muted-foreground">
            No complex setup, no prompt engineering. Just type your topic and
            CourseGen handles the rest.
          </p>
        </div>

        {/* Steps — asymmetric layout */}
        <div className="relative">
          {/* Connector line (desktop) */}
          <div
            className="absolute top-14 right-[calc(12.5%+1px)] left-[calc(12.5%+1px)] hidden h-px lg:block"
            style={{
              background:
                "linear-gradient(90deg, transparent, hsl(var(--primary)/0.3), hsl(var(--primary)/0.3), transparent)",
            }}
            aria-hidden="true"
          />

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((s, i) => (
              <div key={s.step} className="relative flex flex-col">
                {/* Step indicator */}
                <div className="mb-6 flex lg:justify-center">
                  <div className="relative">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-primary/20 bg-primary/10">
                      <s.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary">
                      <span className="text-[9px] font-bold text-primary-foreground">
                        {i + 1}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="lg:text-center">
                  <span className="mb-2 block font-mono text-xs text-primary/50">
                    {s.step}
                  </span>
                  <h3
                    className="mb-2 text-base font-bold text-foreground"
                    style={{ fontFamily: "'Syne', sans-serif" }}
                  >
                    {s.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {s.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Use case pills */}
        <div className="mt-20 text-center">
          <p className="mb-4 text-xs tracking-widest text-muted-foreground uppercase">
            Used by
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              { icon: GraduationCap, label: "Educators" },
              { icon: Code2, label: "Developers" },
              { icon: Briefcase, label: "Content creators" },
              { icon: Users, label: "Bootcamp instructors" },
              { icon: BookOpen, label: "Course marketplaces" },
            ].map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex items-center gap-2 rounded-full border border-border/50 bg-card/60 px-4 py-2 text-sm text-muted-foreground transition-colors hover:border-primary/30 hover:text-foreground"
              >
                <Icon className="h-3.5 w-3.5 text-primary" />
                {label}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Section 4: CTA / Social proof ──────────────────────────────────────────
const TESTIMONIALS = [
  {
    quote:
      "I built a 6-module React course in under 5 minutes. The structure was so good I barely had to edit anything.",
    author: "Ananya S.",
    role: "Frontend Developer & Instructor",
    avatar: "AS",
  },
  {
    quote:
      "CourseGen AI saved me weeks of planning. The Groq-powered generation is genuinely fast — I thought it would time out.",
    author: "Rahul M.",
    role: "EdTech Founder",
    avatar: "RM",
  },
  {
    quote:
      "I generate course outlines for my coaching students on-demand. It's become a core part of my teaching workflow.",
    author: "Priya K.",
    role: "Career Coach",
    avatar: "PK",
  },
];

function CtaSection() {
  return (
    <section id="pricing" className="px-4 py-24">
      <div className="mx-auto max-w-6xl">
        {/* Testimonials */}
        <div className="mb-12 text-center">
          <Badge
            variant="outline"
            className="mb-4 border-primary/30 bg-primary/5 text-primary"
          >
            Testimonials
          </Badge>
          <h2
            className="text-3xl font-bold text-foreground sm:text-4xl"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            Creators love CourseGen AI
          </h2>
        </div>

        <div className="mb-20 grid grid-cols-1 gap-4 md:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <Card
              key={t.author}
              className="border-border/40 bg-card/40 transition-colors hover:bg-card/70"
            >
              <CardContent className="p-6">
                <div className="mb-4 flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-3.5 w-3.5 fill-primary text-primary"
                    />
                  ))}
                </div>
                <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
                  "{t.quote}"
                </p>
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-primary/20 bg-primary/10 text-xs font-bold text-primary">
                    {t.avatar}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      {t.author}
                    </p>
                    <p className="text-xs text-muted-foreground">{t.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA banner — SIGNATURE ELEMENT: asymmetric split with glowing corner accent */}
        <div className="relative overflow-hidden rounded-2xl border border-primary/20 bg-card">
          {/* Corner accent */}
          <div
            className="pointer-events-none absolute top-0 right-0 h-80 w-80 opacity-10"
            aria-hidden="true"
            style={{
              background:
                "radial-gradient(circle at top right, hsl(var(--primary)), transparent 70%)",
            }}
          />
          <div className="relative grid grid-cols-1 items-center gap-8 p-8 sm:p-12 md:grid-cols-2">
            <div>
              <h2
                className="mb-4 text-3xl leading-tight font-bold text-foreground sm:text-4xl"
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                Build your first
                <br />
                <span className="text-primary">AI course today</span>
              </h2>
              <p className="mb-6 text-base leading-relaxed text-muted-foreground">
                Free to start. No prompt engineering. No setup. Just enter a
                topic and watch CourseGen AI do the work.
              </p>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Link to="/courses/generate">
                  <Button
                    size="lg"
                    className="h-12 gap-2 px-8 shadow-xl shadow-primary/25"
                  >
                    <Zap className="h-4 w-4" />
                    Start generating — it's free
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  size="lg"
                  className="h-12 border-border/60 px-8"
                >
                  View pricing
                </Button>
              </div>
            </div>
            <div className="space-y-3">
              {[
                "Generate unlimited courses on the free plan",
                "Full markdown content for every topic",
                "Edit, regenerate, and reorder anytime",
                "No credit card required to start",
                "Export to PDF, Markdown, or your CMS",
              ].map((point) => (
                <div key={point} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <span className="text-sm text-muted-foreground">{point}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────
const FOOTER_LINKS = {
  Product: ["Features", "Pricing", "Changelog", "Roadmap"],
  Developers: ["API docs", "Integrations", "Status"],
  Company: ["About", "Blog", "Careers", "Contact"],
  Legal: ["Privacy", "Terms", "Cookies"],
};

function Footer() {
  return (
    <footer className="border-t border-border/40 bg-card/20 px-4 py-16">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-5">
          {/* Brand col */}
          <div className="col-span-2 sm:col-span-3 lg:col-span-1">
            <div className="mb-4">
              <Logo />
            </div>
            <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
              AI-powered course generation for educators, creators, and
              developers. Powered by Groq + Llama 3.3.
            </p>
          </div>

          {/* Link columns */}
          {Object.entries(FOOTER_LINKS).map(([group, links]) => (
            <div key={group}>
              <p className="mb-4 text-xs font-semibold tracking-widest text-foreground uppercase">
                {group}
              </p>
              <ul className="space-y-2.5">
                {links.map((l) => (
                  <li key={l}>
                    <a
                      href="#"
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Separator className="mb-8 opacity-40" />

        <div className="flex flex-col items-center justify-between gap-4 text-xs text-muted-foreground sm:flex-row">
          <p>© 2025 CourseGen AI. All rights reserved.</p>
          <div className="flex items-center gap-1.5">
            <div className="h-1.5 w-1.5 rounded-full bg-green-500" />
            All systems operational
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─── Root export ─────────────────────────────────────────────────────────────
export default function Home() {
  return (
    <div
      className="min-h-screen bg-background text-foreground"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      <Navbar />
      <main className="pt-20">
        <HeroSection />
        <FeaturesSection />
        <HowItWorksSection />
        <CtaSection />
      </main>
      <Footer />
    </div>
  );
}
