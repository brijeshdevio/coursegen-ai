import { useQuery } from "@tanstack/react-query";

import type { ListParams } from "@/types";

import { courseService } from "../course.service";

type GetCoursesParams = ListParams & {
  level?: string;
};

export function useGetCourses(params?: GetCoursesParams) {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["courses", "list", params],
    queryFn: () => courseService.getCourses(params),
    placeholderData: (prev) => prev,
  });

  return {
    items: data?.items ?? [],
    pagination: data?.pagination,
    isLoading,
    isError,
    refetch,
  };
}
