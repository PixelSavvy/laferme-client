import * as React from "react";

import { ColumnDef } from "@tanstack/react-table";
import { Customer } from "../../schema";
import { CustomersTablePaymentCell } from "./customers-table-payment-cell";

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
      },
      {
        accessorKey: "priceIndex",
        header: "საფასო ინდექსი",
        cell: (info) => <span>{info.getValue() as string}</span>,
      },

      {
        accessorKey: "name",
        header: () => "სარეალიზაციო პუქნტი",
        cell: (info) => <span>{info.getValue() as string}</span>,
        sortDescFirst: true,
      },
      {
        accessorKey: "paymentOption",
        header: () => "გადახდის მეთოდი",
        cell: (info) => (
          <CustomersTablePaymentCell
            paymentOption={info.getValue() as string}
          />
        ),
      },
      {
        accessorKey: "needInvoice",
        header: () => "ზედნადები",
        cell: (info) => <span>{info.getValue() === "1" ? "კი" : "არა"}</span>,
      },
      {
        accessorKey: "phone",
        header: () => "ტელეფონი",
        cell: (info) => <span>{info.getValue() as string}</span>,
      },
      {
        accessorKey: "email",
        header: () => "ელ. ფოსტა",
        cell: (info) => <span>{info.getValue() as string}</span>,
      },
    ],
    []
  );

  return columns;
};
