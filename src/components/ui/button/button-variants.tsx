import { cva } from "class-variance-authority";

export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-1 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary:
          "bg-primary-500 text-background hover:bg-primary-300 focus-visible:bg-primary-300 active:bg-primary-600 disabled:bg-primary-100",
        ghost:
          "bg-transparent text-foreground hover:bg-neutral-300 focus-visible:bg-neutral-300 active:bg-neutral-400 disabled:opacity/90",
        outline:
          "border border-primary-950 bg-transparent text-foreground hover:border-transparent hover:bg-primary-500 hover:text-background focus-visible:border-transparent focus-visible:bg-primary-500 focus-visible:text-foreground active:border-transparent active:bg-primary-600 disabled:border-neutral-500 disabled:bg-neutral-500 disabled:text-neutral-500",
        danger:
          "bg-danger-500 text-background hover:bg-danger-300 focus-visible:bg-danger-300 active:bg-danger-600 disabled:bg-danger-100",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
);
