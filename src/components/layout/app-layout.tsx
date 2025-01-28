import * as React from "react";

import { Toaster } from "sonner";

import { AppSidebar } from "../ui";
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
            duration={5000}
          />
          <footer className="">sidebar layout footer</footer>
        </div>
      </SidebarInset>
    </>
  );
};
