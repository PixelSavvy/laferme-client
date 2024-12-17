import { Badge } from "@/components/ui";
import { Customer } from "../../validations";

type CustomersTablePaymentCellProps = {
  paymentOption: Customer["paymentOption"];
};

export const CustomersTablePaymentCell = ({
  paymentOption,
}: CustomersTablePaymentCellProps) => {
  const paymentOptionsStyles = {
    2000: {
      variant: "success",
      text: "ქეში",
    },
    2001: {
      variant: "warning",
      text: "კონსიგნაცია",
    },
    2002: {
      variant: "primary",
      text: "გადარიცხვა",
    },
    2003: {
      variant: "info",
      text: "საცდელი",
    },
    2004: {
      variant: "danger",
      text: "ფასდაკლება",
    },
  } as const;

  const payment =
    paymentOptionsStyles[
      paymentOption as unknown as keyof typeof paymentOptionsStyles
    ];

  if (!payment) return null;

  return <Badge variant={payment.variant}>{payment.text}</Badge>;
};
