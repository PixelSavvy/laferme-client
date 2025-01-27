import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ErrorBoundary } from "react-error-boundary";
import { HelmetProvider } from "react-helmet-async";

import { SidebarProvider } from "@/components/ui";
import { DrawerProvider } from "@/context";
import { queryConfig } from "@/lib";
import { getCookie } from "@/utils";
import { ReactNode, Suspense, useState } from "react";

type TAppProviderProps = {
  children: ReactNode;
};

export const AppProvider = ({ children }: TAppProviderProps) => {
  const [queryClient] = useState(
    () => new QueryClient({ defaultOptions: queryConfig }),
  );

  const match = getCookie("sidebar:state");
  const defaultOpen = match ? match[2] === "true" : false;

  return (
    // Update Fallbacks
    <Suspense fallback={"loading"}>
      <ErrorBoundary fallback={"error"}>
        <HelmetProvider>
          {/* Query Client Provider */}
          <QueryClientProvider client={queryClient}>
            {import.meta.env.DEV && <ReactQueryDevtools position="right" />}
            <DrawerProvider>
              <SidebarProvider defaultOpen={defaultOpen}>
                {children}
              </SidebarProvider>
            </DrawerProvider>
          </QueryClientProvider>
        </HelmetProvider>
      </ErrorBoundary>
    </Suspense>
  );
};
