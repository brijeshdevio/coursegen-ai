import { useQuery } from "@tanstack/react-query";
import { userService } from "../user.service";

export const useUser = () =>
  useQuery({
    queryKey: ["users", "me"],
    queryFn: userService.getUser,
    retry: false,
  });
