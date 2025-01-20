import { cn } from "@/lib";
import React from "react";

type FormSectionProps = {
  children: React.ReactNode;
  title?: string;
  className?: string;
};

export const FormSection = ({
  children,
  title,
  className,
}: FormSectionProps) => {
  return (
    <div className="space-y-4 w-full">
      {title && <h3 className="text-base font-semibold">{title}</h3>}
      <div className={cn("flex justify-start items-end gap-4", className)}>
        {children}
      </div>
    </div>
  );
};
