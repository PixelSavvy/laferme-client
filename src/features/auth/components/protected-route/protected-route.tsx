import { appPaths } from "@/config";
import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useUser } from "../../api";

type ProtectedRouteProps = {
  children: ReactNode;
};

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const user = useUser();
  const location = useLocation();

  if (!user.data) {
    <Navigate to={appPaths.auth.login.getHref(location.pathname)} replace />;
  }

  return children;
};
