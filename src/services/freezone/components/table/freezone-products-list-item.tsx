import { InputField } from "@/components/ui";
import { UseFormReturn } from "react-hook-form";
import { FreezoneItem } from "../../validations";

type FreezoneProductsListItemProps = {
  isDisabled: boolean;
  form: UseFormReturn<FreezoneItem>;
  index: number;
};
export const FreezoneProductsListItem = ({
  isDisabled,
  form,
  index,
}: FreezoneProductsListItemProps) => {
  return (
    <li className="flex justify-between items-center gap-4">
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
        className="w-80"
        disabled
      />
      <InputField
        control={form.control}
        name={`products.${index}.freezoneDetails.price`}
        type="number"
        label="ფასი"
        className="w-24"
        isCurrency
        disabled
      />
      <InputField
        control={form.control}
        name={`products.${index}.freezoneDetails.weight`}
        type="number"
        label="წონა (კგ)"
        className="w-24"
        disabled
      />
      <InputField
        control={form.control}
        name={`products.${index}.freezoneDetails.quantity`}
        type="number"
        label="რაოდენობა"
        className="w-24"
        disabled
      />
      <InputField
        control={form.control}
        name={`products.${index}.freezoneDetails.adjustedQuantity`}
        type="number"
        label="რაოდენობა *"
        className="w-24"
        disabled={isDisabled}
      />
      <InputField
        control={form.control}
        name={`products.${index}.freezoneDetails.adjustedWeight`}
        type="number"
        label="წონა *"
        className="w-24"
        disabled={isDisabled}
      />
    </li>
  );
};
