import { appPaths } from "@/config";
import {
  LogOut,
  RefrigeratorIcon,
  ShoppingBasket,
  ShoppingCart,
  Truck,
  Users2,
  VenetianMask,
} from "lucide-react";
import * as React from "react";
import { Link } from "react-router-dom";
import { Avatar, AvatarImage } from "../avatar";
import { Button } from "../button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../dropdown-menu";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarSeparator,
} from "./sidebar";

/** Menu Configuration */
const MENU_ITEMS = [
  {
    title: "შეკვეთები",
    icon: ShoppingCart,
    url: appPaths.app.orders.getHref(),
  },
  {
    title: "სუფთა ზონა",
    icon: VenetianMask,
    url: appPaths.app.cleanzone.getHref(),
  },
  {
    title: "დისტრიბუცია",
    icon: Truck,
    url: appPaths.app.distribution.getHref(),
  },
  {
    title: "კლიენტები",
    icon: Users2,
    url: appPaths.app.customers.path,
  },
  {
    title: "პროდუქტები",
    icon: ShoppingBasket,
    url: appPaths.app.products.path,
  },
  {
    title: "ნაშთი",
    icon: RefrigeratorIcon,
    url: appPaths.app.surplus.path,
  },
];

/** Main Sidebar Component */
export const AppSidebar: React.FC = () => {
  return (
    <Sidebar collapsible="offcanvas">
      <SidebarContent className="gap-0 p-4">
        {/* Sidebar Header */}
        <SidebarHeader className="place-content-center">
          <Avatar className="w-36 h-14">
            <AvatarImage
              src="/logo/laferme-logo.webp"
              alt="ლა ფერმა - ლოგო"
              className="aspect-video"
            />
          </Avatar>
        </SidebarHeader>

        {/* Separator */}
        <SidebarSeparator className="mb-4" />

        {/* Sidebar Main Content */}
        <SidebarGroup className="gap-4 p-0">
          <SidebarGroupLabel>მართვის პანელი</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {MENU_ITEMS.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    className="h-12 pl-2 md:pl-3 lg:pl-4"
                  >
                    <Link to={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Separator */}
        <SidebarSeparator className="mt-auto" />

        {/* Sidebar Footer */}
        <SidebarFooter className="mt-2">
          <SidebarMenu>
            <SidebarMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger asChild className="w-full">
                  <Button
                    variant={"ghost"}
                    className="flex justify-start items-center gap-3 w-full p-0"
                  >
                    <Avatar>
                      <AvatarImage src="https://images.unsplash.com/photo-1640960543409-dbe56ccc30e2?q=80&w=2725&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
                    </Avatar>
                    <div className="text-xs flex flex-col items-start">
                      <span>გიორგი მენაბდიშვილი</span>
                      <span className="text-neutral-400">გაყიდები</span>
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-40" side="top">
                  <DropdownMenuLabel>ანგარიში</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem>პროფილი</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <LogOut /> გამოსვლა
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>

        {/* Sidebar Rail */}
        <SidebarRail />
      </SidebarContent>
    </Sidebar>
  );
};
