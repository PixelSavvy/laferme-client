import { ColumnDef } from "@tanstack/react-table";
import * as React from "react";

import { PaymentMethodCell } from "@/components/ui";
import { paymentMethodsObj } from "@/config";
import { Landmark, Mail, Paperclip, Phone, Users } from "lucide-react";
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
        cell: (info) => (
          <span className="text-primary/80">
            {(info.getValue() as string).split("-")[0]}
          </span>
        ),
        sortDescFirst: true,
        filterFn: "fuzzy",
      },
      {
        accessorKey: "priceIndex",
        header: () => <span>ინდექსი</span>,
        cell: (info) => <span>{info.getValue() as string}</span>,
        filterFn: "fuzzy",
      },

      {
        accessorKey: "name",
        header: () => (
          <span className="flex items-center gap-1">
            <Users size={16} />
            სარეალიზაციო პუქნტი
          </span>
        ),
        cell: (info) => <span>{info.getValue() as string}</span>,
        sortDescFirst: true,
        filterFn: "fuzzy",
      },
      {
        accessorKey: "paymentMethod",
        header: () => (
          <span className="flex gap-1 items-center">
            <Landmark size={16} />
            <span>გადახდა</span>
          </span>
        ),
        cell: (info) => (
          <PaymentMethodCell
            paymentOption={info.getValue() as keyof typeof paymentMethodsObj}
          />
        ),
        filterFn: "fuzzy",
      },
      {
        accessorKey: "needsInvoice",
        header: () => (
          <span className="flex gap-1 items-center">
            <Paperclip size={16} />
            <span>ზედნადები</span>
          </span>
        ),
        cell: (info) => <span>{info.getValue() === "1" ? "კი" : "არა"}</span>,
      },
      {
        accessorKey: "phone",
        header: () => (
          <span className="flex gap-1 items-center">
            <Phone size={16} />
            <span>ტელეფონი</span>
          </span>
        ),
        cell: (info) => <span>{info.getValue() as string}</span>,
        filterFn: "fuzzy",
      },
      {
        accessorKey: "email",
        header: () => (
          <span className="flex gap-1 items-center">
            <Mail size={16} />
            <span>ელ. ფოსტა</span>
          </span>
        ),
        cell: (info) => <span>{info.getValue() as string}</span>,
        filterFn: "fuzzy",
      },
    ],
    [],
  );

  return columns;
};
