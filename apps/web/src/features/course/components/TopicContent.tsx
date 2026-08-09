import ReactMarkdown from "react-markdown";
import type { CourseTopic } from "../course.types";

interface TopicContentProps {
  topic: CourseTopic;
}

export function TopicContent({ topic }: TopicContentProps) {
  return (
    <div className="space-y-8">
      <div className="border-b pb-6">
        <h1 className="text-3xl font-extrabold tracking-tight md:text-5xl">
          {topic.title}
        </h1>
      </div>

      <div className="prose max-w-none prose-slate dark:prose-invert">
        {topic.content ? (
          <ReactMarkdown>{topic.content}</ReactMarkdown>
        ) : (
          <p className="text-muted-foreground italic">
            No content available for this topic.
          </p>
        )}
      </div>
    </div>
  );
}
