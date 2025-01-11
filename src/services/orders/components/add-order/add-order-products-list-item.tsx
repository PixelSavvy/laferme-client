import { Button, InputField } from "@/components/ui";
import { cn } from "@/lib";
import { Trash } from "lucide-react";
import { Control, FieldValues, UseFieldArrayRemove } from "react-hook-form";

type AddOrderProductsListItemProps = {
  removeFn: UseFieldArrayRemove;
  isDisabled?: boolean;
  control: Control<FieldValues>;
  index: number;
};

export const AddOrderProductsListItem = ({
  isDisabled,
  removeFn,
  control,
  index,
}: AddOrderProductsListItemProps) => {
  const handleDelete = () => {
    removeFn(index);
  };

  return (
    <li
      className={cn(
        "flex gap-4  items-center justify-start bg-background typo-label-md border p-4 rounded-md bg-neutral-50",
        isDisabled && "opacity-50",
      )}
    >
      <div className="flex gap-4">
        <InputField
          name={`products.${index}.productCode`}
          label="SKU"
          control={control}
          className="max-w-16"
          type="text"
          disabled
        />
        <InputField
          name={`products.${index}.title`}
          label="პროდუქტი"
          control={control}
          className="min-w-72"
          type="text"
          disabled
        />
        <InputField
          name={`products.${index}.price`}
          label="ფასი"
          control={control}
          className="max-w-20"
          placeholder="0.00"
          type="number"
          isCurrency
        />
        <InputField
          name={`products.${index}.quantity`}
          label="რაოდენობა"
          control={control}
          className="max-w-20"
          placeholder="0"
          type="number"
        />
        <InputField
          name={`products.${index}.weight`}
          label="წონა"
          control={control}
          className="max-w-20"
          placeholder="0.00"
          type="number"
          isWeight
        />
      </div>
      <div>
        <Button
          className="size-9 text-danger-500"
          variant={"danger"}
          onClick={handleDelete}
          disabled={isDisabled}
          type="button"
        >
          <Trash className="text-background" />
        </Button>
      </div>
    </li>
  );
};
