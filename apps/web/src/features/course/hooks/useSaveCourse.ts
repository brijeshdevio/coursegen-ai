import { useMutation, useQueryClient } from "@tanstack/react-query";
import { courseService } from "../course.service";
import { notifyError } from "@/utils/notification";
import { toast } from "sonner";

const useSaveCourse = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["courses", "save"],
    mutationFn: courseService.saveCourse,
    onSuccess: () => {
      toast.success("Course saved successfully");
      queryClient.invalidateQueries({ queryKey: ["courses"] });
    },
    onError: notifyError,
  });
};

export const useSaveCourseFacade = () => {
  const { mutate, isPending, isSuccess } = useSaveCourse();

  return {
    mutate,
    isPending,
    isSuccess,
  };
};
