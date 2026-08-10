import type { AuthCTX } from "@/types";
import { createContext } from "react";

const initialCTX: AuthCTX = {
  isAuthenticated: false,
  isLoading: true,
  user: null,
};

export const AuthContext = createContext<AuthCTX>(initialCTX);
