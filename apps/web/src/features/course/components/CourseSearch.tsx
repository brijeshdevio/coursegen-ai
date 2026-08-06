import { Search } from "lucide-react";
import { useSearchParams } from "react-router-dom";

export function CourseSearch() {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentSearch = searchParams.get("search") || "";
  const currentLevel = searchParams.get("level") || "all";

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value) {
      searchParams.set("search", e.target.value);
    } else {
      searchParams.delete("search");
    }
    searchParams.set("page", "1"); // Reset page on search
    setSearchParams(searchParams, { replace: true });
  };

  const handleLevel = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value && e.target.value !== "all") {
      searchParams.set("level", e.target.value);
    } else {
      searchParams.delete("level");
    }
    searchParams.set("page", "1"); // Reset page on filter
    setSearchParams(searchParams, { replace: true });
  };

  return (
    <div className="flex w-full flex-col items-center gap-3 sm:flex-row md:gap-4">
      <div className="group relative w-full flex-1">
        <Search className="absolute top-1/2 left-3 size-5 -translate-y-1/2 text-muted-foreground transition-colors md:left-4 md:size-6" />
        <input
          type="text"
          placeholder="Search for a course..."
          value={currentSearch}
          onChange={handleSearch}
          className="h-12 w-full rounded-xl border-2 bg-background pr-4 pl-10 text-base font-medium ring-offset-background transition-colors placeholder:text-muted-foreground focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none md:h-16 md:rounded-2xl md:pl-14 md:text-xl"
        />
      </div>
      <select
        value={currentLevel}
        onChange={handleLevel}
        className="h-12 w-full cursor-pointer rounded-xl border-2 bg-background px-4 text-sm font-bold ring-offset-background transition-colors focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none sm:w-48 md:h-16 md:rounded-2xl md:text-base"
      >
        <option value="all">All Levels</option>
        <option value="Beginner">Beginner</option>
        <option value="Intermediate">Intermediate</option>
        <option value="Advanced">Advanced</option>
      </select>
    </div>
  );
}
