import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

import { authService } from "../auth.service";
import { SignupSchema, type Signup } from "../schema/signup.schema";

const useSignup = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationKey: ["auth", "signup"],
    mutationFn: authService.signup,
    onSuccess: () => {
      toast.success("Signup successful");
      navigate("/login");
    },
  });
};

export const useSignupFacade = () => {
  const { mutate, isPending, isSuccess } = useSignup();

  const {
    handleSubmit,
    register,
    formState: { errors },
    getValues,
  } = useForm<Signup>({
    resolver: zodResolver(SignupSchema),
  });

  return {
    submit: (data: Signup) => mutate(data),
    isPending,
    register,
    handleSubmit,
    errors,
    isSuccess,
    getValues,
  };
};
