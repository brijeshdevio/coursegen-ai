import { createZodDto } from 'nestjs-zod';
import z from 'zod';

export const SaveCourseSchema = z
  .object({
    title: z
      .string({ error: 'Course title is required.' })
      .min(3, 'Course title must be at least 3 characters.')
      .max(200, 'Course title cannot exceed 200 characters.'),

    description: z
      .string({ error: 'Description must be a string.' })
      .max(5000, 'Description cannot exceed 5000 characters.')
      .optional(),

    topic: z
      .string({ error: 'Topic is required.' })
      .min(2, 'Topic must be at least 2 characters.')
      .max(200, 'Topic cannot exceed 200 characters.'),

    level: z
      .string({ error: 'Level must be a string.' })
      .max(50, 'Level cannot exceed 50 characters.')
      .optional(),

    modules: z
      .array(
        z
          .object({
            title: z
              .string({ error: 'Module title is required.' })
              .min(1, 'Module title cannot be empty.'),

            order: z.number().int().min(1),

            topics: z.array(
              z
                .object({
                  title: z
                    .string({ error: 'Topic title is required.' })
                    .min(1, 'Topic title cannot be empty.'),

                  order: z.number().int().min(1),
                })
                .strict(),
            ),
          })
          .strict(),
      )
      .min(1, 'At least one module is required.'),

    resources: z
      .array(
        z
          .object({
            title: z.string({ error: 'Resource title is required.' }).min(1),

            url: z.url({ error: 'Resource URL must be valid.' }),

            type: z.string({ error: 'Resource type is required.' }).min(1),
          })
          .strict(),
      )
      .optional()
      .default([]),
  })
  .strict();

export class SaveCourseDto extends createZodDto(SaveCourseSchema) {}
