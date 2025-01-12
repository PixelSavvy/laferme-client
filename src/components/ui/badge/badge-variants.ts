import { cva } from "class-variance-authority";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground",
      },
      status: {
        accepted: "bg-green-500 text-background",
        preparing: "bg-yellow-500 text-background",
        prepared: "bg-black text-background",
        readytodeliver: "bg-blue-500 text-background",
        delivering: "bg-blue-500 text-background",
        delivered: "bg-green-500 text-background",
        cancelled: "bg-red-500 text-background",
        returned: "bg-red-500 text-background",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

type BadgeVariant = keyof typeof badgeVariants;

export { badgeVariants, type BadgeVariant };
