import { appPaths } from "@/config";
import { useUser } from "@/features/auth";
import { ReactNode, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Head } from "../seo";

type AuthLayoutProps = {
  title: string;
  children: ReactNode;
};

export const AuthLayout = ({ title, children }: AuthLayoutProps) => {
  // Get the authenticated user
  // const user = useUser();
  const user = useUser();

  // Get the redirectTo query parameter
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get("redirectTo");

  // Navigation hook
  const navigate = useNavigate();

  // If the user is authenticated, redirect to the app root
  useEffect(() => {
    if (user?.data) {
      navigate(redirectTo ? redirectTo : appPaths.app.root.getHref(), {
        replace: true,
      });
    }
  }, [navigate, redirectTo, user?.data]);

  return (
    <div className="w-full max-w-sm m-auto">
      <Head title={title} />
      <div>{children}</div>
    </div>
  );
};
