import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChaptersList } from "@/features/course/components/ChaptersList";
import { ResourcesPanel } from "@/features/course/components/ResourcesPanel";
import { useCourse } from "@/features/course/hooks/useCourse";
import type { CourseType } from "@/types/course";
import { WindowLoader } from "@/components/loader";

export default function CourseDetail() {
  const { data: course, isPending } = useCourse();
  const [expanded, setExpanded] = useState<string | null>(null);

  if (isPending) {
    return <WindowLoader title="Course loading..." />;
  }

  const completedChapters = course?.chapters?.filter(
    (c: CourseType["chapters"][0]) => c.completed
  ).length;
  const currentIdx = course.chapters.findIndex(
    (c: CourseType["chapters"][0]) => !c.completed
  );

  return (
    <main className="mx-auto max-w-7xl px-6 py-8">
      <Link
        to="/courses"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" /> My courses
      </Link>

      <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_320px]">
        <div>
          {/* Header */}
          <Badge>{course.topic}</Badge>
          <h1 className="mt-3 font-display text-4xl font-bold tracking-tight sm:text-5xl">
            {course.title}
          </h1>
          <p className="mt-4 max-w-2xl text-muted-foreground">
            {course.description}
          </p>

          {/* Progress */}
          <div className="mt-6 rounded-2xl border border-border bg-card p-5">
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium">
                {/* <span className="text-primary">{done}</span> */}
                <span className="text-muted-foreground">
                  {completedChapters}
                  of {course.chapters.length} chapters complete
                </span>
              </span>
              <span className="font-mono text-xs text-muted-foreground">
                {((completedChapters / course.chapters.length) * 100).toFixed(
                  0
                )}
                %
              </span>
            </div>
            <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-elevated">
              <div
                className="h-full rounded-full bg-primary transition-all"
                style={{
                  width: `${((completedChapters / course.chapters.length) * 100).toFixed(0)}%`,
                }}
              />
            </div>
          </div>

          {/* Mobile tabs */}
          <div className="mt-6 lg:hidden">
            <Tabs defaultValue="chapters">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="chapters">Chapters</TabsTrigger>
                <TabsTrigger value="resources">Resources</TabsTrigger>
              </TabsList>
              <TabsContent value="chapters" className="mt-4">
                <ChaptersList
                  course={course}
                  expanded={expanded}
                  setExpanded={setExpanded}
                  currentIdx={currentIdx}
                />
              </TabsContent>
              <TabsContent value="resources" className="mt-4">
                <ResourcesPanel resources={course.resources} />
              </TabsContent>
            </Tabs>
          </div>

          {/* Desktop chapters */}
          <div className="mt-8 hidden lg:block">
            <h2 className="font-display text-xl font-bold">Chapters</h2>
            <div className="mt-4">
              <ChaptersList
                course={course}
                expanded={expanded}
                setExpanded={setExpanded}
                currentIdx={currentIdx}
              />
            </div>
          </div>
        </div>

        {/* Resources sidebar */}
        <aside className="hidden lg:block">
          <div className="sticky top-24">
            <h2 className="font-display text-xl font-bold">Resources</h2>
            <p className="mt-1 text-xs text-muted-foreground">
              Free, curated for this course.
            </p>
            <div className="mt-4">
              <ResourcesPanel resources={course.resources} />
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}
