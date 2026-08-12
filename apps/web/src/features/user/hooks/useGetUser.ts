import { useQuery } from "@tanstack/react-query";
import { userService } from "../user.service";

export function useGetUser() {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["users", "me"],
    queryFn: () => userService.getUser(),
    retry: false,
  });

  return {
    data,
    isLoading,
    isError,
    refetch,
  };
}
