import { apiClient } from "@/lib/apiClient";

export const userService = {
  getUser: () => apiClient.get("/users/me").then((r) => r.data),
};
