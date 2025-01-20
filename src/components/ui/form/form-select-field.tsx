import { FieldValues, Path, UseFormReturn } from "react-hook-form";

import { cn } from "@/lib";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../select";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./form";

type SelectFieldProps<T extends FieldValues> = {
  form: UseFormReturn<T>;
  name: Path<T>;
  label?: string;
  className?: string;
  triggerClassName?: string;
  placeholder?: string;
  items: {
    label: string;
    value: string;
  }[];

  showMessage?: boolean;
  disabled?: boolean;
};

export const SelectField = <T extends FieldValues>({
  form,
  name,
  label,
  items,
  className,
  triggerClassName = "",
  placeholder,
  disabled,
  showMessage = true,
}: SelectFieldProps<T>) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => {
        return (
          <FormItem className={cn("w-auto ", className)}>
            {label && <FormLabel>{label}</FormLabel>}
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger
                  disabled={disabled}
                  className={cn(triggerClassName)}
                >
                  <SelectValue placeholder={placeholder} />
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
        );
      }}
    />
  );
};
