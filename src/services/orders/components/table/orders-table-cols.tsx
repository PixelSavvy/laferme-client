import * as React from "react";

import { StatusCell } from "@/components/ui";
import { statuses } from "@/config";
import { formatDate } from "@/utils";
import { ColumnDef } from "@tanstack/react-table";
import { Order } from "../../validations";
import { OrdersTableCustomerCell } from "./orders-table-customer-cell";

export const useOrderColumns = () => {
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
        accessorKey: "createdAt",
        header: () => "წარმოების თარიღი",
        cell: (info) => <span>{formatDate(info.getValue() as string)}</span>,
        sortDescFirst: true,
      },
      {
        accessorKey: "customer",
        header: "სარეალიზაციო პუნქტი",
        cell: ({ row }) => <OrdersTableCustomerCell row={row} />,
        enableColumnFilter: true,
      },

      {
        accessorKey: "dueDateAt",
        header: () => "რეალიზაციის თარიღი",
        cell: (info) => <span>{formatDate(info.getValue() as string)}</span>,
        sortDescFirst: true,
      },
      {
        accessorKey: "status",
        header: () => "სტატუსი",
        cell: (info) => (
          <StatusCell status={info.getValue() as string} data={statuses.all} />
        ),
      },
    ],
    []
  );

  return columns;
};
