import { useParams, Link } from "react-router-dom";
import { useCourseDetails } from "@/features/course/api/get-course-details";
import { Skeleton } from "@/components/ui/skeleton";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  ArrowLeft,
  CheckCircle2,
  Circle,
  ExternalLink,
  BookOpen,
  Clock,
  AlertCircle,
} from "lucide-react";

export default function CourseDetails() {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, isError, refetch } = useCourseDetails(id);

  if (isLoading) {
    return (
      <>
        <Skeleton className="mb-10 h-6 w-32 rounded-full" />
        <Skeleton className="mb-6 h-16 w-3/4 rounded-2xl md:h-20" />
        <Skeleton className="mb-8 h-24 w-full rounded-2xl" />
        <div className="mb-10 flex gap-4">
          <Skeleton className="h-8 w-24 rounded-full" />
          <Skeleton className="h-8 w-24 rounded-full" />
        </div>

        <Skeleton className="mb-12 h-32 w-full rounded-[2rem]" />

        <div className="space-y-4">
          <Skeleton className="h-24 w-full rounded-2xl" />
          <Skeleton className="h-24 w-full rounded-2xl" />
          <Skeleton className="h-24 w-full rounded-2xl" />
        </div>
      </>
    );
  }

  if (isError || !data) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-background p-6 text-center">
        <div className="mb-8 flex size-24 items-center justify-center rounded-[2rem] border-2 border-destructive/20 bg-destructive/10">
          <AlertCircle className="size-12 text-destructive" />
        </div>
        <h1 className="mb-4 text-4xl font-black tracking-tight text-foreground">
          Course Unavailable
        </h1>
        <p className="mb-10 max-w-md text-xl font-medium text-muted-foreground">
          We couldn't load the details for this course. It may have been removed
          or you might be offline.
        </p>
        <div className="flex gap-4">
          <Link to="/courses">
            <Button
              variant="outline"
              size="lg"
              className="h-14 rounded-full border-2 px-8 text-base font-bold"
            >
              Go Back
            </Button>
          </Link>
          <Button
            onClick={() => refetch()}
            size="lg"
            className="h-14 rounded-full px-8 text-base font-bold shadow-md"
          >
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  // Calculate overall progress
  const totalTopics = data.modules.reduce(
    (acc, mod) => acc + mod.topics.length,
    0
  );
  const completedTopics = data.modules.reduce(
    (acc, mod) => acc + mod.topics.filter((t) => t.isCompleted).length,
    0
  );
  const progressPercent =
    totalTopics === 0 ? 0 : Math.round((completedTopics / totalTopics) * 100);

  return (
    <>
      <Link
        to="/courses"
        className="mb-10 inline-flex items-center rounded-full border-2 border-border bg-muted/50 px-4 py-2 text-sm font-bold text-muted-foreground transition-colors hover:border-border/80 hover:text-foreground"
      >
        <ArrowLeft className="mr-2 size-4" />
        Back to Courses
      </Link>

      {/* Header Section */}
      <div className="mb-10">
        <h1 className="mb-4 text-3xl leading-tight font-black tracking-tight text-foreground md:text-5xl">
          {data.title}
        </h1>

        <p className="mb-6 max-w-3xl text-lg leading-relaxed font-medium text-muted-foreground">
          {data.description}
        </p>

        <div className="mb-8 flex flex-wrap items-center gap-3">
          <Badge
            variant="secondary"
            className="rounded-full border-0 bg-primary/10 px-3 py-1 text-sm font-bold text-primary transition-colors hover:bg-primary/20"
          >
            {data.topic}
          </Badge>
          {data.level && (
            <Badge
              variant="outline"
              className="rounded-full border border-border px-3 py-1 text-sm font-bold text-foreground"
            >
              {data.level}
            </Badge>
          )}
          <div className="mt-2 flex items-center gap-3 text-sm font-bold text-muted-foreground md:mt-0 md:ml-auto">
            <span className="flex items-center gap-1.5 rounded-full border border-border/50 bg-muted/50 px-3 py-1">
              <BookOpen className="size-4" /> {data.modules.length} Modules
            </span>
            <span className="flex items-center gap-1.5 rounded-full border border-border/50 bg-muted/50 px-3 py-1">
              <Clock className="size-4" /> {totalTopics} Topics
            </span>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-5 shadow-sm md:p-6">
          <div className="mb-3 flex items-end justify-between">
            <div>
              <h3 className="mb-1 font-bold text-foreground">
                Course Progress
              </h3>
              <p className="text-sm font-medium text-muted-foreground">
                {completedTopics} of {totalTopics} topics completed
              </p>
            </div>
            <span className="text-2xl font-black text-primary">
              {progressPercent}%
            </span>
          </div>
          <Progress
            value={progressPercent}
            className="rounded-full border border-border/30 bg-muted"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Curriculum Section */}
        <div className="lg:col-span-2">
          <h2 className="mb-4 text-2xl font-black tracking-tight text-foreground">
            Curriculum
          </h2>

          <Accordion className="space-y-3" defaultValue={[data.modules[0]?.id]}>
            {data.modules.map((module) => (
              <AccordionItem
                key={module.id}
                value={module.id}
                className="overflow-hidden rounded-xl border border-border bg-card px-5 shadow-sm transition-colors"
              >
                <AccordionTrigger className="py-4 hover:no-underline">
                  <div className="flex items-center gap-3 text-left">
                    <div className="flex size-8 shrink-0 items-center justify-center rounded-lg border border-border/50 bg-muted text-sm font-bold text-muted-foreground">
                      {module.order}
                    </div>
                    <span className="text-base leading-tight font-bold">
                      {module.title}
                    </span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pb-4">
                  <div className="mt-1 space-y-1 md:pl-11">
                    {module.topics.map((topic) => (
                      <div
                        key={topic.id}
                        className="flex items-center justify-between rounded-lg border border-transparent p-2.5 transition-colors hover:border-border/50 hover:bg-muted/50"
                      >
                        <div className="flex items-center gap-3">
                          {topic.isCompleted ? (
                            <CheckCircle2 className="size-4.5 shrink-0 text-primary" />
                          ) : (
                            <Circle className="size-4.5 shrink-0 text-muted-foreground opacity-40" />
                          )}
                          <span
                            className={`text-sm font-medium ${topic.isCompleted ? "text-muted-foreground line-through" : "text-foreground"}`}
                          >
                            {topic.title}
                          </span>
                        </div>
                        <Button
                          variant="secondary"
                          size="sm"
                          className="ml-3 h-7 shrink-0 rounded-md border border-transparent px-3 text-xs font-bold"
                        >
                          {topic.isCompleted ? "Review" : "Start"}
                        </Button>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* Resources Sidebar */}
        <div>
          <h2 className="mb-4 text-2xl font-black tracking-tight text-foreground">
            Resources
          </h2>

          <div className="rounded-xl border border-border bg-muted/20 p-5">
            {data.resources && data.resources.length > 0 ? (
              <div className="space-y-3">
                {data.resources.map((resource) => (
                  <a
                    key={resource.id}
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between rounded-lg border border-border bg-background p-3.5 shadow-sm transition-all hover:border-primary/40 hover:shadow"
                  >
                    <div className="pr-3 text-sm font-semibold text-foreground transition-colors group-hover:text-primary">
                      {resource.title}
                      <p className="mt-1 text-[10px] font-bold tracking-widest text-muted-foreground uppercase">
                        {resource.type}
                      </p>
                    </div>
                    <ExternalLink className="size-4 shrink-0 text-muted-foreground transition-colors group-hover:text-primary" />
                  </a>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-6 text-center">
                <div className="mb-2 flex size-10 items-center justify-center rounded-full border border-border bg-background">
                  <BookOpen className="size-4 text-muted-foreground opacity-50" />
                </div>
                <p className="text-sm font-semibold text-muted-foreground">
                  No resources provided.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
