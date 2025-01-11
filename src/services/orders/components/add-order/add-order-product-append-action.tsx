import { Button } from "@/components/ui";
import { Customer } from "@/services/customers";
import { ProductSelect, useProducts } from "@/services/products";
import { Plus } from "lucide-react";
import { Dispatch, Fragment, SetStateAction } from "react";
import { UseFieldArrayAppend } from "react-hook-form";
import { NewOrder } from "../../validations";

type OrderProductsAppendActionProps = {
  isDisabled?: boolean;
  isSelectingProduct: boolean;
  productSelectFn: Dispatch<SetStateAction<boolean>>;
  appendFn: UseFieldArrayAppend<NewOrder>;
  selectedProductsIds: number[];
  customer: Customer;
};

export const OrderProductsAppendAction = ({
  isDisabled,
  isSelectingProduct,
  productSelectFn,
  appendFn,
  selectedProductsIds,
  customer,
}: OrderProductsAppendActionProps) => {
  const { data: products } = useProducts({});

  if (!products) return null;

  const filteredProducts = products.data.filter(
    (product) => !selectedProductsIds.includes(product.id),
  );

  const handleProductSelect = (val: string) => {
    const selectedProduct = products.data.find(
      (product) => product.id === parseInt(val),
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
    <Fragment>
      {isSelectingProduct ? (
        <div className="flex justify-start items-center gap-2">
          <ProductSelect
            filteredProducts={filteredProducts}
            productSetFn={handleProductSelect}
          />
          <Button
            variant={"ghost"}
            size={"sm"}
            disabled={isDisabled}
            onClick={() => productSelectFn((prev) => !prev)}
            type="button"
            className="h-9"
          >
            გაუქმება
          </Button>
        </div>
      ) : (
        <Button
          variant={"ghost"}
          size={"sm"}
          disabled={isDisabled}
          onClick={() => productSelectFn((prev) => !prev)}
          type="button"
        >
          <Plus />
          დაამატე პროდუქტი
        </Button>
      )}
    </Fragment>
  );
};
