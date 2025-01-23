import type { FilterFn } from "@tanstack/react-table";
import {
  ColumnDef,
  getCoreRowModel,
  getExpandedRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  Row,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { Dispatch, ReactNode, SetStateAction, useState } from "react";

import { fuzzyFilter } from "@/utils";
import { DataTableBody } from "./data-table-body";
import { DataTableHeaders } from "./data-table-headers";
import { Table } from "./table";

declare module "@tanstack/react-table" {
  interface FilterFns {
    fuzzy: FilterFn<unknown>;
  }
  interface FilterMeta {
    itemRank: { passed: boolean; rank: number; key: string };
  }
}

// Types
type DataTableProps<Data, Value> = {
  columns: ColumnDef<Data, Value>[];
  data: Data[];
  fallback?: string;
  getRowCanExpand?: (row: Row<Data>) => boolean;
  renderSubComponent?: (props: { row: Row<Data> }) => ReactNode;
  globalFilter?: string;
  setGlobalFilter?: Dispatch<SetStateAction<string>>;
};

// DataTable Component
export const DataTable = <Data, Value>({
  columns,
  data,
  getRowCanExpand = () => false,
  renderSubComponent,
  fallback = "მონაცემები არ მოიძებნა",
  globalFilter,
  setGlobalFilter,
}: DataTableProps<Data, Value>) => {
  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable({
    data,
    columns,
    filterFns: { fuzzy: fuzzyFilter },
    getCoreRowModel: getCoreRowModel(),
    getRowCanExpand,
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

  return (
    <Table>
      <DataTableHeaders table={table} />
      <DataTableBody
        columns={columns}
        table={table}
        renderSubComponent={renderSubComponent}
        fallback={fallback}
      />
    </Table>
  );
};
