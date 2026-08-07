import { useSignupFacade } from "@/features/auth/hooks/useSignup";

export default function Signup() {
  const { handleSubmit, submit, register, errors, isPending } =
    useSignupFacade();

  // <form onSubmit={handleSubmit(submit)}>
  // @/features/auth/schema/signup.schema.ts
  return <>Signup Page</>;
}
