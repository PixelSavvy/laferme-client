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
      quantity: 0,
      weight: 0,
    };

    appendFn(product);
    productSelectFn((prev) => !prev);
  };

  return (
    <Fragment>
      {isSelectingProduct && !isDisabled ? (
        <div className="flex flex-col justify-center items-start gap-2 w-full">
          <ProductSelect
            filteredProducts={filteredProducts}
            productSetFn={handleProductSelect}
            isDisabled={isDisabled}
          />
          <Button
            variant={"ghost"}
            disabled={isDisabled}
            onClick={() => productSelectFn((prev) => !prev)}
            type="button"
          >
            გაუქმება
          </Button>
        </div>
      ) : (
        <Button
          variant={"outline"}
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
