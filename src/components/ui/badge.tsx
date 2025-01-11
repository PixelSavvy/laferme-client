import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib";

const badgeVariants = cva(
  "inline-flex items-center rounded-md  px-2.5 py-1 typo-label-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 justify-center text-background",
  {
    variants: {
      variant: {
        accepted: "bg-info-500",
        preparing: "bg-warning-500",
        prepared: "bg-success-500",
        readytodeliver: "bg-danger-500",
        delivering: "bg-purple-500",
        delivered: "bg-cyan-500",
        canceled: "bg-neutral-500 text-black",
        returned: "bg-foreground",
      },
    },
    defaultVariants: {
      variant: "accepted",
    },
  }
);

export type BadgeVariant =
  | "accepted"
  | "preparing"
  | "prepared"
  | "readytodeliver"
  | "delivering"
  | "delivered"
  | "canceled"
  | "returned";

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  variant: BadgeVariant | undefined;
}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge };
