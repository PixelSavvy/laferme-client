import { ColumnDef, flexRender, Table } from "@tanstack/react-table";

import { TableBody, TableCell, TableRow } from "@/components/ui/table/table";
import { cn } from "@/lib";

import { Product } from "../../schemas";

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
    <TableBody className="w-full">
      {table.getRowModel().rows.length ? (
        table.getRowModel().rows.map((row) => (
          <TableRow key={row.id} className="cursor-pointer">
            {row.getVisibleCells().map((cell) => (
              <TableCell
                key={cell.id}
                className={cn(
                  "border-b py-2",
                  row.getIsSelected() && "bg-neutral-100"
                )}
              >
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </TableCell>
            ))}
          </TableRow>
        ))
      ) : (
        <TableRow>
          <TableCell colSpan={columns.length}>{fallback}</TableCell>
        </TableRow>
      )}
    </TableBody>
  );
};
