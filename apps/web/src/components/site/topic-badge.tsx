import { topicHue } from "@/lib/course-store";

export function TopicBadge({
  topic,
  className = "",
}: {
  topic: string;
  className?: string;
}) {
  const h = topicHue(topic);
  const style = {
    color: `oklch(0.85 0.12 ${h})`,
    background: `oklch(0.28 0.09 ${h} / 0.35)`,
    borderColor: `oklch(0.6 0.14 ${h} / 0.35)`,
  } as React.CSSProperties;
  return (
    <span
      style={style}
      className={`inline-flex items-center rounded-md border px-2 py-0.5 font-mono text-[11px] font-medium uppercase tracking-wider ${className}`}
    >
      {topic}
    </span>
  );
}
