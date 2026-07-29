import { createZodDto } from 'nestjs-zod';
import z from 'zod';

export const UpdateProfileSchema = z
  .object({
    name: z
      .string({ message: 'Name is required.' })
      .min(2, 'Name must be at least 2 characters.')
      .max(100, 'Name must not exceed 100 characters.'),
  })
  .strict();

export class UpdateProfileDto extends createZodDto(UpdateProfileSchema) {}
