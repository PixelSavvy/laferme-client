import { FieldValues, Path, UseFormReturn } from "react-hook-form";

import { convertStatus } from "@/hooks";
import { cn } from "@/lib";
import { Select, SelectContent, SelectItem, SelectTrigger } from "../select";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./form";

type FormSelectStatusFieldProps<T extends FieldValues> = {
  form: UseFormReturn<T>;
  name: Path<T>;
  label: string;
  className?: string;
  placeholder?: string;
  items: {
    label: string;
    value: string;
  }[];

  disabled?: boolean;
  showMessage?: boolean;
};

export const SelectStatusField = <T extends FieldValues>({
  form,
  name,
  label,
  items,
  className,
  disabled,
  showMessage = true,
}: FormSelectStatusFieldProps<T>) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className={cn("w-full -mt-1.5", className)}>
          <FormLabel htmlFor={name}>{label}</FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger disabled={disabled}>
                <span className="disabled:opacity-50">
                  {convertStatus(field.value)}
                </span>
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
          {showMessage && <FormMessage />}
        </FormItem>
      )}
    />
  );
};
