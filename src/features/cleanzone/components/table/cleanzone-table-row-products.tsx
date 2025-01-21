import { InputField } from "@/components/ui";
import { OrderProduct } from "@/features/products";
import { useFormContext } from "react-hook-form";

type CleanzoneTableRowProductsProps = {
  fields: OrderProduct[];
  disabled: boolean;
};

export const CleanzoneTableRowProducts = ({
  fields,
  disabled,
}: CleanzoneTableRowProductsProps) => {
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
              name={`products.${index}.quantity`}
              label="რაოდ."
              type="number"
              className="max-w-20"
              disabled
            />
            <InputField
              form={form}
              name={`products.${index}.weight`}
              label="წონა"
              type="number"
              className="max-w-20"
              disabled
            />
            <InputField
              form={form}
              name={`products.${index}.preparedQuantity`}
              label="რაოდ."
              type="number"
              className="max-w-20"
              showHoverCard
              hoverCard="გამზადებული რაოდენობა"
              disabled={disabled}
            />
            <InputField
              form={form}
              name={`products.${index}.preparedWeight`}
              label="წონა"
              type="number"
              className="max-w-20"
              showHoverCard
              hoverCard="გამზადებული წონა"
              disabled={disabled}
            />
          </li>
        );
      })}
    </ul>
  );
};
