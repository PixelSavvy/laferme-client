import { cn } from "@/lib";
import { format } from "date-fns";
import { ka } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";
import { FieldValues, Path, UseFormReturn } from "react-hook-form";
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
        <FormItem className="flex flex-col items-start">
          <FormLabel htmlFor={name}>{label}</FormLabel>
          <Popover>
            <PopoverTrigger
              asChild
              disabled={field.disabled}
              className="w-[278px]"
            >
              <FormControl>
                <Button
                  variant={"outline"}
                  className={cn(
                    " pl-3 text-left font-normal group  ",
                    !field.value && "text-neutral-700"
                  )}
                >
                  {field.value ? (
                    format(field.value, "d MMMM, y", { locale: ka })
                  ) : (
                    <span>აირჩიე თარიღი</span>
                  )}
                  <CalendarIcon className="ml-auto h-4 w-4 text-neutral-700" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="p-0" align="start">
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
