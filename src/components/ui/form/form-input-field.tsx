import { cn } from "@/lib";
import { Control, FieldValues } from "react-hook-form";
import { Input } from "../input";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./form";

type InputFieldProps<T extends FieldValues> = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "name" | "id"
> & {
  control: Control<T>;
  name: string;
  label: string;
  className?: string;
  inputClassName?: string;
  isCurrency?: boolean;
};

export const InputField = <T extends FieldValues>({
  control,
  name,
  label,
  type = "text",
  className = "",
  inputClassName = "",
  isCurrency = false,
  ...inputProps
}: InputFieldProps<T>) => (
  <FormField
    control={control as Control<FieldValues>}
    name={name}
    render={({ field }) => (
      <FormItem className={`w-full ${className}`}>
        <FormLabel htmlFor={name} className="text-neutral-800">
          {label}
        </FormLabel>
        <FormControl>
          <Input
            {...field}
            {...inputProps}
            showLeftIcon={isCurrency}
            leftIcon="₾"
            type={type}
            id={name}
            name={name}
            className={cn("w-full ", inputClassName)}
            disabled={inputProps.disabled}
            min={type === "number" ? 0 : undefined}
            step={type === "number" ? 0.01 : undefined}
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
);
