import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { notifyError } from "@/lib/notification";

import { courseService } from "../course.service";

export function useDeleteCourse() {
  const queryClient = useQueryClient();

  const { isPending, mutate } = useMutation({
    mutationKey: ["courses", "delete"],
    mutationFn: courseService.deleteCourse,
    onSuccess: (res) => {
      toast.success(res.message);

      queryClient.invalidateQueries({
        queryKey: ["courses", "list"],
      });

      queryClient.removeQueries({
        queryKey: ["courses"],
        exact: false,
      });
    },
    onError: notifyError,
  });

  return {
    isPending,
    deleteCourse: mutate,
  };
}
