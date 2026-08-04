import { BookOpen, FileText, Video } from "lucide-react";

export const RESOURCE_ICON = {
  youtube: { Icon: Video, cls: "text-[#ff4d6d]" },
  article: { Icon: FileText, cls: "text-primary" },
  docs: { Icon: BookOpen, cls: "text-success" },
} as const;

export const SUGGESTIONS = [
  "Python",
  "C++",
  "DSA",
  "React",
  "System Design",
  "Networking",
] as const;

export const RESOURCE_META = {
  youtube: {
    icon: Video,
    label: "YouTube",
    cls: "text-[#ff4d6d] bg-[#ff4d6d]/10 border-[#ff4d6d]/30",
  },
  article: {
    icon: FileText,
    label: "Article",
    cls: "text-primary bg-primary/10 border-primary/30",
  },
  docs: {
    icon: BookOpen,
    label: "Docs",
    cls: "text-success bg-success/10 border-success/30",
  },
} as const;
