import { Button, InputField } from "@/components/ui";
import { Trash } from "lucide-react";
import { UseFieldArrayRemove, UseFormReturn } from "react-hook-form";
import { Order } from "../../validations";

type OrderProductsListItemProps = {
  isDisabled: boolean;
  form: UseFormReturn<Order>;
  index: number;
  removeFn: UseFieldArrayRemove;
  id: number;
};
export const OrderProductsListItem = ({
  isDisabled,
  form,
  index,
  removeFn,
  id,
}: OrderProductsListItemProps) => {
  const handleDelete = () => {
    removeFn(id);
  };

  return (
    <li className="flex justify-between items-center gap-4">
      <InputField
        name={`products.${index}.productCode`}
        label="SKU"
        control={form.control}
        className="max-w-16"
        disabled={isDisabled}
      />
      <InputField
        name={`products.${index}.title`}
        label="პროდუქტი"
        control={form.control}
        className="w-80"
        disabled={isDisabled}
      />
      <InputField
        control={form.control}
        name={`products.${index}.orderDetails.price`}
        type="number"
        label="ფასი"
        className="w-24"
        isCurrency
        disabled={isDisabled}
      />
      <InputField
        control={form.control}
        name={`products.${index}.orderDetails.weight`}
        type="number"
        label="წონა (კგ)"
        className="w-24"
        disabled={isDisabled}
      />
      <InputField
        control={form.control}
        name={`products.${index}.orderDetails.quantity`}
        type="number"
        label="რაოდენობა"
        className="w-24"
        disabled={isDisabled}
      />
      <div>
        <Button
          className="size-9"
          variant={"danger"}
          disabled={isDisabled}
          onClick={handleDelete}
          type="button"
        >
          <Trash />
        </Button>
      </div>
    </li>
  );
};
