import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  getSortedRowModel,
  Row,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./table";

import { cn } from "@/lib";
import { AddCustomerTrigger } from "@/services/customers";
import { AddOrderTrigger } from "@/services/orders/components/add-order";
import { AddProductTrigger } from "@/services/products";
import { ArrowDown, ArrowUp } from "lucide-react";
import { Fragment, ReactNode, useState } from "react";

type DataTableProps<Data, Value> = {
  columns: ColumnDef<Data, Value>[];
  data: Data[];
  getRowCanExpand?: (row: Row<Data>) => boolean;
  renderSubComponent?: (props: { row: Row<Data> }) => ReactNode;
  fallback?: string;
  isProductsRoute?: boolean;
  isCustomersRoute?: boolean;
  isOrdersRoute?: boolean;
};

export const DataTable = <Data, Value>({
  columns,
  data,
  getRowCanExpand = () => false,
  renderSubComponent,
  fallback,
  isProductsRoute,
  isCustomersRoute,
  isOrdersRoute,
}: DataTableProps<Data, Value>) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});

  const table = useReactTable({
    data,
    columns,
    getRowCanExpand,
    getCoreRowModel: getCoreRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    enableSortingRemoval: false,
    enableMultiSort: false,

    onColumnVisibilityChange: setColumnVisibility,
    state: {
      sorting,
      columnVisibility,
    },
  });

  return (
    <div>
      {/* Table actions */}
      <div className="flex py-4 justify-end">
        {isProductsRoute && <AddProductTrigger />}
        {isCustomersRoute && <AddCustomerTrigger />}
        {isOrdersRoute && <AddOrderTrigger />}
      </div>
      {/* Table component */}
      <div className="rounded-md ">
        <Table>
          {/* Render the table headers */}
          <TableHeader
            className={cn("bg-primary-500 text-background border-none")}
          >
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header, index) => (
                  <TableHead
                    key={header.id}
                    colSpan={header.colSpan}
                    className={cn(
                      index === 0 ? "rounded-l-md" : "",
                      index === headerGroup.headers.length - 1
                        ? "rounded-r-md"
                        : ""
                    )}
                  >
                    {header.isPlaceholder ? null : (
                      <div
                        className={
                          header.column.getCanSort()
                            ? "cursor-pointer select-none"
                            : ""
                        }
                        onClick={header.column.getToggleSortingHandler()}
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
                        {" "}
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {{
                          asc: <ArrowUp className="inline ml-1 size-4" />,
                          desc: <ArrowDown className="inline ml-1 size-4" />,
                        }[header.column.getIsSorted() as string] ?? null}
                      </div>
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>

          {/* Render the table body */}
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <Fragment key={row.id}>
                  {/* Main row with an onClick handler for expansion */}
                  <TableRow
                    onClick={() => row.toggleExpanded()}
                    className="cursor-pointer hover:bg-neutral-100 focus-within:bg-neutral-100 transition-colors"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id} className={cn("border-b ")}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                  {/* Expanded row rendering if row is expanded */}
                  {row.getIsExpanded() && renderSubComponent && (
                    <TableRow>
                      <TableCell
                        colSpan={row.getVisibleCells().length}
                        className="p-6 bg-neutral-50 border-b"
                      >
                        {renderSubComponent({ row })}
                      </TableCell>
                    </TableRow>
                  )}
                </Fragment>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length}>{fallback}</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
