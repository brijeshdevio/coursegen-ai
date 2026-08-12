import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

import { Loading } from "../loading";

export function AuthLayout() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <Loading />;
  }

  if (isAuthenticated) {
    return <Navigate to={"/courses"} replace />;
  }

  return <Outlet />;
}
