import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui";
import { cn } from "@/lib";
import { NewOrder } from "@/services/orders";
import { Dispatch, SetStateAction } from "react";
import { UseFieldArrayAppend, UseFormReturn } from "react-hook-form";
import { useCustomers } from "../api";
import { Customer } from "../schema";

type CustomerSelectProps = {
  appendFn: UseFieldArrayAppend<never>;
  customerSelectFn: Dispatch<SetStateAction<boolean>>;
  customerSetFn: Dispatch<SetStateAction<Customer | undefined>>;
  form: UseFormReturn<NewOrder>;
};

export const CustomerSelect = ({
  appendFn,
  customerSelectFn,
  customerSetFn,
  form,
}: CustomerSelectProps) => {
  const { data: customers } = useCustomers({});

  if (!customers) return null;

  const handleSelect = (value: string) => {
    const customerId = parseInt(value, 10);

    if (isNaN(customerId)) {
      console.error("Invalid customer ID");
      return;
    }

    const customer = customers.data.find(
      (customer) => customer.id === customerId,
    );

    if (!customer) {
      console.error("Customer not found");
      return;
    }

    if (!customer.products || customer.products.length === 0) {
      appendFn([]);
      console.warn("Customer has no products");
    } else {
      const customerProducts = customer.products.map((product) => ({
        productId: product.id,
        title: product.title,
        productCode: product.productCode,
        price:
          product.prices[customer.priceIndex as keyof typeof product.prices],
        quantity: 1,
        weight: 0,
      }));
      form.setValue("products", customerProducts);
    }

    form.setValue("customerId", customerId);
    customerSetFn(customer as Customer);
    customerSelectFn((prev) => !prev);
  };

  return (
    <FormField
      control={form.control}
      name="customerId"
      render={({ field }) => (
        <FormItem className={cn("w-full")}>
          <FormLabel htmlFor="customerId" className="text-neutral-700">
            სარეალიზაციო პუნქტი
          </FormLabel>
          <Select
            onValueChange={(val) => handleSelect(val)}
            value={field.value.toString()}
          >
            <FormControl>
              <SelectTrigger>
                <SelectValue>აირჩიე სარეალიზაციო პუნქტი</SelectValue>
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectGroup>
                {customers.data.length !== 0 ? (
                  customers.data.map((customer) => (
                    <SelectItem
                      key={customer.id}
                      value={customer.id.toString()}
                    >
                      {customer.name}
                    </SelectItem>
                  ))
                ) : (
                  <SelectLabel>სარეალიზაციო პუნქტი ვერ მოიძებნა</SelectLabel>
                )}
              </SelectGroup>
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
