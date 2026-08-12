import { BookOpen } from "lucide-react";
import { Link } from "react-router-dom";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link to="/" className={`group flex items-center gap-2 ${className}`}>
      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary shadow-lg shadow-primary/30">
        <BookOpen className="h-4 w-4 text-primary-foreground" />
      </div>
      <span
        className="text-[17px] font-bold tracking-tight text-foreground"
        style={{ fontFamily: "'Syne', sans-serif" }}
      >
        CourseGen
        <span className="text-primary">AI</span>
      </span>
    </Link>
  );
}
