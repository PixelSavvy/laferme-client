import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 typo-label-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "text-neutral-800 bg-neutral-200 border-neutral-200",
        primary: "text-white bg-primary-500 border-primary-500",
        secondary: "text-white bg-secondary-500 border-secondary-500",
        success: "text-white bg-success-500 border-success-500",
        danger: "text-white bg-danger-500 border-danger-500",
        warning: "text-white bg-warning-500 border-warning-500",
        info: "text-white bg-info-500 border-info-500",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
