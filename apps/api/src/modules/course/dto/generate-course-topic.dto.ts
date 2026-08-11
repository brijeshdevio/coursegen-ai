import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';

export const GenerateCourseTopicSchema = z.object({
  courseTitle: z.string().trim().min(1, 'courseTitle is required'),
  moduleTitle: z.string().trim().min(1, 'moduleTitle is required'),
  topicTitle: z.string().trim().min(1, 'topicTitle is required'),
  level: z
    .enum(['BEGINNER', 'INTERMEDIATE', 'ADVANCED'], {
      error: 'Please select a valid course level.',
    })
    .optional(),
});

export class GenerateCourseTopicDto extends createZodDto(
  GenerateCourseTopicSchema,
) {}
