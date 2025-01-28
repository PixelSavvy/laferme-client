import { useState } from "react";
import { UseFieldArrayAppend } from "react-hook-form";

import {
  Badge,
  Button,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
  Skeleton,
} from "@/components/ui";
import { Product, useProducts } from "@/features/products";

import { NewCustomer } from "../../schema";

type SelectCustomerProductFieldProps = {
  disabled: boolean;
  fields: NewCustomer["products"];
  append: UseFieldArrayAppend<never>;
};

export const SelectCustomerProductField = ({
  disabled,
  fields,
  append,
}: SelectCustomerProductFieldProps) => {
  const [isAppendingProduct, setIsAppendingProduct] = useState(false);

  // Query products
  const { data: productsData, isPending, isSuccess } = useProducts();
  const products = productsData?.data;

  // Collect product codes that have already been appended
  const appendedProducts = fields?.map((field) => field.productCode);

  // Filter out already appended products
  const productsToAppend = products?.filter(
    (product) => !appendedProducts?.includes(product.productCode)
  );

  // Append product to the form
  const handleSelect = (value: string) => {
    const selectedProduct = products?.find(
      (product) => product.id === Number(value)
    ) as Product;

    if (selectedProduct) {
      append(selectedProduct);
    }

    setIsAppendingProduct(false);
  };

  return (
    <div>
      {/* Fallback */}

      {isAppendingProduct ? (
        <div className="space-y-4 w-full">
          {/* Product select field */}
          <Select onValueChange={handleSelect}>
            <SelectTrigger disabled={isPending || disabled}>
              <SelectValue placeholder="აირჩიე პროდუქტი" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {isPending ? (
                  Array.from({ length: 5 }).map((_, index) => (
                    <Skeleton key={index} />
                  ))
                ) : isSuccess &&
                  productsToAppend &&
                  productsToAppend.length > 0 ? (
                  productsToAppend.map((product) => (
                    <SelectItem
                      value={product.id.toString()}
                      className="pl-2"
                      key={product.id}
                    >
                      <Badge className="mr-2">{product.productCode}</Badge>
                      <span>{product.title}</span>
                    </SelectItem>
                  ))
                ) : (
                  <SelectLabel className="pl-2">
                    პროდუქტები არ მოიძებნა
                  </SelectLabel>
                )}
              </SelectGroup>
            </SelectContent>
          </Select>

          <Button
            onClick={() => setIsAppendingProduct(false)}
            size={"sm"}
            variant={"secondary"}
            type="button"
            disabled={isPending || disabled}
          >
            გაუქმება
          </Button>
        </div>
      ) : (
        <Button
          onClick={() => setIsAppendingProduct(true)}
          size={"sm"}
          type="button"
          disabled={isPending || disabled}
        >
          დაამატე პროდუქტი
        </Button>
      )}
    </div>
  );
};
