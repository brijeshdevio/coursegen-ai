import { apiClient } from "@/lib/apiClient";

export const courseService = {
  getCourses: () => apiClient.get("/courses").then((r) => r.data),
};
