import { z } from 'zod';

const TopicSchema = z.object({
  title: z.string().min(1),
  order: z.number().int().positive(),
});

const ModuleSchema = z.object({
  order: z.number().int().positive(),
  title: z.string().min(1),
  topics: z.array(TopicSchema).min(5).max(15),
});

const ResourceSchema = z.object({
  title: z.string().min(1),
  url: z.url(),
  type: z.enum(['youtube', 'article', 'docs']),
});

export const CourseResponseSchema = z.object({
  title: z.string().min(3).max(100),
  description: z.string().min(1),
  topic: z.string().min(1),
  level: z.enum(['BEGINNER', 'INTERMEDIATE', 'ADVANCED']),
  modules: z.array(ModuleSchema).min(8).max(12),
  resources: z.array(ResourceSchema).min(5).max(15),
});

export type CourseResponse = z.infer<typeof CourseResponseSchema>;
