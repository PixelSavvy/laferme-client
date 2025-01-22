import { CustomerCell, StatusCell } from "@/components/ui";
import { statusesObj } from "@/config";
import { formatDate } from "@/utils";
import { ColumnDef } from "@tanstack/react-table";
import { useMemo } from "react";
import { Order } from "../../schema";

export const useOrdersColumns = () => {
  // const sortVATFn: SortingFn<Order> = (rowA, rowB) => {
  //   const vatA = rowA.original.hasVAT;
  //   const vatB = rowB.original.hasVAT;
  //   const vatOrder = ["0", "1"];
  //   return vatOrder.indexOf(vatA) - vatOrder.indexOf(vatB);
  // };

  const columns = useMemo<ColumnDef<Order>[]>(
    () => [
      {
        accessorKey: "id",
        header: () => <span className="font-sans">ID</span>,
        cell: (info) => info.getValue(),
        sortDescFirst: true,
      },
      {
        accessorKey: "prepareDueAt",
        header: () => "მომზადების თარიღი",
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
        accessorKey: "deliverDueAt",
        header: () => "მიტანის თარიღი",
        cell: (info) => <span>{formatDate(info.getValue() as string)}</span>,
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
    []
  );

  return columns;
};
