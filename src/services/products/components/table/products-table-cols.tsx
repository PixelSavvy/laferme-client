import { Checkbox } from "@/components/ui";
import { ColumnDef, SortingFn } from "@tanstack/react-table";
import { Product } from "../../validations";

export const useProductColumns = () => {
  const sortVATFn: SortingFn<Product> = (rowA, rowB) => {
    const vatA = rowA.original.hasVAT;
    const vatB = rowB.original.hasVAT;
    const vatOrder = ["0", "1"];
    return vatOrder.indexOf(vatA) - vatOrder.indexOf(vatB);
  };

  const columns: ColumnDef<Product>[] = [
    {
      id: "select_col",
      header: () => "",
      cell: ({ row }) => {
        return (
          <Checkbox
            className="size-5"
            onClick={row.getToggleSelectedHandler()}
            disabled={!row.getCanSelect()}
            checked={row.getIsSelected()}
          />
        );
      },
      enableSorting: false,
    },
    {
      accessorKey: "productCode",
      header: () => "SKU",
      sortDescFirst: true,
    },
    {
      accessorKey: "hasVAT",
      header: () => "დღგ",

      sortingFn: sortVATFn,
    },
    {
      accessorKey: "title",
      header: () => "პროდუქტი",
      sortDescFirst: true,
    },
    {
      accessorKey: "prices.TR1",
      header: () => "TR1",
      sortDescFirst: true,
    },
    {
      accessorKey: "prices.TR2",
      header: () => "TR2",
      sortDescFirst: true,
    },
    {
      accessorKey: "prices.TR3",
      header: () => "TR3",
      sortDescFirst: true,
    },
    {
      accessorKey: "prices.TR4",
      header: () => "TR4",
      sortDescFirst: true,
    },
    {
      accessorKey: "prices.TR5",
      header: () => "TR5",
      sortDescFirst: true,
    },
    {
      accessorKey: "prices.TRC",
      header: () => "TRC",
      sortDescFirst: true,
    },
    {
      accessorKey: "prices.TRD",
      header: () => "TRD",
      sortDescFirst: true,
    },
    {
      accessorKey: "actions",
      header: () => "",
      enableSorting: false,
    },
  ];

  return columns;
};
