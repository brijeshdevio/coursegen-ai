import { apiClient } from "@/lib/apiClient";
import type { Generate } from "./schema/generate.schema";

export const courseService = {
  getCourses: () => apiClient.get("/courses").then((r) => r.data),
  getCourse: (id: string) =>
    apiClient.get(`/courses/${id}`).then((r) => r.data),
  generate: (data: Generate) =>
    apiClient.post("/courses/generate", data).then((r) => r.data),
};
