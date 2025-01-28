import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";

import {
  Form,
  FormAddAction,
  FormSection,
  InputField,
  SelectField,
} from "@/components/ui";
import {
  booleanItems,
  customerTypeItems,
  paymentMethodsItems,
  priceIndexesItems,
} from "@/config";

import {
  NewCustomer,
  newCustomerDefaultValues,
  newCustomerSchema,
} from "../../schema";
import { useCreateCustomer } from "../../services/create-customer";
import { SelectCustomerProductField } from "../customer-product/select-customer-product-field";
import { SelectedCustomerProducts } from "../customer-product/selected-customer-products";

export const AddCustomerForm = () => {
  const { create, isAddingCustomer } = useCreateCustomer();

  const form = useForm<NewCustomer>({
    resolver: zodResolver(newCustomerSchema),
    defaultValues: newCustomerDefaultValues,
  });

  const { fields, remove, append } = useFieldArray({
    control: form.control,
    name: "products",
  });

  const handleSubmit = form.handleSubmit((data) => {
    create(data);
  });

  return (
    <Form {...form}>
      <form className="h-full flex flex-col gap-8" onSubmit={handleSubmit}>
        {/* Company Details */}
        <FormSection title="კომპანიის ინფორმაცია" className="justify-between">
          <SelectField
            form={form}
            label="დღგ-ს გადამხდელი"
            name="paysVAT"
            items={booleanItems}
            placeholder="აირჩიე"
          />
          <SelectField
            form={form}
            label="ტიპი"
            name="type"
            items={customerTypeItems}
            placeholder="ინდექსი"
            className="flex-1"
          />
        </FormSection>
        {/* General Details */}
        <FormSection
          title="ზოგადი ინფორმაცია"
          className="grid grid-cols-3 gap-6"
        >
          {/* Selectables */}
          <SelectField
            form={form}
            label="ინდექსი"
            name="priceIndex"
            items={priceIndexesItems}
          />
          <SelectField
            form={form}
            label="ზედნადები"
            name="needsInvoice"
            items={booleanItems}
          />
          <SelectField
            form={form}
            label="გადახდა"
            name="paymentMethod"
            items={paymentMethodsItems}
          />

          <div className="col-span-full grid grid-cols-2 gap-6">
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
              type="text"
            />
          </div>
          {/* Contact details */}
          <div className="col-span-full grid grid-cols-2 gap-6">
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
          <InputField
            form={form}
            name="address"
            label="მისამართი"
            type="text"
            className="col-span-full"
          />
        </FormSection>
        {/* Contact person Details */}
        <FormSection
          title="საკონტაქტო პირის ინფორმაცია"
          className="grid grid-cols-2 gap-6"
        >
          <InputField
            form={form}
            name="contactPerson.name"
            label="სახელი / გვარი"
            type="text"
          />
          <InputField
            form={form}
            name="contactPerson.position"
            label="პოზიცია"
            type="phone"
          />
          <InputField
            form={form}
            name="contactPerson.phone"
            label="ტელეფონი"
            type="phone"
          />
          <InputField
            form={form}
            name="contactPerson.email"
            label="ელ.ფოსტა"
            type="email"
          />
        </FormSection>

        {/* Customer Products */}
        <FormSection
          title="პროდუქტები"
          className="flex flex-col gap-4 items-start"
        >
          <SelectedCustomerProducts
            fields={fields}
            remove={remove}
            disabled={false}
          />
          <SelectCustomerProductField
            disabled={false}
            fields={fields}
            append={append as never}
          />
        </FormSection>

        <FormAddAction isAdding={isAddingCustomer} className="pb-10 mt-10" />
      </form>
    </Form>
  );
};
