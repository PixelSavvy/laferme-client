import { addDays, isBefore, isEqual, startOfDay, subDays } from "date-fns";
import { useEffect, useState } from "react";
import { DateRange } from "react-day-picker";

import { Order } from "@/features/orders";
import { BaseResponse } from "@/shared/types";

type UseCalendarFitlerProps = {
  data: BaseResponse<Order[]> | undefined;
};

export const useCalendarFilter = ({ data }: UseCalendarFitlerProps) => {
  const today = new Date();

  const orders = data?.data || [];
  const todayOrders = orders.filter((order) =>
    order.deliverDueAt
      ? isEqual(startOfDay(order.deliverDueAt), startOfDay(today))
      : false
  );

  // State
  const [filteredData, setFilteredData] = useState<Order[]>(todayOrders);
  const [fallback, setFallback] = useState<string>();
  const [date, setDate] = useState<DateRange | undefined>(undefined);
  const [prev, setPrev] = useState(today);
  const [next, setNext] = useState(today);
  const [current, setCurrent] = useState(today);
  const [showAll, setShowAll] = useState(false); // Add showAll state

  const isDisabled = !orders.length;

  // Effect for handling fallback
  useEffect(() => {
    if (showAll) {
      setFallback(undefined); // No fallback when showing all data
    } else if (!filteredData.length) {
      setFallback("მონაცემები არ მოიძებნა");
    } else {
      setFallback(undefined);
    }
  }, [filteredData, showAll, data]);

  // Reset filters and show all data
  const handleShowAll = () => {
    setShowAll(true); // Activate "Show All"
    setFilteredData(orders); // Reset filteredData to all orders
    setDate(undefined);
    setPrev(today);
    setNext(today);
    setCurrent(today);
  };

  // Filter by date range
  const handleDateByRange = (range: DateRange | undefined) => {
    setShowAll(false); // Deactivate "Show All" when applying filters
    setDate(range);

    if (!range || !range.from || !range.to) {
      setFilteredData(orders);
      return;
    }

    const filtered = orders.filter((order) => {
      if (!order.deliverDueAt || !range || !range.from || !range.to) return;

      const isWithinRange =
        !isBefore(order.deliverDueAt, startOfDay(range.from)) &&
        !isBefore(startOfDay(range.to), order.deliverDueAt);

      return isWithinRange;
    });

    setFilteredData(filtered);
  };

  // Filter by days
  const handleDateByDays = (type: "prev" | "next" | "today") => {
    setShowAll(false); // Deactivate "Show All" when applying filters
    let targetDay: Date;

    if (type === "today") {
      targetDay = startOfDay(today);
      setPrev(today);
      setNext(today);
    } else if (type === "prev") {
      targetDay = subDays(current, 1);
      setPrev(subDays(prev, 1));
      setNext(subDays(next, 1));
    } else {
      targetDay = addDays(current, 1);
      setPrev(addDays(prev, 1));
      setNext(addDays(next, 1));
    }

    setCurrent(targetDay);

    const filtered = orders.filter((order) =>
      order.deliverDueAt
        ? isEqual(startOfDay(order.deliverDueAt), targetDay)
        : false
    );

    setFilteredData(filtered);
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
    handleShowAll,
    date,
    prev,
    next,
    current,
    isDisabled,
    showAll,
  };
};

export type UseCalendarFitler = ReturnType<typeof useCalendarFilter>;
