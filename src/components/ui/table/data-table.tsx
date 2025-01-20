import { ReactNode, useState } from "react";

import {
  ColumnDef,
  getCoreRowModel,
  getExpandedRowModel,
  getSortedRowModel,
  Row,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";

import { DataTableBody } from "./data-table-body";
import { DataTableHeaders } from "./data-table-headers";
import { Table } from "./table";

type DataTableProps<Data, Value> = {
  columns: ColumnDef<Data, Value>[];
  data: Data[];
  getRowCanExpand?: (row: Row<Data>) => boolean;
  renderSubComponent?: (props: { row: Row<Data> }) => ReactNode;
  fallback?: string;
  route: "products" | "customers" | "orders" | "clean-zone" | "distribution";
};

export const DataTable = <Data, Value>({
  columns,
  data,
  getRowCanExpand = () => false,
  renderSubComponent,
  fallback,
}: DataTableProps<Data, Value>) => {
  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable({
    data,
    columns,

    getCoreRowModel: getCoreRowModel(),

    getRowCanExpand,
    getExpandedRowModel: getExpandedRowModel(),

    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    enableSortingRemoval: false,
    enableMultiSort: false,

    state: {
      sorting,
    },
  });

  return (
    <Table>
      {/* Render the table headers */}
      <DataTableHeaders table={table} />

      {/* Render the table body */}
      <DataTableBody
        columns={columns}
        table={table}
        renderSubComponent={renderSubComponent}
        fallback={fallback}
      />
    </Table>
  );
};
