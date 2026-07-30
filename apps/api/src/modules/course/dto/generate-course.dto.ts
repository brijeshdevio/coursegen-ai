import { createZodDto } from 'nestjs-zod';
import z from 'zod';

export const GenerateCourseSchema = z
  .object({
    topic: z
      .string({ message: 'Topic is required.' })
      .min(2, 'Topic must be at least 2 characters.')
      .max(100, 'Topic must not exceed 100 characters.'),
  })
  .strict();

export class GenerateCourseDto extends createZodDto(GenerateCourseSchema) {}
