import { cn } from "@/lib";
import { UseFieldArrayRemove } from "react-hook-form";
import { CustomerProduct } from "../../validations";
import { CustomerProductsListItem } from "./customer-products-list-item";

type CustomerProductsListProps = {
  fields: CustomerProduct[];
  remove: UseFieldArrayRemove;
  isDisabled?: boolean;
  className?: string;
};

export const CustomerProductsList = ({
  fields,
  remove,
  isDisabled,
  className,
}: CustomerProductsListProps) => {
  return (
    <ul
      className={cn(
        "flex flex-wrap justify-start items-center gap-4",
        className,
      )}
    >
      {fields.length !== 0 ? (
        fields?.map((product) => (
          <CustomerProductsListItem
            key={product.id}
            product={product}
            removeFn={remove}
            isDisabled={isDisabled}
          />
        ))
      ) : (
        <span className="typo-paragraph-sm">პროდუქტები არ არის არჩეული</span>
      )}
    </ul>
  );
};
