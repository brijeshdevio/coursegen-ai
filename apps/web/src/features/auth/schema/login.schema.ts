import z from "zod";

const email = z.email("Please enter a valid email").trim().toLowerCase();

const password = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .max(100, "Password is too long");

export const LoginSchema = z
  .object({
    email,
    password,
  })
  .strict();

export type Login = z.infer<typeof LoginSchema>;
