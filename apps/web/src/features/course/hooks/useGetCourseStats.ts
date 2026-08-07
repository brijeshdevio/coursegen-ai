import { useQuery } from "@tanstack/react-query";
import { courseService } from "../course.service";

export function useGetCourseStats() {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["courses", "stats"],
    queryFn: () => courseService.getCourseStats(),
  });

  return {
    data,
    isLoading,
    isError,
    refetch,
  };
}
