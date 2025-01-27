import { TableBody, TableCell, TableRow } from "@/components/ui";
import { flexRender, Table } from "@tanstack/react-table";
import { Fragment } from "react/jsx-runtime";

type SurplusTableBodyProps<Data> = {
  table: Table<Data>;
  fallback: string;
};

export const SurplusTableBody = <Data,>({
  table,
  fallback,
}: SurplusTableBodyProps<Data>) => {
  const rows = table.getRowModel().rows;
  const columns = table.options.columns;

  return (
    <TableBody>
      {rows.length > 0
        ? rows.map((row) => (
            <Fragment key={row.id}>
              <TableRow onClick={() => row.toggleExpanded()}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell
                    key={cell.id}
                    className="py-3 border-b"
                    style={{
                      width: `calc(var(--col-${cell.column.id}-size) * 1px)`,
                    }}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            </Fragment>
          ))
        : fallback && (
            <TableRow>
              <TableCell colSpan={columns.length} className="font-medium p-4">
                {fallback}
              </TableCell>
            </TableRow>
          )}
    </TableBody>
  );
};
