import { useQuery } from "@tanstack/react-query";
import type { CourseDetailsResponse } from "../types";

export const useCourseDetails = (id: string | undefined) => {
  return useQuery<CourseDetailsResponse>({
    queryKey: ["course", id],
    enabled: !!id,
    queryFn: async () => {
      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 800));

      if (id === "error") {
        throw new Error("Failed to load course details");
      }

      const modules = Array.from({ length: 10 }).map((_, mIndex) => {
        const numTopics = Math.floor(Math.random() * 4) + 5; // 5 to 8 topics
        return {
          id: `mod-${mIndex + 1}`,
          title: `Module ${mIndex + 1}: ${['Fundamentals', 'Core Concepts', 'Advanced Techniques', 'Architecture', 'Performance', 'State Management', 'Ecosystem', 'Testing', 'Deployment', 'Best Practices'][mIndex]}`,
          order: mIndex + 1,
          topics: Array.from({ length: numTopics }).map((_, tIndex) => ({
            id: `top-${mIndex + 1}-${tIndex + 1}`,
            title: `Topic ${tIndex + 1}: Exploring ${['Syntax', 'Patterns', 'Implementation', 'Integration', 'Debugging', 'Security', 'Optimization', 'Scaling'][tIndex % 8]}`,
            order: tIndex + 1,
            isCompleted: Math.random() > 0.5, // 50% chance of completion
          })),
        };
      });

      return {
        id: id!,
        title: "Mastering Advanced React Patterns",
        description:
          "An in-depth guide to building scalable, high-performance web applications using the latest React features and modern frontend architecture.",
        topic: "Frontend Development",
        level: "Advanced",
        createdAt: new Date(),
        updatedAt: new Date(),
        modules,
        resources: [
          {
            id: "res-1",
            title: "React Documentation",
            url: "https://react.dev",
            type: "documentation",
          },
          {
            id: "res-2",
            title: "Project Starter Template",
            url: "#",
            type: "github",
          },
          {
            id: "res-3",
            title: "Advanced Patterns Guide",
            url: "#",
            type: "pdf",
          },
        ],
      };
    },
  });
};
