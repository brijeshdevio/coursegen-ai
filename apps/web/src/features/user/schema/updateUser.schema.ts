import z from "zod";

export const UpdateUserSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(1, "Name is required.")
      .max(100, "Name cannot exceed 100 characters."),
    email: z.email("Please enter a valid email address.").trim(),
  })
  .strict();

export type UpdateUser = z.infer<typeof UpdateUserSchema>;
