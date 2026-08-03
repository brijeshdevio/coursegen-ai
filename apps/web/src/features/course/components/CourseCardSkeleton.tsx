import { Skeleton } from "@/components/ui/skeleton";

export function CourseCardSkeleton() {
  return (
    <div className="flex flex-col rounded-2xl border border-border bg-card p-5">
      {/* Header */}
      <div className="flex items-start justify-between gap-2">
        <Skeleton className="h-6 w-20 rounded-full" />
        <Skeleton className="h-8 w-8 rounded-md" />
      </div>

      {/* Title */}
      <div className="mt-4 space-y-2">
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-3/4" />
      </div>

      {/* Footer */}
      <div className="mt-auto pt-5">
        <Skeleton className="h-1.5 w-full rounded-full" />

        <div className="mt-2 flex items-center justify-between">
          <Skeleton className="h-3 w-28" />
          <Skeleton className="h-3 w-16" />
        </div>
      </div>
    </div>
  );
}
