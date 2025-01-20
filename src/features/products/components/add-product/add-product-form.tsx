import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  Form,
  FormAddAction,
  FormSection,
  InputField,
  SelectField,
} from "@/components/ui";
import { booleanItems, priceIndexes } from "@/config";
import {
  NewProduct,
  newProductDefaultValues,
  newProductSchema,
} from "../../schema";
import { useCreateProduct } from "../../services";

export const AddProductForm = () => {
  const { create, isProductCreating } = useCreateProduct();

  const form = useForm<NewProduct>({
    resolver: zodResolver(newProductSchema),
    defaultValues: newProductDefaultValues,
  });

  return (
    <Form {...form}>
      <form
        className="h-full flex flex-col gap-8"
        onSubmit={(e) => void form.handleSubmit(create)(e)}
      >
        {/* Product info */}
        <FormSection title="პროდუქტის ინფორმაცია">
          <SelectField
            form={form}
            name="hasVAT"
            label="დღგ"
            items={booleanItems}
            className="w-32"
          />
          <InputField
            form={form}
            name="productCode"
            label="SKU"
            type="text"
            className="w-32"
          />
          <InputField form={form} name="title" label="პროდუქტი" type="text" />
        </FormSection>
        <FormSection title="პროდუქტის ფასები">
          {priceIndexes.map((price, index) => (
            <InputField
              key={index}
              form={form}
              name={`prices.${price}` as `prices.${keyof NewProduct["prices"]}`}
              label={price}
              type="number"
              className="w-24"
            />
          ))}
        </FormSection>

        {/* Form Actions */}
        <FormAddAction isAdding={isProductCreating} className="mt-auto" />
      </form>
    </Form>
  );
};
