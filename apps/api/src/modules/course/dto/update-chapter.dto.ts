import { createZodDto } from 'nestjs-zod';
import z from 'zod';

export const UpdateChapterSchema = z
  .object({
    completed: z.boolean({
      message: 'Completed must be a boolean.',
    }),
  })
  .strict();

export class UpdateChapterDto extends createZodDto(UpdateChapterSchema) {}
