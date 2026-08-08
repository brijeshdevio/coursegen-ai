import {
  ExternalLink,
  PlayCircle,
  BookOpen,
  Link as LinkIcon,
} from "lucide-react";
import type { CourseDetails as CourseDetailsType } from "../course.types";

interface CourseResourcesProps {
  resources: CourseDetailsType["resources"];
}

export function CourseResources({ resources }: CourseResourcesProps) {
  if (!resources || resources.length === 0) {
    return null;
  }

  const getIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case "video":
        return <PlayCircle className="h-4 w-4 text-primary" />;
      case "article":
      case "book":
        return <BookOpen className="h-4 w-4 text-primary" />;
      default:
        return <LinkIcon className="h-4 w-4 text-primary" />;
    }
  };

  return (
    <div className="space-y-4 pt-8">
      <h2 className="text-2xl font-bold tracking-tight">
        Additional Resources
      </h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {resources.map((resource) => (
          <a
            key={resource.id}
            href={resource.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-between rounded-lg border bg-card p-4 transition-colors hover:border-primary/50 hover:bg-muted/50"
          >
            <div className="flex items-center gap-3 overflow-hidden">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10">
                {getIcon(resource.type)}
              </div>
              <div className="flex flex-col overflow-hidden">
                <span className="truncate text-sm font-medium transition-colors group-hover:text-primary">
                  {resource.title}
                </span>
                <span className="text-xs tracking-wider text-muted-foreground uppercase">
                  {resource.type}
                </span>
              </div>
            </div>
            <ExternalLink className="ml-4 h-4 w-4 shrink-0 text-muted-foreground/50 transition-colors group-hover:text-primary" />
          </a>
        ))}
      </div>
    </div>
  );
}
