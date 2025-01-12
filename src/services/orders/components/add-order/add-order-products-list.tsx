import { Button, InputField } from "@/components/ui";
import { cn } from "@/lib";
import { Trash } from "lucide-react";
import {
  FieldArrayWithId,
  FieldValues,
  Path,
  UseFieldArrayRemove,
  UseFormReturn,
} from "react-hook-form";
import { NewOrderProduct } from "../../validations";

type AddOrderProductsListProps<T extends FieldValues> = {
  fields: FieldArrayWithId<NewOrderProduct>[];
  remove: UseFieldArrayRemove;
  className?: string;
  form: UseFormReturn<T>;
};

export const AddOrderProductsList = <T extends FieldValues>({
  fields,
  remove,
  className,
  form,
}: AddOrderProductsListProps<T>) => {
  return (
    <ul className={cn("", className)}>
      {fields.length !== 0 ? (
        fields?.map((product, index) => (
          <li
            key={product.id}
            className="flex gap-2 items-center justify-between w-full"
          >
            <InputField
              name={`products.${index}.productCode` as Path<T>}
              label="SKU"
              form={form}
              type="text"
              className="max-w-16"
            />
            <InputField
              name={`products.${index}.title` as Path<T>}
              label="პროდუქტი"
              form={form}
              type="text"
              className="min-w-60"
            />
            <InputField
              name={`products.${index}.price` as Path<T>}
              label="ფასი"
              form={form}
              type="text"
              className="max-w-16"
            />
            <InputField
              name={`products.${index}.weight` as Path<T>}
              label="წონა"
              form={form}
              type="text"
              className="max-w-16"
            />
            <InputField
              name={`products.${index}.quantity` as Path<T>}
              label="რაოდენობა"
              form={form}
              type="text"
              className="max-w-16"
            />
            <div>
              <Button
                variant={"destructive"}
                size="icon"
                type="button"
                onClick={() => remove(index)}
                disabled={form.formState.disabled}
              >
                <Trash className="text-background" />
              </Button>
            </div>
          </li>
        ))
      ) : (
        <span>პროდუქტები არ არის არჩეული</span>
      )}
    </ul>
  );
};
