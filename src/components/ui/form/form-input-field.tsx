import { FieldValues, Path, UseFormReturn } from "react-hook-form";

import { CircleHelp } from "lucide-react";

import { HoverCard, HoverCardContent, HoverCardTrigger } from "../hover-card";
import { Input } from "../input";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./form";

type InputFieldProps<T extends FieldValues> = {
  form: UseFormReturn<T>;
  type: string;
  name: Path<T>;
  label: string;
  className?: string;
  showHoverCard?: boolean;
  hoverCard?: string;
  disabled?: boolean;
};

export const InputField = <T extends FieldValues>({
  form,
  name,
  label,
  type,
  className = "",
  showHoverCard = false,
  hoverCard,
  disabled,
}: InputFieldProps<T>) => (
  <FormField
    control={form.control}
    name={name}
    render={({ field }) => (
      <FormItem className={`w-full ${className}`}>
        <div className="flex justify-start items-center gap-1">
          <FormLabel htmlFor={name} className="">
            {label}
          </FormLabel>
          {showHoverCard && (
            <HoverCard>
              <HoverCardTrigger className="">
                <CircleHelp size={16} />
              </HoverCardTrigger>
              <HoverCardContent className="" align="start">
                {hoverCard}
              </HoverCardContent>
            </HoverCard>
          )}
        </div>
        <FormControl>
          <Input
            {...field}
            disabled={disabled ? disabled : field.disabled}
            id={name}
            name={name}
            type={type}
            className="w-full"
            min={type === "number" ? 0 : undefined}
            step={type === "number" ? 0.01 : undefined}
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
);
