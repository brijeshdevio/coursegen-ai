import z from "zod";

export const ResourceSchema = z
  .object({
    title: z
      .string()
      .trim()
      .min(1, "Resource title is required.")
      .max(255, "Resource title must not exceed 255 characters."),

    url: z
      .url("Please provide a valid URL.")
      .max(2048, "URL must not exceed 2048 characters."),

    type: z.enum(["youtube", "article", "docs"], {
      message: "Resource type must be youtube, article or docs.",
    }),
  })
  .strict();

export const ChapterSchema = z
  .object({
    order: z
      .int("Order must be an integer.")
      .min(1, "Order must be at least 1."),

    title: z
      .string()
      .trim()
      .min(1, "Chapter title is required.")
      .max(255, "Chapter title must not exceed 255 characters."),

    points: z
      .array(
        z
          .string()
          .trim()
          .min(1, "Point cannot be empty.")
          .max(255, "Point must not exceed 255 characters.")
      )
      .min(1, "At least one point is required."),
  })
  .strict();

export const SaveCourseSchema = z
  .object({
    title: z
      .string()
      .trim()
      .min(3, "Title must be at least 3 characters.")
      .max(255, "Title must not exceed 255 characters."),

    description: z
      .string()
      .trim()
      .min(10, "Description must be at least 10 characters."),

    topic: z
      .string()
      .trim()
      .min(2, "Topic must be at least 2 characters.")
      .max(100, "Topic must not exceed 100 characters."),

    chapters: z
      .array(ChapterSchema)
      .min(1, "At least one chapter is required."),

    resources: z.array(ResourceSchema).default([]),
  })
  .strict();

export type SaveCourse = z.infer<typeof SaveCourseSchema>;
