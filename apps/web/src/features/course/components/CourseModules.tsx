import { Link } from "react-router-dom";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CheckCircle2, Circle, FileText } from "lucide-react";
import type { CourseDetails as CourseDetailsType } from "../course.types";

interface CourseModulesProps {
  courseId: string;
  modules: CourseDetailsType["modules"];
}

export function CourseModules({ courseId, modules }: CourseModulesProps) {
  if (!modules || modules.length === 0) {
    return (
      <div className="rounded-lg border border-dashed bg-muted/30 py-8 text-center text-muted-foreground">
        No modules found for this course.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold tracking-tight">Syllabus</h2>
      <Accordion className="w-full space-y-4">
        {modules.map((module, index) => (
          <AccordionItem
            key={module.id}
            value={module.id}
            className="rounded-lg border bg-card px-4"
          >
            <AccordionTrigger className="py-4 hover:no-underline">
              <div className="flex items-center gap-4 text-left">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                  {index + 1}
                </span>
                <span className="text-lg font-semibold">{module.title}</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="pt-2 pb-4">
              <div className="space-y-2 pr-4 pl-12">
                {module.topics && module.topics.length > 0 ? (
                  module.topics.map((topic) => (
                    <Link
                      key={topic.id}
                      to={`/courses/${courseId}/topics/${topic.id}`}
                      className="group flex items-start gap-3 rounded-md p-3 transition-colors hover:bg-muted"
                    >
                      <div className="mt-0.5 shrink-0">
                        {topic.isCompleted ? (
                          <CheckCircle2 className="h-5 w-5 text-primary" />
                        ) : (
                          <Circle className="h-5 w-5 text-muted-foreground/50 transition-colors group-hover:text-primary/50" />
                        )}
                      </div>
                      <div className="flex flex-col gap-1">
                        <span className="font-medium text-foreground transition-colors group-hover:text-primary">
                          {topic.title}
                        </span>
                        <span className="flex items-center text-xs text-muted-foreground">
                          <FileText className="mr-1 h-3 w-3" /> Reading material
                        </span>
                      </div>
                    </Link>
                  ))
                ) : (
                  <div className="text-sm text-muted-foreground">
                    No topics available in this module.
                  </div>
                )}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
