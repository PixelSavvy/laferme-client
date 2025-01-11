import { cn } from "@/lib";
import { format } from "date-fns";
import { ka } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";
import { FieldValues, Path, UseFormReturn } from "react-hook-form";
import { Button } from "../button/button";
import { Calendar } from "../calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../popover";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./form";

type FormCalendarFieldProps<T extends FieldValues> = {
  form: UseFormReturn<T>;
  name: Path<T>;
  isDisabled?: boolean;
  label?: string;
};

export const FormCalendarField = <T extends FieldValues>({
  form,
  name,

  label,
}: FormCalendarFieldProps<T>) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-col ">
          {label && <FormLabel htmlFor={name}>{label}</FormLabel>}
          <Popover>
            <PopoverTrigger asChild disabled={field.disabled}>
              <FormControl>
                <Button
                  variant={"outline"}
                  className={cn(
                    " pl-3 text-left font-normal w-[280px] group typo-label-md disabled:opacity-50 disabled:text-foreground disabled:bg-background disabled:border-input disabled:cursor-not-allowed ",
                    !field.value && "text-neutral-800"
                  )}
                >
                  {field.value ? (
                    format(field.value, "d MMMM, y", { locale: ka })
                  ) : (
                    <span>აირჩიე თარიღი</span>
                  )}
                  <CalendarIcon className="ml-auto h-4 w-4 text-neutral-800 group-hover:text-background transition-colors" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                selected={field.value ? field.value : undefined}
                onSelect={(date) => {
                  if (date) {
                    field.onChange(date);
                  }
                }}
                mode="single"
                initialFocus
                className="pointer-events-auto"
                locale={ka}
              />
            </PopoverContent>
          </Popover>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
