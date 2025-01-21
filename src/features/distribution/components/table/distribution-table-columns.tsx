import * as React from "react";

import { CustomerCell, PaymentMethodCell, StatusCell } from "@/components/ui";
import { paymentMethodsObj, statusesObj } from "@/config";
import { Order } from "@/features/orders";
import { formatDate } from "@/utils";
import { ColumnDef } from "@tanstack/react-table";

export const useDistributionColumns = () => {
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
        accessorKey: "deliverDueAt",
        header: () => "მიწოდების თარიღი",
        cell: (info) => <span>{formatDate(info.getValue() as string)}</span>,
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
        accessorKey: "total",
        header: () => "თანხა",
        cell: (info) => `${info.getValue()} ₾`,
      },
      {
        accessorKey: "customer.paymentMethod",
        header: () => "გადახდა",
        cell: (info) => (
          <PaymentMethodCell
            paymentOption={info.getValue() as keyof typeof paymentMethodsObj}
          />
        ),
      },
      {
        accessorKey: "status",
        header: () => "სტატუსი",
        cell: (info) => (
          <StatusCell
            status={info.getValue() as keyof typeof statusesObj}
            data={statusesObj.all}
          />
        ),
      },
    ],
    [],
  );

  return columns;
};
