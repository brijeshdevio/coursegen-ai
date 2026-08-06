import { BookOpen, Layers, Target } from "lucide-react";
import type { CourseListItemResponse } from "../types";
import { Link } from "react-router-dom";

export function CourseCard({ course }: { course: CourseListItemResponse }) {
  const progress =
    Math.round((course.totalCompletedTopics / course.totalTopics) * 100) || 0;

  return (
    <Link
      to={`/courses/${course.id}`}
      className="group flex h-full flex-col rounded-2xl border-2 border-border bg-card p-6 shadow-sm transition-colors hover:border-primary/50"
    >
      <div className="mb-4 flex items-start justify-between">
        <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary">
          {course.topic}
        </span>
        {course.level && (
          <span className="inline-flex items-center rounded-full bg-muted px-3 py-1 text-xs font-bold text-muted-foreground">
            {course.level}
          </span>
        )}
      </div>

      <h3 className="mb-3 line-clamp-2 text-2xl font-bold tracking-tight text-card-foreground transition-colors group-hover:text-primary">
        {course.title}
      </h3>

      <p className="mb-8 line-clamp-2 grow text-base text-muted-foreground">
        {course.description || "No description provided."}
      </p>

      <div className="mt-auto">
        <div className="mb-4 flex items-center justify-between text-sm font-medium text-muted-foreground">
          <div className="flex items-center gap-2">
            <Layers className="size-4" />
            <span>{course.totalModules} Modules</span>
          </div>
          <div className="flex items-center gap-2">
            <BookOpen className="size-4" />
            <span>{course.totalTopics} Topics</span>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between text-sm font-bold">
            <span className="flex items-center gap-1.5">
              <Target className="size-4 text-primary" /> Progress
            </span>
            <span>{progress}%</span>
          </div>
          <div className="h-2.5 w-full overflow-hidden rounded-full bg-muted">
            <div
              className="h-full bg-primary transition-all duration-500 ease-in-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
    </Link>
  );
}
