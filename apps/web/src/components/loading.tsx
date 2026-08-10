import { cn } from "@/lib/utils";

import { Spinner } from "./ui/spinner";

export function Loading({ className }: { className?: string }) {
  return (
    <div className={cn("flex h-screen items-center justify-center", className)}>
      <div>
        <Spinner className="size-8" />
      </div>
    </div>
  );
}
