import { ArrowRight, Check, RefreshCw } from "lucide-react";
import { data, Link } from "react-router-dom";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { RESOURCE_ICON } from "@/constants";
import type { CourseType } from "@/types/course";
import { useSaveCourseFacade } from "../hooks/useSaveCourse";

export function ResultBlock({
  course,
  onRegenerate,
  onClear,
  saved,
}: {
  course: CourseType;
  onSave: () => void;
  onRegenerate: () => void;
  onClear: () => void;
  saved: boolean;
}) {
  const saveCourseMutation = useSaveCourseFacade();

  const handleSave = () => {
    if (course) saveCourseMutation.mutate(course);
  };

  return (
    <div className="mx-auto mt-12 max-w-3xl animate-in duration-500 fade-in slide-in-from-bottom-4">
      {/* Preview card */}
      <div className="rounded-2xl border border-border bg-card p-6 glow-primary">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <Badge>{course.topic}</Badge>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight">
              {course.title}
            </h2>
          </div>
          <span className="font-mono text-xs text-muted-foreground">
            {course.chapters.length} chapters · {course.resources.length}{" "}
            resources
          </span>
        </div>
        <p className="mt-3 text-sm text-muted-foreground">
          {course.description}
        </p>
      </div>

      {/* Chapters */}
      <section className="mt-8">
        <h3 className="font-display text-xl font-bold">Chapters</h3>
        <Accordion type="single" collapsible className="mt-3 space-y-2">
          {course.chapters.map((ch, i) => (
            <AccordionItem
              key={ch.id}
              value={ch.id}
              className="overflow-hidden rounded-xl border border-border bg-card px-4"
            >
              <AccordionTrigger className="py-3 hover:no-underline">
                <div className="flex items-center gap-3 text-left">
                  <span className="font-mono text-xs text-muted-foreground">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-sm font-medium">{ch.title}</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pb-4">
                <ul className="space-y-2 pl-9">
                  {ch.points.map((p, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-2 text-sm text-muted-foreground"
                    >
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-primary" />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      {/* Resources */}
      <section className="mt-8">
        <h3 className="font-display text-xl font-bold">Resources</h3>
        <ul className="mt-3 space-y-2">
          {course.resources.map((r) => {
            const { Icon, cls } = RESOURCE_ICON[r.type];
            return (
              <li
                key={r.id}
                className="flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3"
              >
                <Icon className={`h-4 w-4 ${cls}`} />
                <span className="flex-1 text-sm">{r.title}</span>
                <span className="font-mono text-[11px] tracking-wider text-muted-foreground uppercase">
                  {r.type}
                </span>
              </li>
            );
          })}
        </ul>
      </section>

      {/* Actions */}
      <div className="sticky bottom-4 z-10 mt-10">
        <div className="flex flex-col-reverse items-stretch gap-2 rounded-2xl border border-border bg-card/90 p-3 backdrop-blur-xl sm:flex-row sm:items-center sm:justify-between">
          <button
            onClick={onClear}
            className="text-xs text-muted-foreground hover:text-foreground sm:pl-3"
          >
            Clear
          </button>
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={onRegenerate} className="gap-2">
              <RefreshCw className="h-4 w-4" /> Regenerate
            </Button>
            <Button
              onClick={handleSave}
              disabled={saveCourseMutation.isPending}
              className={
                saved
                  ? "bg-success text-success-foreground hover:bg-success/90"
                  : ""
              }
            >
              {saveCourseMutation.isSuccess ? (
                <>
                  <Check className="h-4 w-4" /> Saved
                </>
              ) : (
                <>
                  Save course <ArrowRight className="h-4 w-4" />
                </>
              )}
            </Button>
          </div>
        </div>
      </div>

      {saveCourseMutation.isSuccess && (
        <p className="mt-3 text-center text-sm text-muted-foreground">
          <Link to="/courses" className="text-primary hover:underline">
            View in My courses →
          </Link>
        </p>
      )}
    </div>
  );
}
