import { email, password } from "@/utils/schema";
import z from "zod";

export const LoginSchema = z
  .object({
    email,
    password,
  })
  .strict();

export type Login = z.infer<typeof LoginSchema>;
