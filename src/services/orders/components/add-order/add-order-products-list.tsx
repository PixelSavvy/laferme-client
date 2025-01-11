import { cn } from "@/lib";
import { Control, FieldValues, UseFieldArrayRemove } from "react-hook-form";
import { NewOrderProduct } from "../../validations";
import { AddOrderProductsListItem } from "./add-order-products-list-item";

type AddOrderProductsListProps = {
  fields: NewOrderProduct[];
  remove: UseFieldArrayRemove;
  isDisabled?: boolean;
  className?: string;
  control: Control<FieldValues>;
};

export const AddOrderProductsList = ({
  fields,
  remove,
  isDisabled,
  className,
  control,
}: AddOrderProductsListProps) => {
  return (
    <ul
      className={cn(
        "flex flex-wrap justify-start items-center gap-4",
        className,
      )}
    >
      {fields.length !== 0 ? (
        fields?.map((product, index) => (
          <AddOrderProductsListItem
            key={product.productId}
            removeFn={remove}
            isDisabled={isDisabled}
            control={control}
            index={index}
          />
        ))
      ) : (
        <span className="typo-paragraph-sm">პროდუქტები არ არის არჩეული</span>
      )}
    </ul>
  );
};
