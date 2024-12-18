import {
  Form,
  FormCancelAction,
  FormEditAction,
  FormSubmitAction,
} from "@/components/ui";
import { zodResolver } from "@hookform/resolvers/zod";
import { Row } from "@tanstack/react-table";
import { Fragment, useState } from "react";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { toast } from "sonner";
import { useUpdateFreezoneItem } from "../../api/update-freezone-item";
import {
  FreezoneItem,
  freezoneItemSchema,
  UpdateFreezoneItem,
} from "../../validations";
import { FreezoneProductsList } from "./freezone-products-list";

export const FreezoneTableExpanded = ({ row }: { row: Row<FreezoneItem> }) => {
  const freezoneItem = row.original;

  // Form input diasbled state
  const [isDisabled, setIsDisabled] = useState(true);

  const {
    mutate: updateFreezoneItem,
    isPending: isFreezoneItemUpdating,
    isSuccess: isFreezoneItemUpdated,
  } = useUpdateFreezoneItem({});

  const form = useForm<FreezoneItem>({
    resolver: zodResolver(freezoneItemSchema),
    defaultValues: freezoneItem,
  });

  const { fields } = useFieldArray({
    control: form.control,
    name: "products",
  });

  const handleSubmit: SubmitHandler<FreezoneItem> = (payload) => {
    const transformedPayload: UpdateFreezoneItem = {
      id: freezoneItem.id,
      orderId: freezoneItem.orderId,
      status: payload.status,
      products: payload.products.map((product) => ({
        productId: product.id,
        ...product.freezoneDetails,
      })),
    };
    updateFreezoneItem(
      {
        id: freezoneItem.id,
        data: transformedPayload,
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

  // Product cancel edit handler
  const handleCancel = () => {
    form.reset();
    handleDisabled();
  };

  const showSubmitActions =
    !isDisabled || (isFreezoneItemUpdating && !isFreezoneItemUpdated);

  const showEditActions =
    isDisabled &&
    !form.formState.isDirty &&
    !isFreezoneItemUpdating &&
    !isFreezoneItemUpdated;

  const handleError = () => {
    console.log(form.formState.errors);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="">
        <div className="space-y-4 flex flex-col max-w-max ">
          <h2 className="font-medium">პროდუქტების ინფორმაცია</h2>
          {/* Products */}
          <div>
            <FreezoneProductsList
              fields={fields}
              form={form}
              isDisabled={isDisabled}
            />
          </div>
        </div>
        {/* Form Actions */}
        <div className="flex justify-between items-center gap-2 mt-8 col-span-full justify-self-end">
          {/* Form edit actions */}
          {showEditActions && (
            <FormEditAction disableFn={handleDisabled} show={showEditActions} />
          )}
          {/* Form submit actions */}
          {showSubmitActions && (
            <Fragment>
              <FormSubmitAction
                isDisabled={isDisabled}
                isFormDirty={form.formState.isDirty}
                isPending={isFreezoneItemUpdating}
                show={showSubmitActions}
              />
              <FormCancelAction cancelFn={handleCancel} />
            </Fragment>
          )}
        </div>
        <button onClick={handleError}>show form errors</button>
      </form>
    </Form>
  );
};
