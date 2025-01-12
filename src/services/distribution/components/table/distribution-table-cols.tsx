import * as React from "react";

import { StatusCell } from "@/components/ui";
import { statuses } from "@/config";
import { CustomersTablePaymentCell } from "@/services/customers/components/table/customers-table-payment-cell";
import { formatDate } from "@/utils";
import { ColumnDef } from "@tanstack/react-table";
import { DistributionItem } from "../../validations";
import { DistributionTableCustomerCell } from "./distribution-table-customer-cell";

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
      {
        accessorKey: "dueDateAt",
        header: () => <span className="font-sans">დისტრიბუციის თარიღი</span>,
        cell: (info) => <span>{formatDate(info.getValue() as string)}</span>,
        sortDescFirst: true,
      },

      {
        accessorKey: "customerId",
        header: "სარეალიზაციო პუნქტი",
        cell: ({ row }) => <DistributionTableCustomerCell row={row} />,
      },
      {
        accessorKey: "total",
        header: () => "თანხა",
        cell: (info) => `${info.getValue()} ₾`,
        sortDescFirst: true,
      },
      {
        accessorKey: "paymentMethod",
        header: () => "გადახდის მეთოდი",
        cell: ({ row }) => (
          <CustomersTablePaymentCell
            paymentOption={row.original.customer.paymentOption}
          />
        ),
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
