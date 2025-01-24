import { Controller, useFormContext } from "react-hook-form";

import { Badge } from "@/components/ui";
import { statusesObj } from "@/config";
import { convertStatus } from "@/hooks";
import { cn } from "@/lib";

type CleanzoneStatusFieldProps = {
  disabled: boolean;
};

export const CleanzoneStatusField = ({
  disabled,
}: CleanzoneStatusFieldProps) => {
  const form = useFormContext();
  return (
    <Controller
      control={form.control}
      name="status"
      disabled={disabled}
      render={({ field }) => (
        <ul className="flex gap-2">
          {Object.entries(statusesObj.cleanzone).map(([key, value]) => {
            return (
              <li
                key={key}
                className={cn(
                  "w-full mt-5 ",
                  disabled && "cursor-not-allowed opacity-50"
                )}
              >
                <Badge
                  className={cn(
                    "px-4 py-2 rounded-md transition-all w-full h-10",
                    disabled && "pointer-events-none ",

                    form.watch("status") === key
                      ? "bg-primary"
                      : "bg-neutral-200 text-neutral-800 hover:bg-neutral-300"
                  )}
                  onClick={() => field.onChange(key)}
                >
                  {convertStatus(value)}
                </Badge>
              </li>
            );
          })}
        </ul>
      )}
    />
  );
};
