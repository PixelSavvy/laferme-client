import { ComponentProps, ReactNode } from "react";
import { Drawer as DrawerPrimitive } from "vaul";

import { useDrawer } from "@/hooks";
import { cn } from "@/lib";
import { Button } from "../button";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./drawer";

type DrawerProps = ComponentProps<typeof DrawerPrimitive.Root>;

type AppDrawerProps = DrawerProps & {
  label: string;
  title: string;
  description?: string;
  children: ReactNode;
  className?: string;
};

export const AppDrawer = ({
  label,
  title,
  description,
  children,
  className,

  ...props
}: AppDrawerProps) => {
  const { isOpen, setIsOpen } = useDrawer();

  return (
    <Drawer {...props} direction="right" open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger asChild>
        <Button>{label}</Button>
      </DrawerTrigger>
      <DrawerContent
        onCloseAutoFocus={(e) => e.preventDefault()}
        className={cn("h-full ml-auto", className)}
      >
        <DrawerHeader>
          <DrawerTitle>{title}</DrawerTitle>
          {description && <DrawerDescription>{description}</DrawerDescription>}
        </DrawerHeader>
        {children}
      </DrawerContent>
    </Drawer>
  );
};
