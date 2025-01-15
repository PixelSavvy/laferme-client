import { Form, FormSection, InputField, SelectField } from "@/components/ui";
import { FormAddActions } from "@/components/ui/form/form-add-actions";
import {
  customerTypeItems,
  invoiceOptions,
  paymentOptionValues,
  priceIndexes,
} from "@/config";
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
    {},
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
    console.log(payload);
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
        {/* Company Details */}
        <FormSection label="კომპანიის ინფორმაცია" className="justify-between">
          <SelectField
            form={form}
            label="ტიპი"
            name="type"
            items={customerTypeItems}
            placeholder="ინდექსი"
            className="flex-1"
          />
          <SelectField
            form={form}
            label="დღგ-ს გადამხდელი"
            name="paysVAT"
            items={invoiceOptions}
            placeholder="აირჩიე"
            className="flex-1"
          />
        </FormSection>
        {/* General Details */}
        <FormSection
          label="ზოგადი ინფორმაცია"
          className="justify-start items-start flex-col gap-6"
        >
          {/* Selectables */}
          <div className="flex justify-between items-center w-full gap-4 ">
            <SelectField
              form={form}
              label="ინდექსი"
              name="priceIndex"
              items={priceIndexes}
              className="flex-1"
            />
            <SelectField
              form={form}
              label="ზედნადები"
              name="needInvoice"
              items={invoiceOptions}
              className="flex-1"
            />
            <SelectField
              form={form}
              label="გადახდა"
              name="paymentOption"
              items={paymentOptionValues}
              className="flex-1"
            />
          </div>

          <div className="flex gap-4 items-center w-full">
            <InputField
              form={form}
              name="name"
              label="სახელი / დასახელება"
              type="text"
            />
            <InputField
              form={form}
              name="identificationNumber"
              label="პირადი ნომერი / საიდნ. კოდი"
              type="number"
            />
          </div>
          {/* Contact details */}
          <div className="flex justify-between gap-4 items-center w-full">
            <InputField
              form={form}
              name="phone"
              label="ტელეფონი"
              type="phone"
            />
            <InputField
              form={form}
              name="email"
              label="ელ.ფოსტა"
              type="email"
            />
          </div>
        </FormSection>

        {/* Responsible Details */}
        <FormSection label="პასუხისმგებელი პირის ინფორმაცია">
          <InputField
            form={form}
            name="responsible.name"
            label="სახელი / გვარი"
            type="text"
          />
        </FormSection>
        <FormSection>
          <InputField
            form={form}
            name="responsible.phone"
            label="ტელეფონი"
            type="phone"
          />
          <InputField
            form={form}
            name="responsible.email"
            label="ელ.ფოსტა"
            type="email"
          />
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
