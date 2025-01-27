import { ColumnDef } from "@tanstack/react-table";
import { useMemo } from "react";
import { Surplus } from "../../schema";

export const useSurplusColumns = () => {
  const columns = useMemo<ColumnDef<Surplus>[]>(
    () => [
      {
        accessorKey: "identificator",
        header: () => <span className="">იდენტ.</span>,
        cell: (info) => {
          return (
            <span className="text-primary/80">
              {info.row.original.products?.[0]?.details.identificator}
            </span>
          );
        },
      },
      {
        header: "პროდუქტი",
        accessorFn: (row) => row.products?.[0]?.title,
        cell: (info) => {
          return <span>{info.row.original.products?.[0]?.title}</span>;
        },
        size: 1200,
      },
      {
        accessorKey: "quantity",
        header: () => <span className="">რაოდ.</span>,
        cell: (info) => {
          return (
            <span>{info.row.original.products?.[0]?.details.quantity}</span>
          );
        },
      },
      {
        accessorKey: "weight",
        header: () => <span className="">წონა.</span>,
        cell: (info) => {
          return (
            <span className="space-x-1">
              <span>{info.row.original.products?.[0]?.details.weight}</span>
              <span className="text-neutral-800">კგ</span>
            </span>
          );
        },
      },
    ],
    []
  );

  return columns;
};
