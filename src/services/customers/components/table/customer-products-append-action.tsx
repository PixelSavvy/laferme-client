import { Button } from "@/components/ui";
import { ProductSelect } from "@/services/products";
import { Plus } from "lucide-react";
import { Dispatch, Fragment, SetStateAction } from "react";
import { UseFieldArrayAppend } from "react-hook-form";
import { CustomerProduct } from "../../validations";

type CustomerProductsAppendActionProps = {
  isDisabled?: boolean;
  isSelectingProduct: boolean;
  productSelectFn: Dispatch<SetStateAction<boolean>>;
  appendFn: UseFieldArrayAppend<never>;
  selectedProducts: CustomerProduct[];
};

export const CustomerProductsAppendAction = ({
  isDisabled,
  isSelectingProduct,
  productSelectFn,
  appendFn,
  selectedProducts,
}: CustomerProductsAppendActionProps) => {
  const handleProductSelect = () => {
    productSelectFn((prev) => !prev);
  };

  const selectedProductsIds = selectedProducts.map(
    (product) => product.productCode
  );

  return (
    <Fragment>
      {isSelectingProduct ? (
        <Fragment>
          <ProductSelect
            appendFn={appendFn}
            productSelectFn={productSelectFn}
            selectedProducts={selectedProductsIds}
          />
          <Button
            variant={"ghost"}
            size={"sm"}
            disabled={isDisabled}
            onClick={handleProductSelect}
            type="button"
          >
            გაუქმება
          </Button>
        </Fragment>
      ) : (
        <Button
          variant={"ghost"}
          size={"sm"}
          disabled={isDisabled}
          onClick={handleProductSelect}
          type="button"
        >
          <Plus />
          დაამატე პროდუქტი
        </Button>
      )}
    </Fragment>
  );
};
