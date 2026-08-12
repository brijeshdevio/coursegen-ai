import { cn } from "@/lib/utils";

export function Loading({ className }: { className?: string }) {
  return (
    <div className={cn("flex h-screen items-center justify-center", className)}>
      <div>Loading...</div>
    </div>
  );
}
