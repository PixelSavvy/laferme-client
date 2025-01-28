import type { FilterFn } from "@tanstack/react-table";
import {
  ColumnDef,
  getCoreRowModel,
  getExpandedRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { Dispatch, SetStateAction, useState } from "react";

import { Table } from "@/components/ui";
import { fuzzyFilter } from "@/utils";
import { Surplus } from "../../schema";
import { SurplusTableBody } from "./surplus-data-table-body";
import { SurplusDataTableHeader } from "./surplus-data-table-header";

declare module "@tanstack/react-table" {
  interface FilterFns {
    fuzzy: FilterFn<unknown>;
  }
  interface FilterMeta {
    itemRank: { passed: boolean; rank: number; key: string };
  }
}

// Types
type DataTableProps = {
  columns: ColumnDef<Surplus["products"][number]>[];
  data: Surplus["products"];
  fallback?: string;
  renderHeader?: boolean;
  globalFilter?: string;
  setGlobalFilter?: Dispatch<SetStateAction<string>>;
};

// DataTable Component
export const SurplusTable = ({
  columns,
  data,
  fallback,
  globalFilter,
  setGlobalFilter,
  renderHeader = true,
}: DataTableProps) => {
  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable({
    data,
    columns,
    filterFns: { fuzzy: fuzzyFilter },
    getCoreRowModel: getCoreRowModel(),

    getExpandedRowModel: getExpandedRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: "fuzzy",
    state: {
      sorting,
      globalFilter,
    },
    enableSortingRemoval: false,
    enableMultiSort: false,
  });

  console.log(data);

  return (
    <Table>
      {renderHeader && <SurplusDataTableHeader table={table} />}

      <SurplusTableBody table={table} fallback={fallback!} />
    </Table>
  );
};
