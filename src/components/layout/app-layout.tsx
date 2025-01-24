import * as React from "react";

import { Toaster } from "sonner";

import { AppSidebar } from "../ui";
import { LottieCheckIcon } from "../ui/lottie";
import { SidebarInset, SidebarTrigger } from "../ui/sidebar/sidebar";

export const AppLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <AppSidebar />
      <SidebarInset>
        <div className="container flex justify-between items-center flex-col min-h-screen">
          <header className="flex h-24 mb-6 w-full items-center justify-start gap-4">
            <SidebarTrigger variant={"ghost"} className="size-9" />
          </header>
          <main className="size-full flex-1">{children}</main>
          <Toaster
            position="top-right"
            expand
            visibleToasts={5}
            toastOptions={{
              classNames: {
                toast: "bg-background text-foreground",
                description: "font-medium",
                success: "bg-success-50 text-success-600",
                error: "bg-danger-50 text-danger-700",
                info: "bg-info-50 text-info-700",
                warning: "bg-warning-50 text-warning-700",
              },
            }}
            icons={{
              success: <LottieCheckIcon />,
            }}
            duration={5000}
          />
          <footer className="">sidebar layout footer</footer>
        </div>
      </SidebarInset>
    </>
  );
};
