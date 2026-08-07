import { useParams, Link, useNavigate } from "react-router-dom";
import { useCourseTopic } from "@/features/course/api/get-course-topic";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  ArrowLeft,
  CheckCircle2,
  Circle,
  AlertCircle,
  ArrowRight,
} from "lucide-react";
import ReactMarkdown from "react-markdown";

export default function CourseTopic() {
  const { id, topicId } = useParams<{ id: string; topicId: string }>();
  const navigate = useNavigate();
  const { data, isLoading, isError, refetch } = useCourseTopic(id, topicId);

  if (isLoading) {
    return (
      <>
        <Skeleton className="mb-8 h-6 w-48 rounded-full" />
        <div className="mb-6 flex items-center gap-4">
          <Skeleton className="size-10 rounded-xl" />
          <Skeleton className="h-10 w-3/4 rounded-xl" />
        </div>
        <Skeleton className="mb-8 h-5 w-32 rounded-full" />

        <div className="space-y-4">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <div className="py-2" />
          <Skeleton className="mb-3 h-8 w-1/3" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-32 w-full rounded-xl" />
        </div>
      </>
    );
  }

  if (isError || !data) {
    return (
      <div className="flex min-h-[50vh] flex-col items-center justify-center p-4 text-center">
        <div className="mb-6 flex size-16 items-center justify-center rounded-2xl border border-destructive/20 bg-destructive/10">
          <AlertCircle className="size-8 text-destructive" />
        </div>
        <h1 className="mb-3 text-2xl font-black tracking-tight text-foreground">
          Topic Unavailable
        </h1>
        <p className="mb-8 max-w-sm text-sm font-medium text-muted-foreground">
          We couldn't load the content for this topic. It may have been removed
          or you might be offline.
        </p>
        <div className="flex gap-3">
          <Link to={`/courses/${id}`}>
            <Button
              variant="outline"
              size="lg"
              className="h-10 rounded-full border px-6 text-sm font-bold"
            >
              Back to Course
            </Button>
          </Link>
          <Button
            onClick={() => refetch()}
            size="lg"
            className="h-10 rounded-full px-6 text-sm font-bold shadow-sm"
          >
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <>
      <Link
        to={`/courses/${id}`}
        className="mb-8 inline-flex items-center rounded-full border border-border/50 bg-muted/50 px-3 py-1.5 text-xs font-bold text-muted-foreground transition-colors hover:border-border/80 hover:text-foreground"
      >
        <ArrowLeft className="mr-2 size-3.5" />
        Back to Curriculum
      </Link>

      {/* Topic Header */}
      <div className="mb-8">
        <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:gap-4">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-border/50 bg-muted text-lg font-black text-muted-foreground shadow-sm">
            {data.order}
          </div>
          <h1 className="text-2xl leading-tight font-black tracking-tight text-foreground md:text-4xl">
            {data.title}
          </h1>
        </div>

        <div className="flex items-center gap-2.5">
          {data.isCompleted ? (
            <Badge
              variant="secondary"
              className="flex items-center gap-1.5 rounded-full border-0 bg-primary/10 px-3 py-1 text-xs font-bold text-primary"
            >
              <CheckCircle2 className="size-3.5" />
              Completed
            </Badge>
          ) : (
            <Badge
              variant="outline"
              className="flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-bold text-muted-foreground"
            >
              <Circle className="size-3.5 opacity-50" />
              Pending
            </Badge>
          )}
          <span className="ml-1 text-xs font-bold text-muted-foreground">
            Topic {data.order}
          </span>
        </div>
      </div>

      <Separator className="mb-8" />

      {/* Markdown Content */}
      <div className="prose mb-12 max-w-none dark:prose-invert prose-headings:font-black prose-headings:tracking-tight prose-a:no-underline hover:prose-a:underline prose-code:rounded-md prose-code:bg-primary/10 prose-code:px-1 prose-code:py-0.5 prose-code:text-primary prose-code:before:content-none prose-pre:border prose-pre:border-border">
        <ReactMarkdown>
          {data.content || "No content provided for this topic."}
        </ReactMarkdown>
      </div>

      <Separator className="mb-6" />

      {/* Footer Actions */}
      <div className="flex flex-col items-center justify-between gap-4 rounded-2xl border border-border bg-card p-4 shadow-sm sm:flex-row md:p-5">
        <div className="flex w-full flex-col items-center gap-3 sm:w-auto sm:flex-row">
          <Button
            size="lg"
            variant={data.isCompleted ? "outline" : "default"}
            className={`h-10 w-full rounded-full px-6 text-sm font-bold sm:w-auto ${data.isCompleted ? "border-2" : "shadow-sm"}`}
          >
            {data.isCompleted ? (
              <>
                <Circle className="mr-2 size-4 opacity-50" />
                Mark as Incomplete
              </>
            ) : (
              <>
                <CheckCircle2 className="mr-2 size-4" />
                Mark as Complete
              </>
            )}
          </Button>
        </div>

        <Button
          size="lg"
          variant="secondary"
          className="group h-10 w-full rounded-full px-6 text-sm font-bold transition-colors hover:bg-primary/10 hover:text-primary sm:w-auto"
        >
          Next Topic
          <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
        </Button>
      </div>
    </>
  );
}
