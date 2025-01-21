import { addDays, isBefore, isEqual, startOfDay, subDays } from "date-fns";
import { useState } from "react";
import { DateRange } from "react-day-picker";

import { Order } from "@/features/orders";
import { GetEntities } from "@/shared/types";
import { useLoaderData } from "react-router-dom";

export const useCalendarFilter = () => {
  const data = useLoaderData() as GetEntities<Order[]>;

  const today = new Date();

  const orders = data.data?.data;
  const message = data.data?.message;

  const [filteredData, setFilteredData] = useState<Order[]>(orders);
  const [fallback, setFallback] = useState<string>();

  const [date, setDate] = useState<DateRange | undefined>(undefined);
  const [prev, setPrev] = useState(today);
  const [next, setNext] = useState(today);
  const [current, setCurrent] = useState(today);

  if (!data?.data) {
    return {
      filteredData: [],
      fallback: message || "No data available",
      date: undefined,
      prev: today,
      next: today,
      current: today,
    };
  }

  // Filter by date range
  const handleDateByRange = (range: DateRange | undefined) => {
    setDate(range);

    if (!range || !range.from || !range.to) {
      setFilteredData(orders);
      return;
    }

    const filtered = orders.filter((order) => {
      if (!order.deliverDueAt || !range || !range.from || !range.to) return;

      // Filter by deliver date
      const isDueAfterFrom = isBefore(
        order.deliverDueAt,
        startOfDay(range.from),
      );
      const isDueBeforeTo = isBefore(startOfDay(range.to), order.deliverDueAt);

      const isDueBetweenRange = !isDueAfterFrom && !isDueBeforeTo;

      if (!isDueBetweenRange) setFallback("შეკვეთები ვერ მოიძებნა");

      return isDueBetweenRange;
    });

    setFilteredData(filtered);
  };

  // Filter by days
  const handleDateByDays = (type: "prev" | "next" | "today") => {
    let newPrevDay: Date;
    let newNextDay: Date;

    if (type === "today") {
      newPrevDay = startOfDay(today);
      newNextDay = startOfDay(today);

      setPrev(newPrevDay);
      setNext(newNextDay);
      setCurrent(today);

      const filtered = orders.filter((order) => {
        if (!order.deliverDueAt) return;

        const isDeliverDueToday = isEqual(
          startOfDay(order.deliverDueAt),
          startOfDay(today),
        );

        if (!isDeliverDueToday) setFallback("შეკვეთები ვერ მოიძებნა");

        return isDeliverDueToday;
      });

      setDate({
        from: today,
        to: today,
      });
      setFilteredData(filtered);
    } else if (type === "prev") {
      newPrevDay = subDays(prev, 1);
      newNextDay = subDays(next, 1);

      setPrev(newPrevDay);
      setNext(newNextDay);
      setCurrent(newPrevDay);

      const filtered = orders.filter((order) => {
        if (!order.deliverDueAt) return;

        const isDeliverDueBeforePrev = isEqual(
          startOfDay(order.deliverDueAt),
          startOfDay(newPrevDay),
        );

        if (!isDeliverDueBeforePrev) setFallback("შეკვეთები ვერ მოიძებნა");

        return isDeliverDueBeforePrev;
      });

      setFilteredData(filtered);
    } else {
      newPrevDay = addDays(prev, 1);
      newNextDay = addDays(next, 1);

      setPrev(newPrevDay);
      setNext(newNextDay);
      setCurrent(newNextDay);

      const filtered = orders.filter((order) => {
        if (!order.deliverDueAt) return;

        const isDeliverDueAfterNext = isEqual(
          startOfDay(order.deliverDueAt),
          startOfDay(newPrevDay),
        );

        if (!isDeliverDueAfterNext) setFallback("შეკვეთები ვერ მოიძებნა");

        return isDeliverDueAfterNext;
      });

      setFilteredData(filtered);
    }
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
  };
};

export type UseCalendarFitler = ReturnType<typeof useCalendarFilter>;
