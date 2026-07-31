import z from "zod";

const name = z
  .string()
  .trim()
  .min(1, "Name must be at least 2 characters")
  .max(100, "Name is too long");

const email = z.email("Please enter a valid email").trim().toLowerCase();

const password = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .max(100, "Password is too long");

export const SignupSchema = z
  .object({
    name,
    email,
    password,
  })
  .strict();

export type Signup = z.infer<typeof SignupSchema>;
