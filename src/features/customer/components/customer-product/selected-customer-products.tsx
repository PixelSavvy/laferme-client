import { Trash } from "lucide-react";
import { UseFieldArrayRemove } from "react-hook-form";

import { Badge, Button } from "@/components/ui";
import { cn } from "@/lib";
import { NewCustomer } from "../../schema";

type SelectedCustomerProductsProps = {
  fields: NewCustomer["products"];
  remove: UseFieldArrayRemove;
  disabled: boolean;
};

export const SelectedCustomerProducts = ({
  fields,
  remove,
  disabled,
}: SelectedCustomerProductsProps) => {
  return (
    <div>
      {fields && fields.length > 0 ? (
        <ul className="flex flex-col w-full gap-3">
          <h4 className="text-sm font-medium mb-2">არჩეული პროდუქტები:</h4>
          {fields.map((field, index) => (
            <li
              key={field.id}
              className={cn(
                "border p-2 rounded-md text-sm flex gap-4 items-center",
                disabled && "opacity-50"
              )}
            >
              <Badge>{field.productCode}</Badge>
              <span>{field.title}</span>

              <Button
                size="icon"
                className="size-7 ml-auto"
                variant="destructive"
                onClick={() => remove(index)}
                type="button"
                disabled={disabled}
              >
                <Trash />
              </Button>
            </li>
          ))}
        </ul>
      ) : (
        <span className="text-sm text-neutral-600">
          პროდუქტები არ არის არჩეული
        </span>
      )}
    </div>
  );
};
