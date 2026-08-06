import { useSearchParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useCourses } from "@/features/course/api/get-courses";
import { CourseCard } from "@/features/course/components/CourseCard";
import { CourseSearch } from "@/features/course/components/CourseSearch";
import { CoursePagination } from "@/features/course/components/CoursePagination";
import { BookOpen, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Courses() {
  const [searchParams] = useSearchParams();

  const query = {
    page: Number(searchParams.get("page")) || 1,
    limit: 9,
    search: searchParams.get("search") || undefined,
    level: searchParams.get("level") || undefined,
  };

  const { data, isLoading, isError } = useCourses(query);

  return (
    <>
      {/* Hero Section */}
      <div className="mb-12">
        <h1 className="mb-4 text-4xl font-black tracking-tighter text-foreground sm:text-6xl">
          Explore Courses
        </h1>
        <p className="max-w-2xl text-xl font-medium text-muted-foreground">
          Find the perfect course to advance your skills. Browse the catalog or
          search for specific topics.
        </p>
      </div>

      {/* Stats & Search Box */}
      <div className="mb-12 flex flex-col gap-4 rounded-2xl border-2 border-border bg-muted/30 p-4 md:mb-16 md:gap-6 md:rounded-[2rem] md:p-8">
        <div className="mb-2 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center md:mb-4">
          <div className="flex items-center gap-3 md:gap-4">
            <div className="flex size-12 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm md:size-14 md:rounded-2xl">
              <BookOpen className="size-5 md:size-6" />
            </div>
            <div>
              <h2 className="text-xs font-bold tracking-wider text-muted-foreground uppercase md:text-sm">
                Total Available
              </h2>
              <div className="text-2xl font-black text-foreground md:text-3xl">
                {isLoading ? "..." : data?.pagination.total || 0}
              </div>
            </div>
          </div>

          <Link to="/generate" className="w-full sm:w-auto">
            <Button
              size="lg"
              className="h-12 w-full rounded-full px-6 text-sm font-bold shadow-md transition-transform hover:-translate-y-1 sm:w-auto md:px-8 md:text-base"
            >
              Generate New Course
            </Button>
          </Link>
        </div>

        <CourseSearch />
      </div>

      {/* Course Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="h-[300px] animate-pulse rounded-3xl border-2 border-border bg-muted"
            />
          ))}
        </div>
      ) : isError ? (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <p className="mb-3 text-2xl font-bold text-destructive">
            Failed to load courses
          </p>
          <p className="text-lg text-muted-foreground">
            Please check your connection and try again.
          </p>
        </div>
      ) : data?.items.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <div className="mb-6 flex size-20 items-center justify-center rounded-full bg-muted">
            <Search className="size-10 text-muted-foreground opacity-50" />
          </div>
          <p className="mb-3 text-3xl font-bold text-foreground">
            No courses found
          </p>
          <p className="max-w-md text-lg text-muted-foreground">
            We couldn't find anything matching your search. Try adjusting your
            filters or generating a new course.
          </p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {data?.items.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>

          {data && (
            <CoursePagination
              currentPage={data.pagination.page}
              totalPages={data.pagination.totalPages}
            />
          )}
        </>
      )}
    </>
  );
}
