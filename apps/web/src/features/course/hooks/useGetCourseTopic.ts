import { useQuery } from "@tanstack/react-query";

import { courseService } from "../course.service";

export function useGetCourseTopic(id: string, topicId: string) {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["courses", id, topicId],
    queryFn: () => courseService.getCourseTopic(id, topicId),
    enabled: !!id && !!topicId,
  });

  return {
    data,
    isLoading,
    isError,
    refetch,
  };
}
