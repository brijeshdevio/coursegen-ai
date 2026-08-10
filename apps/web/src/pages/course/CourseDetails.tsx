import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useGetCourse } from "@/features/course/hooks/useGetCourse";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Circle,
  ExternalLink,
  Layers,
  Link2,
} from "lucide-react";

export default function CourseDetails() {
  const { id } = useParams<{ id: string }>();
  const { data: course, isLoading, isError, refetch } = useGetCourse(id || "");
  const [descExpanded, setDescExpanded] = useState(false);

  if (isLoading) {
    return <CourseDetailsSkeleton />;
  }

  if (isError || !course) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <p className="mb-4 text-muted-foreground">
          Failed to load course details.
        </p>
        <Button variant="outline" onClick={() => refetch()}>
          Try again
        </Button>
      </div>
    );
  }

  // Calculate progress
  const totalTopics = course.modules.reduce(
    (sum, m) => sum + m.topics.length,
    0
  );
  const completedTopics = course.modules.reduce(
    (sum, m) => sum + m.topics.filter((t) => t.isCompleted).length,
    0
  );
  const progressPercent =
    totalTopics > 0 ? Math.round((completedTopics / totalTopics) * 100) : 0;

  // Find first incomplete topic for "Continue learning"
  const firstIncompleteTopic = (() => {
    for (const mod of course.modules) {
      for (const topic of mod.topics) {
        if (!topic.isCompleted) {
          return topic;
        }
      }
    }
    return null;
  })();

  // Description truncation
  const descriptionIsLong =
    course.description && course.description.length > 200;

  return (
    <div className="max-w-4xl space-y-8">
      {/* Back link */}
      <Link
        to="/courses"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to courses
      </Link>

      {/* Course Header */}
      <div className="space-y-6">
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            {course.topic && (
              <Badge variant="secondary" className="font-medium">
                {course.topic}
              </Badge>
            )}
            {course.level && (
              <Badge variant="outline" className="font-medium">
                {course.level}
              </Badge>
            )}
          </div>

          <h1 className="font-display text-3xl font-bold tracking-tight">
            {course.title}
          </h1>

          {course.description && (
            <div>
              <p
                className={`leading-relaxed text-muted-foreground ${
                  !descExpanded && descriptionIsLong ? "line-clamp-2" : ""
                }`}
              >
                {course.description}
              </p>
              {descriptionIsLong && (
                <button
                  onClick={() => setDescExpanded(!descExpanded)}
                  className="mt-1 text-sm font-medium text-primary hover:underline"
                >
                  {descExpanded ? "Show less" : "Show more"}
                </button>
              )}
            </div>
          )}
        </div>

        {/* Progress + Stats + CTA */}
        <Card className="border-border/50">
          <CardContent className="space-y-4 p-6">
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium text-muted-foreground">
                Course progress
              </span>
              <span className="font-bold">{progressPercent}%</span>
            </div>
            <Progress value={progressPercent} className="h-2" />

            <div className="flex flex-col gap-4 pt-2 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <Layers className="h-4 w-4" />
                  {course.modules.length} modules
                </span>
                <span className="flex items-center gap-1.5">
                  <BookOpen className="h-4 w-4" />
                  {totalTopics} topics
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4" />
                  {progressPercent}% complete
                </span>
              </div>

              {firstIncompleteTopic && (
                <Link
                  to={`/courses/${course.id}/topics/${firstIncompleteTopic.id}`}
                >
                  <Button size="sm">
                    Continue learning
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      <Separator />

      {/* Modules List */}
      <div className="space-y-4">
        <h2 className="font-display text-xl font-bold">Modules</h2>

        <Accordion className="space-y-3">
          {course.modules
            .sort((a, b) => a.order - b.order)
            .map((mod) => {
              const modCompleted = mod.topics.filter(
                (t) => t.isCompleted
              ).length;
              const modTotal = mod.topics.length;

              return (
                <AccordionItem
                  key={mod.id}
                  value={mod.id}
                  className="overflow-hidden rounded-xl border border-border/50 px-0 transition-shadow data-[state=open]:shadow-sm"
                >
                  <AccordionTrigger className="px-5 py-4 transition-colors hover:bg-muted/30 hover:no-underline [&[data-state=open]]:bg-muted/30">
                    <div className="flex w-full items-center gap-5">
                      <span className="w-10 shrink-0 text-center font-display text-3xl font-bold text-muted-foreground/30 tabular-nums">
                        {String(mod.order).padStart(2, "0")}
                      </span>
                      <div className="flex-1 text-left">
                        <p className="text-base font-semibold">{mod.title}</p>
                        <p className="mt-0.5 text-sm text-muted-foreground">
                          {modCompleted}/{modTotal} topics completed
                        </p>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-5 pt-0 pb-4">
                    <div className="ml-[60px] space-y-1">
                      {mod.topics
                        .sort((a, b) => a.order - b.order)
                        .map((topic) => (
                          <Link
                            key={topic.id}
                            to={`/courses/${course.id}/topics/${topic.id}`}
                            className="group -mx-3 flex items-center justify-between rounded-lg px-3 py-2.5 transition-colors hover:bg-muted/50"
                          >
                            <div className="flex items-center gap-3">
                              {topic.isCompleted ? (
                                <CheckCircle2 className="h-4 w-4 shrink-0 text-primary" />
                              ) : (
                                <Circle className="h-4 w-4 shrink-0 text-muted-foreground/40" />
                              )}
                              <span
                                className={`text-sm ${
                                  topic.isCompleted
                                    ? "text-muted-foreground"
                                    : "text-foreground"
                                }`}
                              >
                                {topic.title}
                              </span>
                            </div>
                            <span className="text-xs text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100">
                              View →
                            </span>
                          </Link>
                        ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              );
            })}
        </Accordion>
      </div>

      {/* Resources Section */}
      {course.resources && course.resources.length > 0 && (
        <>
          <Separator />
          <div className="space-y-4">
            <h2 className="font-display text-xl font-bold">Free Resources</h2>

            <div className="grid gap-3 sm:grid-cols-2">
              {course.resources.map((resource) => {
                let domain = "";
                try {
                  domain = new URL(resource.url).hostname.replace("www.", "");
                } catch {
                  domain = resource.url;
                }

                return (
                  <a
                    key={resource.id}
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group"
                  >
                    <Card className="h-full border-border/50 transition-all hover:border-primary/30 hover:shadow-sm">
                      <CardContent className="flex items-start gap-3 p-4">
                        <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-muted">
                          <Link2 className="h-4 w-4 text-muted-foreground" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="mb-1 flex items-center gap-2">
                            <Badge
                              variant="outline"
                              className="shrink-0 text-[10px] tracking-wider uppercase"
                            >
                              {resource.type}
                            </Badge>
                          </div>
                          <p className="line-clamp-1 text-sm font-medium transition-colors group-hover:text-primary">
                            {resource.title}
                          </p>
                          <p className="mt-0.5 flex items-center gap-1 text-xs text-muted-foreground">
                            {domain}
                            <ExternalLink className="h-3 w-3" />
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </a>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

function CourseDetailsSkeleton() {
  return (
    <div className="max-w-4xl space-y-8">
      <Skeleton className="h-4 w-32" />
      <div className="space-y-4">
        <div className="flex gap-2">
          <Skeleton className="h-6 w-24 rounded-full" />
          <Skeleton className="h-6 w-20 rounded-full" />
        </div>
        <Skeleton className="h-9 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
      </div>
      <Card className="border-border/50">
        <CardContent className="space-y-4 p-6">
          <div className="flex justify-between">
            <Skeleton className="h-4 w-28" />
            <Skeleton className="h-4 w-10" />
          </div>
          <Skeleton className="h-2 w-full rounded-full" />
          <div className="flex justify-between pt-2">
            <div className="flex gap-4">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-4 w-24" />
            </div>
            <Skeleton className="h-9 w-36" />
          </div>
        </CardContent>
      </Card>
      <Separator />
      <div className="space-y-4">
        <Skeleton className="h-6 w-24" />
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} className="h-20 w-full rounded-xl" />
        ))}
      </div>
    </div>
  );
}
