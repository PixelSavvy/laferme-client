import { Button } from "@/components/ui";
import { cn } from "@/lib";
import { Trash } from "lucide-react";
import { UseFieldArrayRemove } from "react-hook-form";
import { CustomerProduct } from "../../validations";

type CustomerProductsListItemProps = {
  product: CustomerProduct;
  removeFn: UseFieldArrayRemove;
  isDisabled?: boolean;
};

export const CustomerProductsListItem = ({
  product,
  isDisabled,
  removeFn,
}: CustomerProductsListItemProps) => {
  const handleDelete = () => {
    removeFn(product.id);
  };

  return (
    <li
      className={cn(
        "flex justify-between gap-4 w-full items-center border-input border rounded-md px-2 py-1 bg-background typo-label-md",
        isDisabled && "opacity-50",
      )}
    >
      <div className="space-x-2">
        <span>{product.productCode}</span>
        <span>{product.title}</span>
      </div>
      <div>
        <Button
          className="size-8 text-danger-500"
          variant={"ghost"}
          onClick={handleDelete}
          disabled={isDisabled}
          type="button"
        >
          <Trash />
        </Button>
      </div>
    </li>
  );
};
