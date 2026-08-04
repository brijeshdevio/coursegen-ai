import type { CourseType } from "@/types/course";
import { BookOpen, ExternalLink, FileText, Video } from "lucide-react";

const RESOURCE_META = {
  youtube: {
    icon: Video,
    label: "YouTube",
    cls: "text-[#ff4d6d] bg-[#ff4d6d]/10 border-[#ff4d6d]/30",
  },
  article: {
    icon: FileText,
    label: "Article",
    cls: "text-primary bg-primary/10 border-primary/30",
  },
  docs: {
    icon: BookOpen,
    label: "Docs",
    cls: "text-success bg-success/10 border-success/30",
  },
};

export function ResourcesPanel({
  resources,
}: {
  resources: CourseType["resources"];
}) {
  const groups = (["youtube", "article", "docs"] as const).map((type) => ({
    type,
    items: resources.filter((r) => r.type === type),
  }));
  return (
    <div className="space-y-5 rounded-2xl border border-border bg-card p-5">
      {groups.map((g) => {
        if (g.items.length === 0) return null;
        const meta = RESOURCE_META[g.type];
        const Icon = meta.icon;
        return (
          <div key={g.type}>
            <div className="mb-2 flex items-center gap-2">
              <span
                className={`inline-flex items-center gap-1 rounded-md border px-2 py-0.5 text-[11px] font-medium ${meta.cls}`}
              >
                <Icon className="h-3 w-3" /> {meta.label}
              </span>
              <span className="font-mono text-[11px] text-muted-foreground">
                ({g.items.length})
              </span>
            </div>
            <ul className="space-y-1.5">
              {g.items.map((r) => (
                <li key={r.id}>
                  <a
                    href={r.url}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm text-muted-foreground transition hover:bg-elevated hover:text-foreground"
                  >
                    <span className="line-clamp-1 flex-1">{r.title}</span>
                    <ExternalLink className="h-3 w-3 shrink-0 opacity-0 transition group-hover:opacity-100" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
}
