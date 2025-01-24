import { cn } from "@/lib";
import * as React from "react";

interface InputProps extends React.ComponentProps<"input"> {
  showRightIcon?: boolean;
  showLeftIcon?: boolean;
  rightIcon?: React.ReactNode;
  leftIcon?: React.ReactNode;
  isCurrency?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type = "text",
      showLeftIcon,
      showRightIcon,
      rightIcon,
      leftIcon,
      isCurrency,
      ...props
    },
    ref
  ) => {
    return (
      <div className="relative flex items-center w-auto">
        {/* Currency Symbol */}
        {isCurrency && (
          <div className="absolute right-3 flex items-center text-neutral-700">
            &#8382;
          </div>
        )}
        {/* Left Icon */}
        {showLeftIcon && leftIcon && (
          <div className="absolute left-3 flex items-center text-neutral-700">
            {leftIcon}
          </div>
        )}
        <input
          type={type}
          className={cn(
            "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
            showLeftIcon ? "pl-10" : "",
            showRightIcon ? "pr-10" : "",
            className
          )}
          ref={ref}
          {...props}
          min={type === "number" ? 0 : undefined}
          step={type === "number" ? 0.01 : undefined}
        />

        {/* Right Icon */}
        {showRightIcon && rightIcon && (
          <div className="absolute right-3 flex items-center text-neutral-700">
            {rightIcon}
          </div>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input, type InputProps };
