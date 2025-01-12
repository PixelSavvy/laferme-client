import { cn } from "@/lib";
import React from "react";

type FormSectionProps = {
  children: React.ReactNode;
  label?: string;
  className?: string;
};

export const FormSection = ({
  children,
  label,
  className,
}: FormSectionProps) => {
  return (
    <div className="space-y-4 w-full">
      {label && <h3 className="text-base font-semibold">{label}</h3>}
      <div className={cn("flex justify-start items-end gap-4", className)}>
        {children}
      </div>
    </div>
  );
};
