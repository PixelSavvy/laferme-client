import {
  FieldArrayWithId,
  UseFieldArrayRemove,
  UseFormReturn,
} from "react-hook-form";
import { OrderProduct, UpdateOrder } from "../../validations";
import { OrderProductsListItem } from "./order-produdcts-list-item";

type OrderProductsListProps = {
  fields: FieldArrayWithId<OrderProduct>[];
  form: UseFormReturn<UpdateOrder>;
  isDisabled: boolean;
  removeFn: UseFieldArrayRemove;
};

export const OrderProductsList = ({
  fields,
  form,
  isDisabled,
  removeFn,
}: OrderProductsListProps) => {
  return (
    <ul className="w-full flex flex-col items-start gap-3 ">
      {fields.length !== 0 ? (
        fields.map((field, index) => (
          <OrderProductsListItem
            key={field.id}
            isDisabled={isDisabled}
            form={form}
            index={index}
            removeFn={removeFn}
          />
        ))
      ) : (
        <p>პროდუქტები არ არის</p>
      )}
    </ul>
  );
};
