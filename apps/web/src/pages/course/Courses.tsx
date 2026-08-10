import { useState } from "react";
import { Link } from "react-router-dom";
import { useGetCourses } from "@/features/course/hooks/useGetCourses";
import { useGetCourseStats } from "@/features/course/hooks/useGetCourseStats";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  BookOpen,
  CheckCircle2,
  Clock,
  Layers,
  Sparkles,
  Search,
  ArrowRight,
} from "lucide-react";
import { useDebounce } from "@/hooks/useDebounce";

export default function Courses() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [level, setLevel] = useState<string | undefined>(undefined);

  const query = useDebounce(search, 300);

  const { items, pagination, isLoading } = useGetCourses({
    page,
    limit: 9,
    search: query || undefined,
    level,
  });
  const { data: stats, isLoading: statsLoading } = useGetCourseStats();

  const inProgressCount = stats
    ? stats.totalCourses -
      (stats.completionRate === 100 ? stats.totalCourses : 0)
    : 0;

  return (
    <div className="space-y-8">
      {/* Page title */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-3xl font-bold tracking-tight">
            Dashboard
          </h1>
          <p className="mt-1 text-muted-foreground">
            Manage your courses and track progress.
          </p>
        </div>
        <Link to="/courses/generate">
          <Button>
            <Sparkles className="mr-2 h-4 w-4" />
            Generate Course
          </Button>
        </Link>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {statsLoading ? (
          Array.from({ length: 4 }).map((_, i) => (
            <Card key={i}>
              <CardContent className="p-6">
                <Skeleton className="mb-3 h-4 w-24" />
                <Skeleton className="h-8 w-16" />
              </CardContent>
            </Card>
          ))
        ) : (
          <>
            <Card className="border-border/50">
              <CardContent className="p-6">
                <div className="mb-3 flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
                    <BookOpen className="h-4 w-4 text-primary" />
                  </div>
                  <span className="text-sm font-medium text-muted-foreground">
                    Total Courses
                  </span>
                </div>
                <p className="font-display text-3xl font-bold">
                  {stats?.totalCourses ?? 0}
                </p>
              </CardContent>
            </Card>

            <Card className="border-border/50">
              <CardContent className="p-6">
                <div className="mb-3 flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-500/10">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                  </div>
                  <span className="text-sm font-medium text-muted-foreground">
                    Completed Topics
                  </span>
                </div>
                <p className="font-display text-3xl font-bold">
                  {stats?.completedTopics ?? 0}
                </p>
              </CardContent>
            </Card>

            <Card className="border-border/50">
              <CardContent className="p-6">
                <div className="mb-3 flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-500/10">
                    <Clock className="h-4 w-4 text-amber-500" />
                  </div>
                  <span className="text-sm font-medium text-muted-foreground">
                    In Progress
                  </span>
                </div>
                <p className="font-display text-3xl font-bold">
                  {inProgressCount}
                </p>
              </CardContent>
            </Card>

            <Card className="border-border/50">
              <CardContent className="p-6">
                <div className="mb-3 flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-500/10">
                    <Layers className="h-4 w-4 text-blue-500" />
                  </div>
                  <span className="text-sm font-medium text-muted-foreground">
                    Total Modules
                  </span>
                </div>
                <p className="font-display text-3xl font-bold">
                  {stats?.totalModules ?? 0}
                </p>
              </CardContent>
            </Card>
          </>
        )}
      </div>

      {/* Toolbar */}
      <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
        <div className="relative max-w-sm flex-1">
          <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search courses..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="pl-9"
          />
        </div>
        <div className="flex items-center gap-3">
          <Select
            value={level ?? "all"}
            onValueChange={(v) => {
              setLevel(v === "all" ? undefined : v!);
              setPage(1);
            }}
          >
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="All levels" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All levels</SelectItem>
              <SelectItem value="Beginner">Beginner</SelectItem>
              <SelectItem value="Intermediate">Intermediate</SelectItem>
              <SelectItem value="Advanced">Advanced</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Course Grid / Empty / Loading */}
      {isLoading ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <Card key={i} className="overflow-hidden border-border/50">
              <CardContent className="space-y-4 p-6">
                <Skeleton className="h-5 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
                <div className="space-y-3 pt-4">
                  <Skeleton className="h-3 w-full rounded-full" />
                  <div className="flex justify-between">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-4 w-16" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : items.length === 0 ? (
        /* Empty State */
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
            <Sparkles className="h-8 w-8 text-primary" />
          </div>
          <h3 className="mb-2 text-xl font-bold">No courses yet</h3>
          <p className="mb-6 max-w-sm text-muted-foreground">
            Start by generating your first AI-powered course. It only takes a
            few seconds.
          </p>
          <Link to="/courses/generate">
            <Button>
              Generate your first course
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      ) : (
        <>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {items.map((course) => {
              const progress =
                course.totalTopics > 0
                  ? Math.round(
                      (course.totalCompletedTopics / course.totalTopics) * 100
                    )
                  : 0;

              return (
                <Link key={course.id} to={`/courses/${course.id}`}>
                  <Card className="group h-full border-border/50 transition-all hover:border-primary/30 hover:shadow-md">
                    <CardContent className="flex h-full flex-col p-6">
                      <div className="mb-4 flex items-start justify-between">
                        <div className="min-w-0 flex-1">
                          <h3 className="mb-1 line-clamp-2 text-lg leading-tight font-bold transition-colors group-hover:text-primary">
                            {course.title}
                          </h3>
                          <p className="line-clamp-1 text-sm text-muted-foreground">
                            {course.topic}
                          </p>
                        </div>
                        {course.level && (
                          <Badge
                            variant="outline"
                            className="ml-3 shrink-0 text-xs"
                          >
                            {course.level}
                          </Badge>
                        )}
                      </div>

                      {course.description && (
                        <p className="mb-4 line-clamp-2 flex-1 text-sm text-muted-foreground">
                          {course.description}
                        </p>
                      )}

                      <div className="mt-auto space-y-3 border-t border-border/50 pt-4">
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <span>
                            {course.totalCompletedTopics}/{course.totalTopics}{" "}
                            topics
                          </span>
                          <span className="font-medium">{progress}%</span>
                        </div>
                        <Progress value={progress} className="h-1.5" />
                        <div className="flex items-center justify-between pt-1 text-xs text-muted-foreground">
                          <span>{course.totalModules} modules</span>
                          <span>
                            {new Date(course.createdAt).toLocaleDateString(
                              "en-US",
                              {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              }
                            )}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>

          {/* Pagination */}
          {pagination && pagination.totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 pt-4">
              <Button
                variant="outline"
                size="sm"
                disabled={page <= 1}
                onClick={() => setPage((p) => p - 1)}
              >
                Previous
              </Button>
              <div className="flex items-center gap-1">
                {Array.from({ length: pagination.totalPages }).map((_, i) => (
                  <Button
                    key={i}
                    variant={page === i + 1 ? "default" : "ghost"}
                    size="sm"
                    className="h-9 w-9"
                    onClick={() => setPage(i + 1)}
                  >
                    {i + 1}
                  </Button>
                ))}
              </div>
              <Button
                variant="outline"
                size="sm"
                disabled={page >= pagination.totalPages}
                onClick={() => setPage((p) => p + 1)}
              >
                Next
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
