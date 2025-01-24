import * as SheetPrimitive from "@radix-ui/react-dialog";
import { ComponentProps, ReactNode } from "react";

import {
  Button,
  DialogDescription,
  DialogTitle,
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui";

type SheetProps = ComponentProps<typeof SheetPrimitive.Root>;

type SheetContentTriggerProps = SheetProps & {
  label: string;
  children: ReactNode;
  className?: string;
  header: string;
  description: string;
};

export const SheetContentTrigger = ({
  label,
  children,
  className,
  header,
  description,
  ...props
}: SheetContentTriggerProps) => {
  return (
    <Sheet {...props}>
      <SheetTrigger asChild className={className}>
        <Button>{label}</Button>
      </SheetTrigger>
      <SheetContent className="w-full max-w-3xl">
        <DialogTitle>{header}</DialogTitle>
        <DialogDescription>{description}</DialogDescription>
        {children}
      </SheetContent>
    </Sheet>
  );
};
