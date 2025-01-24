import * as DialogPrimitive from "@radix-ui/react-dialog";
import { ComponentProps, ReactNode } from "react";

import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui";

type DialogProps = ComponentProps<typeof DialogPrimitive.Root>;

type DialogTriggerProps = DialogProps & {
  label: string;
  children: ReactNode;
  className?: string;
  header: string;
  description: string;
};

export const DialogContentTrigger = ({
  label,
  children,
  className,
  header,
  description,
  ...props
}: DialogTriggerProps) => {
  return (
    <Dialog {...props}>
      <DialogTrigger asChild className={className}>
        <Button>{label}</Button>
      </DialogTrigger>
      <DialogContent className="max-w-auto">
        <DialogHeader>{header}</DialogHeader>
        <DialogDescription>{description}</DialogDescription>
        {children}
      </DialogContent>
    </Dialog>
  );
};
