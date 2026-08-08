import { useGetCourseStats } from "../hooks/useGetCourseStats";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { BookOpen, CheckCircle2, LayoutTemplate, Target } from "lucide-react";

export function CourseStats() {
  const { data, isLoading, isError } = useGetCourseStats();

  if (isError) {
    return (
      <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-4 text-destructive">
        Failed to load course statistics.
      </div>
    );
  }

  if (isLoading || !data) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={i}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <Skeleton className="h-4 w-[100px]" />
              <Skeleton className="h-4 w-4" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-8 w-[60px]" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  const statCards = [
    {
      title: "Total Courses",
      value: data.totalCourses,
      icon: BookOpen,
      color: "text-blue-500",
    },
    {
      title: "Total Modules",
      value: data.totalModules,
      icon: LayoutTemplate,
      color: "text-purple-500",
    },
    {
      title: "Completed Topics",
      value: data.completedTopics,
      icon: CheckCircle2,
      color: "text-green-500",
    },
    {
      title: "Completion Rate",
      value: `${data.completionRate}%`,
      icon: Target,
      color: "text-orange-500",
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {statCards.map((stat, i) => (
        <Card key={i}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {stat.title}
            </CardTitle>
            <stat.icon className={`h-4 w-4 ${stat.color}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
