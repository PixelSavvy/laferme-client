import { Button } from "@/components/ui";
import { Plus } from "lucide-react";
import { Dispatch, Fragment, SetStateAction } from "react";
import { UseFieldArrayAppend } from "react-hook-form";
import { UpdateOrderProduct } from "../../validations";
import { OrderProductSelect } from "./order-product-select";

type OrderProductsAppendActionProps = {
  isDisabled?: boolean;
  isSelectingProduct: boolean;
  productSelectFn: Dispatch<SetStateAction<boolean>>;
  appendFn: UseFieldArrayAppend<never>;
  selectedProducts: UpdateOrderProduct[];
};

export const OrderProductsAppendAction = ({
  isDisabled,
  isSelectingProduct,
  productSelectFn,
  appendFn,
  selectedProducts,
}: OrderProductsAppendActionProps) => {
  const handleProductSelect = () => {
    productSelectFn((prev) => !prev);
  };

  const selectedProductsIds = selectedProducts.map(
    (product) => product.productId
  );

  return (
    <Fragment>
      {isSelectingProduct && (
        <div className="flex gap-3 items-center justify-start">
          <OrderProductSelect
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
        </div>
      )}
      {!isSelectingProduct && (
        <Button
          variant={"ghost"}
          disabled={isDisabled}
          onClick={handleProductSelect}
          type="button"
          size={"sm"}
        >
          <Plus />
          დაამატე პროდუქტი
        </Button>
      )}
    </Fragment>
  );
};