import { apiClient } from "@/lib/apiClient";

import type { Login as LoginRes, Signup as SingupRes } from "./auth.types";
import type { Signup } from "./schema/signup.schema";
import type { Login } from "./schema/login.schema";

export const authService = {
  signup: (data: Signup): Promise<SingupRes> =>
    apiClient.post("/auth/register", data).then((r) => r.data.data),
  login: (data: Login): Promise<LoginRes> =>
    apiClient.post("/auth/login", data).then((r) => r.data.data),
};
