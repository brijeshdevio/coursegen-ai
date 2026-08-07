import { apiClient } from "@/lib/apiClient";
import type { GetUserMe } from "./user.types";
import type { UpdateUser } from "./schema/updateUser.schema";
import type { ChangePassword } from "./schema/changePassword.schema";

export const userService = {
  getUser: (): Promise<GetUserMe> =>
    apiClient.get("/users/me").then((r) => r.data.data),
  updateUser: (data: UpdateUser): Promise<{ message: string }> =>
    apiClient.patch("/users/me", data).then((r) => r.data),
  changePassword: (data: ChangePassword): Promise<{ message: string }> =>
    apiClient.patch("/users/me/password", data).then((r) => r.data),
};
