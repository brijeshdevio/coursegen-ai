import { useLoginFacade } from "@/features/auth/hooks/useLogin";

export default function Login() {
  const { handleSubmit, submit, register, errors, isPending } =
    useLoginFacade();

  // <form onSubmit={handleSubmit(submit)}>
  // @/features/auth/schema/login.schema.ts
  return <>Login Page</>;
}
