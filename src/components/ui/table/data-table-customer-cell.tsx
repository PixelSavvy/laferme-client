import { Customer } from "@/features/customer";
import { OrderProduct } from "@/features/products";
import { Badge } from "../badge";

type CustomerCellProps = {
  customer: Customer;
  products: OrderProduct[];
};

export const CustomerCell = ({ customer, products }: CustomerCellProps) => {
  return (
    <div className="space-x-2">
      <span>{customer.name}</span>
      <Badge
        className="size-6 rounded-full items-center justify-center"
        variant={"accepted"}
      >
        {products.length}
      </Badge>
    </div>
  );
};
