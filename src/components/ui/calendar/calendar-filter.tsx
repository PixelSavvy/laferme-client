import { addDays, subDays } from "date-fns";
import { ka } from "date-fns/locale";
import { CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react";

import {
  Button,
  Calendar,
  Popover,
  PopoverContent,
  PopoverTrigger,
  UseCalendarFitler,
} from "@/components/ui";
import { cn } from "@/lib";
import { formatDate } from "@/utils";

type CalenderFilterProps = {
  props: Omit<UseCalendarFitler, "filteredData" | "fallback">;
  className?: string;
};

export const CalendarFilter = ({ className, props }: CalenderFilterProps) => {
  const formattedDateRange = props.date?.from ? (
    props.date.to ? (
      `${formatDate(props.date.from)} - ${formatDate(props.date.to)}`
    ) : (
      formatDate(props.date.from)
    )
  ) : (
    <span className="flex justify-start items-center gap-1">
      აირჩიე <CalendarIcon />
    </span>
  );

  return (
    <div className={cn("grid grid-cols-2 gap-2", className)}>
      {/* Day Navigation */}
      <div className="grid grid-cols-3 gap-2">
        <Button
          variant="outline"
          onClick={() => props.handleDateByDays?.("prev")}
          disabled={!props.prev}
        >
          <ChevronLeft />
          {formatDate(subDays(props.prev, 1))}
        </Button>
        <Button
          variant="outline"
          onClick={() => props.handleDateByDays?.("today")}
        >
          დღეს
        </Button>
        <Button
          variant="outline"
          onClick={() => props.handleDateByDays?.("next")}
          disabled={!props.next}
        >
          {formatDate(addDays(props.next, 1))}
          <ChevronRight />
        </Button>
      </div>

      {/* Date Range Picker */}
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(!props.date && "text-neutral-800", "w-[17.375rem]")}
          >
            {formattedDateRange}
          </Button>
        </PopoverTrigger>
        <PopoverContent align="start" className="p-0">
          <Calendar
            mode="range"
            locale={ka}
            selected={props.date}
            onSelect={(range) => range && props.handleDateByRange?.(range)}
            numberOfMonths={1}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};
