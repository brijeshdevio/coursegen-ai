import { apiClient } from "@/lib/apiClient";
import type { Generate } from "./schema/generate.schema";
import type { GetCoursesParams } from "@/types/course";

export const courseService = {
  getCourses: (params?: GetCoursesParams) =>
    apiClient.get("/courses", { params }).then((r) => r.data),
  getCourse: (id: string) =>
    apiClient.get(`/courses/${id}`).then((r) => r.data),
  generate: (data: Generate) =>
    apiClient.post("/courses/generate", data).then((r) => r.data),
};
