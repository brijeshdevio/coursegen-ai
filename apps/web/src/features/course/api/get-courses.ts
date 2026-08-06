import { useQuery } from "@tanstack/react-query";
import type {
  GetCoursesQuery,
  GetCoursesResponse,
  CourseListItemResponse,
} from "../types";

// Mock data generator
const generateMockCourses = (): CourseListItemResponse[] => {
  return Array.from({ length: 50 }).map((_, i) => ({
    id: `course-${i}`,
    title: `Mastering ${i % 2 === 0 ? "React" : "TypeScript"} Part ${i}`,
    description:
      "An in-depth look at advanced patterns and best practices for building scalable applications.",
    topic: i % 2 === 0 ? "Frontend Development" : "Programming Languages",
    level: i % 3 === 0 ? "Beginner" : i % 3 === 1 ? "Intermediate" : "Advanced",
    totalModules: 10 + (i % 5),
    totalTopics: 50 + (i % 10),
    totalCompletedTopics: (i * 7) % 50, // Pseudo-random completion
    createdAt: new Date(),
  }));
};

const MOCK_DATA = generateMockCourses();

export const useCourses = (query: GetCoursesQuery) => {
  return useQuery<GetCoursesResponse>({
    queryKey: ["courses", query],
    queryFn: async () => {
      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 800));

      let filtered = [...MOCK_DATA];

      if (query.search) {
        const lowerSearch = query.search.toLowerCase();
        filtered = filtered.filter(
          (c) =>
            c.title.toLowerCase().includes(lowerSearch) ||
            c.topic.toLowerCase().includes(lowerSearch)
        );
      }

      if (query.level && query.level !== "all") {
        filtered = filtered.filter((c) => c.level === query.level);
      }

      const page = query.page || 1;
      const limit = query.limit || 9; // Grid of 3 columns looks good with 9
      const total = filtered.length;
      const totalPages = Math.ceil(total / limit);

      const start = (page - 1) * limit;
      const paginatedItems = filtered.slice(start, start + limit);

      return {
        items: paginatedItems,
        pagination: {
          page,
          limit,
          total,
          totalPages,
        },
      };
    },
  });
};
