import { FieldArrayWithId, UseFormReturn } from "react-hook-form";
import { FreezoneItem, FreezoneItemProducts } from "../../validations";
import { FreezoneProductsListItem } from "./freezone-products-list-item";

type FreezoneItemProductsListProps = {
  fields: FieldArrayWithId<FreezoneItemProducts>[];
  form: UseFormReturn<FreezoneItem>;
  isDisabled: boolean;
};

export const FreezoneProductsList = ({
  fields,
  form,
  isDisabled,
}: FreezoneItemProductsListProps) => {
  return (
    <ul className="w-full flex flex-col items-start gap-3">
      {fields.length !== 0 ? (
        fields.map((field, index) => (
          <FreezoneProductsListItem
            key={field.id}
            isDisabled={isDisabled}
            form={form}
            index={index}
          />
        ))
      ) : (
        <p>პროდუქტები არ არის</p>
      )}
    </ul>
  );
};
