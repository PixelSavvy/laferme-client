import { Fragment, useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { Row } from "@tanstack/react-table";
import { SubmitHandler, useForm } from "react-hook-form";

import { useDeleteProduct, useUpdateProduct } from "../../api";
import { Product, productSchema } from "../../validations";

import { DeleteAlertDialog } from "@/components/ui/alert-dialog";
import {
  Form,
  FormCancelAction,
  FormEditAction,
  FormSubmitAction,
  InputField,
  SelectField,
} from "@/components/ui/form";

import { vatOptions } from "@/config";
import { toast } from "sonner";

export const ProductsTableExpanded = ({ row }: { row: Row<Product> }) => {
  const product = row.original;

  // Form input diasbled state
  const [isDisabled, setIsDisabled] = useState(true);

  // Product delete API
  const { mutate: deleteProduct, isPending: isProductDeleting } =
    useDeleteProduct({});

  // Product update API
  const {
    mutate: updateProduct,
    isPending: isProductUpdating,
    isSuccess: isProductUpdated,
  } = useUpdateProduct({});

  // React hook form instance
  const form = useForm<Product>({
    resolver: zodResolver(productSchema),
    defaultValues: { ...product },
    mode: "onChange",
  });

  // Form submit handler
  const handleSubmit: SubmitHandler<Product> = (payload) => {
    updateProduct(
      {
        id: payload.id,
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

  // Handle input field disabled state
  const handleDisabled = () => {
    setIsDisabled((prev) => !prev);
  };

  // Product delete handler
  const handleDelete = () => {
    deleteProduct(
      {
        id: product.id,
      },
      {
        onSuccess: (data) => {
          toast.success(data.message);
          row.toggleExpanded();
        },
      }
    );
  };

  // Product cancel edit handler
  const handleCancel = () => {
    form.reset();
    handleDisabled();
  };

  const showSubmitActions =
    !isDisabled || (isProductUpdating && !isProductUpdated);

  const showEditActions =
    isDisabled &&
    !form.formState.isDirty &&
    !isProductUpdating &&
    !isProductUpdated;

  return (
    <Form {...form}>
      <form
        className="grid grid-cols-2 justify-center gap-x-16"
        onSubmit={(e) => void form.handleSubmit(handleSubmit)(e)}
      >
        {/* General Details */}
        <div className="space-y-4">
          <h2 className="font-medium">ძირითადი ინფორმაცია</h2>
          <div className="flex justify-start items-center gap-4">
            <SelectField
              control={form.control}
              name="hasVAT"
              label="დღგ"
              items={vatOptions}
              className="min-w-20"
              disabled={isDisabled}
            />
            <InputField
              control={form.control}
              name="productCode"
              label="პროდუქტის კოდი"
              className="max-w-[8rem]"
              disabled={isDisabled}
            />
            <InputField
              control={form.control}
              name="title"
              label="პროდუქტი"
              disabled={isDisabled}
            />
          </div>
        </div>

        {/* Prices */}
        <div className="space-y-4">
          <h2 className="font-medium">ფასები</h2>
          <div className="flex justify-start items-center gap-4">
            <InputField
              control={form.control}
              name={"prices.TR1"}
              label="TR1"
              type="number"
              disabled={isDisabled}
              isCurrency
            />
            <InputField
              control={form.control}
              name={"prices.TR2"}
              label="TR2"
              type="number"
              disabled={isDisabled}
              isCurrency
            />
            <InputField
              control={form.control}
              name={"prices.TR3"}
              label="TR3"
              type="number"
              disabled={isDisabled}
              isCurrency
            />
            <InputField
              control={form.control}
              name={"prices.TR4"}
              label="TR4"
              type="number"
              disabled={isDisabled}
              isCurrency
            />
            <InputField
              control={form.control}
              name={"prices.TR5"}
              label="TR5"
              type="number"
              disabled={isDisabled}
              isCurrency
            />
            <InputField
              control={form.control}
              name={"prices.TRC"}
              label="TRC"
              type="number"
              disabled={isDisabled}
              isCurrency
            />
            <InputField
              control={form.control}
              name={"prices.TRD"}
              label="TRD"
              type="number"
              disabled={isDisabled}
              isCurrency
            />
          </div>
        </div>

        {/* Form actions */}
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
                isPending={isProductDeleting}
              />
            </Fragment>
          )}
          {/* Form submit actions */}
          {showSubmitActions && (
            <Fragment>
              <FormSubmitAction
                isDisabled={isDisabled}
                isFormDirty={form.formState.isDirty}
                isPending={isProductUpdating}
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
