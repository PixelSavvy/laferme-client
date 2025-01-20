import { ColumnDef, flexRender, Table } from "@tanstack/react-table";

import { TableBody, TableCell, TableRow } from "@/components/ui/table/table";
import { cn } from "@/lib";
import { Product } from "../../schema";

type ProductsDataTableBodyProps = {
  table: Table<Product>;
  columns: ColumnDef<Product>[];
  fallback: string | undefined;
};

export const ProductsDataTableBody = ({
  table,
  columns,
  fallback,
}: ProductsDataTableBodyProps) => {
  return (
    <TableBody>
      {table.getRowModel().rows.length ? (
        table.getRowModel().rows.map((row) => (
          <TableRow key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <TableCell
                key={cell.id}
                className={cn(row.getIsSelected() ? "bg-neutral-100" : "", "")}
              >
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </TableCell>
            ))}
          </TableRow>
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
