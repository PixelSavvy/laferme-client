import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui";
import { Product } from "../schemas";

type ProductSelectProps = {
  filteredProducts: Product[];
  productSetFn: (value: string) => void;
  isDisabled?: boolean;
};

export const ProductSelect = ({
  filteredProducts,
  productSetFn,
  isDisabled,
}: ProductSelectProps) => {
  const handleSelect = (value: string) => {
    productSetFn(value);
  };

  return (
    <Select onValueChange={handleSelect}>
      <SelectTrigger type="button" className="w-full" disabled={isDisabled}>
        <SelectValue placeholder="აირჩიე პროდუქტი" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {filteredProducts.length !== 0 ? (
            filteredProducts.map((product) => (
              <SelectItem
                key={product.id}
                value={product.id.toString()}
                className="pl-2"
              >
                {product.title}
              </SelectItem>
            ))
          ) : (
            <SelectLabel className="pl-2">პროდუქტი ვერ მოიძებნა</SelectLabel>
          )}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
