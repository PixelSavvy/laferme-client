import { FieldArrayWithId, UseFormReturn } from "react-hook-form";
import { DistributionItem, DistributionItemProducts } from "../../validations";
import { DistributionProductsListItem } from "./distribution-products-list-item";

type DistributionItemProductsListProps = {
  fields: FieldArrayWithId<DistributionItemProducts>[];
  form: UseFormReturn<DistributionItem>;
  isDisabled: boolean;
};

export const DistributionProductsList = ({
  fields,
  form,
  isDisabled,
}: DistributionItemProductsListProps) => {
  return (
    <ul className="w-full flex flex-col items-start gap-3">
      {fields.length !== 0 ? (
        fields.map((field, index) => (
          <DistributionProductsListItem
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
