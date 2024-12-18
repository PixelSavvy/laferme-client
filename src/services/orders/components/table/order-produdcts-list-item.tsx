import { Button, InputField } from "@/components/ui";
import { Trash } from "lucide-react";
import { UseFieldArrayRemove, UseFormReturn } from "react-hook-form";
import { UpdateOrder } from "../../validations";

type OrderProductsListItemProps = {
  isDisabled: boolean;
  form: UseFormReturn<UpdateOrder>;
  index: number;
  removeFn: UseFieldArrayRemove;
};
export const OrderProductsListItem = ({
  isDisabled,
  form,
  index,
  removeFn,
}: OrderProductsListItemProps) => {
  const handleDelete = () => {
    removeFn(index);
  };

  return (
    <li className="flex justify-between items-center gap-4 w-full">
      <InputField
        name={`products.${index}.productCode`}
        label="SKU"
        control={form.control}
        className="max-w-16"
        disabled
      />
      <InputField
        name={`products.${index}.title`}
        label="პროდუქტი"
        control={form.control}
        className="min-w-72"
        disabled
      />
      <InputField
        control={form.control}
        name={`products.${index}.price`}
        type="number"
        label="ფასი"
        className="max-w-24"
        isCurrency
        disabled={isDisabled}
      />
      <InputField
        control={form.control}
        name={`products.${index}.weight`}
        type="number"
        label="წონა (კგ)"
        className="max-w-24"
        disabled={isDisabled}
      />
      <InputField
        control={form.control}
        name={`products.${index}.quantity`}
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
