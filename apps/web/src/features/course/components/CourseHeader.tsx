import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import type { CourseDetails as CourseDetailsType } from "../course.types";

interface CourseHeaderProps {
  course: CourseDetailsType;
}

export function CourseHeader({ course }: CourseHeaderProps) {
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-2">
        <Badge
          variant="outline"
          className="bg-secondary px-3 py-1 text-sm text-secondary-foreground"
        >
          {course.topic}
        </Badge>
        {course.level && (
          <Badge className="px-3 py-1 text-sm capitalize">{course.level}</Badge>
        )}
      </div>

      <h1 className="text-3xl font-extrabold tracking-tight md:text-5xl">
        {course.title}
      </h1>

      {course.description && (
        <p className="max-w-3xl text-xl leading-relaxed text-muted-foreground">
          {course.description}
        </p>
      )}

      <div className="pt-2 text-sm text-muted-foreground">
        Generated on {format(new Date(course.createdAt), "MMMM d, yyyy")}
      </div>
    </div>
  );
}
