import * as React from "react";

import { CustomerCell, PaymentMethodCell, StatusCell } from "@/components/ui";
import { paymentMethodsObj, statusesObj } from "@/config";
import { Order } from "@/features/orders";
import { formatDate } from "@/utils";
import { ColumnDef } from "@tanstack/react-table";
import { Bookmark, Calendar, DollarSign, Landmark, User } from "lucide-react";

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
        header: () => (
          <span className="flex gap-1 items-center">
            <Calendar size={16} />
            <span>მიტანის თარიღი</span>
          </span>
        ),
        cell: (info) => <span>{formatDate(info.getValue() as string)}</span>,
        sortDescFirst: true,
      },

      {
        accessorKey: "customer",
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
        accessorKey: "total",
        header: () => (
          <span className="flex gap-1 items-center">
            <DollarSign size={16} />
            <span>თანხა</span>
          </span>
        ),
        cell: (info) => `${info.getValue()} ₾`,
      },
      {
        accessorKey: "customer.paymentMethod",
        header: () => (
          <span className="flex gap-1 items-center">
            <Landmark size={16} />
            <span>გადახდა</span>
          </span>
        ),
        cell: (info) => (
          <PaymentMethodCell
            paymentOption={info.getValue() as keyof typeof paymentMethodsObj}
          />
        ),
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
