import { InputField } from "@/components/ui";
import { UseFormReturn } from "react-hook-form";
import { DistributionItem } from "../../validations";

type DistributionProductsListItemProps = {
  isDisabled: boolean;
  form: UseFormReturn<DistributionItem>;
  index: number;
};
export const DistributionProductsListItem = ({
  isDisabled,
  form,
  index,
}: DistributionProductsListItemProps) => {
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
        name={`products.${index}.distributionDetails.price`}
        type="number"
        label="ფასი"
        className="max-w-20"
        isCurrency
        disabled
      />

      <InputField
        control={form.control}
        name={`products.${index}.distributionDetails.adjustedWeight`}
        type="number"
        label="წონა"
        className="max-w-20"
        disabled
        showHoverCard
        hoverCardContent="თავისუფალი ზონის წონა"
      />
      <InputField
        control={form.control}
        name={`products.${index}.distributionDetails.distributedWeight`}
        type="number"
        label="წონა *"
        className="max-w-20"
        disabled={isDisabled}
        showHoverCard
        hoverCardContent="მიტანილი წონა"
      />
    </li>
  );
};
