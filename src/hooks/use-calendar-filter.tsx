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
import { addDays, endOfDay, isBefore, startOfDay, subDays } from "date-fns";
import { ka } from "date-fns/locale";
import { isEqual } from "lodash";
import { CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { DateRange } from "react-day-picker";

type K = {
  dueDateAt: Date | null;
};

type useCalendarFilterProps<T extends K> = {
  query:
    | {
        data: T[];
        message: string | undefined;
      }
    | undefined;
};

export const useCalendarFilter = <T extends K>({
  query,
}: useCalendarFilterProps<T>) => {
  const today = new Date();
  const [date, setDate] = useState<DateRange | undefined>({
    from: undefined,
    to: undefined,
  });
  const [showAll, setShowAll] = useState(true);

  const [prevDay, setPrevDay] = useState(today);
  const [nextDay, setNextDay] = useState(today);
  const [currentDay, setCurrentDay] = useState(today);

  const [filteredData, setFilteredData] = useState<T[]>([]);
  const [fallback, setFallback] = useState<string | undefined>(query?.message);

  if (!query?.data)
    return {
      filteredData: [],
      fallback: query?.message,
      content: null,
      showAll: true,
    };

  const adjustDateRange = (date: DateRange | undefined) => {
    setDate(date);

    if (!date || !date.from || !date.to) {
      setFilteredData(query.data);
      setShowAll(true);
      return;
    }

    const filtered = query.data.filter((data) => {
      if (data.dueDateAt === null || !date.from || !date.to) return;

      const isDueAfterFrom = isBefore(data.dueDateAt, date.from);
      const isDueBeforeTo = isBefore(date.to, data.dueDateAt);
      const result = !isDueAfterFrom && !isDueBeforeTo;

      return result;
    });

    setShowAll(false);
    setFilteredData(filtered);
    setFallback("ვერ მოიძებნა");
  };

  const adjustDays = (direction: "prev" | "next" | "all") => {
    let newPrevDay: Date;
    let newNextDay: Date;

    if (direction === "all") {
      // Reset to initial state
      newPrevDay = today;
      newNextDay = today;

      setPrevDay(newPrevDay);
      setNextDay(newNextDay);
      setCurrentDay(today);
      setDate(undefined);
      setShowAll(true);
      setFilteredData(() => []);
      setFallback(!filteredData.length ? query.message : undefined);
      return;
    }

    if (direction === "prev") {
      newPrevDay = subDays(prevDay, 1);
      newNextDay = subDays(nextDay, 1);

      setPrevDay(newPrevDay);
      setNextDay(newNextDay);
      setCurrentDay(newPrevDay);

      const filtered = query.data.filter((data) => {
        if (data.dueDateAt === null) return;

        const returnedData = isEqual(
          startOfDay(data.dueDateAt),
          startOfDay(newPrevDay)
        );

        if (!returnedData) setFallback("ვერ მოიძებნა");

        return returnedData;
      });

      setShowAll(false);
      setFilteredData((prev) => [...prev, ...filtered]);
    }

    if (direction === "next") {
      newPrevDay = addDays(prevDay, 1);
      newNextDay = addDays(nextDay, 1);

      setPrevDay(newPrevDay);
      setNextDay(newNextDay);
      setCurrentDay(newNextDay);

      const filtered = query.data.filter((data) => {
        if (data.dueDateAt === null) return;

        const returnedData = isEqual(
          startOfDay(data.dueDateAt),
          startOfDay(newPrevDay)
        );

        if (!returnedData) setFallback("ვერ მოიძებნა");

        return returnedData;
      });

      setShowAll(false);
      setFilteredData((prev) => [...prev, ...filtered]);
    }
  };

  const onSelectDateChange = (value: string) => {
    let from: Date = today;
    let to: Date = today;

    if (value === "-1") {
      from = startOfDay(subDays(today, 1));
      to = endOfDay(subDays(today, 1));
      setCurrentDay(subDays(today, 1));
    }

    if (value === "0") {
      from = startOfDay(today);
      to = endOfDay(today);
      setCurrentDay(today);
    }

    if (value === "1") {
      from = startOfDay(addDays(today, 1));
      to = endOfDay(addDays(today, 1));
      setCurrentDay(addDays(today, 1));
    }

    if (value === "7") {
      from = startOfDay(addDays(today, 7));
      to = endOfDay(addDays(today, 7));
      setCurrentDay(addDays(today, 7));
    }

    adjustDateRange({ from, to });
  };

  const CalendarFilter = (
    <div className="space-y-4">
      <div className="flex gap-2 justify-between">
        {/* Day Adjustments */}
        <div className="flex justify-between items-center gap-2">
          <Button variant={"outline"} onClick={() => adjustDays("prev")}>
            <ChevronLeft />
            <span>{formatDate(subDays(prevDay, 1))}</span>
          </Button>
          <Button variant={"outline"} onClick={() => adjustDays("all")}>
            <span>ყველა</span>
          </Button>
          <Button variant={"outline"} onClick={() => adjustDays("next")}>
            <span>{formatDate(addDays(nextDay, 1))}</span>
            <ChevronRight />
          </Button>
        </div>

        {/* Date Range Picker */}
        <div>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "pl-3 text-left font-normal w-[280px] group typo-label-md",
                  !date && "text-neutral-800"
                )}
              >
                <CalendarIcon />
                {date?.from ? (
                  date.to ? (
                    <>
                      {formatDate(date.from)} - {formatDate(date.to)}
                    </>
                  ) : (
                    formatDate(date.from)
                  )
                ) : (
                  <span>აირჩიე პერიოდი</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent align="start" className="w-auto p-0">
              <Select onValueChange={(value) => onSelectDateChange(value)}>
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
                onSelect={(date) => adjustDateRange(date)}
                numberOfMonths={1}
                components={{
                  Footer: () => (
                    <div className="flex justify-end">
                      <Button
                        variant={"ghost"}
                        size={"sm"}
                        onClick={() => {
                          setDate(undefined);
                          setShowAll(true);
                          setFilteredData(query.data);
                        }}
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
        <span>{formatDate(currentDay)}</span>
      </div>
    </div>
  );

  return { filteredData, fallback, CalendarFilter, showAll };
};
