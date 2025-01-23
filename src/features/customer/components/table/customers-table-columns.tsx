import { ColumnDef } from "@tanstack/react-table";
import * as React from "react";

import { PaymentMethodCell } from "@/components/ui";
import { paymentMethodsObj } from "@/config";
import { Customer } from "../../schema";

export const useCustomerColumns = () => {
  // const sortVATFn: SortingFn<Customer> = (rowA, rowB) => {
  //   const vatA = rowA.original.hasVAT;
  //   const vatB = rowB.original.hasVAT;
  //   const vatOrder = ["0", "1"];
  //   return vatOrder.indexOf(vatA) - vatOrder.indexOf(vatB);
  // };

  const columns = React.useMemo<ColumnDef<Customer>[]>(
    () => [
      {
        accessorKey: "id",
        header: () => <span className="font-sans">ID</span>,
        cell: (info) => info.getValue(),
        sortDescFirst: true,
        filterFn: "fuzzy",
      },
      {
        accessorKey: "priceIndex",
        header: "ინდექსი",
        cell: (info) => <span>{info.getValue() as string}</span>,
        filterFn: "fuzzy",
      },

      {
        accessorKey: "name",
        header: () => "სარეალიზაციო პუქნტი",
        cell: (info) => <span>{info.getValue() as string}</span>,
        sortDescFirst: true,
        filterFn: "fuzzy",
      },
      {
        accessorKey: "paymentMethod",
        header: () => "გადახდა",
        cell: (info) => (
          <PaymentMethodCell
            paymentOption={info.getValue() as keyof typeof paymentMethodsObj}
          />
        ),
        filterFn: "fuzzy",
      },
      {
        accessorKey: "needsInvoice",
        header: () => "ზედნადები",
        cell: (info) => <span>{info.getValue() === "1" ? "კი" : "არა"}</span>,
      },
      {
        accessorKey: "phone",
        header: () => "ტელეფონი",
        cell: (info) => <span>{info.getValue() as string}</span>,
        filterFn: "fuzzy",
      },
      {
        accessorKey: "email",
        header: () => "ელ. ფოსტა",
        cell: (info) => <span>{info.getValue() as string}</span>,
        filterFn: "fuzzy",
      },
    ],
    []
  );

  return columns;
};
