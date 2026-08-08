import { useSearchParams } from "react-router-dom";
import { useGetCourses } from "../hooks/useGetCourses";
import { CourseCard } from "./CourseCard";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { BookX } from "lucide-react";

export function CourseList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const search = searchParams.get("search") || undefined;
  const level = searchParams.get("level") || undefined;
  const page = Number(searchParams.get("page")) || 1;

  const { items, pagination, isLoading, isError, refetch } = useGetCourses({
    search,
    level,
    page,
    limit: 12,
  });

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-4 text-destructive w-full max-w-md">
          <p className="mb-4">Failed to load courses.</p>
          <Button variant="outline" onClick={() => refetch()}>
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="flex flex-col space-y-3 h-[250px]">
            <Skeleton className="h-[125px] w-full rounded-xl" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[200px]" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!items.length) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
        <div className="bg-muted p-4 rounded-full">
          <BookX className="h-10 w-10 text-muted-foreground" />
        </div>
        <h3 className="text-xl font-semibold">No courses found</h3>
        <p className="text-muted-foreground max-w-md mx-auto">
          We couldn't find any courses matching your current filters. Try adjusting your search or generate a new course.
        </p>
      </div>
    );
  }

  const handlePageChange = (newPage: number) => {
    setSearchParams(
      (prev) => {
        prev.set("page", String(newPage));
        return prev;
      },
      { replace: false }
    );
  };

  return (
    <div className="space-y-8">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {items.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>

      {pagination && pagination.totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 pt-8">
          <Button
            variant="outline"
            disabled={pagination.page <= 1}
            onClick={() => handlePageChange(pagination.page - 1)}
          >
            Previous
          </Button>
          <span className="text-sm font-medium">
            Page {pagination.page} of {pagination.totalPages}
          </span>
          <Button
            variant="outline"
            disabled={pagination.page >= pagination.totalPages}
            onClick={() => handlePageChange(pagination.page + 1)}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
}
