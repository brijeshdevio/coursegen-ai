import z from "zod";

export const ChangePasswordSchema = z
  .object({
    currentPassword: z
      .string({ message: "Current password is required." })
      .min(8, "Current password must be at least 8 characters.")
      .max(100, "Current password must not exceed 100 characters."),

    newPassword: z
      .string({ message: "New password is required." })
      .min(8, "New password must be at least 8 characters.")
      .max(100, "New password must not exceed 100 characters."),

    confirmPassword: z
      .string({ message: "Confirm password is required." })
      .min(8, "Confirm password must be at least 8 characters.")
      .max(100, "Confirm password must not exceed 100 characters."),
  })
  .strict()
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

export type ChangePassword = z.infer<typeof ChangePasswordSchema>;
