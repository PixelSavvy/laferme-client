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
        type="text"
        form={form}
        className="max-w-16"
        disabled
      />

      <InputField
        name={`products.${index}.title`}
        label="პროდუქტი"
        form={form}
        type="text"
        className="w-80"
        disabled
      />
      <InputField
        form={form}
        name={`products.${index}.distributionDetails.price`}
        type="number"
        label="ფასი"
        className="max-w-20"
        disabled
      />

      <InputField
        form={form}
        name={`products.${index}.distributionDetails.adjustedWeight`}
        type="number"
        label="წონა"
        className="max-w-20"
        disabled
        showHoverCard
        hoverCard="თავისუფალი ზონის წონა"
      />
      <InputField
        form={form}
        name={`products.${index}.distributionDetails.distributedWeight`}
        type="number"
        label="წონა *"
        className="max-w-20"
        disabled={isDisabled}
        showHoverCard
        hoverCard="მიტანილი წონა"
      />
    </li>
  );
};
