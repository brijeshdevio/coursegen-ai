import { createZodDto } from 'nestjs-zod';
import z from 'zod';

export const RegisterUserSchema = z
  .object({
    name: z
      .string({ message: 'Name is required.' })
      .min(2, 'Name must be at least 2 characters.')
      .max(100, 'Name must not exceed 100 characters.'),

    email: z
      .email('Please provide a valid email address.')
      .max(255, 'Email must not exceed 255 characters.')
      .transform((email) => email.toLowerCase()),

    password: z
      .string({ message: 'Password is required.' })
      .min(8, 'Password must be at least 8 characters.')
      .max(100, 'Password must not exceed 100 characters.'),
  })
  .strict();

export class RegisterUserDto extends createZodDto(RegisterUserSchema) {}
