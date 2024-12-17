import * as React from "react";

import { ColumnDef } from "@tanstack/react-table";
import { DistributionItem } from "../../validations";
import { DistributionTableCustomerCell } from "./distribution-table-customer-cell";
import { DistributionTableStatusCell } from "./distribution-table-status-cell";

export const useDistributionColumns = () => {
  // const sortVATFn: SortingFn<Order> = (rowA, rowB) => {
  //   const vatA = rowA.original.hasVAT;
  //   const vatB = rowB.original.hasVAT;
  //   const vatOrder = ["0", "1"];
  //   return vatOrder.indexOf(vatA) - vatOrder.indexOf(vatB);
  // };

  const columns = React.useMemo<ColumnDef<DistributionItem>[]>(
    () => [
      {
        accessorKey: "id",
        header: () => <span className="font-sans">ID</span>,
        cell: (info) => info.getValue(),
        sortDescFirst: true,
      },
      // {
      //   accessorKey: "deliveredAt",
      //   header: () => "მიტანის თარიღი",
      //   cell: (info) => formatDate(info.getValue() as string),
      //   sortDescFirst: true,
      // },
      {
        accessorKey: "customerId",
        header: "სარეალიზაციო პუნქტი",
        cell: ({ row }) => <DistributionTableCustomerCell row={row} />,
      },
      {
        accessorKey: "status",
        header: () => "სტატუსი",
        cell: (info) => (
          <DistributionTableStatusCell
            distributiontatus={info.getValue() as string}
          />
        ),
      },
    ],
    []
  );

  return columns;
};
