import { useState, useEffect, useRef, useMemo } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useGetCourseTopic } from "@/features/course/hooks/useGetCourseTopic";
import { useUpdateTopicCompletion } from "@/features/course/hooks/useUpdateTopicCompletion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  ChevronRight,
  Circle,
  Clock,
  Copy,
  Check,
  Info,
  AlertTriangle,
  Lightbulb,
  Loader2,
} from "lucide-react";

// ─── Markdown-like renderer ───
// Parses the content string and renders styled blocks.
// Supports: ## h2, ### h3, paragraphs, **bold**, *italic*, - bullet lists,
// 1. numbered lists, ```code blocks```, > blockquotes, :::info/warning/tip callouts
function ContentRenderer({
  content,
  onHeadingsExtracted,
}: {
  content: string;
  onHeadingsExtracted: (
    headings: { id: string; text: string; level: number }[]
  ) => void;
}) {
  const headingsRef = useRef<{ id: string; text: string; level: number }[]>([]);

  const blocks = useMemo(() => {
    const lines = content.split("\n");
    const result: React.ReactNode[] = [];
    const extractedHeadings: { id: string; text: string; level: number }[] = [];
    let i = 0;

    const formatInline = (text: string): React.ReactNode => {
      // Bold + italic
      const parts: React.ReactNode[] = [];
      const regex = /(\*\*\*(.+?)\*\*\*|\*\*(.+?)\*\*|\*(.+?)\*|`(.+?)`)/g;
      let lastIndex = 0;
      let match;

      while ((match = regex.exec(text)) !== null) {
        if (match.index > lastIndex) {
          parts.push(text.slice(lastIndex, match.index));
        }
        if (match[2]) {
          parts.push(
            <strong key={match.index} className="italic">
              {match[2]}
            </strong>
          );
        } else if (match[3]) {
          parts.push(<strong key={match.index}>{match[3]}</strong>);
        } else if (match[4]) {
          parts.push(<em key={match.index}>{match[4]}</em>);
        } else if (match[5]) {
          parts.push(
            <code
              key={match.index}
              className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm"
            >
              {match[5]}
            </code>
          );
        }
        lastIndex = match.index + match[0].length;
      }
      if (lastIndex < text.length) {
        parts.push(text.slice(lastIndex));
      }
      return parts.length > 0 ? parts : text;
    };

    while (i < lines.length) {
      const line = lines[i];

      // Code block
      if (line.trimStart().startsWith("```")) {
        const lang = line.trim().replace("```", "");
        const codeLines: string[] = [];
        i++;
        while (i < lines.length && !lines[i].trimStart().startsWith("```")) {
          codeLines.push(lines[i]);
          i++;
        }
        i++; // skip closing ```
        result.push(
          <CodeBlock
            key={`code-${i}`}
            code={codeLines.join("\n")}
            lang={lang}
          />
        );
        continue;
      }

      // Callout blocks :::info, :::warning, :::tip
      if (line.trimStart().startsWith(":::")) {
        const variant = line.trim().replace(":::", "").trim() as
          "info" | "warning" | "tip";
        const calloutLines: string[] = [];
        i++;
        while (i < lines.length && !lines[i].trimStart().startsWith(":::")) {
          calloutLines.push(lines[i]);
          i++;
        }
        i++; // skip closing :::
        result.push(
          <Callout key={`callout-${i}`} variant={variant}>
            {calloutLines.map((l, idx) => (
              <p key={idx}>{formatInline(l)}</p>
            ))}
          </Callout>
        );
        continue;
      }

      // Blockquote
      if (line.trimStart().startsWith("> ")) {
        const quoteLines: string[] = [];
        while (i < lines.length && lines[i].trimStart().startsWith("> ")) {
          quoteLines.push(lines[i].replace(/^>\s?/, ""));
          i++;
        }
        result.push(
          <blockquote
            key={`bq-${i}`}
            className="my-4 border-l-4 border-primary/40 pl-4 text-muted-foreground italic"
          >
            {quoteLines.map((l, idx) => (
              <p key={idx}>{formatInline(l)}</p>
            ))}
          </blockquote>
        );
        continue;
      }

      // h2
      if (line.startsWith("## ")) {
        const text = line.replace("## ", "");
        const id = text
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)/g, "");
        extractedHeadings.push({ id, text, level: 2 });
        result.push(
          <h2
            key={`h2-${i}`}
            id={id}
            className="mt-10 mb-4 scroll-mt-24 font-display text-2xl font-bold"
          >
            {text}
          </h2>
        );
        i++;
        continue;
      }

      // h3
      if (line.startsWith("### ")) {
        const text = line.replace("### ", "");
        const id = text
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)/g, "");
        extractedHeadings.push({ id, text, level: 3 });
        result.push(
          <h3
            key={`h3-${i}`}
            id={id}
            className="mt-8 mb-3 scroll-mt-24 font-display text-xl font-semibold"
          >
            {text}
          </h3>
        );
        i++;
        continue;
      }

      // Unordered list
      if (line.trimStart().startsWith("- ")) {
        const listItems: string[] = [];
        while (i < lines.length && lines[i].trimStart().startsWith("- ")) {
          listItems.push(lines[i].replace(/^-\s+/, ""));
          i++;
        }
        result.push(
          <ul
            key={`ul-${i}`}
            className="my-4 ml-6 list-disc space-y-2 text-foreground/90"
          >
            {listItems.map((item, idx) => (
              <li key={idx}>{formatInline(item)}</li>
            ))}
          </ul>
        );
        continue;
      }

      // Ordered list
      if (/^\d+\.\s/.test(line.trimStart())) {
        const listItems: string[] = [];
        while (i < lines.length && /^\d+\.\s/.test(lines[i].trimStart())) {
          listItems.push(lines[i].replace(/^\d+\.\s+/, ""));
          i++;
        }
        result.push(
          <ol
            key={`ol-${i}`}
            className="my-4 ml-6 list-decimal space-y-2 text-foreground/90"
          >
            {listItems.map((item, idx) => (
              <li key={idx}>{formatInline(item)}</li>
            ))}
          </ol>
        );
        continue;
      }

      // Empty line
      if (line.trim() === "") {
        i++;
        continue;
      }

      // Paragraph
      result.push(
        <p key={`p-${i}`} className="my-4 leading-7 text-foreground/90">
          {formatInline(line)}
        </p>
      );
      i++;
    }

    // Store headings for TOC
    headingsRef.current = extractedHeadings;
    return result;
  }, [content]);

  useEffect(() => {
    onHeadingsExtracted(headingsRef.current);
  }, [blocks, onHeadingsExtracted]);

  return <div className="prose-custom">{blocks}</div>;
}

// ─── Code block with copy button ───
function CodeBlock({ code, lang }: { code: string; lang: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="group relative my-6 overflow-hidden rounded-xl border border-border bg-zinc-950 text-zinc-100">
      {lang && (
        <div className="flex items-center justify-between border-b border-zinc-800 px-4 py-2 text-xs text-zinc-400">
          <span className="font-mono">{lang}</span>
          <button
            onClick={handleCopy}
            className="flex items-center gap-1 rounded px-2 py-1 text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-zinc-200"
          >
            {copied ? (
              <Check className="h-3.5 w-3.5" />
            ) : (
              <Copy className="h-3.5 w-3.5" />
            )}
            {copied ? "Copied" : "Copy"}
          </button>
        </div>
      )}
      <pre className="overflow-x-auto p-4 text-sm leading-relaxed">
        <code>{code}</code>
      </pre>
    </div>
  );
}

// ─── Callout component ───
function Callout({
  variant,
  children,
}: {
  variant: "info" | "warning" | "tip";
  children: React.ReactNode;
}) {
  const config = {
    info: {
      icon: Info,
      bg: "bg-blue-500/10",
      border: "border-blue-500/30",
      iconColor: "text-blue-500",
      title: "Info",
    },
    warning: {
      icon: AlertTriangle,
      bg: "bg-amber-500/10",
      border: "border-amber-500/30",
      iconColor: "text-amber-500",
      title: "Warning",
    },
    tip: {
      icon: Lightbulb,
      bg: "bg-emerald-500/10",
      border: "border-emerald-500/30",
      iconColor: "text-emerald-500",
      title: "Tip",
    },
  };

  const c = config[variant] || config.info;
  const Icon = c.icon;

  return (
    <div className={`my-6 rounded-xl border p-4 ${c.bg} ${c.border}`}>
      <div className="mb-2 flex items-center gap-2 font-semibold">
        <Icon className={`h-4 w-4 ${c.iconColor}`} />
        <span className={c.iconColor}>{c.title}</span>
      </div>
      <div className="text-sm text-foreground/80 [&>p]:my-1">{children}</div>
    </div>
  );
}

// ─── Table of Contents ───
function TableOfContents({
  headings,
  activeId,
  readProgress,
}: {
  headings: { id: string; text: string; level: number }[];
  activeId: string;
  readProgress: number;
}) {
  if (headings.length === 0) return null;

  return (
    <div className="space-y-4">
      <h4 className="text-sm font-semibold text-foreground">On this page</h4>
      <div className="relative">
        {/* Reading progress bar */}
        <div className="absolute top-0 left-0 h-full w-0.5 rounded-full bg-border">
          <div
            className="w-full rounded-full bg-primary transition-all duration-200"
            style={{ height: `${readProgress}%` }}
          />
        </div>
        <nav className="space-y-1 pl-4">
          {headings.map((h) => (
            <a
              key={h.id}
              href={`#${h.id}`}
              className={`block py-1 text-sm transition-colors ${
                h.level === 3 ? "pl-3" : ""
              } ${
                activeId === h.id
                  ? "ml-[-17px] border-l-2 border-primary pl-[calc(1rem+15px)] font-medium text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {h.text}
            </a>
          ))}
        </nav>
      </div>
    </div>
  );
}

// ─── Mock content for when content is null ───
const MOCK_CONTENT = `## Introduction

This topic covers the fundamental concepts you need to understand before moving forward. Let's dive into the key areas that will build your foundation.

> Knowledge is power. Understanding these fundamentals will make everything that follows much clearer.

### Key Concepts

Here are the main ideas we'll explore in this section:

- **Core principles** that govern the entire domain
- *Historical context* and why it matters today
- Practical applications in real-world scenarios
- Common misconceptions to avoid

### Getting Started

Follow these steps to set up your environment:

1. Install the required tools and dependencies
2. Configure your workspace settings
3. Run the initial setup script
4. Verify everything works correctly

\`\`\`python
# Example setup script
def initialize_project():
    config = load_config("settings.yaml")
    validate_environment(config)
    print("Setup complete!")

initialize_project()
\`\`\`

:::info
Make sure you have Python 3.9 or higher installed before running this script.
:::

## Deep Dive

Now that you have the basics, let's explore the more advanced aspects of this topic.

### Architecture Overview

The system is built on three main pillars:

1. **Data Layer** — responsible for persistence and retrieval
2. **Logic Layer** — handles business rules and transformations
3. **Presentation Layer** — manages the user interface

### Best Practices

- Always validate input before processing
- Use meaningful variable names
- Write tests for critical paths
- Document your decisions

:::warning
Avoid premature optimization. Focus on correctness first, then measure and optimize where needed.
:::

\`\`\`javascript
// Example of input validation
function processData(input) {
  if (!input || typeof input !== 'object') {
    throw new Error('Invalid input: expected an object');
  }

  const { name, value } = input;
  return { name: name.trim(), value: Number(value) };
}
\`\`\`

### Common Patterns

Understanding these patterns will help you write better code:

- **Observer Pattern** — for event-driven architectures
- **Factory Pattern** — for creating objects without specifying exact classes
- **Strategy Pattern** — for interchangeable algorithms

:::tip
When in doubt, start with the simplest pattern that solves your problem. You can always refactor later.
:::

## Summary

In this topic, we covered the essential building blocks. In the next section, we'll apply these concepts to build a real project.

> The best way to learn is by doing. Take the time to experiment with the code examples above before moving on.`;

// ─── Main Component ───
export default function CourseTopic() {
  const { id, topicId } = useParams<{ id: string; topicId: string }>();
  const navigate = useNavigate();

  const {
    data: topic,
    isLoading,
    isError,
    refetch,
  } = useGetCourseTopic(id || "", topicId || "");

  const { updateTopicCompletion, isPending: isToggling } =
    useUpdateTopicCompletion(id || "", topicId || "");

  const [headings, setHeadings] = useState<
    { id: string; text: string; level: number }[]
  >([]);
  const [activeHeading, setActiveHeading] = useState("");
  const [readProgress, setReadProgress] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);

  // Scroll spy for active heading and reading progress
  useEffect(() => {
    const handleScroll = () => {
      // Reading progress
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight > 0) {
        setReadProgress(Math.min((scrollTop / docHeight) * 100, 100));
      }

      // Active heading
      const headingEls = headings.map((h) => document.getElementById(h.id));
      let current = "";
      for (const el of headingEls) {
        if (el && el.getBoundingClientRect().top <= 100) {
          current = el.id;
        }
      }
      setActiveHeading(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [headings]);

  if (isLoading) {
    return <TopicSkeleton />;
  }

  if (isError || !topic) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <p className="mb-4 text-muted-foreground">Failed to load topic.</p>
        <Button variant="outline" onClick={() => refetch()}>
          Try again
        </Button>
      </div>
    );
  }

  const contentToRender = topic.content || MOCK_CONTENT;
  const estimatedReadTime = Math.max(
    1,
    Math.round(contentToRender.split(/\s+/).length / 200)
  );

  return (
    <div className="-m-6">
      {/* Top Navigation Bar */}
      <div className="sticky top-0 z-20 border-b border-border bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
          {/* Breadcrumb */}
          <div className="flex items-center gap-1.5 overflow-hidden text-sm text-muted-foreground">
            <Link
              to="/courses"
              className="shrink-0 transition-colors hover:text-foreground"
            >
              Dashboard
            </Link>
            <ChevronRight className="h-3.5 w-3.5 shrink-0" />
            <Link
              to={`/courses/${id}`}
              className="shrink-0 transition-colors hover:text-foreground"
            >
              Course
            </Link>
            <ChevronRight className="h-3.5 w-3.5 shrink-0" />
            <span className="truncate font-medium text-foreground">
              {topic.title}
            </span>
          </div>

          {/* Nav buttons */}
          <div className="flex items-center gap-2">
            {topic.prev && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate(`/courses/${id}/topics/${topic.prev}`)}
              >
                <ArrowLeft className="mr-1 h-4 w-4" />
                <span className="hidden sm:inline">Previous</span>
              </Button>
            )}
            <span className="hidden px-2 text-xs text-muted-foreground sm:inline">
              Topic {topic.order}
            </span>
            {topic.next && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate(`/courses/${id}/topics/${topic.next}`)}
              >
                <span className="hidden sm:inline">Next</span>
                <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Content area with optional TOC sidebar */}
      <div className="mx-auto max-w-6xl px-6 py-10">
        <div className="flex gap-12">
          {/* Main reader */}
          <article className="max-w-3xl min-w-0 flex-1" ref={contentRef}>
            {/* Topic header */}
            <div className="mb-8 space-y-4">
              <h1 className="font-display text-3xl font-bold tracking-tight">
                {topic.title}
              </h1>
              <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <BookOpen className="h-4 w-4" />
                  Module topic
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="h-4 w-4" />
                  {estimatedReadTime} min read
                </span>
                {topic.isCompleted ? (
                  <Badge
                    variant="secondary"
                    className="border-none bg-emerald-500/10 text-emerald-500"
                  >
                    <CheckCircle2 className="mr-1 h-3.5 w-3.5" />
                    Completed
                  </Badge>
                ) : (
                  <Badge variant="outline" className="text-muted-foreground">
                    <Circle className="mr-1 h-3.5 w-3.5" />
                    In progress
                  </Badge>
                )}
              </div>
            </div>

            <Separator className="mb-8" />

            {/* Rendered content */}
            <ContentRenderer
              content={contentToRender}
              onHeadingsExtracted={setHeadings}
            />

            <Separator className="mt-12 mb-8" />

            {/* Bottom action bar */}
            <div className="flex flex-col items-center justify-between gap-4 pb-10 sm:flex-row">
              <div>
                {topic.prev ? (
                  <Button
                    variant="ghost"
                    onClick={() =>
                      navigate(`/courses/${id}/topics/${topic.prev}`)
                    }
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Previous topic
                  </Button>
                ) : (
                  <Button variant="ghost">
                    <Link to={`/courses/${id}`}>
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Back to course
                    </Link>
                  </Button>
                )}
              </div>

              <Button
                variant={topic.isCompleted ? "outline" : "default"}
                onClick={() => updateTopicCompletion()}
                disabled={isToggling}
              >
                {isToggling ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : topic.isCompleted ? (
                  <Circle className="mr-2 h-4 w-4" />
                ) : (
                  <CheckCircle2 className="mr-2 h-4 w-4" />
                )}
                {topic.isCompleted ? "Mark incomplete" : "Mark complete"}
              </Button>

              <div>
                {topic.next ? (
                  <Button
                    onClick={() =>
                      navigate(`/courses/${id}/topics/${topic.next}`)
                    }
                  >
                    Next topic
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                ) : (
                  <Button>
                    <Link to={`/courses/${id}`}>
                      Finish course
                      <CheckCircle2 className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                )}
              </div>
            </div>
          </article>

          {/* Right sidebar — TOC */}
          <aside className="hidden w-56 shrink-0 lg:block">
            <div className="sticky top-20">
              <TableOfContents
                headings={headings}
                activeId={activeHeading}
                readProgress={readProgress}
              />
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

// ─── Loading skeleton ───
function TopicSkeleton() {
  return (
    <div className="-m-6">
      <div className="flex h-14 items-center border-b border-border px-6">
        <Skeleton className="h-4 w-48" />
      </div>
      <div className="mx-auto max-w-3xl space-y-6 px-6 py-10">
        <Skeleton className="h-10 w-3/4" />
        <div className="flex gap-3">
          <Skeleton className="h-5 w-24" />
          <Skeleton className="h-5 w-20" />
          <Skeleton className="h-5 w-28" />
        </div>
        <Separator />
        <div className="space-y-4">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="mt-6 h-8 w-1/2" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-32 w-full rounded-xl" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
        </div>
      </div>
    </div>
  );
}
