import { zodResolver } from "@hookform/resolvers/zod";
import { Row } from "@tanstack/react-table";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";

import {
  Form,
  FormSection,
  FormUpdateActions,
  InputField,
  SelectField,
} from "@/components/ui";
import { invoiceOptions, paymentOptionValues, priceIndexes } from "@/config";
import { useState } from "react";
import { toast } from "sonner";
import { useDeleteCustomer, useUpdateCustomer } from "../../api";
import { Customer, customerSchema } from "../../schema";
import { CustomerProductsAppendAction } from "./customer-products-append-action";
import { CustomerProductsList } from "./customer-products-list";

export const CustomersTableExpanded = ({ row }: { row: Row<Customer> }) => {
  const customer = row.original;

  // Form input diasbled state
  const [isFormDisabled, setIsFormDisabled] = useState(true);
  const [isSelectingProduct, setIsSelectingProduct] = useState(false);

  // Customer Update API
  const { mutate: updateCustomer, isPending: isCustomerUpdating } =
    useUpdateCustomer({});

  // Product delete API
  const { mutate: deleteCustomer, isPending: isCustomerDeleting } =
    useDeleteCustomer({});

  // React hook form instance
  const form = useForm<Customer>({
    resolver: zodResolver(customerSchema),
    defaultValues: customer,
  });

  // React hook field array instance
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "products",
  });

  const onSuccessSubmit = (message: string | undefined) => {
    form.reset();
    toast.success(message);
    row.toggleExpanded();
  };

  const onSuccessDelete = (message: string | undefined) => {
    toast.success(message);
    row.toggleExpanded();
  };

  // Customer update handler
  const handleSubmit: SubmitHandler<Customer> = (payload) => {
    updateCustomer(
      {
        id: customer.id,
        data: payload,
      },
      {
        onSuccess: (data) => onSuccessSubmit(data.message),
      },
    );
  };

  const handleDelete = () => {
    deleteCustomer(
      {
        id: customer.id,
      },
      {
        onSuccess: (data) => onSuccessDelete(data.message),
      },
    );
  };

  return (
    <Form {...form}>
      <form
        onSubmit={(e) => void form.handleSubmit(handleSubmit)(e)}
        className="grid grid-cols-2 items-start gap-x-24"
      >
        <div>
          {/* General Details */}
          <FormSection
            label="მომხმარებელი"
            className="flex flex-col items-start"
          >
            {/* Selectables */}
            <div className="flex w-full gap-4">
              <SelectField
                form={form}
                label="ინდექსი"
                name="priceIndex"
                items={priceIndexes}
                placeholder="ინდექსი"
                className="flex-1"
                isDisabled={isFormDisabled}
              />
              <SelectField
                form={form}
                label="ზედნადები"
                name="needInvoice"
                items={invoiceOptions}
                className="flex-1"
                isDisabled={isFormDisabled}
              />
              <SelectField
                form={form}
                label="გადახდა"
                name="paymentOption"
                items={paymentOptionValues}
                placeholder="მეთოდი"
                className="flex-1"
                isDisabled={isFormDisabled}
              />
            </div>
            {/* General Details */}
            <div className="w-full">
              <div className="flex gap-4">
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
                  label="პირადი ნომერი / საინდ. კოდი "
                  type="text"
                  disabled={isFormDisabled}
                />
              </div>
              <div className="flex gap-4">
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
            </div>
          </FormSection>

          {/* Responsible Person */}
          <FormSection
            label="პასუხისმგებელი პირი"
            className="flex flex-col justify-start"
          >
            <InputField
              form={form}
              name="responsible.name"
              label="სახელი / გვარი"
              type="text"
              disabled={isFormDisabled}
            />
            <div className="flex justify-between items-center gap-4 w-full">
              <InputField
                form={form}
                name="responsible.phone"
                label="ტელეფონი"
                type="text"
                disabled={isFormDisabled}
              />
              <InputField
                form={form}
                name="responsible.email"
                label="ელ.ფოსტა"
                type="text"
                disabled={isFormDisabled}
              />
            </div>
          </FormSection>
        </div>

        {/* CustomerProducts */}
        <FormSection className="flex flex-col items-start" label="პროდუქცია">
          <CustomerProductsList
            fields={fields}
            remove={remove}
            isDisabled={isFormDisabled}
            className="mt-6"
          />
          <CustomerProductsAppendAction
            isDisabled={isFormDisabled}
            isSelectingProduct={isSelectingProduct}
            productSelectFn={setIsSelectingProduct}
            selectedProductCodes={fields.map((field) => field.productCode)}
            appendFn={append as never}
          />
        </FormSection>

        {/* Form Actions */}
        <div className="col-span-full ">
          <FormUpdateActions
            form={form}
            isFormDisabled={isFormDisabled}
            setIsFormDisabled={setIsFormDisabled}
            isProcessing={isCustomerUpdating}
            isDeleting={isCustomerDeleting}
            onDelete={handleDelete}
          />
        </div>
      </form>
    </Form>
  );
};
