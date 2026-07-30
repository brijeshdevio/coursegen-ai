import { Link } from "@tanstack/react-router";
import { Sparkles, Quote } from "lucide-react";
import { Logo } from "./navbar";
import type { ReactNode } from "react";

export function AuthShell({
  title,
  subtitle,
  children,
  footer,
}: {
  title: string;
  subtitle: string;
  children: ReactNode;
  footer: ReactNode;
}) {
  return (
    <div className="grid min-h-screen lg:grid-cols-5">
      {/* Left visual panel */}
      <aside className="relative hidden overflow-hidden lg:col-span-2 lg:block">
        <div className="absolute inset-0 mesh-bg" aria-hidden />
        <div
          className="absolute inset-0 bg-gradient-to-br from-background/40 via-transparent to-background/70"
          aria-hidden
        />

        <div className="relative flex h-full flex-col justify-between p-12">
          <Logo />

          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-3 py-1 text-xs text-muted-foreground backdrop-blur">
              <Sparkles className="h-3 w-3 text-primary" /> AI-powered learning
            </div>
            <p className="mt-6 font-display text-4xl font-bold leading-tight tracking-tight">
              Type a topic. Get a{" "}
              <span className="text-gradient">complete course</span>. Start
              learning.
            </p>

            {/* Floating decorative card */}
            <div className="mt-10 rounded-2xl border border-border bg-card/70 p-4 backdrop-blur-xl glow-primary max-w-sm">
              <div className="flex items-center gap-2">
                <span className="rounded-md border border-primary/30 bg-primary/15 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-primary">
                  Python
                </span>
                <span className="font-mono text-[10px] text-muted-foreground">
                  10 chapters
                </span>
              </div>
              <p className="mt-3 font-semibold">Complete Python Course</p>
              <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-elevated">
                <div className="h-full w-2/5 rounded-full bg-primary" />
              </div>
              <p className="mt-2 font-mono text-[11px] text-muted-foreground">
                4 of 10 complete
              </p>
            </div>
          </div>

          <blockquote className="max-w-sm text-sm text-muted-foreground">
            <Quote className="mb-2 h-4 w-4 text-primary" />
            "I typed 'system design' and had a full curriculum in under a
            minute. Finally a tool that respects my time."
            <footer className="mt-2 text-xs">
              — Priya S., software engineer
            </footer>
          </blockquote>
        </div>
      </aside>

      {/* Right form panel */}
      <main className="col-span-1 flex min-h-screen items-center justify-center px-6 py-12 lg:col-span-3">
        <div className="w-full max-w-md">
          <div className="mb-8 flex justify-center lg:hidden">
            <Logo />
          </div>
          <Link
            to="/"
            className="hidden text-xs text-muted-foreground hover:text-foreground lg:block"
          >
            ← Back to home
          </Link>
          <h1 className="mt-4 font-display text-3xl font-bold tracking-tight">
            {title}
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">{subtitle}</p>

          <div className="mt-8">{children}</div>

          <div className="mt-6 text-center text-sm text-muted-foreground">
            {footer}
          </div>
        </div>
      </main>
    </div>
  );
}
