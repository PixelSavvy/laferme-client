import * as React from "react";

import { QueryClient, useQueryClient } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { AppRoot, AppRootErrorBoundary } from "./routes/app/root";

import { appPaths } from "@/config";

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
            lazy: async () => {
              const { ProductsRoute } = await import("./routes/app/products");
              const { productsLoader } = await import(
                "./routes/loaders/products-loader"
              );
              return {
                Component: ProductsRoute,
                loader: () => productsLoader(queryClient),
              };
            },
            ErrorBoundary: AppRootErrorBoundary,
          },
          // Customers
          {
            path: appPaths.app.customers.path,
            lazy: async () => {
              const { CustomersRoute } = await import("./routes/app/customers");
              const { customersLoader } = await import(
                "./routes/loaders/customers-loader"
              );
              return {
                Component: CustomersRoute,
                loader: () => customersLoader(queryClient),
              };
            },
            ErrorBoundary: AppRootErrorBoundary,
          },

          // Orders
          {
            path: appPaths.app.orders.path,
            lazy: async () => {
              const { OrdersRoute } = await import("./routes/app/orders");
              const { ordersLoader } = await import(
                "./routes/loaders/orders-loader"
              );
              return {
                Component: OrdersRoute,
                loader: () => ordersLoader(queryClient),
              };
            },
            ErrorBoundary: AppRootErrorBoundary,
          },

          // Freezone
          {
            path: appPaths.app.freezone.path,
            lazy: async () => {
              const { FreezoneRoute } = await import("./routes/app/freezone");
              const { freezoneLoader } = await import(
                "./routes/loaders/freezone-loader"
              );
              return {
                Component: FreezoneRoute,
                loader: () => freezoneLoader(queryClient),
              };
            },
            ErrorBoundary: AppRootErrorBoundary,
          },
          // Distribution
          {
            path: appPaths.app.distribution.path,
            lazy: async () => {
              const { DistributionRoute } = await import(
                "./routes/app/distribution"
              );
              const { distributionLoader } = await import(
                "./routes/loaders/distribution-loader"
              );
              return {
                Component: DistributionRoute,
                loader: () => distributionLoader(queryClient),
              };
            },
            ErrorBoundary: AppRootErrorBoundary,
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
    },
  );
};

export const AppRouter = () => {
  const queryClient = useQueryClient();

  const router = React.useMemo(
    () => createAppRouter(queryClient),
    [queryClient],
  );

  return (
    <RouterProvider
      router={router}
      future={{
        v7_startTransition: true,
      }}
    />
  );
};
