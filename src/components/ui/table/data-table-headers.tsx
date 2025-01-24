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
    <TableHeader>
      {table.getHeaderGroups().map((headerGroup) => (
        <TableRow key={headerGroup.id}>
          {headerGroup.headers.map((header, index) => (
            <TableHead
              key={header.id}
              colSpan={header.colSpan}
              className={cn(
                index === 0
                  ? "rounded-l-md"
                  : index === headerGroup.headers.length - 1
                    ? "rounded-r-md"
                    : undefined,
                "bg-primary text-background "
              )}
            >
              {!header.isPlaceholder && (
                <div
                  className={cn(
                    "flex items-center gap-1", // Flexbox for alignment
                    header.column.getCanSort()
                      ? "cursor-pointer select-none"
                      : ""
                  )}
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
                  {/* Header Title */}
                  <span>
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </span>

                  {/* Sorting Arrows with Reserved Width */}
                  <div className="w-4 h-4 flex justify-center items-center">
                    {header.column.getIsSorted() === "asc" && (
                      <ArrowUp className="w-4 h-4" />
                    )}
                    {header.column.getIsSorted() === "desc" && (
                      <ArrowDown className="w-4 h-4" />
                    )}
                  </div>
                </div>
              )}
            </TableHead>
          ))}
        </TableRow>
      ))}
    </TableHeader>
  );
};
