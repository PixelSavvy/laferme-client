import { ColumnDef } from "@tanstack/react-table";
import { useMemo } from "react";
import { Surplus } from "../../schema";

export const useSurplusColumns = () => {
  const columns = useMemo<ColumnDef<Surplus["products"][number]>[]>(
    () => [
      {
        accessorKey: "details.identificator",
        header: () => <span className="">იდენტ.</span>,
        cell: (info) => {
          return (
            <span className="text-primary/80">{info.getValue() as string}</span>
          );
        },
      },
      {
        accessorKey: "title",
        header: "პროდუქტი",
        cell: (info) => {
          return <span> {info.getValue() as string}</span>;
        },
        size: 1200,
      },
      {
        accessorKey: "details.quantity",
        header: () => <span className="">რაოდ.</span>,
        cell: (info) => {
          return <span>{info.getValue() as number}</span>;
        },
      },
      {
        accessorKey: "details.weight",
        header: () => <span className="">წონა.</span>,
        cell: (info) => {
          return (
            <span className="space-x-1">
              <span>{info.getValue() as number}</span>
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
