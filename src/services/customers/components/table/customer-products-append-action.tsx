import { Button } from "@/components/ui";
import { ProductSelect, useProducts } from "@/services/products";
import { Plus } from "lucide-react";
import { Dispatch, Fragment, SetStateAction } from "react";
import { UseFieldArrayAppend } from "react-hook-form";
import { NewCustomer } from "../../validations";

type CustomerProductsAppendActionProps = {
  isDisabled?: boolean;
  isSelectingProduct: boolean;
  productSelectFn: Dispatch<SetStateAction<boolean>>;
  selectedProductCodes: string[];
  appendFn: UseFieldArrayAppend<NewCustomer>;
};

export const CustomerProductsAppendAction = ({
  isDisabled,
  isSelectingProduct,
  productSelectFn,
  selectedProductCodes,
  appendFn,
}: CustomerProductsAppendActionProps) => {
  const { data: products } = useProducts({});

  if (!products) return null;

  const filteredProducts = products.data.filter(
    (product) => !selectedProductCodes.includes(product.productCode),
  );

  const handleProductSelect = (val: string) => {
    const selectedProduct = products.data.find(
      (product) => product.id === parseInt(val),
    );

    if (!selectedProduct) return console.warn("Product not found");

    appendFn(selectedProduct!);
    productSelectFn((prev) => !prev);
  };

  return (
    <Fragment>
      {isSelectingProduct ? (
        <div className="flex justify-start items-center gap-2">
          <ProductSelect
            productSetFn={handleProductSelect}
            filteredProducts={filteredProducts}
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
