import { email, name, password } from "@/utils/schema";
import z from "zod";

export const SignupSchema = z
  .object({
    name,
    email,
    password,
  })
  .strict();

export type Signup = z.infer<typeof SignupSchema>;
