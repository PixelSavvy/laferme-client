import { ColumnDef } from "@tanstack/react-table";
import { Mail, User } from "lucide-react";
import { useMemo } from "react";
import { Employee } from "../../schema";

export const useEmployeesColumns = () => {
  // const sortVATFn: SortingFn<Order> = (rowA, rowB) => {
  //   const vatA = rowA.original.hasVAT;
  //   const vatB = rowB.original.hasVAT;
  //   const vatOrder = ["0", "1"];
  //   return vatOrder.indexOf(vatA) - vatOrder.indexOf(vatB);
  // };

  const columns = useMemo<ColumnDef<Employee>[]>(
    () => [
      {
        accessorKey: "id",
        header: () => <span className="font-sans">ID</span>,
        cell: (info) => (
          <span className="text-primary/80">
            {(info.getValue() as string).split("-")[0]}
          </span>
        ),
        sortDescFirst: false,
      },
      {
        accessorKey: "fullName",
        header: () => (
          <span className="flex gap-1 items-center">
            <User size={16} /> <span>თანამშრომელი</span>
          </span>
        ),
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "email",
        header: () => (
          <span className="flex gap-1 items-center">
            <Mail size={16} /> <span>ელ. ფოსტა</span>
          </span>
        ),
        cell: (info) => info.getValue(),
      },
    ],
    []
  );

  return columns;
};
