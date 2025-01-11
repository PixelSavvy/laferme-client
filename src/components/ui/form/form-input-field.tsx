import { cn } from "@/lib";
import { CircleHelp } from "lucide-react";
import { Control, FieldValues } from "react-hook-form";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "../hover-card";
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
  showLabel?: boolean;
  label: string;
  className?: string;
  inputClassName?: string;
  isCurrency?: boolean;
  isWeight?: boolean;
  showHoverCard?: boolean;
  hoverCardContent?: string;
};

export const InputField = <T extends FieldValues>({
  control,
  name,
  showLabel = true,
  label,
  type = "text",
  className = "",
  inputClassName = "",
  isCurrency = false,
  isWeight = false,
  showHoverCard = false,
  hoverCardContent,
  ...inputProps
}: InputFieldProps<T>) => (
  <FormField
    control={control as Control<FieldValues>}
    name={name}
    render={({ field }) => (
      <FormItem className={`w-full ${className}`}>
        {showLabel && (
          <div className="flex justify-start items-center gap-1">
            <FormLabel htmlFor={name} className="text-neutral-800">
              {label}
            </FormLabel>
            {showHoverCard && (
              <HoverCard>
                <HoverCardTrigger className="text-info-700">
                  <CircleHelp size={16} />
                </HoverCardTrigger>
                <HoverCardContent className="typo-label-sm" align="start">
                  {hoverCardContent}
                </HoverCardContent>
              </HoverCard>
            )}
          </div>
        )}

        <FormControl>
          <Input
            {...field}
            {...inputProps}
            showLeftIcon={isCurrency}
            leftIcon={isCurrency && "₾"}
            showRightIcon={isWeight}
            rightIcon={isWeight && "კგ"}
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
