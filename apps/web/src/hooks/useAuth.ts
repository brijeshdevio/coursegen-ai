import { useContext } from "react";
import { AuthContext } from "@/providers/AuthProvider";

export const useAuth = () => {
  const user = useContext(AuthContext);
  if (!user) {
    throw new Error();
  }
  return user;
};
