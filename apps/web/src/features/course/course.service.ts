import { apiClient } from "@/lib/apiClient";

export const courseService = {
  getCourses: () => apiClient.get("/courses").then((r) => r.data),
  getCourse: (id: string) =>
    apiClient.get(`/courses/${id}`).then((r) => r.data),
};
