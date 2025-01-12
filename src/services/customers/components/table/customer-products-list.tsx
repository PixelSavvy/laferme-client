import { Button } from "@/components/ui";
import { cn } from "@/lib";
import { Trash } from "lucide-react";
import { UseFieldArrayRemove } from "react-hook-form";
import { CustomerProduct } from "../../schema";

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
    <ul className={cn("w-full space-y-2", className)}>
      {fields.length !== 0 ? (
        fields?.map((product) => (
          <li
            key={product.id}
            className={cn(
              "flex justify-between w-full items-center  border-input border rounded-md px-4 py-2 bg-background text-sm ",
              isDisabled && "opacity-50"
            )}
          >
            <div>
              <span>{product.title}</span>
            </div>
            <div className="ml-auto">
              <Button
                variant={"destructive"}
                className="size-8"
                onClick={() => remove(product.id)}
                disabled={isDisabled}
                type="button"
              >
                <Trash />
              </Button>
            </div>
          </li>
        ))
      ) : (
        <span className="text-sm">პროდუქტები არ არის არჩეული</span>
      )}
    </ul>
  );
};
