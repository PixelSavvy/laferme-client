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
        name={`products.${index}.freezoneDetails.weight`}
        type="number"
        label="წონა"
        className="max-w-20"
        disabled
        isWeight
      />

      <InputField
        control={form.control}
        name={`products.${index}.freezoneDetails.quantity`}
        type="number"
        label="რაოდენობა"
        className="max-w-20"
        disabled
      />
      <InputField
        control={form.control}
        name={`products.${index}.freezoneDetails.adjustedWeight`}
        type="number"
        label="წონა"
        className="max-w-20"
        disabled={isDisabled}
        showHoverCard
        hoverCardContent="ჩასწორებული წონა"
        isWeight
      />
      <InputField
        control={form.control}
        name={`products.${index}.freezoneDetails.adjustedQuantity`}
        type="number"
        label="რაოდენობა"
        className="max-w-20"
        disabled={isDisabled}
        showHoverCard
        hoverCardContent="ჩასწორებული რაოდენობა"
      />
    </li>
  );
};
