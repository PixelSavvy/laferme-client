import * as React from "react";

import { CustomerCell, StatusCell } from "@/components/ui";
import { statusesObj } from "@/config";

import { Order } from "@/features/orders";
import { formatDate } from "@/utils/format";
import { ColumnDef } from "@tanstack/react-table";
import { Bookmark, Calendar, User } from "lucide-react";

export const useCleanzoneColumns = () => {
  // const sortVATFn: SortingFn<Order> = (rowA, rowB) => {
  //   const vatA = rowA.original.hasVAT;
  //   const vatB = rowB.original.hasVAT;
  //   const vatOrder = ["0", "1"];
  //   return vatOrder.indexOf(vatA) - vatOrder.indexOf(vatB);
  // };

  const columns = React.useMemo<ColumnDef<Order>[]>(
    () => [
      {
        accessorKey: "id",
        header: () => <span className="font-sans">ID</span>,
        cell: (info) => (
          <span className="text-primary/80">
            {(info.getValue() as string).split("-")[0]}
          </span>
        ),
        sortDescFirst: true,
      },
      {
        id: "cleanzone",
        accessorKey: "prepareDueAt",
        header: () => (
          <span className="flex gap-1 items-center">
            <Calendar size={16} />
            <span>მომზადების თარიღი</span>
          </span>
        ),
        cell: (info) => formatDate(info.getValue() as string),
        sortDescFirst: true,
      },
      {
        accessorKey: "customer.name",
        header: () => (
          <span className="flex gap-1 items-center">
            <User size={16} />
            <span>სარეალიზაციო პუნქტი</span>
          </span>
        ),
        cell: ({ row }) => (
          <CustomerCell
            customer={row.original.customer}
            products={row.original.products}
          />
        ),
      },
      {
        accessorKey: "prepareDueAt",
        header: () => (
          <span className="flex gap-1 items-center">
            <Calendar size={16} />
            <span>მიტანის თარიღი</span>
          </span>
        ),
        cell: (info) => formatDate(info.getValue() as string),
        sortDescFirst: true,
      },
      {
        accessorKey: "status",
        header: () => (
          <span className="flex gap-1 items-center">
            <Bookmark size={16} />
            <span>სტატუსი</span>
          </span>
        ),
        cell: (info) => (
          <StatusCell
            data={statusesObj.all}
            status={info.getValue() as keyof typeof statusesObj}
          />
        ),
      },
    ],
    []
  );

  return columns;
};
