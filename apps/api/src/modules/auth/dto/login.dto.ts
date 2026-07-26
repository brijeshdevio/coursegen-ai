import { createZodDto } from 'nestjs-zod';
import z from 'zod';

export const LoginUserSchema = z
  .object({
    email: z
      .email('Please provide a valid email address.')
      .max(40, 'Email must not exceed 40 characters.')
      .transform((email) => email.toLowerCase()),

    password: z
      .string({ message: 'Password is required.' })
      .min(8, 'Password must be at least 8 characters.')
      .max(40, 'Password must not exceed 40 characters.'),
  })
  .strict();

export class LoginUserDto extends createZodDto(LoginUserSchema) {}
