import * as React from "react";

import { formatDate } from "@/utils/format";
import { ColumnDef } from "@tanstack/react-table";
import { Order } from "../../validations";
import { OrdersTableCustomerCell } from "./orders-table-customer-cell";
import { OrdersTableStatusCell } from "./orders-table-status-cell";

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
        accessorKey: "customerId",
        header: "სარეალიზაციო პუნქტი",
        cell: ({ row }) => <OrdersTableCustomerCell row={row} />,
      },

      {
        accessorKey: "createdAt",
        header: () => "წარმოების თარიღი",
        cell: (info) => formatDate(info.getValue() as string),
        sortDescFirst: true,
      },
      {
        accessorKey: "status",
        header: () => "სტატუსი",
        cell: (info) => (
          <OrdersTableStatusCell orderStatus={info.getValue() as string} />
        ),
      },
    ],
    []
  );

  return columns;
};
