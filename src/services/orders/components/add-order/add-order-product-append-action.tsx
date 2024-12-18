import { Button } from "@/components/ui";
import { Customer } from "@/services/customers";
import { ProductSelect } from "@/services/products";
import { Plus } from "lucide-react";
import { Dispatch, Fragment, SetStateAction } from "react";
import { UseFieldArrayAppend } from "react-hook-form";
import { NewOrderProduct } from "../../validations";

type OrderProductsAppendActionProps = {
  isDisabled?: boolean;
  isSelectingProduct: boolean;
  productSelectFn: Dispatch<SetStateAction<boolean>>;
  appendFn: UseFieldArrayAppend<never>;
  selectedProducts: NewOrderProduct[];
  customer: Customer;
};

export const OrderProductsAppendAction = ({
  isDisabled,
  isSelectingProduct,
  productSelectFn,
  appendFn,
  selectedProducts,
  customer,
}: OrderProductsAppendActionProps) => {
  const handleProductSelect = () => {
    productSelectFn((prev) => !prev);
  };

  const selectedProductsIds = selectedProducts.map(
    (product) => product.productId
  );

  return (
    <Fragment>
      {isSelectingProduct ? (
        <Fragment>
          <ProductSelect
            appendFn={appendFn}
            productSelectFn={productSelectFn}
            selectedProducts={selectedProductsIds}
            customer={customer}
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
