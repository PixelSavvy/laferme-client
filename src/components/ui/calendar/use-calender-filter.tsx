import { GetEntities } from "@/shared/types";
import { UseQueryResult } from "@tanstack/react-query";
import { addDays, endOfDay, isBefore, startOfDay, subDays } from "date-fns";
import { isEqual } from "lodash";
import { useState } from "react";
import { DateRange } from "react-day-picker";

type K = {
  dueDateAt: Date | null;
};

type useCalendarFilterProps<T extends K> = {
  response: UseQueryResult<GetEntities<T>>;
};

export const UseCalendarFilter = <T extends K>({
  response,
}: useCalendarFilterProps<T>) => {
  const today = new Date();

  const responseData = response.data?.data;
  const responseMessage = response.data?.message;

  const [date, setDate] = useState<DateRange | undefined>({
    from: undefined,
    to: undefined,
  });
  const [showAll, setShowAll] = useState(true);

  const [prevDay, setPrevDay] = useState(today);
  const [nextDay, setNextDay] = useState(today);
  const [currentDay, setCurrentDay] = useState(today);

  const [filteredData, setFilteredData] = useState<T[]>([]);
  const [fallback, setFallback] = useState<string | undefined>(responseMessage);

  if (!responseData)
    return {
      filteredData: [],
      fallback: responseMessage,
      content: null,
      showAll: true,
    };

  const adjustDateRange = (date: DateRange | undefined) => {
    setDate(date);

    if (!date || !date.from || !date.to) {
      setFilteredData(responseData);
      setShowAll(true);
      return;
    }

    const filtered = responseData.filter((data) => {
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
      setFallback(!filteredData.length ? responseMessage : undefined);
      return;
    }

    if (direction === "prev") {
      newPrevDay = subDays(prevDay, 1);
      newNextDay = subDays(nextDay, 1);

      setPrevDay(newPrevDay);
      setNextDay(newNextDay);
      setCurrentDay(newPrevDay);

      const filtered = responseData.filter((data) => {
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

      const filtered = responseData.filter((data) => {
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

  const handleSelectDateRange = (value: string) => {
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

  const handleDateReset = () => {
    setDate(undefined);
    setShowAll(true);
    setFilteredData(responseData);
  };

  return {
    filteredData,
    fallback,
    showAll,
    adjustDays,
    handleSelectDateRange,
    handleDateReset,
    currentDay,
    date,
    prevDay,
    nextDay,
    adjustDateRange,
  };
};
