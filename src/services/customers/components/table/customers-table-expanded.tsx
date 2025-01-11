import { zodResolver } from "@hookform/resolvers/zod";
import { Row } from "@tanstack/react-table";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";

import {
  DeleteAlertDialog,
  Form,
  FormCancelAction,
  FormEditAction,
  FormSubmitAction,
  InputField,
  SelectField,
} from "@/components/ui";
import { invoiceOptions, paymentOptionValues, priceIndexes } from "@/config";
import { Fragment, useState } from "react";
import { toast } from "sonner";
import { useDeleteCustomer, useUpdateCustomer } from "../../api";
import { Customer, customerSchema } from "../../validations";
import { CustomerProductsAppendAction } from "./customer-products-append-action";
import { CustomerProductsList } from "./customer-products-list";

export const CustomersTableExpanded = ({ row }: { row: Row<Customer> }) => {
  const customer = row.original;

  // Form input diasbled state
  const [isDisabled, setIsDisabled] = useState(true);
  const [isSelectingProduct, setIsSelectingProduct] = useState(false);

  // Customer Update API
  const {
    mutate: updateCustomer,
    isPending: isCustomerUpdating,
    isSuccess: isCustomerUpdated,
  } = useUpdateCustomer({});

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
      },
    );
  };

  // Handle input field disabled state
  const handleDisabled = () => {
    setIsDisabled((prev) => !prev);
  };

  // Product delete handler
  const handleDelete = () => {
    deleteCustomer(
      {
        id: customer.id,
      },
      {
        onSuccess: (data) => {
          toast.success(data.message);
          row.toggleExpanded();
        },
      },
    );
  };

  // Product cancel edit handler
  const handleCancel = () => {
    form.reset();
    handleDisabled();
  };

  const showSubmitActions =
    !isDisabled || (isCustomerUpdating && !isCustomerUpdated);

  const showEditActions =
    isDisabled &&
    !form.formState.isDirty &&
    !isCustomerUpdating &&
    !isCustomerUpdated;

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
              disabled={isDisabled}
            />
            <SelectField
              control={form.control}
              label="ზედნადები"
              name="needInvoice"
              items={invoiceOptions}
              className="min-w-20"
              disabled={isDisabled}
            />
            <SelectField
              control={form.control}
              label="გადახდა"
              name="paymentOption"
              items={paymentOptionValues}
              placeholder="მეთოდი"
              className="min-w-44"
              disabled={isDisabled}
            />

            <InputField
              control={form.control}
              name="name"
              label="სახელი"
              type="text"
              disabled={isDisabled}
            />
          </div>

          {/* Contact details */}
          <div className="flex justify-start items-center gap-4 w-full">
            <InputField
              control={form.control}
              name="phone"
              label="ტელეფონი"
              type="phone"
              disabled={isDisabled}
            />
            <InputField
              control={form.control}
              name="email"
              label="ელ.ფოსტა"
              type="email"
              disabled={isDisabled}
            />
          </div>
        </div>

        {/* CustomerProducts */}
        <div className="space-y-4 flex flex-col items-start">
          <h2 className="font-medium">პროდუქტები</h2>
          <CustomerProductsList
            fields={fields}
            remove={remove}
            isDisabled={isDisabled}
          />
          <CustomerProductsAppendAction
            isDisabled={isDisabled}
            isSelectingProduct={isSelectingProduct}
            productSelectFn={setIsSelectingProduct}
            selectedProductCodes={fields.map((field) => field.productCode)}
            appendFn={append as never}
          />
        </div>

        {/* Form Actions */}
        <div className="flex justify-between items-center gap-2 mt-8 col-span-full justify-self-end">
          {/* Form edit actions */}
          {showEditActions && (
            <Fragment>
              <FormEditAction
                disableFn={handleDisabled}
                show={showEditActions}
              />
              <DeleteAlertDialog
                deleteFn={handleDelete}
                isPending={isCustomerDeleting}
              />
            </Fragment>
          )}
          {/* Form submit actions */}
          {showSubmitActions && (
            <Fragment>
              <FormSubmitAction
                isDisabled={isDisabled}
                isFormDirty={form.formState.isDirty}
                isPending={isCustomerUpdating}
                show={showSubmitActions}
              />
              <FormCancelAction cancelFn={handleCancel} />
            </Fragment>
          )}
        </div>
      </form>
    </Form>
  );
};
