import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { notifyError } from "@/utils/notification";

import { courseService } from "../course.service";
import { GenerateSchema, type Generate } from "../schema/generate.schema";

const useGenerate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["courses", "generate"],
    mutationFn: courseService.generate,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["courses"] });
    },
    onError: notifyError,
  });
};

export const useGenerateFacade = () => {
  const { mutate, isPending, isSuccess, data } = useGenerate();

  const {
    handleSubmit,
    register,
    formState: { errors },
    getValues,
  } = useForm<Generate>({
    resolver: zodResolver(GenerateSchema),
  });

  return {
    submit: (data: Generate) => mutate(data),
    isPending,
    register,
    handleSubmit,
    errors,
    isSuccess,
    getValues,
    data,
  };
};
