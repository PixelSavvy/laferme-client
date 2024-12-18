import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui";
import { useProducts } from "@/services/products";
import { Dispatch, SetStateAction } from "react";
import { UseFieldArrayAppend } from "react-hook-form";

type ProductSelectProps = {
  appendFn: UseFieldArrayAppend<never>;
  productSelectFn: Dispatch<SetStateAction<boolean>>;
  selectedProducts: number[];
};

export const OrderProductSelect = ({
  appendFn,
  productSelectFn,
  selectedProducts,
}: ProductSelectProps) => {
  const { data: products } = useProducts({});

  if (!products) return null;

  const filteredProducts = products.data.filter(
    (product) => !selectedProducts.includes(product.id)
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
      <SelectTrigger type="button" className="max-w-72">
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
