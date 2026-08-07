import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

import { userService } from "../user.service";
import {
  ChangePasswordSchema,
  type ChangePassword,
} from "../schema/changePassword.schema";
import { toast } from "sonner";
import { notifyError } from "@/lib/notification";

const useChangePassword = () => {
  return useMutation({
    mutationKey: ["users", "password", "changePassword"],
    mutationFn: userService.changePassword,
    onSuccess: (res) => {
      toast.success(res.message);
    },
    onError: notifyError,
  });
};

export const useChangePasswordFacade = () => {
  const { mutate, isPending, isSuccess } = useChangePassword();

  const {
    handleSubmit,
    register,
    formState: { errors },
    getValues,
    reset,
  } = useForm<ChangePassword>({
    resolver: zodResolver(ChangePasswordSchema),
  });

  return {
    submit: (data: ChangePassword) =>
      mutate(data, {
        onSuccess: () => reset(),
      }),
    isPending,
    register,
    handleSubmit,
    errors,
    isSuccess,
    getValues,
  };
};
