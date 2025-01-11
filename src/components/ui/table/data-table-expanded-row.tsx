import { Row } from "@tanstack/react-table";
import { ReactNode } from "react";
import { TableCell, TableRow } from "./table";

type DataTableExpandedRowProps<Data> = {
  row: Row<Data>;
  renderSubComponent?: (props: { row: Row<Data> }) => ReactNode;
};

export const DataTableExpandedRow = <Data,>({
  row,
  renderSubComponent,
}: DataTableExpandedRowProps<Data>) => {
  return (
    row.getIsExpanded() &&
    renderSubComponent && (
      <TableRow>
        <TableCell
          colSpan={row.getVisibleCells().length}
          className="p-6 bg-neutral-50 border-b"
        >
          {renderSubComponent({ row })}
        </TableCell>
      </TableRow>
    )
  );
};
