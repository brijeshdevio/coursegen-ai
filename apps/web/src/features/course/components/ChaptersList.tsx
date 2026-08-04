import type { CourseType } from "@/types/course";
import { CheckCircle2, Circle } from "lucide-react";

export function ChaptersList({
  course,
  expanded,
  setExpanded,
  currentIdx,
}: {
  course: CourseType;
  expanded: string | null;
  setExpanded: (id: string | null) => void;
  currentIdx: number;
}) {
  return (
    <ul className="space-y-2">
      {course.chapters.map((ch, i) => {
        const isCurrent = i === currentIdx;
        const isOpen = expanded === ch.id;
        return (
          <li
            key={ch.id}
            className={`cursor-pointer overflow-hidden rounded-xl border transition ${
              isCurrent && !ch.completed
                ? "border-primary/40 bg-primary/6"
                : "border-border bg-card"
            }`}
          >
            <div
              className={`flex items-center gap-3 px-4 py-3 ${isCurrent && !ch.completed ? "border-l-2 border-primary" : ""}`}
            >
              <button
                className="shrink-0"
                aria-label={ch.completed ? "Mark incomplete" : "Mark complete"}
              >
                {ch.completed ? (
                  <CheckCircle2 className="h-5 w-5 text-success" />
                ) : (
                  <Circle className="h-5 w-5 text-muted-foreground hover:text-foreground" />
                )}
              </button>
              <span className="font-mono text-xs text-muted-foreground">
                {String(i + 1).padStart(2, "0")}
              </span>
              <button
                onClick={() => setExpanded(isOpen ? null : ch.id)}
                className="flex-1 text-left text-sm font-medium"
              >
                <span
                  className={
                    ch.completed ? "text-muted-foreground line-through" : ""
                  }
                >
                  {ch.title}
                </span>
              </button>
              {isCurrent && !ch.completed && (
                <span className="hidden shrink-0 rounded-md bg-primary/15 px-2 py-0.5 font-mono text-[10px] tracking-wider text-primary uppercase sm:inline">
                  Current
                </span>
              )}
            </div>
            {isOpen && (
              <div className="border-t border-border bg-background/40 px-4 py-4">
                <ul className="space-y-2 pl-8">
                  {ch.points.map((p, idx) => (
                    <li
                      key={idx}
                      className="flex cursor-pointer items-start gap-2 text-sm text-muted-foreground"
                    >
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-primary" />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </li>
        );
      })}
    </ul>
  );
}
