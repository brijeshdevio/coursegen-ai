import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { WindowLoader } from "../loader";

export function ProtectedLayout() {
  const navigate = useNavigate();
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <WindowLoader />;
  }

  if (!isAuthenticated) {
    navigate("/login");
  }

  return (
    <>
      <Outlet />
    </>
  );
}
