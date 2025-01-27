import { flexRender, Table } from "@tanstack/react-table";
import { ArrowDown, ArrowUp } from "lucide-react";

import { TableHead, TableHeader, TableRow } from "@/components/ui";
import { cn } from "@/lib";

type SurplusDataTableHeaderProps<Data> = {
  table: Table<Data>;
};

export const SurplusDataTableHeader = <Data,>({
  table,
}: SurplusDataTableHeaderProps<Data>) => {
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
                "bg-primary text-background relative",
              )}
              style={{
                width: header.getSize() ? `${header.getSize()}px` : undefined,
              }}
            >
              {!header.isPlaceholder && (
                <div
                  className={cn(
                    "flex items-center gap-1 max-w-full",
                    header.column.getCanSort()
                      ? "cursor-pointer select-none"
                      : "",
                  )}
                  onClick={
                    header.column.getCanSort()
                      ? header.column.getToggleSortingHandler()
                      : undefined
                  }
                  title={
                    header.column.getCanSort()
                      ? header.column.getIsSorted() === "asc"
                        ? "Sort ascending"
                        : header.column.getIsSorted() === "desc"
                          ? "Sort descending"
                          : "Clear sort"
                      : undefined
                  }
                >
                  {/* Header Title */}
                  <span>
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
                  </span>

                  {/* Sorting Arrows */}
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
