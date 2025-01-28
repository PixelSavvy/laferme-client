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

type CalendarFilterProps = Omit<
  UseCalendarFitler,
  "fallback" | "filteredData"
> & {
  className?: string;
  onShowAll: (val: boolean) => void;
};

export const CalendarFilter = ({
  className,
  onShowAll,
  ...props
}: CalendarFilterProps) => {
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
    <div className={cn("flex items-center gap-2", className)}>
      {/* Show All */}
      <div>
        <Button variant={"outline"} onClick={() => onShowAll(true)}>
          ყველა
        </Button>
      </div>
      {/* Day Navigation */}

      <div className="grid grid-cols-3 gap-2">
        <Button
          variant="outline"
          onClick={() => {
            onShowAll(false);
            props.handleDateByDays?.("prev");
          }}
        >
          <ChevronLeft />
          {formatDate(props.prev)}
        </Button>
        <Button
          variant="outline"
          onClick={() => {
            onShowAll(false);
            props.handleDateByDays?.("today");
          }}
        >
          დღეს
        </Button>
        <Button
          variant="outline"
          onClick={() => {
            onShowAll(false);
            props.handleDateByDays?.("next");
          }}
        >
          {formatDate(props.next)}
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
            onSelect={(range) => {
              onShowAll(false);
              props.handleDateByRange?.(range);
            }}
            numberOfMonths={1}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};
