import { InputField } from "@/components/ui";
import { OrderProduct } from "@/features/products";
import { useFormContext } from "react-hook-form";

type DistributionTableRowProductsProps = {
  fields: OrderProduct[];
  disabled: boolean;
};

export const DistributionTableRowProducts = ({
  fields,
  disabled,
}: DistributionTableRowProductsProps) => {
  const form = useFormContext();
  return (
    <ul className="w-full ">
      {fields.map((_field, index) => {
        return (
          <li key={index} className="flex gap-4">
            <InputField
              form={form}
              name={`products.${index}.productCode`}
              label="SKU"
              type="text"
              className="max-w-16"
              disabled
            />
            <InputField
              form={form}
              name={`products.${index}.title`}
              label="პროდუქტი"
              type="text"
              className="flex-0"
              disabled
            />
            <InputField
              form={form}
              name={`products.${index}.price`}
              label="ფასი"
              type="number"
              className="max-w-20"
              showHoverCard
              hoverCard="გამზადებული რაოდენობა"
              disabled
            />
            <InputField
              form={form}
              name={`products.${index}.preparedWeight`}
              label="წონა"
              type="number"
              className="max-w-20"
              showHoverCard
              hoverCard="გამზადებული წონა"
              disabled
            />
            <InputField
              form={form}
              name={`products.${index}.distributedWeight`}
              label="წონა"
              type="number"
              className="max-w-20"
              showHoverCard
              hoverCard="მიტანილი წონა"
              disabled={disabled}
            />
          </li>
        );
      })}
    </ul>
  );
};
