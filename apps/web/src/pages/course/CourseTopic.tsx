import { useState, useEffect, useRef, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { useGetCourseTopic } from "@/features/course/hooks/useGetCourseTopic";
import { useUpdateTopicCompletion } from "@/features/course/hooks/useUpdateTopicCompletion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Circle,
  ChevronRight,
  Copy,
  Check,
  Info,
  AlertTriangle,
  Lightbulb,
  Loader2,
  BookOpen,
} from "lucide-react";
import { cn } from "@/lib/utils";

// ─── Markdown renderer ───
function MarkdownRenderer({ content }: { content: string }) {
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);

  const copyCode = (code: string, idx: number) => {
    navigator.clipboard.writeText(code);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 2000);
  };

  const blocks = useMemo(() => parseMarkdown(content), [content]);

  return (
    <article className="prose-none max-w-none">
      {blocks.map((block, i) => {
        switch (block.type) {
          case "h2":
            return (
              <h2
                key={i}
                id={slugify(block.text)}
                className="font-display text-2xl md:text-3xl font-semibold mt-16 mb-6 scroll-mt-32 tracking-tight text-foreground border-b border-border/50 pb-2"
              >
                {block.text}
              </h2>
            );
          case "h3":
            return (
              <h3
                key={i}
                id={slugify(block.text)}
                className="font-display text-xl font-medium mt-10 mb-4 scroll-mt-32 tracking-tight text-foreground/90"
              >
                {block.text}
              </h3>
            );
          case "paragraph":
            return (
              <p
                key={i}
                className="text-lg leading-relaxed text-muted-foreground mb-6"
                dangerouslySetInnerHTML={{ __html: inlineFormat(block.text) }}
              />
            );
          case "ul":
            return (
              <ul key={i} className="list-disc pl-6 mb-8 space-y-2 marker:text-muted-foreground/60 text-lg text-muted-foreground leading-relaxed">
                {block.items!.map((item, j) => (
                  <li
                    key={j}
                    className="pl-2"
                    dangerouslySetInnerHTML={{ __html: inlineFormat(item) }}
                  />
                ))}
              </ul>
            );
          case "ol":
            return (
              <ol key={i} className="list-decimal pl-6 mb-8 space-y-2 marker:text-muted-foreground/80 marker:font-medium text-lg text-muted-foreground leading-relaxed">
                {block.items!.map((item, j) => (
                  <li
                    key={j}
                    className="pl-2"
                    dangerouslySetInnerHTML={{ __html: inlineFormat(item) }}
                  />
                ))}
              </ol>
            );
          case "code":
            return (
              <div
                key={i}
                className="relative group rounded-xl overflow-hidden mb-8 border border-border/40 shadow-sm transition-all duration-300 hover:shadow-md"
              >
                {block.lang && (
                  <div className="bg-muted/80 backdrop-blur-md text-muted-foreground text-[0.7rem] uppercase tracking-wider px-4 py-2 font-mono border-b border-border/50 flex items-center justify-between">
                    <span>{block.lang}</span>
                  </div>
                )}
                <pre className="bg-zinc-950 dark:bg-zinc-950 text-zinc-50 p-5 overflow-x-auto font-mono text-sm leading-relaxed">
                  <code>{block.text}</code>
                </pre>
                <button
                  onClick={() => copyCode(block.text, i)}
                  className="absolute top-2 right-2 p-2 rounded-lg bg-zinc-800/80 hover:bg-zinc-700 text-zinc-400 hover:text-zinc-100 opacity-0 group-hover:opacity-100 transition-all focus:opacity-100"
                  aria-label="Copy code"
                >
                  {copiedIdx === i ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>
            );
          case "blockquote":
            return (
              <blockquote
                key={i}
                className="border-l-4 border-primary pl-6 py-2 my-8 font-serif text-xl italic text-foreground/80 bg-muted/20 rounded-r-xl"
                dangerouslySetInnerHTML={{ __html: inlineFormat(block.text) }}
              />
            );
          case "callout": {
            const variant = block.variant || "info";
            let icon = <Info className="w-5 h-5" />;
            let alertVariant: "default" | "destructive" = "default";
            let title = "Info";

            if (variant === "warning") {
              icon = <AlertTriangle className="w-5 h-5 text-amber-500" />;
              title = "Warning";
            } else if (variant === "tip") {
              icon = <Lightbulb className="w-5 h-5 text-emerald-500" />;
              title = "Tip";
            } else {
              icon = <Info className="w-5 h-5 text-blue-500" />;
              title = "Note";
            }

            return (
              <Alert variant={alertVariant} className="mb-8 mt-4 bg-muted/30 border-border/50 shadow-sm" key={i}>
                {icon}
                <AlertTitle className="tracking-tight text-foreground">{title}</AlertTitle>
                <AlertDescription className="text-muted-foreground text-base mt-1.5 leading-relaxed">
                  <span dangerouslySetInnerHTML={{ __html: inlineFormat(block.text) }} />
                </AlertDescription>
              </Alert>
            );
          }
          default:
            return null;
        }
      })}
    </article>
  );
}

// ─── Markdown parsing helpers ───
type Block = {
  type:
    | "h2"
    | "h3"
    | "paragraph"
    | "ul"
    | "ol"
    | "code"
    | "blockquote"
    | "callout";
  text: string;
  items?: string[];
  lang?: string;
  variant?: string;
};

function parseMarkdown(md: string): Block[] {
  const lines = md.split("\n");
  const blocks: Block[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    if (line.startsWith("```")) {
      const lang = line.slice(3).trim();
      const codeLines: string[] = [];
      i++;
      while (i < lines.length && !lines[i].startsWith("```")) {
        codeLines.push(lines[i]);
        i++;
      }
      blocks.push({ type: "code", text: codeLines.join("\n"), lang });
      i++;
      continue;
    }

    const calloutMatch = line.match(/^>\s*\[!(info|warning|tip)\]\s*(.*)/i);
    if (calloutMatch) {
      const variant = calloutMatch[1].toLowerCase();
      const calloutLines: string[] = [];
      if (calloutMatch[2]) calloutLines.push(calloutMatch[2]);
      i++;
      while (i < lines.length && lines[i].startsWith("> ")) {
        calloutLines.push(lines[i].slice(2));
        i++;
      }
      blocks.push({
        type: "callout",
        text: calloutLines.join(" "),
        variant,
      });
      continue;
    }

    if (line.startsWith("> ")) {
      const quoteLines: string[] = [];
      while (i < lines.length && lines[i].startsWith("> ")) {
        quoteLines.push(lines[i].slice(2));
        i++;
      }
      blocks.push({ type: "blockquote", text: quoteLines.join(" ") });
      continue;
    }

    if (line.startsWith("## ")) {
      blocks.push({ type: "h2", text: line.slice(3).trim() });
      i++;
      continue;
    }

    if (line.startsWith("### ")) {
      blocks.push({ type: "h3", text: line.slice(4).trim() });
      i++;
      continue;
    }

    if (line.match(/^[-*] /)) {
      const items: string[] = [];
      while (i < lines.length && lines[i].match(/^[-*] /)) {
        items.push(lines[i].replace(/^[-*] /, ""));
        i++;
      }
      blocks.push({ type: "ul", text: "", items });
      continue;
    }

    if (line.match(/^\d+\. /)) {
      const items: string[] = [];
      while (i < lines.length && lines[i].match(/^\d+\. /)) {
        items.push(lines[i].replace(/^\d+\.\s*/, ""));
        i++;
      }
      blocks.push({ type: "ol", text: "", items });
      continue;
    }

    if (line.trim() === "") {
      i++;
      continue;
    }

    const paraLines: string[] = [];
    while (
      i < lines.length &&
      lines[i].trim() !== "" &&
      !lines[i].startsWith("#") &&
      !lines[i].startsWith("```") &&
      !lines[i].startsWith("> ") &&
      !lines[i].match(/^[-*] /) &&
      !lines[i].match(/^\d+\. /)
    ) {
      paraLines.push(lines[i]);
      i++;
    }
    if (paraLines.length > 0) {
      blocks.push({ type: "paragraph", text: paraLines.join(" ") });
    }
  }

  return blocks;
}

function inlineFormat(text: string): string {
  return text
    .replace(/`([^`]+)`/g, '<code class="px-1.5 py-0.5 rounded-md bg-muted/80 text-foreground font-mono text-[0.85em] border border-border/50">$1</code>')
    .replace(/\*\*([^*]+)\*\*/g, "<strong class='font-semibold text-foreground'>$1</strong>")
    .replace(/\*([^*]+)\*/g, "<em class='text-foreground/90'>$1</em>");
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");
}

// ─── Table of Contents ───
function TableOfContents({
  headings,
  activeId,
}: {
  headings: { id: string; text: string; level: number }[];
  activeId: string;
}) {
  return (
    <nav className="relative space-y-1" aria-label="Table of contents">
      <div className="flex items-center gap-2 mb-4">
        <BookOpen className="w-4 h-4 text-primary" />
        <p className="text-xs font-bold uppercase tracking-widest text-foreground">
          Contents
        </p>
      </div>
      <div className="relative border-l border-border/40 ml-2 pl-4 py-1 flex flex-col gap-2.5">
        {headings.map((h) => (
          <a
            key={h.id}
            href={`#${h.id}`}
            className={cn(
              "block text-sm transition-all duration-200 relative",
              h.level === 3 ? "pl-3 text-muted-foreground/80" : "font-medium",
              activeId === h.id
                ? "text-primary"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {activeId === h.id && (
              <span className="absolute -left-[17px] top-1/2 -translate-y-1/2 w-[2px] h-4 bg-primary rounded-r-full" />
            )}
            {h.text}
          </a>
        ))}
      </div>
    </nav>
  );
}

// ─── Main Component ───
export default function CourseTopic() {
  const { id, topicId } = useParams<{ id: string; topicId: string }>();
  const {
    data: topic,
    isLoading,
    isError,
    refetch,
  } = useGetCourseTopic(id || "", topicId || "");
  const { updateTopicCompletion, isPending: isTogglingCompletion } =
    useUpdateTopicCompletion(id || "", topicId || "");

  const [activeHeadingId, setActiveHeadingId] = useState("");
  const contentRef = useRef<HTMLDivElement>(null);
  const [readProgress, setReadProgress] = useState(0);

  const headings = useMemo(() => {
    if (!topic?.content) return [];
    const matches = topic.content.matchAll(/^(#{2,3})\s+(.+)$/gm);
    return Array.from(matches).map((m) => ({
      id: slugify(m[2]),
      text: m[2],
      level: m[1].length,
    }));
  }, [topic?.content]);

  useEffect(() => {
    if (headings.length === 0) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveHeadingId(entry.target.id);
          }
        }
      },
      { rootMargin: "-15% 0% -75% 0%" }
    );
    headings.forEach((h) => {
      const el = document.getElementById(h.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [headings]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight > 0) {
        setReadProgress(Math.min((scrollTop / docHeight) * 100, 100));
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (isLoading) return <TopicSkeleton />;

  if (isError || !topic) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <p className="text-muted-foreground mb-4">
          Failed to load topic content.
        </p>
        <Button variant="outline" onClick={() => refetch()}>
          Try again
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-24">
      {/* Top navigation bar */}
      <header className="sticky top-0 z-30 bg-background/90 backdrop-blur-xl border-b border-border/40 shadow-sm transition-all duration-300">
        {/* Sleek top progress bar */}
        <div 
          className="absolute top-0 left-0 h-[2px] bg-primary transition-all duration-150 ease-out z-40"
          style={{ width: `${readProgress}%` }}
        />
        
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground overflow-hidden">
            <Link
              to="/courses"
              className="hover:text-foreground transition-colors shrink-0 flex items-center gap-1.5"
            >
              Dashboard
            </Link>
            <ChevronRight className="w-4 h-4 shrink-0 text-border" />
            <Link
              to={`/courses/${id}`}
              className="hover:text-foreground transition-colors truncate max-w-[120px] sm:max-w-[200px]"
            >
              Course
            </Link>
            <ChevronRight className="w-4 h-4 shrink-0 text-border" />
            <span className="text-foreground truncate max-w-[150px] sm:max-w-[250px]">
              {topic.title}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <Badge variant="secondary" className="hidden md:flex bg-muted text-muted-foreground border-transparent font-medium shadow-none">
              Part {topic.order}
            </Badge>
            <div className="flex items-center gap-1 bg-muted/50 rounded-full p-1 border border-border/50">
              <Link
                to={topic.previousTopic ? `/courses/${id}/topics/${topic.previousTopic.id}` : "#"}
                className={cn(!topic.previousTopic && "pointer-events-none opacity-50")}
              >
                <Button variant="ghost" size="icon" className="h-7 w-7 rounded-full hover:bg-background shadow-sm">
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span className="sr-only">Previous topic</span>
                </Button>
              </Link>
              <Link
                to={topic.nextTopic ? `/courses/${id}/topics/${topic.nextTopic.id}` : "#"}
                className={cn(!topic.nextTopic && "pointer-events-none opacity-50")}
              >
                <Button variant="ghost" size="icon" className="h-7 w-7 rounded-full hover:bg-background shadow-sm">
                  <ArrowRight className="w-3.5 h-3.5" />
                  <span className="sr-only">Next topic</span>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-12 md:py-20 flex gap-12 lg:gap-24">
        {/* Central Content */}
        <div className="flex-1 max-w-3xl min-w-0" ref={contentRef}>
          {/* Header Section */}
          <header className="mb-12">
            <h1 className="font-display text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-6 leading-[1.15]">
              {topic.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-4 text-sm font-medium text-muted-foreground/80">
              <span className="flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                ~{Math.max(1, Math.ceil((topic.content?.length || 0) / 1200))} min read
              </span>
              <span className="w-1 h-1 rounded-full bg-border" />
              {topic.isCompleted ? (
                <Badge
                  variant="secondary"
                  className="bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border-none shadow-none gap-1.5 px-2.5 py-0.5"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Completed
                </Badge>
              ) : (
                <Badge variant="outline" className="text-muted-foreground/80 border-border/60 gap-1.5 px-2.5 py-0.5 shadow-none bg-muted/20">
                  <Circle className="w-3.5 h-3.5" />
                  In progress
                </Badge>
              )}
            </div>
          </header>

          <Separator className="mb-12 bg-border/40" />

          {/* Body Content */}
          <div className="mb-20">
            {topic.content ? (
              <MarkdownRenderer content={topic.content} />
            ) : (
              <p className="text-muted-foreground text-lg italic bg-muted/30 p-8 rounded-xl border border-border/50 text-center">
                This topic doesn't have any content yet.
              </p>
            )}
          </div>

          <Separator className="mb-12 bg-border/40" />

          {/* Footer Navigation */}
          <nav className="grid sm:grid-cols-2 gap-4">
            {topic.previousTopic ? (
              <Link
                to={`/courses/${id}/topics/${topic.previousTopic.id}`}
                className="group flex flex-col items-start gap-2 p-6 rounded-2xl border border-border/50 bg-muted/20 hover:bg-muted/50 transition-all duration-300"
              >
                <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                  <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
                  Previous Topic
                </span>
                <span className="font-medium text-foreground line-clamp-2">
                  {topic.previousTopic.title}
                </span>
              </Link>
            ) : (
              <div /> // Empty placeholder for grid
            )}

            {topic.nextTopic ? (
              <Link
                to={`/courses/${id}/topics/${topic.nextTopic.id}`}
                className="group flex flex-col items-end text-right gap-2 p-6 rounded-2xl border border-border/50 bg-primary/[0.03] hover:bg-primary/[0.08] transition-all duration-300"
              >
                <span className="text-xs font-bold uppercase tracking-wider text-primary/80 flex items-center gap-1.5">
                  Next Topic
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </span>
                <span className="font-medium text-foreground line-clamp-2">
                  {topic.nextTopic.title}
                </span>
              </Link>
            ) : (
              <div />
            )}
          </nav>
          
          <div className="mt-8 flex justify-center">
            <Button
              size="lg"
              variant={topic.isCompleted ? "outline" : "default"}
              onClick={() => updateTopicCompletion()}
              disabled={isTogglingCompletion}
              className={cn(
                "w-full sm:w-auto rounded-full font-medium px-8 transition-all shadow-sm",
                !topic.isCompleted && "hover:shadow-md hover:-translate-y-0.5"
              )}
            >
              {isTogglingCompletion ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : topic.isCompleted ? (
                <Circle className="mr-2 h-4 w-4" />
              ) : (
                <CheckCircle2 className="mr-2 h-4 w-4" />
              )}
              {topic.isCompleted ? "Mark as Incomplete" : "Mark as Completed"}
            </Button>
          </div>
        </div>

        {/* Right Sidebar */}
        {headings.length > 0 && (
          <aside className="hidden lg:block w-64 shrink-0">
            <div className="sticky top-28">
              <TableOfContents headings={headings} activeId={activeHeadingId} />
            </div>
          </aside>
        )}
      </main>
    </div>
  );
}

function TopicSkeleton() {
  return (
    <div className="min-h-screen">
      <header className="border-b border-border/50 bg-background/50">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Skeleton className="h-5 w-64 rounded-full" />
          <Skeleton className="h-8 w-24 rounded-full" />
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-20 flex gap-16">
        <div className="flex-1 max-w-3xl space-y-8">
          <Skeleton className="h-12 w-3/4 rounded-lg" />
          <div className="flex gap-4">
            <Skeleton className="h-6 w-24 rounded-full" />
            <Skeleton className="h-6 w-28 rounded-full" />
          </div>
          <Separator className="bg-border/50" />
          <div className="space-y-4">
            <Skeleton className="h-5 w-full rounded" />
            <Skeleton className="h-5 w-full rounded" />
            <Skeleton className="h-5 w-5/6 rounded" />
          </div>
          <Skeleton className="h-40 w-full rounded-2xl mt-12" />
        </div>
      </div>
    </div>
  );
}
