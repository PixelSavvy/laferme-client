import { Control, FieldValues } from "react-hook-form";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../select";
import { FormControl, FormField, FormItem, FormLabel } from "./form";

import { cn } from "@/lib";
import { BadgeVariant } from "../badge";

type SelectFieldProps<T extends FieldValues> = {
  control: Control<T>;
  name: string;
  label?: string;
  className?: string;
  items: {
    label: string;
    value: string;
    variant: BadgeVariant;
  }[];
  disabled?: boolean;
};

export const StatusSelectField = <T extends FieldValues>({
  control,
  name,
  label,
  items,
  className,

  disabled,
}: SelectFieldProps<T>) => {
  return (
    <FormField
      control={control as Control<FieldValues>}
      name={name}
      render={({ field }) => (
        <FormItem className={cn("space-y-0 -mt-6", className)}>
          {label && (
            <FormLabel htmlFor={name} className="text-neutral-700">
              {label}
            </FormLabel>
          )}
          <Select
            onValueChange={(value) => {
              field.onChange(value);
            }}
            value={field.value}
          >
            <FormControl>
              <SelectTrigger disabled={disabled} className="h-10 min-w-52">
                <SelectValue placeholder={field.value} />
              </SelectTrigger>
            </FormControl>
            <SelectContent onCloseAutoFocus={(e) => e.preventDefault()}>
              {items.map((item) => (
                <SelectItem key={item.value} value={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FormItem>
      )}
    />
  );
};
