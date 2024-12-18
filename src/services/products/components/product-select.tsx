import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui";
import { Customer } from "@/services/customers";
import { Dispatch, SetStateAction } from "react";
import { UseFieldArrayAppend } from "react-hook-form";
import { useProducts } from "../api";

type ProductSelectProps = {
  appendFn: UseFieldArrayAppend<never>;
  productSelectFn: Dispatch<SetStateAction<boolean>>;
  selectedProducts: number[];
  customer: Customer;
};

export const ProductSelect = ({
  appendFn,
  productSelectFn,
  selectedProducts,
  customer,
}: ProductSelectProps) => {
  const { data: products } = useProducts({});

  if (!products) return null;

  const filteredProducts = products.data.filter(
    (product) => !selectedProducts.includes(product.id)
  );

  const handleSelect = (value: string) => {
    const selectedProduct = products.data.find(
      (product) => product.id === parseInt(value)
    );

    if (!selectedProduct) return console.warn("Product not found");

    const product = {
      productId: selectedProduct.id,
      title: selectedProduct.title,
      productCode: selectedProduct.productCode,
      price: customer
        ? selectedProduct.prices[
            customer.priceIndex as keyof typeof selectedProduct.prices
          ]
        : 0,
      quantity: 1,
      weight: 0,
    };

    appendFn(product!);
    productSelectFn((prev) => !prev);
  };

  return (
    <Select onValueChange={handleSelect}>
      <SelectTrigger type="button">
        <SelectValue placeholder="აირჩიე პროდუქტი" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {filteredProducts.length !== 0 ? (
            filteredProducts.map((product) => (
              <SelectItem key={product.id} value={product.id.toString()}>
                {product.title}
              </SelectItem>
            ))
          ) : (
            <SelectLabel>პროდუქტი ვერ მოიძებნა</SelectLabel>
          )}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
