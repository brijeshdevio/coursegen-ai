import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { notifyError } from "@/lib/notification";

import { courseService } from "../course.service";

export function useUpdateTopicCompletion(courseId: string, topicId: string) {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationKey: ["courses", courseId, topicId, "completion"],
    mutationFn: () => courseService.updateTopicCompletion(courseId, topicId),
    onSuccess: () => {
      toast.success("Topic status updated.");

      queryClient.invalidateQueries({
        queryKey: ["courses", courseId],
      });

      queryClient.invalidateQueries({
        queryKey: ["courses", courseId, topicId],
      });
    },
    onError: notifyError,
  });

  return {
    updateTopicCompletion: mutate,
    isPending,
  };
}
