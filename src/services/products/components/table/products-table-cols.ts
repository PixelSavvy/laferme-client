import * as React from "react";

import { formatCurrency } from "@/utils/format";
import { ColumnDef, SortingFn } from "@tanstack/react-table";
import { Product } from "../../validations";

export const useProductColumns = () => {
  const sortVATFn: SortingFn<Product> = (rowA, rowB) => {
    const vatA = rowA.original.hasVAT;
    const vatB = rowB.original.hasVAT;
    const vatOrder = ["0", "1"];
    return vatOrder.indexOf(vatA) - vatOrder.indexOf(vatB);
  };

  const columns = React.useMemo<ColumnDef<Product>[]>(
    () => [
      {
        accessorKey: "productCode",
        header: "SKU",
        cell: (info) => info.getValue(),
        sortDescFirst: true,
      },
      {
        accessorKey: "isVAT",
        header: "დღგ",
        cell: ({ row }) => (row.original.hasVAT === "0" ? "არა" : "კი"),
        sortingFn: sortVATFn,
      },

      {
        accessorKey: "title",
        header: () => "პროდუქტი",
        cell: (info) => info.getValue(),
        sortDescFirst: true,
      },
      {
        accessorKey: "prices.TR1",
        header: () => "TR1",
        cell: ({ row }) => formatCurrency(row.original.prices.TR1),
      },
      {
        accessorKey: "prices.TR2",
        header: () => "TR2",
        cell: ({ row }) => formatCurrency(row.original.prices.TR2),
      },
      {
        accessorKey: "prices.TR3",
        header: () => "TR3",
        cell: ({ row }) => formatCurrency(row.original.prices.TR3),
      },
      {
        accessorKey: "prices.TR4",
        header: () => "TR4",
        cell: ({ row }) => formatCurrency(row.original.prices.TR4),
      },
      {
        accessorKey: "prices.TR5",
        header: () => "TR5",
        cell: ({ row }) => formatCurrency(row.original.prices.TR5),
      },
      {
        accessorKey: "prices.TRD",
        header: () => "TRD",
        cell: ({ row }) => formatCurrency(row.original.prices.TRD),
      },
      {
        accessorKey: "prices.TRC",
        header: () => "TRC",
        cell: ({ row }) => formatCurrency(row.original.prices.TRC),
      },
    ],
    []
  );

  return columns;
};
