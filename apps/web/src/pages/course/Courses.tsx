import { BookOpen, Plus, Search, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCourses } from "@/features/course/hooks/useCourses";
import { CourseCardSkeleton } from "@/features/course/components/CourseCardSkeleton";
import { CourseCard } from "@/features/course/components/CourseCard";
import type { CourseCardType } from "@/types/course";

export default function Courses() {
  const { data, isPending } = useCourses();
  const items: CourseCardType[] = data?.items || [];

  return (
    <main className="mx-auto max-w-7xl px-6 py-10">
      {/* Header */}
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-4xl font-bold tracking-tight">
            My courses
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {23} courses in your library.
          </p>
        </div>
        <Button asChild size="lg" className="gap-2">
          <Link to="/generate">
            <Plus className="h-4 w-4" /> Generate new course
          </Link>
        </Button>
      </div>
      {/* Stats */}
      <div className="mt-8 flex flex-wrap items-center gap-6 rounded-2xl border border-border bg-card px-6 py-4">
        <Stat label="Total" value={23} />
        <Divider />
        <Stat label="In progress" value={12} accent="primary" />
        <Divider />
        <Stat label="Completed" value={11} accent="success" />
      </div>
      {/* Search + Filter */}
      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search courses..." className="pl-9" />
        </div>
        <Select>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All topics</SelectItem>
            <SelectItem value="not-started">Not started</SelectItem>
            <SelectItem value="in-progress">In progress</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
          </SelectContent>
        </Select>
      </div>
      {/* Grid */}
      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {isPending
          ? Array.from({ length: 8 }).map((_, index) => (
              <CourseCardSkeleton key={index} />
            ))
          : items.length > 0 &&
            items.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
      </div>
      {items.length == 0 && <EmptyState hasAny={items.length > 0} />}
    </main>
  );
}

function Stat({
  label,
  value,
  accent,
}: {
  label: string;
  value: number;
  accent?: "primary" | "success";
}) {
  const color =
    accent === "primary"
      ? "text-primary"
      : accent === "success"
        ? "text-success"
        : "text-foreground";
  return (
    <div className="flex items-baseline gap-2">
      <span className={`font-display text-2xl font-bold ${color}`}>
        {value}
      </span>
      <span className="text-xs tracking-wider text-muted-foreground uppercase">
        {label}
      </span>
    </div>
  );
}

function Divider() {
  return <span className="hidden h-6 w-px bg-border sm:block" />;
}

function EmptyState({ hasAny }: { hasAny: boolean }) {
  return (
    <div className="mt-16 flex flex-col items-center justify-center rounded-3xl border border-dashed border-border py-20 text-center">
      <div className="grid h-16 w-16 place-items-center rounded-2xl bg-primary/10 text-primary ring-1 ring-primary/30">
        {hasAny ? (
          <Search className="h-6 w-6" />
        ) : (
          <BookOpen className="h-6 w-6" />
        )}
      </div>
      <h3 className="font-display mt-6 text-2xl font-bold">
        {hasAny ? "No courses match" : "No courses yet"}
      </h3>
      <p className="mt-2 max-w-sm text-sm text-muted-foreground">
        {hasAny
          ? "Try a different search term or filter."
          : "Generate your first course to get started — any topic, any level."}
      </p>
      {!hasAny && (
        <Button asChild className="mt-6 gap-2">
          <Link to="/generate">
            <Sparkles className="h-4 w-4" /> Generate a course
          </Link>
        </Button>
      )}
    </div>
  );
}
