import { Control, FieldValues } from "react-hook-form";

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

import { cn } from "@/lib";

type SelectFieldProps<T extends FieldValues> = {
  control: Control<T>;
  name: string;
  label: string;
  className?: string;
  placeholder?: string;
  items: {
    label: string;
    value: string;
  }[];
};

export const SelectField = <T extends FieldValues>({
  control,
  name,
  label,
  items,
  className,
  placeholder,
}: SelectFieldProps<T>) => {
  return (
    <FormField
      control={control as Control<FieldValues>}
      name={name}
      render={({ field }) => (
        <FormItem className={cn("w-full ", className)}>
          <FormLabel htmlFor={name} className="text-neutral-700">
            {label}
          </FormLabel>
          <Select
            onValueChange={(value) => {
              field.onChange(value);
            }}
            value={field.value as string}
          >
            <FormControl>
              <SelectTrigger disabled={field.disabled} className="h-10">
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
      )}
    />
  );
};
