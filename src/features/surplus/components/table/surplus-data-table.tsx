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
import { Dispatch, SetStateAction, useMemo, useState } from "react";

import { Table } from "@/components/ui";
import { fuzzyFilter } from "@/utils";
import {
  MemoizedSurplusTableBody,
  SurplusTableBody,
} from "./surplus-data-table-body";
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
type DataTableProps<Data, Value> = {
  columns: ColumnDef<Data, Value>[];
  data: Data[];
  fallback?: string;
  renderHeader?: boolean;
  globalFilter?: string;
  setGlobalFilter?: Dispatch<SetStateAction<string>>;
};

// DataTable Component
export const SurplusTable = <Data, Value>({
  columns,
  data,
  fallback,
  globalFilter,
  setGlobalFilter,
  renderHeader = true,
}: DataTableProps<Data, Value>) => {
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

    defaultColumn: {
      enableResizing: true,
    },
    columnResizeMode: "onChange",
  });

  const columnSizeVars = useMemo(() => {
    const headers = table.getFlatHeaders();
    const colSizes: { [key: string]: number } = {};
    for (let i = 0; i < headers.length; i++) {
      const header = headers[i]!;
      colSizes[`--header-${header.id}-size`] = header.getSize();
      colSizes[`--col-${header.column.id}-size`] = header.column.getSize();
    }
    return colSizes;
  }, [table.getState().columnSizingInfo, table.getState().columnSizing]);

  return (
    <Table style={{ ...columnSizeVars }}>
      {renderHeader && <SurplusDataTableHeader table={table} />}

      {table.getState().columnSizingInfo.isResizingColumn ? (
        <MemoizedSurplusTableBody table={table} fallback={fallback!} />
      ) : (
        <SurplusTableBody table={table} fallback={fallback!} />
      )}
    </Table>
  );
};
