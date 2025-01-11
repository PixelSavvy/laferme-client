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

import { useUpdateDistributionItem } from "../../api/update-distribution-item";
import {
  DistributionItem,
  distributionItemSchema,
  UpdateDistributionItem,
} from "../../validations";
import { DistributionProductsList } from "./distribution-products-list";

export const DistributionTableExpanded = ({
  row,
}: {
  row: Row<DistributionItem>;
}) => {
  const distributionItem = row.original;

  // Form input diasbled state
  const [isDisabled, setIsDisabled] = useState(true);

  const {
    mutate: updateDistributionItem,
    isPending: isDistributionItemUpdating,
    isSuccess: isDistributionItemUpdated,
  } = useUpdateDistributionItem({});

  const form = useForm<DistributionItem>({
    resolver: zodResolver(distributionItemSchema),
    defaultValues: distributionItem,
  });

  const { fields } = useFieldArray({
    control: form.control,
    name: "products",
  });

  const handleSubmit: SubmitHandler<DistributionItem> = (payload) => {
    const transformedPayload: UpdateDistributionItem = {
      id: distributionItem.id,
      freezoneItemId: distributionItem.freezoneItemId,
      status: payload.status,
      products: payload.products.map((product) => ({
        productId: product.id,
        ...product.distributionDetails,
      })),
    };

    updateDistributionItem(
      {
        id: distributionItem.id,
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
    !isDisabled || (isDistributionItemUpdating && !isDistributionItemUpdated);

  const showEditActions =
    isDisabled &&
    !form.formState.isDirty &&
    !isDistributionItemUpdating &&
    !isDistributionItemUpdated;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="">
        <div className="space-y-4 flex flex-col max-w-max ">
          <h2 className="font-medium">პროდუქტების ინფორმაცია</h2>
          {/* Products */}
          <div>
            <DistributionProductsList
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
                isPending={isDistributionItemUpdating}
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
