import { Search } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";

import { useDebounce } from "@/hooks/useDebounce";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function CourseFilters() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialSearch = searchParams.get("search") || "";
  const initialLevel = searchParams.get("level") || "all";

  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const debouncedSearch = useDebounce(searchTerm, 500);

  useEffect(() => {
    setSearchParams(
      (prev) => {
        if (debouncedSearch) {
          prev.set("search", debouncedSearch);
        } else {
          prev.delete("search");
        }
        prev.set("page", "1"); // Reset page on search
        return prev;
      },
      { replace: true }
    );
  }, [debouncedSearch, setSearchParams]);

  const handleLevelChange = (value: string | null) => {
    setSearchParams(
      (prev) => {
        if (value && value !== "all") {
          prev.set("level", value);
        } else {
          prev.delete("level");
        }
        prev.set("page", "1"); // Reset page on filter
        return prev;
      },
      { replace: true }
    );
  };

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="relative w-full max-w-sm">
        <Search className="absolute top-2.5 left-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search courses..."
          className="pl-8"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <Select
        value={initialLevel}
        onValueChange={(value) => handleLevelChange(value)}
      >
        <SelectTrigger className="w-full sm:w-[180px]">
          <SelectValue placeholder="All Levels" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Levels</SelectItem>
          <SelectItem value="beginner">Beginner</SelectItem>
          <SelectItem value="intermediate">Intermediate</SelectItem>
          <SelectItem value="advanced">Advanced</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
