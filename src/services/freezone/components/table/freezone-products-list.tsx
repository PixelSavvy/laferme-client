import { InputField } from "@/components/ui";
import {
  FieldArrayWithId,
  FieldValues,
  Path,
  UseFormReturn,
} from "react-hook-form";
import { FreezoneItemProducts } from "../../validations";

type FreezoneItemProductsListProps<T extends FieldValues> = {
  fields: FieldArrayWithId<FreezoneItemProducts>[];
  form: UseFormReturn<T>;
  isDisabled: boolean;
};

export const FreezoneProductsList = <T extends FieldValues>({
  fields,
  form,
}: FreezoneItemProductsListProps<T>) => {
  return (
    <ul className="w-full flex flex-col items-start gap-2">
      {fields.length !== 0 ? (
        fields.map((field, index) => (
          <li
            className="flex gap-4 items-center justify-start w-full"
            key={field.id}
          >
            <InputField
              name={`products.${index}.productCode` as Path<T>}
              label="SKU"
              form={form}
              type="text"
              disabled
              className="max-w-16"
            />
            <InputField
              name={`products.${index}.title` as Path<T>}
              label="პროდუქტი"
              form={form}
              type="text"
              disabled
              className="min-w-60"
            />

            <InputField
              form={form}
              name={`products.${index}.freezoneDetails.weight` as Path<T>}
              type="number"
              label="წონა"
              disabled
              className="max-w-16"
            />

            <InputField
              form={form}
              name={`products.${index}.freezoneDetails.quantity` as Path<T>}
              type="number"
              label="რაოდ."
              disabled
              className="max-w-16"
            />
            <InputField
              form={form}
              name={
                `products.${index}.freezoneDetails.adjustedWeight` as Path<T>
              }
              type="number"
              label="წონა"
              showHoverCard
              hoverCard="ჩასწორებული წონა"
              className="max-w-16"
            />
            <InputField
              form={form}
              name={
                `products.${index}.freezoneDetails.adjustedQuantity` as Path<T>
              }
              type="number"
              label="რაოდ."
              showHoverCard
              hoverCard="ჩასწორებული რაოდენობა"
              className="max-w-16"
            />
          </li>
        ))
      ) : (
        <p>პროდუქტები არ არის</p>
      )}
    </ul>
  );
};
