import { createZodDto } from 'nestjs-zod';
import z from 'zod';

export const GetCoursesQuerySchema = z
  .object({
    page: z.coerce.number().int().min(1).default(1),

    limit: z.coerce.number().int().min(1).max(100).default(10),

    search: z
      .string()
      .trim()
      .max(200, 'Search cannot exceed 200 characters.')
      .optional(),

    level: z.string().trim().max(50).optional(),
  })
  .strict();

export class GetCoursesQueryDto extends createZodDto(GetCoursesQuerySchema) {}
