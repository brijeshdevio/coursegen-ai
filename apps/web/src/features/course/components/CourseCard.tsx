import { Link } from "react-router-dom";
import { Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { CourseCardType } from "@/types/course";

export const CourseCard = ({ course }: { course: CourseCardType }) => {
  return (
    <Link
      to={`/courses/${course.id}`}
      className="group card-hover relative flex flex-col rounded-2xl border border-border bg-card p-5"
    >
      <div className="flex items-start justify-between gap-2">
        <Badge>{course.topic}</Badge>
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
          className="hover:bg-elevated rounded-md p-1 text-muted-foreground opacity-0 transition group-hover:opacity-100 hover:text-destructive"
          aria-label="Delete course"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>

      <h3 className="font-display mt-4 line-clamp-2 text-lg leading-snug font-bold">
        {course.title}
      </h3>

      <div className="mt-auto pt-5">
        <div className="bg-elevated h-1.5 w-full overflow-hidden rounded-full">
          <div
            className="h-full rounded-full bg-primary transition-all"
            style={{ width: `${23}%` }}
          />
        </div>
        <div className="mt-2 flex items-center justify-between text-xs">
          <span className="font-mono text-muted-foreground">
            {course.completedChapters}/{course.chaptersCount} chapters
          </span>
          <span className="text-muted-foreground">
            {String(course.createdAt)}
          </span>
        </div>
      </div>
    </Link>
  );
};
