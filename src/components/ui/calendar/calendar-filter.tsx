import {
  Button,
  Calendar,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui";
import { cn } from "@/lib";
import { formatDate } from "@/utils";
import { addDays, subDays } from "date-fns";
import { ka } from "date-fns/locale";
import { CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react";
import { DateRange } from "react-day-picker";

type useCalendarFilterProps = {
  adjustDays?: (type: "prev" | "next" | "all") => void;
  handleSelectDateRange?: (value: string) => void;
  handleDateReset?: () => void;
  currentDay?: Date;
  date?: DateRange;
  prevDay?: Date;
  nextDay?: Date;
  adjustDateRange?: (date: DateRange) => void;
};

export const CalendarFilter = (props: useCalendarFilterProps) => {
  const {
    adjustDays,
    handleSelectDateRange,
    handleDateReset,
    currentDay,
    date,
    prevDay,
    nextDay,
    adjustDateRange,
  } = props;

  const handlePrevDay = () => {
    if (!adjustDays) return;
    adjustDays("prev");
  };

  const handleNextDay = () => {
    if (!adjustDays) return;
    adjustDays("next");
  };

  const handleAll = () => {
    if (!adjustDays) return;
    adjustDays("all");
  };

  const handleDateSelect = (date: DateRange) => {
    if (!adjustDateRange) return;
    adjustDateRange({ from: date.from, to: date.to });
  };

  const current = currentDay ? formatDate(currentDay) : "";
  const prev = prevDay ? formatDate(subDays(prevDay, 1)) : "";
  const next = nextDay ? formatDate(addDays(nextDay, 1)) : "";
  const dateRange = date?.from ? (
    date.to ? (
      <>
        {formatDate(date.from)} - {formatDate(date.to)}
      </>
    ) : (
      formatDate(date.from)
    )
  ) : (
    <span>აირჩიე პერიოდი</span>
  );

  return (
    <div className="space-y-4">
      <div className="flex gap-2 justify-between">
        {/* Day Adjustments */}
        <div className="flex justify-between items-center gap-2">
          <Button variant={"outline"} onClick={handlePrevDay}>
            <ChevronLeft />
            <span>{prev}</span>
          </Button>
          <Button variant={"outline"} onClick={handleAll}>
            <span>ყველა</span>
          </Button>
          <Button variant={"outline"} onClick={handleNextDay}>
            <span>{next}</span>
            <ChevronRight />
          </Button>
        </div>

        {/* Date Range Picker */}
        <div>
          <Popover>
            <PopoverTrigger asChild className=" w-[278px]">
              <Button
                variant={"outline"}
                className={cn(
                  "pl-3 text-left font-normal group typo-label-md",
                  !date && "text-neutral-800"
                )}
              >
                <CalendarIcon />
                {dateRange}
              </Button>
            </PopoverTrigger>
            <PopoverContent align="start" className="w-auto p-0">
              <Select
                onValueChange={(value) =>
                  handleSelectDateRange && handleSelectDateRange(value)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="აირჩიე" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="-1">გუშინ</SelectItem>
                  <SelectItem value="0">დღეს</SelectItem>
                  <SelectItem value="1">ხვალ</SelectItem>
                  <SelectItem value="7">1 კვირაში</SelectItem>
                </SelectContent>
              </Select>
              <Calendar
                className="bg-background"
                initialFocus
                mode="range"
                locale={ka}
                defaultMonth={new Date()}
                selected={date}
                onSelect={(date) => handleDateSelect(date as DateRange)}
                numberOfMonths={1}
                components={{
                  Footer: () => (
                    <div className="flex justify-end">
                      <Button
                        variant={"ghost"}
                        size={"sm"}
                        onClick={handleDateReset}
                        disabled={!date}
                      >
                        გასუფთავება
                      </Button>
                    </div>
                  ),
                }}
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>
      <div className="typo-label-md space-x-2">
        <span>{current}</span>
      </div>
    </div>
  );
};
