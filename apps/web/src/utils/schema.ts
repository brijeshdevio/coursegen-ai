import z from "zod";

export const email = z.email("Please enter a valid email").trim().toLowerCase();

export const password = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .max(40, "Password is too long");

export const name = z
  .string()
  .trim()
  .min(1, "Name must be at least 2 characters")
  .max(50, "Name is too long");
