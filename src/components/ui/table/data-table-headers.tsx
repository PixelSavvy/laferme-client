import { flexRender, Table } from "@tanstack/react-table";
import { ArrowDown, ArrowUp } from "lucide-react";

import { cn } from "@/lib";

import { TableHead, TableHeader, TableRow } from "./table";

type DataTableHeadersProps<Data> = {
  table: Table<Data>;
};

export const DataTableHeaders = <Data,>({
  table,
}: DataTableHeadersProps<Data>) => {
  return (
    <TableHeader className={cn("bg-primary-500 text-background border-none")}>
      {table.getHeaderGroups().map((headerGroup) => (
        <TableRow key={headerGroup.id}>
          {headerGroup.headers.map((header, index) => (
            <TableHead
              key={header.id}
              colSpan={header.colSpan}
              className={
                (cn(
                  index === 0 ? "rounded-l-md" : "",
                  index === headerGroup.headers.length - 1
                    ? "rounded-r-md"
                    : "",
                ),
                "max-w-96")
              }
            >
              {!header.isPlaceholder && (
                <div
                  className={
                    header.column.getCanSort()
                      ? "cursor-pointer select-none"
                      : undefined
                  }
                  onClick={
                    header.column.getCanSort()
                      ? header.column.getToggleSortingHandler()
                      : undefined
                  }
                  title={
                    header.column.getCanSort()
                      ? header.column.getNextSortingOrder() === "asc"
                        ? "Sort ascending"
                        : header.column.getNextSortingOrder() === "desc"
                          ? "Sort descending"
                          : "Clear sort"
                      : undefined
                  }
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext(),
                  )}
                  {header.column.getIsSorted() === "asc" && (
                    <ArrowUp className="inline ml-1 size-4" />
                  )}
                  {header.column.getIsSorted() === "desc" && (
                    <ArrowDown className="inline ml-1 size-4" />
                  )}
                </div>
              )}
            </TableHead>
          ))}
        </TableRow>
      ))}
    </TableHeader>
  );
};
