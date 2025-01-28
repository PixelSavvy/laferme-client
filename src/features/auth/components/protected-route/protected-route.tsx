import { appPaths } from "@/config";
import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useUser } from "../../api";
import ClipLoader from "react-spinners/ClipLoader";

type ProtectedRouteProps = {
  children: ReactNode;
};

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const user = useUser();
  const location = useLocation();

  if (user.isLoading) {
    return (
      <div className="fixed size-full inset-0 flex items-center justify-center gap-2">
        <span>დაელოდეთ</span>
        <ClipLoader className="text-primary " size={16} />
      </div>
    );
  }

  if (!user.data) {
    return (
      <Navigate to={appPaths.auth.login.getHref(location.pathname)} replace />
    );
  }

  return children;
};
