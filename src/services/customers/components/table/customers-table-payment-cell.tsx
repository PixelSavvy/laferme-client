import { Badge } from "@/components/ui";
import { Customer } from "../../schema";

type CustomersTablePaymentCellProps = {
  paymentOption: Customer["paymentOption"];
};

export const CustomersTablePaymentCell = ({
  paymentOption,
}: CustomersTablePaymentCellProps) => {
  const paymentOptionsStyles = {
    CASH: {
      label: "ქეში",
      style: "bg-green-500 text-white hover:bg-green-600",
    },
    CONSIGNMENT: {
      label: "კონსიგნაცია",
      style: "bg-blue-500 text-white hover:bg-blue-600",
    },
    TRANSFER: {
      label: "გადარიცხვა",
      style: "bg-yellow-500 text-white hover:bg-yellow-600",
    },
    TRIAL: {
      label: "საცდელი",
      style: "bg-neutral-500 text-white hover:bg-neutral-600",
    },
    DISCOUNT: {
      label: "ფასდაკლება",
      style: "bg-red-500 text-white  hover:bg-red-600",
    },
  } as const;

  const payment =
    paymentOptionsStyles[
      paymentOption as unknown as keyof typeof paymentOptionsStyles
    ];

  if (!payment) return null;

  return <Badge className={payment.style}>{payment.label}</Badge>;
};
