import { apiClient } from "@/lib/apiClient";
import type { Signup } from "./schema/signup.schema";

export const authService = {
  signup: (data: Signup) =>
    apiClient.post("/auth/register", data).then((r) => r.data),
};
