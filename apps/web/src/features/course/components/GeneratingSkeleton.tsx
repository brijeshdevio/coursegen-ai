import { Sparkles } from "lucide-react";

export function GeneratingSkeleton({ topic }: { topic: string }) {
  return (
    <div className="mx-auto mt-10 max-w-2xl">
      <div className="rounded-2xl border border-border bg-card p-6">
        <div className="flex items-center gap-2 text-sm text-primary">
          <Sparkles className="h-4 w-4 animate-pulse" />
          Generating your course{topic ? ` on "${topic}"` : ""}...
        </div>
        <div className="mt-6 space-y-3">
          <div className="shimmer h-4 w-1/2 rounded-md" />
          <div className="shimmer h-3 w-3/4 rounded-md" />
          <div className="shimmer h-3 w-2/3 rounded-md" />
        </div>
        <div className="mt-6 space-y-2">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="shimmer h-10 w-full rounded-lg" />
          ))}
        </div>
      </div>
    </div>
  );
}
