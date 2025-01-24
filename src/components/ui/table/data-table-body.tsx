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
  const rows = table?.getRowModel().rows ?? [];

  return (
    <TableBody>
      {rows.length ? (
        rows.map((row) => (
          <Fragment key={row.id}>
            <TableRow
              onClick={() => row.toggleExpanded()}
              className="even:bg-neutral-50"
            >
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id} className="border-b">
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
          <TableCell colSpan={columns.length} className="font-medium p-4 ">
            {fallback}
          </TableCell>
        </TableRow>
      )}
    </TableBody>
  );
};
