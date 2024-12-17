import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui";
import { Dispatch, SetStateAction } from "react";
import { UseFieldArrayAppend } from "react-hook-form";
import { useProducts } from "../api";

type ProductSelectProps = {
  appendFn: UseFieldArrayAppend<never>;
  productSelectFn: Dispatch<SetStateAction<boolean>>;
  selectedProducts: string[];
};

export const ProductSelect = ({
  appendFn,
  productSelectFn,
  selectedProducts,
}: ProductSelectProps) => {
  const { data: products } = useProducts({});

  if (!products) return null;

  const filteredProducts = products.data.filter(
    (product) => !selectedProducts.includes(product.productCode)
  );

  const handleSelect = (value: string) => {
    const product = products.data.find(
      (product) => product.id === parseInt(value)
    );
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
