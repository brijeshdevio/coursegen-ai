import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

import { courseService } from "../course.service";
import {
  GenerateCourseSchema,
  type GenerateCourse,
} from "../schema/generateCourse.schema";
import { notifyError } from "@/lib/notification";

const useGenerateCourse = () => {
  return useMutation({
    mutationKey: ["courses", "generate"],
    mutationFn: courseService.generateCourse,
    onError: notifyError,
  });
};

export const useGenerateCourseFacade = () => {
  const { mutate, data, isPending, isSuccess } = useGenerateCourse();

  const {
    handleSubmit,
    register,
    formState: { errors },
    getValues,
  } = useForm<GenerateCourse>({
    resolver: zodResolver(GenerateCourseSchema),
  });

  return {
    submit: (data: GenerateCourse) => mutate(data),
    data,
    isPending,
    register,
    handleSubmit,
    errors,
    isSuccess,
    getValues,
  };
};
