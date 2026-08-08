import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft, RefreshCcw } from "lucide-react";

import { useGetCourse } from "@/features/course/hooks/useGetCourse";
import { CourseHeader } from "@/features/course/components/CourseHeader";
import { CourseModules } from "@/features/course/components/CourseModules";
import { CourseResources } from "@/features/course/components/CourseResources";

export default function CourseDetails() {
  const { id } = useParams<{ id: string }>();

  const { data: course, isLoading, isError, refetch } = useGetCourse(id || "");

  if (isError) {
    return (
      <div className="flex min-h-[50vh] flex-col items-center justify-center space-y-4 text-center">
        <div className="w-full max-w-md rounded-lg border border-destructive/50 bg-destructive/10 p-6">
          <h2 className="mb-2 text-xl font-semibold text-destructive">
            Error Loading Course
          </h2>
          <p className="mb-6 text-destructive/80">
            We couldn't fetch the course details. Please check your connection
            or try again.
          </p>
          <Button
            onClick={() => refetch()}
            variant="outline"
            className="w-full"
          >
            <RefreshCcw className="mr-2 h-4 w-4" /> Try Again
          </Button>
        </div>
      </div>
    );
  }

  if (isLoading || !course) {
    return (
      <div className="mx-auto max-w-4xl animate-in space-y-8 duration-500 fade-in">
        <div className="space-y-4">
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-12 w-3/4" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
        </div>
        <div className="space-y-4 pt-8">
          <Skeleton className="mb-6 h-8 w-40" />
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-16 w-full rounded-lg" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl animate-in space-y-12 duration-500 fade-in">
      <div className="pt-2">
        <Link to="/courses">
          <Button
            variant="ghost"
            size="sm"
            className="pl-0 text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to My Courses
          </Button>
        </Link>
      </div>

      <CourseHeader course={course} />

      <div className="space-y-12">
        <CourseModules courseId={course.id} modules={course.modules} />
        <CourseResources resources={course.resources} />
      </div>
    </div>
  );
}
