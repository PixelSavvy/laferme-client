import { zodResolver } from "@hookform/resolvers/zod";
import { Row } from "@tanstack/react-table";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";

import { Form, FormActions, InputField, SelectField } from "@/components/ui";
import { invoiceOptions, paymentOptionValues, priceIndexes } from "@/config";
import { useState } from "react";
import { toast } from "sonner";
import { useDeleteCustomer, useUpdateCustomer } from "../../api";
import { Customer, customerSchema } from "../../validations";
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
    disabled: isFormDisabled,
  });

  // React hook field array instance
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "products",
  });

  // Customer update handler
  const handleSubmit: SubmitHandler<Customer> = (payload) => {
    updateCustomer(
      {
        id: customer.id,
        data: payload,
      },
      {
        onSuccess: (data) => {
          form.reset();
          toast.success(data.message);
          row.toggleExpanded();
        },
      }
    );
  };

  const handleDele = () => {
    deleteCustomer(
      {
        id: customer.id,
      },
      {
        onSuccess: (data) => {
          toast.success(data.message);
          row.toggleExpanded();
        },
      }
    );
    row.toggleExpanded();
  };

  return (
    <Form {...form}>
      <form
        onSubmit={(e) => void form.handleSubmit(handleSubmit)(e)}
        className="grid grid-cols-2 justify-center gap-x-16"
      >
        {/* General Details */}
        <div className="space-y-4 flex flex-col">
          <h2 className="font-medium">ძირითადი ინფორმაცია</h2>
          {/* Selectables */}
          <div className="w-full flex justify-between items-center gap-4">
            <SelectField
              control={form.control}
              label="ინდექსი"
              name="priceIndex"
              items={priceIndexes}
              placeholder="ინდექსი"
              className="min-w-20"
            />
            <SelectField
              control={form.control}
              label="ზედნადები"
              name="needInvoice"
              items={invoiceOptions}
              className="min-w-20"
            />
            <SelectField
              control={form.control}
              label="გადახდა"
              name="paymentOption"
              items={paymentOptionValues}
              placeholder="მეთოდი"
              className="min-w-44"
            />

            <InputField
              control={form.control}
              name="name"
              label="სახელი"
              type="text"
            />
          </div>

          {/* Contact details */}
          <div className="flex justify-start items-center gap-4 w-full">
            <InputField
              control={form.control}
              name="phone"
              label="ტელეფონი"
              type="phone"
            />
            <InputField
              control={form.control}
              name="email"
              label="ელ.ფოსტა"
              type="email"
            />
          </div>
        </div>

        {/* CustomerProducts */}
        <div className="space-y-4 flex flex-col items-start">
          <h2 className="font-medium">პროდუქტები</h2>
          <CustomerProductsList
            fields={fields}
            remove={remove}
            isDisabled={isFormDisabled}
          />
          <CustomerProductsAppendAction
            isDisabled={isFormDisabled}
            isSelectingProduct={isSelectingProduct}
            productSelectFn={setIsSelectingProduct}
            selectedProductCodes={fields.map((field) => field.productCode)}
            appendFn={append as never}
          />
        </div>

        {/* Form Actions */}
        <FormActions
          form={form}
          isFormDisabled={isFormDisabled}
          setIsFormDisabled={setIsFormDisabled}
          isProcessing={isCustomerUpdating}
          isDeleting={isCustomerDeleting}
          onDelete={handleDele}
        />
      </form>
    </Form>
  );
};
