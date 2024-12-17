import { Row } from "@tanstack/react-table";
import { Order } from "../../validations";

type OrdersTableCustomerCellProps = {
  row: Row<Order>;
};

export const OrdersTableCustomerCell = ({
  row,
}: OrdersTableCustomerCellProps) => {
  const customer = row.original.customer;

  const orderProducts = row.original.products;

  return (
    <div className="flex justify-start items-center gap-2">
      <span>{customer.name}</span>
      <div className="size-4 rounded-full flex place-content-center text-background typo-label-sm font-medium bg-info-500">
        <span>{orderProducts.length}</span>
      </div>
    </div>
  );
};
