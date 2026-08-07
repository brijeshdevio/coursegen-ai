import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { notifyError } from "@/lib/notification";
import { userService } from "../user.service";
import { UpdateUserSchema, type UpdateUser } from "../schema/updateUser.schema";

const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["users", "me", "updateUser"],
    mutationFn: userService.updateUser,
    onSuccess: (res) => {
      toast.success(res.message);
      queryClient.invalidateQueries({
        queryKey: ["users", "me"],
      });
    },
    onError: notifyError,
  });
};

export const useUpdateUserFacade = () => {
  const { mutate, isPending, isSuccess } = useUpdateUser();

  const {
    handleSubmit,
    register,
    formState: { errors },
    getValues,
  } = useForm<UpdateUser>({
    resolver: zodResolver(UpdateUserSchema),
  });

  return {
    submit: (data: UpdateUser) => mutate(data),
    isPending,
    register,
    handleSubmit,
    errors,
    isSuccess,
    getValues,
  };
};
