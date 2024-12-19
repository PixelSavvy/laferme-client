import { Order } from "../../validations";
import { OrderStatusTrigger } from "../status";

type OrdersTableStatusCellProps = {
  orderStatus: Order["status"];
};

export const OrdersTableStatusCell = ({
  orderStatus,
}: OrdersTableStatusCellProps) => {
  const statussStyles = {
    PREPARING: {
      variant: "info",
      text: "მზადდება",
    },
    PREPARED: {
      variant: "success",
      text: "გამზადებული",
    },
    CANCELLED: {
      variant: "danger",
      text: "გაუქმებული",
    },
    RETURNED: {
      variant: "warning",
      text: "მობრუნებული",
    },
  } as const;

  const status =
    statussStyles[orderStatus as unknown as keyof typeof statussStyles];

  if (!status) return null;

  // return <Badge variant={status.variant}>{status.text}</Badge>;
  return <OrderStatusTrigger />;
};
