import { Link } from "react-router-dom";
import { format } from "date-fns";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import type { CourseListItem } from "../course.types";

interface CourseCardProps {
  course: CourseListItem;
}

export function CourseCard({ course }: CourseCardProps) {
  const progress =
    course.totalTopics > 0
      ? Math.round((course.totalCompletedTopics / course.totalTopics) * 100)
      : 0;

  return (
    <Link to={`/courses/${course.id}`} className="group block h-full">
      <Card className="flex h-full flex-col transition-shadow hover:border-primary/50 hover:shadow-md">
        <CardHeader>
          <div className="mb-2 flex items-start justify-between gap-4">
            <Badge variant="outline" className="bg-secondary">
              {course.topic}
            </Badge>
            {course.level && (
              <Badge variant="default" className="capitalize">
                {course.level}
              </Badge>
            )}
          </div>
          <CardTitle className="line-clamp-2 transition-colors group-hover:text-primary">
            {course.title}
          </CardTitle>
          {course.description && (
            <CardDescription className="mt-2 line-clamp-2">
              {course.description}
            </CardDescription>
          )}
        </CardHeader>
        <CardContent className="mt-auto">
          <div className="space-y-4">
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>{course.totalModules} Modules</span>
              <span>{course.totalTopics} Topics</span>
            </div>
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-medium">
                <span>Progress</span>
                <span>{progress}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between border-t pt-4 text-xs text-muted-foreground">
          <span>
            Created on {format(new Date(course.createdAt), "MMM d, yyyy")}
          </span>
        </CardFooter>
      </Card>
    </Link>
  );
}
