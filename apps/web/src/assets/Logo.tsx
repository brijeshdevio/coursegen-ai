import { Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link to="/" className={`flex items-center gap-2 ${className}`}>
      <span className="grid h-8 w-8 place-items-center rounded-lg bg-primary text-foreground ring-1 ring-primary/30">
        <Sparkles className="h-4 w-4" />
      </span>
      <span className="font-display text-lg font-bold tracking-tight">
        CourseGen <span className="text-primary">AI</span>
      </span>
    </Link>
  );
}
