import { addDays, isBefore, isEqual, startOfDay, subDays } from "date-fns";
import { useEffect, useState } from "react";
import { DateRange } from "react-day-picker";

import { Order } from "@/features/orders";
import { BaseResponse } from "@/shared/types";

type UseCalendarFitlerProps = {
  data: BaseResponse<Order[]> | undefined;
};

export const useCalendarFilter = ({ data }: UseCalendarFitlerProps) => {
  const today = startOfDay(new Date());
  const orders = data?.data || [];

  // State
  const [filteredData, setFilteredData] = useState<Order[]>(
    orders.filter((order) =>
      order.deliverDueAt
        ? isEqual(startOfDay(new Date(order.deliverDueAt)), today)
        : false,
    ),
  );
  const [fallback, setFallback] = useState<string>();
  const [date, setDate] = useState<DateRange | undefined>(undefined);
  const [prev, setPrev] = useState(subDays(today, 1));
  const [next, setNext] = useState(addDays(today, 1));
  const [current, setCurrent] = useState(today);

  const isDisabled = !orders.length;

  // Effect for handling fallback
  useEffect(() => {
    if (!filteredData.length) {
      setFallback("მონაცემები არ მოიძებნა");
    } else {
      setFallback(undefined);
    }
  }, [filteredData]);

  // Filter by date range
  const handleDateByRange = (range: DateRange | undefined) => {
    setDate(range);

    if (!range?.from || !range.to) {
      setFilteredData(orders);
      return;
    }

    setFilteredData(
      orders.filter((order) =>
        order.deliverDueAt
          ? !isBefore(order.deliverDueAt, startOfDay(range.from!)) &&
            !isBefore(startOfDay(range.to!), order.deliverDueAt)
          : false,
      ),
    );
  };

  // Filter by days
  const handleDateByDays = (type: "prev" | "next" | "today") => {
    let targetDay: Date;

    if (type === "today") {
      targetDay = today;
      setPrev(subDays(targetDay, 1));
      setNext(addDays(targetDay, 1));
    } else if (type === "prev") {
      targetDay = subDays(current, 1);
      setPrev(subDays(targetDay, 1));
      setNext(addDays(targetDay, 1));
    } else {
      targetDay = addDays(current, 1);
      setPrev(subDays(targetDay, 1));
      setNext(addDays(targetDay, 1));
    }

    setCurrent(targetDay);

    setFilteredData(
      orders.filter((order) =>
        order.deliverDueAt
          ? isEqual(startOfDay(order.deliverDueAt), targetDay)
          : false,
      ),
    );
  };

  const handleDateRangeRest = () => {
    handleDateByRange(undefined);
  };

  return {
    filteredData,
    fallback,
    handleDateByDays,
    handleDateByRange,
    handleDateRangeRest,
    date,
    prev,
    next,
    current,
    isDisabled,
  };
};

export type UseCalendarFitler = ReturnType<typeof useCalendarFilter>;
