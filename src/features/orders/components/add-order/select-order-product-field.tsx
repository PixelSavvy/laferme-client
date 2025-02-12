import { Fragment, useState } from "react";
import { UseFieldArrayAppend, useFormContext } from "react-hook-form";

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
import { OrderProduct, Product, useProducts } from "@/features/products";

import { NewOrder } from "../../schema";

type SelectOrderProductFieldProps = {
  disabled: boolean;
  fields: OrderProduct[];
  append: UseFieldArrayAppend<NewOrder>;
};

export const SelectOrderProductField = ({
  disabled,
  fields,
  append,
}: SelectOrderProductFieldProps) => {
  const [isAppendingProduct, setIsAppendingProduct] = useState(false);

  // Query products
  const { data: productsData, isPending, isSuccess } = useProducts();
  const products = productsData?.data;

  // Get form context
  const form = useFormContext<NewOrder>();

  // Collect product codes that have already been appended
  const appendedProducts = fields.map((field) => field.productCode);

  // Filter out already appended products
  const productsToAppend = products?.filter(
    (product) => !appendedProducts.includes(product.productCode),
  );

  // Append product to the form
  const handleSelect = (value: string) => {
    const selectedProduct = products?.find(
      (product) => product.id === value,
    ) as Product;

    const transformedProduct: OrderProduct = {
      ...selectedProduct,
      price:
        selectedProduct.prices[
          form.getValues("customer")
            .priceIndex as keyof typeof selectedProduct.prices
        ],
      quantity: 1,
      weight: 0,
      preparedQuantity: 1,
      preparedWeight: 0,
      distributedWeight: 0,
    };

    if (selectedProduct) {
      append(transformedProduct);
    }

    setIsAppendingProduct(false);
  };

  return (
    <Fragment>
      {/* Fallback */}
      {isAppendingProduct ? (
        <div className="space-y-4 min-w-64 mr-auto">
          {/* Product select field */}
          <Select onValueChange={handleSelect}>
            <SelectTrigger disabled={isPending || disabled}>
              <SelectValue placeholder="აირჩიე პროდუქტი" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {isPending ? (
                  <Skeleton />
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
          className="mr-auto"
        >
          დაამატე პროდუქტი
        </Button>
      )}
    </Fragment>
  );
};
