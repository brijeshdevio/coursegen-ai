import { createContext, type ReactNode } from "react";
import { useUser } from "@/features/user/hooks/useUser";
import type { AuthContext as AuthCTX } from "@/types/user";

const initialContext: AuthCTX = {
  isAuthenticated: false,
  isLoading: true,
  user: null,
};

export const AuthContext = createContext<AuthCTX>(initialContext);

export function AuthProvider({ children }: { children: ReactNode }) {
  const { data: user, isPending } = useUser();

  return (
    <AuthContext.Provider
      value={{ user, isLoading: isPending, isAuthenticated: !!user }}
    >
      {children}
    </AuthContext.Provider>
  );
}
