import { ka } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";
import { FieldValues, Path, UseFormReturn } from "react-hook-form";

import { cn } from "@/lib";
import { formatDate } from "@/utils";
import { Button } from "../button/button";
import { Calendar } from "../calendar/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../popover/popover";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./form";

type CalendarFieldProps<T extends FieldValues> = {
  form: UseFormReturn<T>;
  name: Path<T>;
  disabled?: boolean;
  label?: string;
};

export const CalendarField = <T extends FieldValues>({
  form,
  name,
  label,
  disabled,
}: CalendarFieldProps<T>) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-col items-start w-full">
          <FormLabel htmlFor={name}>{label}</FormLabel>
          <Popover>
            <PopoverTrigger asChild className="w-full" disabled={disabled}>
              <FormControl>
                <Button
                  variant={"outline"}
                  className={cn(
                    " pl-3 text-left font-normal group  ",
                    !field.value && "text-neutral-700",
                  )}
                >
                  {field.value ? (
                    formatDate(field.value)
                  ) : (
                    <span>აირჩიე თარიღი</span>
                  )}
                  <CalendarIcon className="ml-auto h-4 w-4 text-neutral-700" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="p-0" align="start">
              <Calendar
                selected={field.value ?? undefined}
                onSelect={field.onChange}
                mode="single"
                initialFocus
                locale={ka}
                className="cursor-pointer"
                disabled={{ before: new Date() }}
              />
            </PopoverContent>
          </Popover>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
