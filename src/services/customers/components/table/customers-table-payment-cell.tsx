import { Customer } from "../../validations";

type CustomersTablePaymentCellProps = {
  paymentOption: Customer["paymentOption"];
};

export const CustomersTablePaymentCell = ({
  paymentOption,
}: CustomersTablePaymentCellProps) => {
  const paymentOptionsStyles = {
    CASH: {
      variant: "success",
      text: "ქეში",
    },
    CONSIGNMENT: {
      variant: "warning",
      text: "კონსიგნაცია",
    },
    DEPOSIT: {
      variant: "primary",
      text: "გადარიცხვა",
    },
    TRIAL: {
      variant: "info",
      text: "საცდელი",
    },
    DISCOUNT: {
      variant: "danger",
      text: "ფასდაკლება",
    },
  } as const;

  const payment =
    paymentOptionsStyles[
      paymentOption as unknown as keyof typeof paymentOptionsStyles
    ];

  if (!payment) return null;

  return <span>{payment.text}</span>;
};
