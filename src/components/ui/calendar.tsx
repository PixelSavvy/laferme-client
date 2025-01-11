import { ChevronLeft, ChevronRight } from "lucide-react";
import * as React from "react";
import { DayPicker } from "react-day-picker";

import { cn } from "@/lib";
import { buttonVariants } from "./button/button-variants";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3", className)}
      classNames={{
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4",
        caption: "flex justify-center pt-1 relative items-center",
        caption_label: "typo-label-md font-medium",
        nav: "space-x-1 flex items-center",
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "h-7 w-7  p-0 opacity-50 hover:opacity-100"
        ),
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full border-collapse space-y-1",
        head_row: "flex",
        head_cell: "text-foreground rounded-md w-9 font-medium text-[0.8rem]",
        row: "flex w-full mt-2",
        cell: "h-9 w-9 text-center typo-label-md p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-primary-200/50 [&:has([aria-selected])]:bg-primary-200 first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20 ",
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "h-9 w-9 p-0 font-normal aria-selected:opacity-100 hover:bg-primary-50 "
        ),
        day_range_end: "day-range-end",
        day_selected:
          "bg-primary-500 text-background hover:bg-primary-200 hover:text-background focus:bg-primary-500 focus:text-background",
        day_today: "bg-primary-50 text-foreground",
        day_outside:
          "day-outside text-neutral-500 aria-selected:bg-neutral-100 aria-selected:text-neutral-700",
        day_disabled: "text-neutral-100 opacity-50",
        day_range_middle:
          "aria-selected:bg-primary-50 aria-selected:text-foreground",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        IconLeft: ({ className, ...props }) => (
          <ChevronLeft className={cn("h-4 w-4", className)} {...props} />
        ),
        IconRight: ({ className, ...props }) => (
          <ChevronRight className={cn("h-4 w-4", className)} {...props} />
        ),
      }}
      {...props}
    />
  );
}
Calendar.displayName = "Calendar";

export { Calendar };
