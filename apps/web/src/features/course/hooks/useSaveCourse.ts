import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { notifyError } from "@/lib/notification";

import { courseService } from "../course.service";
import { SaveCourseSchema, type SaveCourse, type SaveCourseInput } from "../schema/saveCourse.schema";

const useSaveCourse = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["courses", "save"],
    mutationFn: courseService.saveCourse,
    onSuccess: () => {
      toast.success("Course saved successfully.");

      queryClient.invalidateQueries({
        queryKey: ["courses", "list"],
      });
    },
    onError: notifyError,
  });
};

export const useSaveCourseFacade = () => {
  const { mutate, data, isPending, isSuccess } = useSaveCourse();

  const {
    handleSubmit,
    register,
    formState: { errors },
    getValues,
  } = useForm<SaveCourseInput, any, SaveCourse>({
    resolver: zodResolver(SaveCourseSchema),
  });

  return {
    submit: (data: SaveCourse) => mutate(data),
    data,
    isPending,
    register,
    handleSubmit,
    errors,
    isSuccess,
    getValues,
  };
};
