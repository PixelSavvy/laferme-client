import { Form, FormSection, InputField, SelectField } from "@/components/ui";
import { FormAddActions } from "@/components/ui/form/form-add-actions";
import { priceIndex, vatOptions } from "@/config";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dispatch, SetStateAction } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { useAddProduct } from "../../api";
import {
  NewProduct,
  newProductSchema,
  productDefaultValues,
} from "../../schemas";

type AddProductFormProps = {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

export const AddProductForm = ({ setIsOpen }: AddProductFormProps) => {
  // Add product API
  const { mutate: addProduct, isPending: isProductAdding } = useAddProduct({});

  // Add product form instance
  const form = useForm<NewProduct>({
    resolver: zodResolver(newProductSchema),
    mode: "onChange",
    defaultValues: productDefaultValues,
  });

  const onSuccessSubmit = (message: string | undefined) => {
    toast.success(message);
    setIsOpen((prev) => !prev);
    form.reset();
  };

  // Form submit handler
  const handleSubmit: SubmitHandler<NewProduct> = (payload) => {
    addProduct(payload, {
      onSuccess: (data) => onSuccessSubmit(data.message),
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={(e) => void form.handleSubmit(handleSubmit)(e)}
        className="flex flex-col justify-start h-full gap-4"
      >
        {/* General Details */}
        <FormSection label="ძირითადი ინფორმაცია" className="items-start">
          <SelectField
            form={form}
            name="hasVAT"
            label="დღგ"
            items={vatOptions}
            placeholder="აირჩიე"
            className="w-32 -mt-2"
          />
          <InputField
            form={form}
            name="productCode"
            label="SKU"
            type="text"
            className="w-40 "
          />
          <InputField
            form={form}
            name="title"
            label="პროდუქტი"
            type="text"
            className="w-96 "
          />
        </FormSection>

        {/* Prices */}
        <FormSection label="ფასები" className="justify-between">
          {priceIndex.map((price, index) => (
            <InputField
              key={index}
              form={form}
              name={`prices.${price}` as `prices.${keyof NewProduct["prices"]}`}
              label={price}
              type="number"
              className="w-20"
            />
          ))}
        </FormSection>

        {/* Form actions */}
        <FormAddActions
          form={form}
          isProcessing={isProductAdding}
          className="mx-auto"
        />
      </form>
    </Form>
  );
};
