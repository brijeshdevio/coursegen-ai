// Courses.tsx — CourseGen AI
// Matches Home.tsx + Signup.tsx + Login.tsx design system:
//   Fonts  : Syne (display) + DM Sans (body) — must be loaded in index.html
//   Accent : hsl(var(--primary)) → violet
//   Borders: near-invisible (border/40 – border/50)
//   Depth  : bg-background → bg-card/40 → bg-card elevation layers
// SIGNATURE: Hero stat bar with live progress ring per course card +
//            shimmer skeleton states that match card proportions exactly

import { useState, useMemo } from "react";
import {
  Search,
  BookOpen,
  Layers,
  FileText,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  LayoutGrid,
  List,
  AlertCircle,
  RefreshCw,
  GraduationCap,
  Clock,
  BarChart3,
  Filter,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useGetCourses } from "@/features/course/hooks/useGetCourses";
import { useGetCourseStats } from "@/features/course/hooks/useGetCourseStats";
import { useDebounce } from "@/hooks/useDebounce";
import type { CourseListItem } from "@/features/course/course.types";
import { Link } from "react-router-dom";

// ── Constants ─────────────────────────────────────────────────────────────────
const LEVELS = [
  { value: "", label: "All levels" },
  { value: "beginner", label: "Beginner" },
  { value: "intermediate", label: "Intermediate" },
  { value: "advanced", label: "Advanced" },
] as const;

const LIMIT = 9;

// ── Level color map ───────────────────────────────────────────────────────────
const LEVEL_STYLES: Record<string, string> = {
  beginner: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  intermediate: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  advanced: "bg-rose-500/10 text-rose-400 border-rose-500/20",
};

// ── Circular progress ring ────────────────────────────────────────────────────
// SIGNATURE element: each card gets a micro progress ring instead of a bar
function ProgressRing({ value, size = 36 }: { value: number; size?: number }) {
  const r = (size - 6) / 2;
  const circ = 2 * Math.PI * r;
  const progress = Math.min(Math.max(value, 0), 100);
  const dash = (progress / 100) * circ;

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      aria-hidden="true"
      className="shrink-0"
    >
      {/* Track */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke="hsl(var(--border))"
        strokeWidth={3}
      />
      {/* Fill */}
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
      {/* Text */}
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
        {Math.round(progress)}%
      </text>
    </svg>
  );
}

// ── Skeleton card ─────────────────────────────────────────────────────────────
function SkeletonCard() {
  return (
    <div className="animate-pulse space-y-4 rounded-xl border border-border/40 bg-card/40 p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 space-y-2">
          <div className="h-3 w-16 rounded-full bg-muted/50" />
          <div className="h-4 w-4/5 rounded-full bg-muted/60" />
          <div className="h-4 w-3/5 rounded-full bg-muted/40" />
        </div>
        <div className="h-9 w-9 shrink-0 rounded-full bg-muted/40" />
      </div>
      <div className="h-3 w-full rounded-full bg-muted/30" />
      <div className="h-3 w-2/3 rounded-full bg-muted/30" />
      <div className="flex gap-3 pt-1">
        <div className="h-3 w-20 rounded-full bg-muted/40" />
        <div className="h-3 w-20 rounded-full bg-muted/40" />
      </div>
      <div className="h-px bg-border/30" />
      <div className="flex items-center justify-between">
        <div className="h-3 w-24 rounded-full bg-muted/30" />
        <div className="h-7 w-20 rounded-md bg-muted/40" />
      </div>
    </div>
  );
}

// ── Stats skeleton ────────────────────────────────────────────────────────────
function StatsSkeleton() {
  return (
    <div className="grid animate-pulse grid-cols-2 gap-3 lg:grid-cols-4">
      {[...Array(4)].map((_, i) => (
        <div
          key={i}
          className="space-y-2 rounded-xl border border-border/40 bg-card/40 p-4"
        >
          <div className="h-3 w-20 rounded-full bg-muted/40" />
          <div className="h-7 w-12 rounded-full bg-muted/60" />
        </div>
      ))}
    </div>
  );
}

// ── Stat card ─────────────────────────────────────────────────────────────────
interface StatCardProps {
  icon: React.ElementType;
  label: string;
  value: number;
  sub?: string;
}
function StatCard({ icon: Icon, label, value, sub }: StatCardProps) {
  return (
    <div className="rounded-xl border border-border/40 bg-card/40 p-4 transition-colors hover:bg-card/70">
      <div className="mb-2 flex items-center gap-2">
        <Icon className="h-3.5 w-3.5 text-primary" />
        <span className="text-xs text-muted-foreground">{label}</span>
      </div>
      <p
        className="text-2xl font-bold text-foreground"
        style={{ fontFamily: "'Syne', sans-serif" }}
      >
        {value.toLocaleString()}
      </p>
      {sub && (
        <p className="mt-0.5 text-[11px] text-muted-foreground/60">{sub}</p>
      )}
    </div>
  );
}

// ── Course card ───────────────────────────────────────────────────────────────
interface CourseCardProps {
  course: CourseListItem;
  view: "grid" | "list";
}
function CourseCard({ course, view }: CourseCardProps) {
  const completionPct =
    course.totalTopics > 0
      ? (course.totalCompletedTopics / course.totalTopics) * 100
      : 0;

  const formattedDate = new Date(course.createdAt).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  const levelStyle = course.level
    ? (LEVEL_STYLES[course.level.toLowerCase()] ??
      "bg-primary/10 text-primary border-primary/20")
    : null;

  if (view === "list") {
    return (
      <div className="group flex cursor-pointer items-center gap-4 rounded-xl border border-border/40 bg-card/40 p-4 transition-colors hover:bg-card/70">
        {/* Progress ring */}
        <ProgressRing value={completionPct} size={40} />

        {/* Content */}
        <div className="min-w-0 flex-1">
          <div className="mb-0.5 flex flex-wrap items-center gap-2">
            {course.level && levelStyle && (
              <Badge
                variant="outline"
                className={cn("border px-2 py-0 text-[10px]", levelStyle)}
              >
                {course.level}
              </Badge>
            )}
            <span className="text-[11px] text-muted-foreground/60">
              {formattedDate}
            </span>
          </div>
          <h3
            className="truncate text-sm font-semibold text-foreground"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            {course.title}
          </h3>
          {course.description && (
            <p className="mt-0.5 truncate text-xs text-muted-foreground">
              {course.description}
            </p>
          )}
        </div>

        {/* Meta */}
        <div className="hidden shrink-0 items-center gap-4 sm:flex">
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Layers className="h-3.5 w-3.5" />
            {course.totalModules}
          </div>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <FileText className="h-3.5 w-3.5" />
            {course.totalTopics}
          </div>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <CheckCircle2 className="h-3.5 w-3.5 text-primary" />
            {course.totalCompletedTopics}/{course.totalTopics}
          </div>
        </div>

        {/* CTA */}
        <Link to={`/courses/${course.id}`}>
          <Button
            size="sm"
            variant="outline"
            className="h-8 shrink-0 border-border/60 text-xs opacity-0 transition-all group-hover:opacity-100 hover:border-primary/40 hover:text-primary"
            onClick={() => {
              /* navigate to /courses/:id */
            }}
          >
            Open
          </Button>
        </Link>
      </div>
    );
  }

  // Grid view
  return (
    <div className="group flex cursor-pointer flex-col gap-4 rounded-xl border border-border/40 bg-card/40 p-5 transition-all duration-200 hover:border-primary/20 hover:bg-card/70">
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <div className="mb-2 flex flex-wrap items-center gap-2">
            {course.level && levelStyle && (
              <Badge
                variant="outline"
                className={cn("border px-2 py-0 text-[10px]", levelStyle)}
              >
                {course.level}
              </Badge>
            )}
          </div>
          <h3
            className="line-clamp-2 text-sm leading-snug font-semibold text-foreground"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            {course.title}
          </h3>
        </div>
        <ProgressRing value={completionPct} size={36} />
      </div>

      {/* Description */}
      {course.description && (
        <p className="-mt-1 line-clamp-2 text-xs leading-relaxed text-muted-foreground">
          {course.description}
        </p>
      )}

      {/* Stats row */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Layers className="h-3 w-3 text-primary/70" />
          <span>{course.totalModules} modules</span>
        </div>
        <span className="h-3 w-px bg-border/50" />
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <FileText className="h-3 w-3 text-primary/70" />
          <span>{course.totalTopics} topics</span>
        </div>
        <span className="h-3 w-px bg-border/50" />
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <CheckCircle2 className="h-3 w-3 text-primary/70" />
          <span>
            {course.totalCompletedTopics}/{course.totalTopics} done
          </span>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-auto flex items-center justify-between border-t border-border/30 pt-3">
        <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground/60">
          <Clock className="h-3 w-3" />
          {formattedDate}
        </div>
        <Link to={`/courses/${course.id}`}>
          <Button
            size="sm"
            className="h-7 gap-1.5 text-xs opacity-0 shadow-sm shadow-primary/10 transition-all group-hover:opacity-100"
            onClick={() => {
              /* navigate to /courses/:id */
            }}
          >
            Open course
            <ChevronRight className="h-3 w-3" />
          </Button>
        </Link>
      </div>
    </div>
  );
}

// ── Empty state ───────────────────────────────────────────────────────────────
function EmptyState({ hasSearch }: { hasSearch: boolean }) {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10">
        {hasSearch ? (
          <Search className="h-6 w-6 text-primary" />
        ) : (
          <BookOpen className="h-6 w-6 text-primary" />
        )}
      </div>
      <h3
        className="mb-2 text-lg font-bold text-foreground"
        style={{ fontFamily: "'Syne', sans-serif" }}
      >
        {hasSearch ? "No courses match your search" : "No courses yet"}
      </h3>
      <p className="mb-6 max-w-xs text-sm text-muted-foreground">
        {hasSearch
          ? "Try a different search term or clear the filters to see all courses."
          : "Generate your first AI-powered course to get started. It only takes seconds."}
      </p>
      {!hasSearch && (
        <Button className="gap-2 shadow-md shadow-primary/20">
          <Sparkles className="h-4 w-4" />
          Generate a course
        </Button>
      )}
    </div>
  );
}

// ── Error state ───────────────────────────────────────────────────────────────
function ErrorState({ onRetry }: { onRetry: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-destructive/20 bg-destructive/10">
        <AlertCircle className="h-6 w-6 text-destructive" />
      </div>
      <h3
        className="mb-2 text-lg font-bold text-foreground"
        style={{ fontFamily: "'Syne', sans-serif" }}
      >
        Something went wrong
      </h3>
      <p className="mb-6 text-sm text-muted-foreground">
        Failed to load courses. Please try again.
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
  );
}

// ── Pagination ────────────────────────────────────────────────────────────────
interface PaginationBarProps {
  page: number;
  totalPages: number;
  total: number;
  limit: number;
  onPageChange: (p: number) => void;
}
function PaginationBar({
  page,
  totalPages,
  total,
  limit,
  onPageChange,
}: PaginationBarProps) {
  if (totalPages <= 1) return null;

  const from = (page - 1) * limit + 1;
  const to = Math.min(page * limit, total);

  // Page numbers to render — always show first, last, current ± 1
  const pages = useMemo(() => {
    const set = new Set([1, totalPages, page, page - 1, page + 1]);
    return [...set]
      .filter((p) => p >= 1 && p <= totalPages)
      .sort((a, b) => a - b);
  }, [page, totalPages]);

  return (
    <div className="flex flex-col items-center justify-between gap-4 border-t border-border/30 pt-6 sm:flex-row">
      <p className="order-2 text-xs text-muted-foreground sm:order-1">
        Showing{" "}
        <span className="font-medium text-foreground">
          {from}–{to}
        </span>{" "}
        of <span className="font-medium text-foreground">{total}</span> courses
      </p>

      <div className="order-1 flex items-center gap-1 sm:order-2">
        <Button
          variant="outline"
          size="sm"
          className="h-8 w-8 border-border/50 p-0"
          disabled={page === 1}
          onClick={() => onPageChange(page - 1)}
          aria-label="Previous page"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        {pages.map((p, i) => {
          const prev = pages[i - 1];
          const showEllipsis = prev && p - prev > 1;
          return (
            <div key={p} className="flex items-center gap-1">
              {showEllipsis && (
                <span className="px-1 text-xs text-muted-foreground">…</span>
              )}
              <Button
                variant={p === page ? "default" : "outline"}
                size="sm"
                className={cn(
                  "h-8 w-8 p-0 text-xs",
                  p === page
                    ? "shadow-sm shadow-primary/20"
                    : "border-border/50"
                )}
                onClick={() => onPageChange(p)}
                aria-current={p === page ? "page" : undefined}
              >
                {p}
              </Button>
            </div>
          );
        })}

        <Button
          variant="outline"
          size="sm"
          className="h-8 w-8 border-border/50 p-0"
          disabled={page === totalPages}
          onClick={() => onPageChange(page + 1)}
          aria-label="Next page"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

// ── Main page ─────────────────────────────────────────────────────────────────
export default function Courses() {
  const [page, setPage] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const [level, setLevel] = useState("");
  const [view, setView] = useState<"grid" | "list">("grid");

  // Debounce search — 400ms
  const search = useDebounce(searchInput, 400);

  // Reset to page 1 on filter change
  const handleSearch = (val: string) => {
    setSearchInput(val);
    setPage(1);
  };
  const handleLevel = (val: string) => {
    setLevel(val);
    setPage(1);
  };

  // Data hooks
  const {
    items,
    pagination,
    isLoading: coursesLoading,
    isError: coursesError,
    refetch: refetchCourses,
  } = useGetCourses({ page, limit: LIMIT, level, search });

  const {
    data: stats,
    isLoading: statsLoading,
    isError: statsError,
    refetch: refetchStats,
  } = useGetCourseStats();

  const completionPct =
    stats && stats.totalTopics > 0
      ? Math.round((stats.completedTopics / stats.totalTopics) * 100)
      : 0;

  const hasActiveFilter = !!search || !!level;

  return (
    <div
      className="min-h-screen bg-background text-foreground"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      {/* ── Page background ── */}
      <div className="pointer-events-none fixed inset-0" aria-hidden="true">
        <div
          className="absolute top-0 right-0 h-125 w-125 rounded-full opacity-[0.04]"
          style={{
            background:
              "radial-gradient(circle, hsl(var(--primary)) 0%, transparent 70%)",
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

      <div className="relative mx-auto max-w-7xl space-y-8 px-4 py-8 sm:px-6">
        {/* ── Page header ── */}
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1.5 text-xs font-medium text-primary">
              <GraduationCap className="h-3 w-3" />
              Your courses
            </div>
            <h1
              className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              Course library
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              All your AI-generated courses in one place.
            </p>
          </div>

          <Button className="shrink-0 gap-2 self-start shadow-md shadow-primary/20 sm:self-auto">
            <Sparkles className="h-4 w-4" />
            Generate course
          </Button>
        </div>

        {/* ── Stats row ── */}
        {statsLoading && <StatsSkeleton />}
        {statsError && !statsLoading && (
          <div className="flex items-center gap-3 rounded-xl border border-destructive/20 bg-destructive/5 px-4 py-3 text-sm text-destructive">
            <AlertCircle className="h-4 w-4 shrink-0" />
            Failed to load stats.
            <button
              onClick={() => refetchStats()}
              className="ml-auto text-xs underline underline-offset-4 transition-opacity hover:opacity-70"
            >
              Retry
            </button>
          </div>
        )}
        {stats && !statsLoading && (
          <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
            <StatCard
              icon={BookOpen}
              label="Total courses"
              value={stats.totalCourses}
            />
            <StatCard
              icon={Layers}
              label="Total modules"
              value={stats.totalModules}
            />
            <StatCard
              icon={FileText}
              label="Total topics"
              value={stats.totalTopics}
            />
            <StatCard
              icon={BarChart3}
              label="Completed topics"
              value={stats.completedTopics}
              sub={`${completionPct}% overall completion`}
            />
          </div>
        )}

        {/* ── Toolbar: search + level + view toggle ── */}
        <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center">
          {/* Search */}
          <div className="relative w-full max-w-sm flex-1">
            <Search className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground/60" />
            <Input
              value={searchInput}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Search courses…"
              className="h-10 border-border/50 bg-card/40 pl-9 text-sm transition-colors placeholder:text-muted-foreground/50 hover:border-border focus-visible:ring-primary/40"
            />
            {searchInput && (
              <button
                onClick={() => handleSearch("")}
                className="absolute top-1/2 right-3 -translate-y-1/2 text-muted-foreground/60 transition-colors hover:text-foreground"
                aria-label="Clear search"
              >
                <span className="text-xs">✕</span>
              </button>
            )}
          </div>

          <div className="flex w-full items-center gap-2 sm:w-auto">
            {/* Level filter */}
            <div className="relative">
              <Filter className="pointer-events-none absolute top-1/2 left-3 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground/60" />
              <select
                value={level}
                onChange={(e) => handleLevel(e.target.value)}
                className={cn(
                  "h-10 rounded-md border bg-card/40 pr-8 pl-8 text-sm text-foreground",
                  "focus:ring-2 focus:ring-primary/40 focus:ring-offset-0 focus:outline-none",
                  "cursor-pointer appearance-none transition-colors hover:border-border",
                  level
                    ? "border-primary/40 text-primary"
                    : "border-border/50 text-muted-foreground"
                )}
                aria-label="Filter by level"
              >
                {LEVELS.map((l) => (
                  <option key={l.value} value={l.value}>
                    {l.label}
                  </option>
                ))}
              </select>
              <ChevronRight className="pointer-events-none absolute top-1/2 right-2.5 h-3 w-3 -translate-y-1/2 rotate-90 text-muted-foreground/60" />
            </div>

            {/* Active filter badge */}
            {hasActiveFilter && (
              <button
                onClick={() => {
                  handleSearch("");
                  handleLevel("");
                }}
                className="flex h-10 shrink-0 items-center gap-1.5 rounded-md border border-primary/30 bg-primary/10 px-3 text-xs font-medium text-primary transition-colors hover:bg-primary/20"
              >
                Clear filters
              </button>
            )}

            {/* View toggle */}
            <div className="ml-auto flex items-center gap-1 rounded-md border border-border/50 bg-card/40 p-1 sm:ml-0">
              <button
                onClick={() => setView("grid")}
                className={cn(
                  "flex h-7 w-7 items-center justify-center rounded transition-colors",
                  view === "grid"
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:text-foreground"
                )}
                aria-label="Grid view"
                aria-pressed={view === "grid"}
              >
                <LayoutGrid className="h-3.5 w-3.5" />
              </button>
              <button
                onClick={() => setView("list")}
                className={cn(
                  "flex h-7 w-7 items-center justify-center rounded transition-colors",
                  view === "list"
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:text-foreground"
                )}
                aria-label="List view"
                aria-pressed={view === "list"}
              >
                <List className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* ── Result count ── */}
        {!coursesLoading && !coursesError && pagination && (
          <div className="flex items-center gap-2">
            <p className="text-xs text-muted-foreground">
              {pagination.total === 0
                ? "No courses found"
                : `${pagination.total} course${pagination.total !== 1 ? "s" : ""} found`}
            </p>
            {hasActiveFilter && (
              <Badge
                variant="outline"
                className="border-primary/30 bg-primary/5 px-2 py-0 text-[10px] text-primary"
              >
                filtered
              </Badge>
            )}
          </div>
        )}

        {/* ── Course grid / list ── */}
        {coursesLoading && (
          <div
            className={cn(
              view === "grid"
                ? "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
                : "flex flex-col gap-3"
            )}
          >
            {[...Array(LIMIT)].map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        )}

        {coursesError && !coursesLoading && (
          <ErrorState onRetry={() => refetchCourses()} />
        )}

        {!coursesLoading && !coursesError && items?.length === 0 && (
          <EmptyState hasSearch={hasActiveFilter} />
        )}

        {!coursesLoading && !coursesError && items && items.length > 0 && (
          <>
            <div
              className={cn(
                view === "grid"
                  ? "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
                  : "flex flex-col gap-3"
              )}
            >
              {items.map((course) => (
                <CourseCard key={course.id} course={course} view={view} />
              ))}
            </div>

            {/* ── Pagination ── */}
            {pagination && (
              <PaginationBar
                page={pagination.page}
                totalPages={pagination.totalPages}
                total={pagination.total}
                limit={pagination.limit}
                onPageChange={(p) => {
                  setPage(p);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}
