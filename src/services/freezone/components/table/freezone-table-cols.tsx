import * as React from "react";

import { StatusCell } from "@/components/ui";
import { statuses } from "@/config";
import { formatDate } from "@/utils/format";
import { ColumnDef } from "@tanstack/react-table";
import { FreezoneItem } from "../../validations";
import { FreezoneTableCustomerCell } from "./freezone-table-customer-cell";

export const useFreezoneColumns = () => {
  // const sortVATFn: SortingFn<Order> = (rowA, rowB) => {
  //   const vatA = rowA.original.hasVAT;
  //   const vatB = rowB.original.hasVAT;
  //   const vatOrder = ["0", "1"];
  //   return vatOrder.indexOf(vatA) - vatOrder.indexOf(vatB);
  // };

  const columns = React.useMemo<ColumnDef<FreezoneItem>[]>(
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
        cell: (info) => formatDate(info.getValue() as string),
        sortDescFirst: true,
      },
      {
        accessorKey: "customerId",
        header: "სარეალიზაციო პუნქტი",
        cell: ({ row }) => <FreezoneTableCustomerCell row={row} />,
      },
      {
        accessorKey: "dueDateAt",
        header: () => "რეალიზაციის თარიღი",
        cell: (info) => formatDate(info.getValue() as string),
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
