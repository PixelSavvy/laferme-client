import { cn } from "@/lib";
import { ColumnDef, flexRender, Row, Table } from "@tanstack/react-table";
import { Fragment, ReactNode } from "react";
import { DataTableExpandedRow } from "./data-table-expanded-row";
import { TableBody, TableCell, TableRow } from "./table";

type DataTableBodyProps<Data, Value> = {
  table: Table<Data>;
  columns: ColumnDef<Data, Value>[];
  renderSubComponent?: (props: { row: Row<Data> }) => ReactNode;
  fallback: string | undefined;
};

export const DataTableBody = <Data, Value>({
  table,
  columns,
  renderSubComponent,
  fallback,
}: DataTableBodyProps<Data, Value>) => {
  return (
    <TableBody>
      {table.getRowModel().rows.length ? (
        table.getRowModel().rows.map((row) => (
          <Fragment key={row.id}>
            <TableRow
              onClick={() => row.toggleExpanded()}
              className="cursor-pointer hover:bg-neutral-100 focus-within:bg-neutral-100 transition-colors"
            >
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id} className={cn("border-b h-14")}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>

            {/* Render the expanded row if available */}
            <DataTableExpandedRow
              row={row}
              renderSubComponent={renderSubComponent}
            />
          </Fragment>
        ))
      ) : (
        <TableRow>
          <TableCell colSpan={columns.length}>{fallback}</TableCell>
        </TableRow>
      )}
    </TableBody>
  );
};
