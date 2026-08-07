import { useQuery } from "@tanstack/react-query";

import { courseService } from "../course.service";

export function useGetCourse(id: string) {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["courses", id],
    queryFn: () => courseService.getCourse(id),
    enabled: !!id,
  });

  return {
    data,
    isLoading,
    isError,
    refetch,
  };
}
