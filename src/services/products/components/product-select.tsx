import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui";
import { Product } from "../validations";

type ProductSelectProps = {
  filteredProducts: Product[];
  productSetFn: (value: string) => void;
};

export const ProductSelect = ({
  filteredProducts,
  productSetFn,
}: ProductSelectProps) => {
  const handleSelect = (value: string) => {
    productSetFn(value);
  };

  return (
    <Select onValueChange={handleSelect}>
      <SelectTrigger type="button" className="w-72">
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
