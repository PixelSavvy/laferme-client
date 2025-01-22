import * as React from "react";

import { CustomerCell, StatusCell } from "@/components/ui";
import { statusesObj } from "@/config";

import { Order } from "@/features/orders";
import { formatDate } from "@/utils/format";
import { ColumnDef } from "@tanstack/react-table";

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
        cell: (info) => info.getValue(),
        sortDescFirst: true,
      },
      {
        id: "cleanzone",
        accessorKey: "prepareDueAt",
        header: () => "მომზადების თარიღი",
        cell: (info) => formatDate(info.getValue() as string),
        sortDescFirst: true,
      },
      {
        accessorKey: "customer",
        header: "სარეალიზაციო პუნქტი",
        cell: ({ row }) => (
          <CustomerCell
            customer={row.original.customer}
            products={row.original.products}
          />
        ),
      },
      {
        accessorKey: "prepareDueAt",
        header: () => "მიტანის თარიღი",
        cell: (info) => formatDate(info.getValue() as string),
        sortDescFirst: true,
      },
      {
        accessorKey: "status",
        header: () => "სტატუსი",
        cell: (info) => (
          <StatusCell
            data={statusesObj.all}
            status={info.getValue() as keyof typeof statusesObj}
          />
        ),
      },
    ],
    [],
  );

  return columns;
};
