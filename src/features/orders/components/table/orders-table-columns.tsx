import { CustomerCell, StatusCell } from "@/components/ui";
import { statusesObj } from "@/config";
import { formatDate } from "@/utils";
import { ColumnDef } from "@tanstack/react-table";
import { Bookmark, Calendar, User } from "lucide-react";
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
        cell: (info) => (
          <span className="text-primary/80">{info.getValue() as number}</span>
        ),
        sortDescFirst: false,
      },
      {
        accessorKey: "prepareDueAt",
        header: () => (
          <span className="flex gap-1 items-center">
            <Calendar size={16} />
            <span>მომზადების თარიღი</span>
          </span>
        ),
        cell: (info) => <span>{formatDate(info.getValue() as string)}</span>,
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
