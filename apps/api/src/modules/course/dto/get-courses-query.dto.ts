import { createZodDto } from 'nestjs-zod';
import z from 'zod';

export const GetCoursesQuerySchema = z
  .object({
    page: z.coerce.number().int().min(1).default(1),

    limit: z.coerce.number().int().min(1).max(100).default(10),

    search: z.string().trim().min(1, 'Search cannot be empty.').optional(),
  })
  .strict();

export class GetCoursesQueryDto extends createZodDto(GetCoursesQuerySchema) {}
