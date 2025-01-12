import { Form, FormSection, InputField, SelectField } from "@/components/ui";
import { FormAddActions } from "@/components/ui/form/form-add-actions";
import { invoiceOptions, paymentOptionValues, priceIndexes } from "@/config";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dispatch, SetStateAction, useState } from "react";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { toast } from "sonner";
import { useAddCustomer } from "../../api";
import {
  NewCustomer,
  newCustomerDefaultValues,
  newCustomerSchema,
} from "../../schema";
import { CustomerProductsList } from "../table";
import { CustomerProductsAppendAction } from "../table/customer-products-append-action";

type AddCustomerFormProps = {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

export const AddCustomerForm = ({ setIsOpen }: AddCustomerFormProps) => {
  const { mutate: addCustomer, isPending: isCustomerAdding } = useAddCustomer(
    {}
  );

  const [isSelectingProduct, setIsSelectingProduct] = useState(false);

  const form = useForm<NewCustomer>({
    resolver: zodResolver(newCustomerSchema),
    defaultValues: newCustomerDefaultValues,
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "products",
  });

  const onSuccessSubmit = (message: string | undefined) => {
    toast.success(message);
    setIsOpen((prev) => !prev);
    form.reset();
  };

  const handleSubmit: SubmitHandler<NewCustomer> = (payload) => {
    addCustomer(payload, {
      onSuccess: (data) => onSuccessSubmit(data.message),
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={(e) => void form.handleSubmit(handleSubmit)(e)}
        className="h-full flex flex-col gap-6"
      >
        {/* General Details */}
        <FormSection label="ზოგადი ინფორმაცია" className="justify-between">
          <SelectField
            form={form}
            label="ინდექსი"
            name="priceIndex"
            items={priceIndexes}
            placeholder="ინდექსი"
            className="flex-1"
          />
          <SelectField
            form={form}
            label="ზედნადები"
            name="needInvoice"
            items={invoiceOptions}
            placeholder="აირჩიე"
            className="flex-1"
          />
          <SelectField
            form={form}
            label="გადახდა"
            name="paymentOption"
            items={paymentOptionValues}
            placeholder="მეთოდი"
            className="flex-1"
          />
        </FormSection>
        {/* Name */}
        <FormSection>
          <InputField form={form} name="name" label="სახელი" type="text" />
        </FormSection>

        {/* Contact details */}
        <FormSection>
          <InputField form={form} name="phone" label="ტელეფონი" type="phone" />
          <InputField form={form} name="email" label="ელ.ფოსტა" type="email" />
        </FormSection>

        {/* Customer Products */}
        <FormSection label="პროდუქცია" className="flex flex-col items-start">
          <CustomerProductsList fields={fields} remove={remove} />
          <CustomerProductsAppendAction
            isSelectingProduct={isSelectingProduct}
            productSelectFn={setIsSelectingProduct}
            selectedProductCodes={fields.map((field) => field.productCode)}
            appendFn={append}
          />
        </FormSection>

        {/* Form actions */}
        <FormAddActions form={form} isProcessing={isCustomerAdding} />
      </form>
    </Form>
  );
};
