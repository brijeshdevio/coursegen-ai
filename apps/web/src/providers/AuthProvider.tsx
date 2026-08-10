import type { ReactNode } from "react";
import { AuthContext } from "@/contexts/authContext";
import { useGetUser } from "@/features/user/hooks/useGetUser";

export function AuthProvider({ children }: { children: ReactNode }) {
  const { data, isLoading } = useGetUser();

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: !!data,
        isLoading: isLoading,
        user: data || null,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
