import { Outlet, useRouteError } from "react-router-dom";

import { AppLayout } from "@/components/layout";
import { AxiosError } from "axios";

export const AppRoot = () => {
  return (
    <AppLayout>
      <Outlet />
    </AppLayout>
  );
};

export const AppRootErrorBoundary = () => {
  const error = useRouteError() as AxiosError;

  return <div className="text-red-500">{error.message}</div>;
};
