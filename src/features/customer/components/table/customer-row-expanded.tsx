import { zodResolver } from "@hookform/resolvers/zod";
import { Row } from "@tanstack/react-table";
import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";

import {
  Form,
  FormSection,
  FormUpdateActions,
  InputField,
  SelectField,
} from "@/components/ui";
import { booleanItems, paymentMethodsItems, priceIndexesItems } from "@/config";

import { Customer, customerSchema } from "../../schema";
import { useRemoveCustomer, useUpdateCustomer } from "../../services";
import { SelectCustomerProductField } from "../customer-product/select-customer-product-field";
import { SelectedCustomerProducts } from "../customer-product/selected-customer-products";

type CustomerRawExpandedProps = {
  row: Row<Customer>;
};

export const CustomerRowExpanded = ({ row }: CustomerRawExpandedProps) => {
  const customer = row.original;

  const [isFormDisabled, setIsFormDisabled] = useState(true);

  const { update, isUpdating } = useUpdateCustomer({ row });
  const { remove, isRemoving } = useRemoveCustomer({ row });

  const form = useForm<Customer>({
    resolver: zodResolver(customerSchema),
    defaultValues: customer,
  });

  const {
    fields,
    append,
    remove: removeFieldArray,
  } = useFieldArray({
    control: form.control,
    name: "products",
  });

  return (
    <Form {...form}>
      <form
        className="grid grid-cols-2 gap-x-24"
        onSubmit={(e) => void form.handleSubmit(update)(e)}
      >
        {/* Customer Details */}
        <div className="space-y-8">
          {/* General Details */}
          <FormSection
            title="სარეალიზაციო პუნქტის ინფორმაცია"
            className="grid grid-cols-3 gap-4"
          >
            <SelectField
              form={form}
              label="ინდექსი"
              name="priceIndex"
              items={priceIndexesItems}
              placeholder="ინდექსი"
              className="flex-1"
              disabled={isFormDisabled}
            />
            <SelectField
              form={form}
              label="ზედნადები"
              name="needsInvoice"
              items={booleanItems}
              className="flex-1"
              disabled={isFormDisabled}
            />
            <SelectField
              form={form}
              label="გადახდა"
              name="paymentMethod"
              items={paymentMethodsItems}
              placeholder="მეთოდი"
              className="flex-1"
              disabled={isFormDisabled}
            />
            <div className="grid grid-cols-2 gap-4 col-span-full">
              <InputField
                form={form}
                name="name"
                label="სახელი"
                type="text"
                disabled={isFormDisabled}
              />
              <InputField
                form={form}
                name="identificationNumber"
                label="პირადი ნომერი / საიდნ. კოდი"
                type="text"
                disabled={isFormDisabled}
              />
            </div>
            <div className="grid grid-cols-2 gap-4 col-span-full">
              <InputField
                form={form}
                name="phone"
                label="ტელეფონი"
                type="phone"
                disabled={isFormDisabled}
              />
              <InputField
                form={form}
                name="email"
                label="ელ.ფოსტა"
                type="email"
                disabled={isFormDisabled}
              />
            </div>
            <InputField
              form={form}
              name="address"
              label="მისამართი"
              type="text"
              className="col-span-full"
              disabled={isFormDisabled}
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
              disabled={isFormDisabled}
            />
            <InputField
              form={form}
              name="contactPerson.position"
              label="პოზიცია"
              type="phone"
              disabled={isFormDisabled}
            />
            <InputField
              form={form}
              name="contactPerson.phone"
              label="ტელეფონი"
              type="phone"
              disabled={isFormDisabled}
            />
            <InputField
              form={form}
              name="contactPerson.email"
              label="ელ.ფოსტა"
              type="email"
              disabled={isFormDisabled}
            />
          </FormSection>
        </div>

        {/* Customer Product Details */}
        <FormSection
          title="პროდუქტები"
          className="flex flex-col gap-4 items-start"
        >
          <SelectCustomerProductField
            disabled={isFormDisabled}
            fields={fields}
            append={append as never}
          />
          <SelectedCustomerProducts
            fields={fields}
            remove={removeFieldArray}
            disabled={isFormDisabled}
          />
        </FormSection>

        {/* Form Actions */}
        <FormUpdateActions
          isFormDisabled={isFormDisabled}
          onFormDisable={setIsFormDisabled}
          isUpdating={isUpdating}
          isRemoving={isRemoving}
          onRemove={remove}
        />
      </form>
    </Form>
  );
};
