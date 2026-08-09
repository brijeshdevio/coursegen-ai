import { createZodDto } from 'nestjs-zod';
import z from 'zod';

export const GenerateCourseSchema = z
  .object({
    topic: z
      .string({ error: 'Topic is required.' })
      .min(2, 'Topic must be at least 2 characters.')
      .max(200, 'Topic cannot exceed 200 characters.'),

    level: z
      .enum(['BEGINNER', 'INTERMEDIATE', 'ADVANCED'], {
        error: 'Please select a valid course level.',
      })
      .default('INTERMEDIATE'),
  })
  .strict();

export class GenerateCourseDto extends createZodDto(GenerateCourseSchema) {}
