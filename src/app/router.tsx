/* eslint-disable @typescript-eslint/no-explicit-any */
import { QueryClient, useQueryClient } from "@tanstack/react-query";
import { useMemo } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { AppRoot, AppRootErrorBoundary } from "./routes/app/root";

import { appPaths } from "@/config";

const convert = (queryClient: QueryClient) => (m: any) => {
  const { clientLoader, clientAction, default: Component, ...rest } = m;
  return {
    ...rest,
    loader: clientLoader?.(queryClient),
    action: clientAction?.(queryClient),
    Component,
  };
};

const createAppRouter = (queryClient: QueryClient) => {
  return createBrowserRouter(
    [
      {
        path: appPaths.app.root.path,
        element: <AppRoot />,
        ErrorBoundary: AppRootErrorBoundary,
        children: [
          // Products
          {
            path: appPaths.app.products.path,
            lazy: () =>
              import("./routes/app/products").then(convert(queryClient)),
          },
          // Customers
          {
            path: appPaths.app.customers.path,
            lazy: () =>
              import("./routes/app/customers").then(convert(queryClient)),
          },
          // Orders
          {
            path: appPaths.app.orders.path,
            lazy: () =>
              import("./routes/app/orders").then(convert(queryClient)),
          },

          {
            path: "*",
            lazy: async () => {
              const { NotFoundRoute } = await import("./routes/not-found");
              return { Component: NotFoundRoute };
            },
          },
        ],
      },
    ],
    {
      future: {
        v7_fetcherPersist: true,
        v7_normalizeFormMethod: true,
        v7_partialHydration: true,
        v7_relativeSplatPath: true,
        v7_skipActionErrorRevalidation: true,
      },
    }
  );
};

export const AppRouter = () => {
  const queryClient = useQueryClient();

  const router = useMemo(() => createAppRouter(queryClient), [queryClient]);

  return (
    <RouterProvider
      router={router}
      future={{
        v7_startTransition: true,
      }}
    />
  );
};
