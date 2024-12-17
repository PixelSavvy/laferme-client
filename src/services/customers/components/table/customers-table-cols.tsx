import * as React from "react";

import { priceIndex } from "@/config";
import { ColumnDef } from "@tanstack/react-table";
import { Customer } from "../../validations";
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
        cell: (info) => priceIndex[info.getValue() as number],
      },

      {
        accessorKey: "name",
        header: () => "სარეალიზაციო პუქნტი",
        cell: (info) => info.getValue(),
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
        cell: (info) => (info.getValue() === "1" ? "კი" : "არა"),
      },
      {
        accessorKey: "phone",
        header: () => "ტელეფონი",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "email",
        header: () => "ელ. ფოსტა",
        cell: (info) => info.getValue(),
      },
    ],
    []
  );

  return columns;
};
