import { Trash } from "lucide-react";
import { useFormContext } from "react-hook-form";

import { Button, InputField } from "@/components/ui";
import { OrderProduct } from "@/features/products";
import { cn } from "@/lib";

type SelectedOrderProductProps = {
  disabled: boolean;
  fields: OrderProduct[];
  remove: (index: number) => void;
};

export const SelectedOrderProducts = ({
  disabled,
  fields,
  remove,
}: SelectedOrderProductProps) => {
  const form = useFormContext();

  return (
    <div className="w-full">
      {fields && fields.length > 0 ? (
        <ul className="flex flex-col w-full gap-3">
          <h4 className="text-sm font-medium mb-2">არჩეული პროდუქტები:</h4>
          {fields.map((field, index) => (
            <li
              key={field.id}
              className={cn(
                "bg-neutral-50 p-2  rounded-md text-sm grid grid-cols-[4rem_1fr_repeat(3,4rem)_min-content] items-center gap-2",
                disabled && "opacity-50"
              )}
            >
              <InputField
                name={`products.${index}.productCode`}
                label="SKU"
                form={form}
                type="text"
                disabled
              />
              <InputField
                name={`products.${index}.title`}
                label="პროდუქტი"
                form={form}
                type="text"
                disabled
              />
              <InputField
                name={`products.${index}.price`}
                label="ფასი"
                form={form}
                type="text"
              />
              <InputField
                name={`products.${index}.weight`}
                label="წონა"
                form={form}
                type="text"
              />
              <InputField
                name={`products.${index}.quantity`}
                label="რაოდ."
                form={form}
                type="text"
              />

              <Button
                size="icon"
                className="size-7 ml-2"
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
