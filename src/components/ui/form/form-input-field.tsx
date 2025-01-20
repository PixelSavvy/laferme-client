import { FieldValues, Path, UseFormReturn } from "react-hook-form";

import { CircleHelp } from "lucide-react";

import { cn } from "@/lib";
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
  label?: string;
  className?: string;
  inputClassName?: string;
  showHoverCard?: boolean;
  hoverCard?: string;
  disabled?: boolean;
  showMessage?: boolean;
};

export const InputField = <T extends FieldValues>({
  form,
  name,
  label,
  type,
  className = "",
  inputClassName = "",
  showHoverCard = false,
  hoverCard,
  disabled,
  showMessage = true,
}: InputFieldProps<T>) => (
  <FormField
    control={form.control}
    name={name}
    render={({ field }) => {
      return (
        <FormItem className={`w-full ${className} ${!label && "space-y-0"}`}>
          <div className="flex justify-start items-center gap-1">
            {label && <FormLabel htmlFor={name}>{label}</FormLabel>}
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
              className={cn("w-full", inputClassName)}
              min={type === "number" ? 0 : undefined}
              step={type === "number" ? 0.01 : undefined}
              onChange={(e) => {
                if (type === "number") {
                  field.onChange(Number(e.target.value));
                } else {
                  field.onChange(e.target.value);
                }
              }}
              onClick={(e) => (e.target as HTMLInputElement).select()}
            />
          </FormControl>
          {showMessage && <FormMessage />}
        </FormItem>
      );
    }}
  />
);
