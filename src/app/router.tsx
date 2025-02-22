/* eslint-disable @typescript-eslint/no-explicit-any */
import { QueryClient, useQueryClient } from "@tanstack/react-query";
import { useMemo } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { AppRoot, AppRootErrorBoundary } from "./routes/app/root";

import { appPaths } from "@/config";
import { ProtectedRoute } from "@/features/auth";

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
        path: appPaths.auth.login.path,
        lazy: () => import("./routes/auth/login").then(convert(queryClient)),
      },

      // Protected Routes
      {
        path: appPaths.app.root.path,
        element: (
          <ProtectedRoute>
            <AppRoot />
          </ProtectedRoute>
        ),
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
          // CleanZone
          {
            path: appPaths.app.cleanzone.path,
            lazy: () =>
              import("./routes/app/cleanzone").then(convert(queryClient)),
          },
          // Distribution
          {
            path: appPaths.app.distribution.path,
            lazy: () =>
              import("./routes/app/distribution").then(convert(queryClient)),
          },

          // Surplus
          {
            path: appPaths.app.surplus.path,
            lazy: () =>
              import("./routes/app/surplus").then(convert(queryClient)),
          },
          // Employees
          {
            path: appPaths.app.employees.path,
            lazy: () =>
              import("./routes/app/employees").then(convert(queryClient)),
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
