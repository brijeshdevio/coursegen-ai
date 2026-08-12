// CourseDetails.tsx — CourseGen AI
// Matches design system: Syne + DM Sans, violet primary, near-invisible borders, card elevation
// SIGNATURE: Sticky sidebar TOC with active-module highlight + animated accordion modules
//            Two-column layout (sidebar TOC | main content) that collapses to single column on mobile

import { useState, useRef, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  BookOpen,
  Layers,
  FileText,
  ChevronDown,
  ChevronRight,
  ExternalLink,
  AlertCircle,
  RefreshCw,
  Sparkles,
  GraduationCap,
  Link2,
  Video,
  FileCode,
  Globe,
  BarChart3,
  Circle,
  Menu,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useGetCourse } from "@/features/course/hooks/useGetCourse";

// ── Types ─────────────────────────────────────────────────────────────────────
export type GenerateCourse = {
  title: string;
  description?: string;
  topic: string;
  level?: string;
  modules: {
    title: string;
    order: number;
    topics: {
      title: string;
      order: number;
    }[];
  }[];
  resources: {
    title: string;
    url: string;
    type: string;
  }[];
};

// ── Level style map ───────────────────────────────────────────────────────────
const LEVEL_STYLES: Record<string, string> = {
  beginner: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  intermediate: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  advanced: "bg-rose-500/10 text-rose-400 border-rose-500/20",
};

// ── Resource icon map ─────────────────────────────────────────────────────────
function ResourceIcon({ type }: { type: string }) {
  const t = type.toLowerCase();
  const cls = "w-3.5 h-3.5 shrink-0";
  if (t.includes("video") || t.includes("youtube"))
    return <Video className={cn(cls, "text-rose-400")} />;
  if (t.includes("code") || t.includes("github") || t.includes("repo"))
    return <FileCode className={cn(cls, "text-primary")} />;
  if (t.includes("doc") || t.includes("article") || t.includes("blog"))
    return <FileText className={cn(cls, "text-amber-400")} />;
  return <Globe className={cn(cls, "text-muted-foreground")} />;
}

// ── Skeleton ──────────────────────────────────────────────────────────────────
function Skeleton() {
  return (
    <div className="mx-auto max-w-7xl animate-pulse px-4 py-8 sm:px-6">
      {/* Back */}
      <div className="mb-8 h-4 w-24 rounded-full bg-muted/40" />

      {/* Hero */}
      <div className="mb-8 space-y-4 rounded-2xl border border-border/40 bg-card/40 p-6 sm:p-8">
        <div className="h-3 w-16 rounded-full bg-muted/40" />
        <div className="h-8 w-3/4 rounded-full bg-muted/60" />
        <div className="h-4 w-full rounded-full bg-muted/30" />
        <div className="h-4 w-2/3 rounded-full bg-muted/30" />
        <div className="flex gap-4 pt-2">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-3 w-24 rounded-full bg-muted/40" />
          ))}
        </div>
      </div>

      {/* Content area */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[240px_1fr]">
        <div className="hidden space-y-2 lg:block">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-8 rounded-lg bg-muted/30" />
          ))}
        </div>
        <div className="space-y-3">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="h-14 rounded-xl border border-border/30 bg-muted/20"
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Error state ───────────────────────────────────────────────────────────────
function ErrorState({ onRetry }: { onRetry: () => void }) {
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="text-center">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-destructive/20 bg-destructive/10">
          <AlertCircle className="h-6 w-6 text-destructive" />
        </div>
        <h2
          className="mb-2 text-xl font-bold text-foreground"
          style={{ fontFamily: "'Syne', sans-serif" }}
        >
          Failed to load course
        </h2>
        <p className="mb-6 text-sm text-muted-foreground">
          Something went wrong while fetching the course details.
        </p>
        <Button
          variant="outline"
          className="gap-2 border-border/60"
          onClick={onRetry}
        >
          <RefreshCw className="h-4 w-4" />
          Retry
        </Button>
      </div>
    </div>
  );
}

// ── Progress ring (reused from Courses.tsx) ───────────────────────────────────
function ProgressRing({ value, size = 40 }: { value: number; size?: number }) {
  const r = (size - 6) / 2;
  const circ = 2 * Math.PI * r;
  const dash = (Math.min(Math.max(value, 0), 100) / 100) * circ;
  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      aria-hidden="true"
    >
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke="hsl(var(--border))"
        strokeWidth={3}
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke="hsl(var(--primary))"
        strokeWidth={3}
        strokeDasharray={`${dash} ${circ - dash}`}
        strokeLinecap="round"
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
        style={{ transition: "stroke-dasharray 0.4s ease" }}
      />
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="central"
        fontSize="8"
        fontWeight="600"
        fill="hsl(var(--primary))"
        fontFamily="'Syne', sans-serif"
      >
        {Math.round(value)}%
      </text>
    </svg>
  );
}

// ── Module accordion item ─────────────────────────────────────────────────────
interface ModuleItemProps {
  mod: GenerateCourse["modules"][number];
  index: number;
  isActive: boolean;
  isOpen: boolean;
  onToggle: () => void;
  onActivate: () => void;
}
function ModuleItem({
  mod,
  index,
  isActive,
  isOpen,
  onToggle,
  onActivate,
}: ModuleItemProps) {
  const contentRef = useRef<HTMLDivElement>(null);

  return (
    <div
      id={`module-${index}`}
      className={cn(
        "rounded-xl border transition-all duration-200",
        isActive
          ? "border-primary/30 bg-card/70"
          : "border-border/40 bg-card/40 hover:border-border/60 hover:bg-card/60"
      )}
    >
      {/* Header */}
      <button
        className="group flex w-full items-center gap-4 p-4 text-left sm:p-5"
        onClick={() => {
          onToggle();
          onActivate();
        }}
        aria-expanded={isOpen}
      >
        {/* Order badge */}
        <div
          className={cn(
            "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-xs font-bold transition-colors",
            isActive
              ? "bg-primary text-primary-foreground shadow-sm shadow-primary/30"
              : "bg-primary/10 text-primary"
          )}
          style={{ fontFamily: "'Syne', sans-serif" }}
        >
          {String(mod.order).padStart(2, "0")}
        </div>

        {/* Title */}
        <div className="min-w-0 flex-1">
          <h3
            className={cn(
              "truncate text-sm leading-snug font-semibold transition-colors",
              isActive ? "text-foreground" : "text-foreground/80"
            )}
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            {mod.title}
          </h3>
          <p className="mt-0.5 text-xs text-muted-foreground">
            {mod.topics.length} topic{mod.topics.length !== 1 ? "s" : ""}
          </p>
        </div>

        {/* Chevron */}
        <ChevronDown
          className={cn(
            "h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200",
            isOpen && "rotate-180"
          )}
        />
      </button>

      {/* Topics list — animated expand */}
      <div
        ref={contentRef}
        className={cn(
          "overflow-hidden transition-all duration-300 ease-in-out",
          isOpen ? "max-h-250 opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="space-y-1 border-t border-border/30 px-4 pt-3 pb-4 sm:px-5">
          {mod.topics
            .slice()
            .sort((a, b) => a.order - b.order)
            .map((topic, ti) => (
              <div
                key={ti}
                className="group/topic flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 transition-colors hover:bg-primary/5"
              >
                {/* Topic number */}
                <span className="w-5 shrink-0 text-right font-mono text-[10px] text-muted-foreground/50">
                  {String(topic.order).padStart(2, "0")}
                </span>
                {/* Dot indicator */}
                <Circle className="h-1.5 w-1.5 shrink-0 fill-primary/20 text-primary/40" />
                {/* Title */}
                <span className="flex-1 text-xs leading-snug text-muted-foreground transition-colors group-hover/topic:text-foreground">
                  {topic.title}
                </span>
                {/* Arrow on hover */}
                <ChevronRight className="h-3 w-3 shrink-0 text-muted-foreground/0 transition-colors group-hover/topic:text-primary/60" />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

// ── Sidebar TOC ───────────────────────────────────────────────────────────────
interface SidebarTOCProps {
  modules: GenerateCourse["modules"];
  activeModule: number;
  onSelect: (i: number) => void;
}
function SidebarTOC({ modules, activeModule, onSelect }: SidebarTOCProps) {
  return (
    <nav aria-label="Course modules">
      <p className="mb-3 px-1 text-[10px] font-semibold tracking-widest text-muted-foreground/60 uppercase">
        Modules
      </p>
      <ul className="space-y-1">
        {modules
          .slice()
          .sort((a, b) => a.order - b.order)
          .map((mod, i) => (
            <li key={i}>
              <button
                onClick={() => {
                  onSelect(i);
                  const el = document.getElementById(`module-${i}`);
                  el?.scrollIntoView({ behavior: "smooth", block: "start" });
                }}
                className={cn(
                  "group flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left transition-all duration-150",
                  activeModule === i
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-card/60 hover:text-foreground"
                )}
              >
                <span
                  className={cn(
                    "w-5 shrink-0 text-right font-mono text-[10px]",
                    activeModule === i
                      ? "text-primary/70"
                      : "text-muted-foreground/40"
                  )}
                >
                  {String(mod.order).padStart(2, "0")}
                </span>
                <span
                  className="line-clamp-2 flex-1 text-xs leading-snug"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  {mod.title}
                </span>
                {activeModule === i && (
                  <div className="h-1 w-1 shrink-0 rounded-full bg-primary" />
                )}
              </button>
            </li>
          ))}
      </ul>
    </nav>
  );
}

// ── Resource card ─────────────────────────────────────────────────────────────
function ResourceCard({
  resource,
}: {
  resource: GenerateCourse["resources"][number];
}) {
  return (
    <a
      href={resource.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center gap-3 rounded-lg border border-border/40 bg-card/40 px-4 py-3 transition-all hover:border-primary/20 hover:bg-card/70"
    >
      <ResourceIcon type={resource.type} />
      <div className="min-w-0 flex-1">
        <p className="truncate text-xs font-medium text-foreground transition-colors group-hover:text-primary">
          {resource.title}
        </p>
        <p className="mt-0.5 truncate text-[10px] text-muted-foreground/60">
          {resource.url}
        </p>
      </div>
      <ExternalLink className="h-3 w-3 shrink-0 text-muted-foreground/40 transition-colors group-hover:text-primary" />
    </a>
  );
}

// ── Main component ────────────────────────────────────────────────────────────
export default function CourseDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, isError, isLoading, refetch } = useGetCourse(id!);

  const [openModules, setOpenModules] = useState<Set<number>>(new Set([0]));
  const [activeModule, setActiveModule] = useState(0);
  const [mobileTocOpen, setMobileTocOpen] = useState(false);

  // Open first module on data load
  useEffect(() => {
    if (data?.modules?.length) {
      setOpenModules(new Set([0]));
      setActiveModule(0);
    }
  }, [data]);

  const toggleModule = (i: number) => {
    setOpenModules((prev) => {
      const next = new Set(prev);
      next.has(i) ? next.delete(i) : next.add(i);
      return next;
    });
  };

  // Computed stats
  const totalTopics =
    data?.modules?.reduce((s, m) => s + m.topics.length, 0) ?? 0;
  const levelStyle = data?.level
    ? (LEVEL_STYLES[data.level.toLowerCase()] ??
      "bg-primary/10 text-primary border-primary/20")
    : null;

  // ── Loading ──
  if (isLoading) {
    return (
      <div
        className="min-h-screen bg-background text-foreground"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        <Skeleton />
      </div>
    );
  }

  // ── Error ──
  if (isError || !data) {
    return (
      <div
        className="min-h-screen bg-background text-foreground"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        <ErrorState onRetry={() => refetch()} />
      </div>
    );
  }

  const sortedModules = [...data.modules].sort((a, b) => a.order - b.order);

  return (
    <div
      className="min-h-screen bg-background text-foreground"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      {/* ── Page background ── */}
      <div className="pointer-events-none fixed inset-0" aria-hidden="true">
        <div
          className="absolute top-0 left-1/2 h-100 w-175 -translate-x-1/2 rounded-full opacity-[0.04]"
          style={{
            background:
              "radial-gradient(ellipse, hsl(var(--primary)) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.012]"
          style={{
            backgroundImage:
              "linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl space-y-6 px-4 py-6 sm:px-6 sm:py-8">
        {/* ── Back nav ── */}
        <button
          onClick={() => navigate(-1)}
          className="group inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
          Back to courses
        </button>

        {/* ── Hero card ── */}
        {/* SIGNATURE: full-width hero with layered info — level badge, title, description, stat strip */}
        <div className="overflow-hidden rounded-2xl border border-border/40 bg-card/50">
          {/* Top accent bar */}
          <div className="h-0.5 w-full bg-linear-to-r from-primary/60 via-primary/20 to-transparent" />

          <div className="p-6 sm:p-8">
            <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-start">
              <div className="min-w-0 flex-1">
                {/* Badges row */}
                <div className="mb-3 flex flex-wrap items-center gap-2">
                  <div className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-2.5 py-1 text-[11px] font-medium text-primary">
                    <Sparkles className="h-3 w-3" />
                    AI Generated
                  </div>
                  {data.level && levelStyle && (
                    <Badge
                      variant="outline"
                      className={cn(
                        "border px-2.5 py-1 text-[11px]",
                        levelStyle
                      )}
                    >
                      <GraduationCap className="mr-1 h-3 w-3" />
                      {data.level}
                    </Badge>
                  )}
                  {data.topic && (
                    <Badge
                      variant="outline"
                      className="border-border/50 px-2.5 py-1 text-[11px] text-muted-foreground"
                    >
                      {data.topic}
                    </Badge>
                  )}
                </div>

                {/* Title */}
                <h1
                  className="mb-3 text-2xl leading-tight font-bold tracking-tight text-foreground sm:text-3xl lg:text-4xl"
                  style={{ fontFamily: "'Syne', sans-serif" }}
                >
                  {data.title}
                </h1>

                {/* Description */}
                {data.description && (
                  <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                    {data.description}
                  </p>
                )}
              </div>

              {/* Overall progress ring — desktop */}
              <div className="hidden shrink-0 flex-col items-center gap-1.5 sm:flex">
                <ProgressRing value={0} size={72} />
                <span className="text-center text-[10px] text-muted-foreground/60">
                  Overall progress
                </span>
              </div>
            </div>

            {/* Stat strip */}
            <div className="mt-6 flex flex-wrap items-center gap-4 border-t border-border/30 pt-5">
              <div className="flex items-center gap-2">
                <Layers className="h-3.5 w-3.5 text-primary" />
                <span className="text-sm text-muted-foreground">
                  <span
                    className="font-semibold text-foreground"
                    style={{ fontFamily: "'Syne', sans-serif" }}
                  >
                    {data.modules.length}
                  </span>{" "}
                  modules
                </span>
              </div>
              <span className="h-4 w-px bg-border/40" />
              <div className="flex items-center gap-2">
                <FileText className="h-3.5 w-3.5 text-primary" />
                <span className="text-sm text-muted-foreground">
                  <span
                    className="font-semibold text-foreground"
                    style={{ fontFamily: "'Syne', sans-serif" }}
                  >
                    {totalTopics}
                  </span>{" "}
                  topics
                </span>
              </div>
              {data.resources?.length > 0 && (
                <>
                  <span className="h-4 w-px bg-border/40" />
                  <div className="flex items-center gap-2">
                    <Link2 className="h-3.5 w-3.5 text-primary" />
                    <span className="text-sm text-muted-foreground">
                      <span
                        className="font-semibold text-foreground"
                        style={{ fontFamily: "'Syne', sans-serif" }}
                      >
                        {data.resources.length}
                      </span>{" "}
                      resources
                    </span>
                  </div>
                </>
              )}
              <span className="h-4 w-px bg-border/40" />
              <div className="flex items-center gap-2">
                <BarChart3 className="h-3.5 w-3.5 text-primary" />
                <span className="text-sm text-muted-foreground">
                  0% complete
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ── Mobile TOC toggle ── */}
        <div className="lg:hidden">
          <button
            onClick={() => setMobileTocOpen((p) => !p)}
            className="flex w-full items-center justify-between rounded-xl border border-border/40 bg-card/40 px-4 py-3 text-sm text-foreground"
          >
            <div className="flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-primary" />
              <span style={{ fontFamily: "'Syne', sans-serif" }}>
                Course contents
              </span>
              <Badge
                variant="outline"
                className="border-border/50 px-1.5 py-0 text-[10px] text-muted-foreground"
              >
                {data.modules.length}
              </Badge>
            </div>
            {mobileTocOpen ? (
              <X className="h-4 w-4 text-muted-foreground" />
            ) : (
              <Menu className="h-4 w-4 text-muted-foreground" />
            )}
          </button>

          {/* Mobile TOC panel */}
          {mobileTocOpen && (
            <div className="mt-2 rounded-xl border border-border/40 bg-card/60 p-4">
              <SidebarTOC
                modules={sortedModules}
                activeModule={activeModule}
                onSelect={(i) => {
                  setActiveModule(i);
                  setOpenModules((prev) => new Set([...prev, i]));
                  setMobileTocOpen(false);
                }}
              />
            </div>
          )}
        </div>

        {/* ── Two-column layout ── */}
        <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[220px_1fr] xl:grid-cols-[256px_1fr]">
          {/* ── Sticky sidebar TOC (desktop) ── */}
          <aside className="sticky top-6 hidden self-start lg:block">
            <div className="rounded-xl border border-border/40 bg-card/40 p-4">
              <div className="mb-4 flex items-center gap-2 border-b border-border/30 pb-3">
                <BookOpen className="h-3.5 w-3.5 text-primary" />
                <span
                  className="text-xs font-semibold text-foreground"
                  style={{ fontFamily: "'Syne', sans-serif" }}
                >
                  Contents
                </span>
                <Badge
                  variant="outline"
                  className="ml-auto border-border/50 px-1.5 py-0 text-[10px] text-muted-foreground"
                >
                  {data.modules.length}
                </Badge>
              </div>
              <SidebarTOC
                modules={sortedModules}
                activeModule={activeModule}
                onSelect={(i) => {
                  setActiveModule(i);
                  setOpenModules((prev) => new Set([...prev, i]));
                }}
              />

              {/* Quick actions */}
              <div className="mt-4 space-y-1.5 border-t border-border/30 pt-4">
                <button
                  onClick={() =>
                    setOpenModules(new Set(sortedModules.map((_, i) => i)))
                  }
                  className="w-full rounded-md px-2 py-1.5 text-left text-xs text-muted-foreground transition-colors hover:bg-card/60 hover:text-foreground"
                >
                  Expand all
                </button>
                <button
                  onClick={() => setOpenModules(new Set())}
                  className="w-full rounded-md px-2 py-1.5 text-left text-xs text-muted-foreground transition-colors hover:bg-card/60 hover:text-foreground"
                >
                  Collapse all
                </button>
              </div>
            </div>
          </aside>

          {/* ── Main content ── */}
          <main className="min-w-0 space-y-3">
            {/* Modules header */}
            <div className="mb-1 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Layers className="h-4 w-4 text-primary" />
                <h2
                  className="text-base font-bold text-foreground"
                  style={{ fontFamily: "'Syne', sans-serif" }}
                >
                  Modules
                </h2>
                <Badge
                  variant="outline"
                  className="border-border/50 px-1.5 py-0 text-[10px] text-muted-foreground"
                >
                  {sortedModules.length}
                </Badge>
              </div>

              {/* Desktop expand/collapse */}
              <div className="hidden items-center gap-3 lg:flex">
                <button
                  onClick={() =>
                    setOpenModules(new Set(sortedModules.map((_, i) => i)))
                  }
                  className="text-xs text-muted-foreground transition-colors hover:text-primary"
                >
                  Expand all
                </button>
                <span className="h-3 w-px bg-border/50" />
                <button
                  onClick={() => setOpenModules(new Set())}
                  className="text-xs text-muted-foreground transition-colors hover:text-primary"
                >
                  Collapse all
                </button>
              </div>
            </div>

            {/* Module accordion list */}
            {sortedModules.map((mod, i) => (
              <ModuleItem
                key={i}
                mod={mod}
                index={i}
                isActive={activeModule === i}
                isOpen={openModules.has(i)}
                onToggle={() => toggleModule(i)}
                onActivate={() => setActiveModule(i)}
              />
            ))}

            {/* ── Resources section ── */}
            {data.resources?.length > 0 && (
              <div className="mt-8 pt-6">
                <div className="mb-4 flex items-center gap-2">
                  <Link2 className="h-4 w-4 text-primary" />
                  <h2
                    className="text-base font-bold text-foreground"
                    style={{ fontFamily: "'Syne', sans-serif" }}
                  >
                    Resources
                  </h2>
                  <Badge
                    variant="outline"
                    className="border-border/50 px-1.5 py-0 text-[10px] text-muted-foreground"
                  >
                    {data.resources.length}
                  </Badge>
                </div>

                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {data.resources.map((r, i) => (
                    <ResourceCard key={i} resource={r} />
                  ))}
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
