import { Button } from "@/components/ui";
import { Plus } from "lucide-react";
import { Dispatch, Fragment, SetStateAction } from "react";
import { UseFieldArrayAppend } from "react-hook-form";
import { OrderProduct } from "../../validations";
import { OrderProductSelect } from "./order-product-select";

type OrderProductsAppendActionProps = {
  isDisabled?: boolean;
  isSelectingProduct: boolean;
  productSelectFn: Dispatch<SetStateAction<boolean>>;
  appendFn: UseFieldArrayAppend<never>;
  selectedProducts: OrderProduct[];
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

  const selectedProductsIds = selectedProducts.map((product) => product.id);

  return (
    <Fragment>
      {isSelectingProduct && (
        <div className="mb-3 flex justify-start items-center">
          <OrderProductSelect
            appendFn={appendFn}
            productSelectFn={productSelectFn}
            selectedProducts={selectedProductsIds}
          />
        </div>
      )}
      {!isSelectingProduct && (
        <Button
          variant={"ghost"}
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
