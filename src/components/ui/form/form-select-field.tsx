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
  label: string;
  className?: string;
  placeholder?: string;
  items: {
    label: string;
    value: string;
  }[];

  isDisabled?: boolean;
};

export const SelectField = <T extends FieldValues>({
  form,
  name,
  label,
  items,
  className,
  placeholder,
  isDisabled,
}: SelectFieldProps<T>) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => {
        return (
          <FormItem className={cn("w-auto ", className)}>
            <FormLabel htmlFor={name}>{label}</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger disabled={isDisabled}>
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
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
};
