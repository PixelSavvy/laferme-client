import { UseFieldArrayAppend, useFormContext } from "react-hook-form";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Skeleton,
} from "@/components/ui";
import { useCustomers } from "@/features/customer";
import { OrderProduct } from "@/features/products";
import { Dispatch, SetStateAction } from "react";
import { NewOrder } from "../../schema";

type SelectOrderCustomerProps = {
  onCustomerSelect: Dispatch<SetStateAction<boolean>>;
  append: UseFieldArrayAppend<NewOrder>;
};

export const SelectOrderCustomer = ({
  onCustomerSelect,
  append,
}: SelectOrderCustomerProps) => {
  const { data: customerData, isPending, isSuccess } = useCustomers();
  const customers = customerData?.data.data;

  const form = useFormContext();

  const handleSelect = (value: string) => {
    const selectedOrderCustomer = customers?.find(
      (customer) => customer.id === Number(value)
    );

    if (!selectedOrderCustomer) return;

    form.setValue("customer", selectedOrderCustomer);

    if (!selectedOrderCustomer.products) return;

    const orderProducts = selectedOrderCustomer.products.map(
      (product) =>
        ({
          ...product,
          price:
            product.prices[
              selectedOrderCustomer.priceIndex as keyof typeof product.prices
            ],
          preparedQuantity: 1,
          quantity: 1,
          weight: 0,
          preparedWeight: 0,
          distributedWeight: 0,
        }) as OrderProduct
    );

    append(orderProducts);
    onCustomerSelect(true);
  };
  return (
    <Select onValueChange={handleSelect}>
      <SelectTrigger>
        <SelectValue placeholder="აირჩიე სარეალიზაციო პუნქტი" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {isPending
            ? Array.from({ length: 5 }).map((_, i) => <Skeleton key={i} />)
            : isSuccess &&
              customers?.map((customer) => (
                <SelectItem key={customer.id} value={customer.id.toString()}>
                  {customer.name}
                </SelectItem>
              ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
