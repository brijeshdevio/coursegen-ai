import { apiClient } from "@/lib/apiClient";
import type { Signup } from "./schema/signup.schema";
import type { Login } from "./schema/login.schema";

export const authService = {
  signup: (data: Signup) =>
    apiClient.post("/auth/register", data).then((r) => r.data),
  login: (data: Login) =>
    apiClient.post("/auth/login", data).then((r) => r.data),
};
