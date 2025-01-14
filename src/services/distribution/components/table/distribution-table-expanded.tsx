import {
  Form,
  FormSection,
  FormUpdateActions,
  SelectStatusField,
} from "@/components/ui";
import { zodResolver } from "@hookform/resolvers/zod";
import { Row } from "@tanstack/react-table";
import { useState } from "react";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { toast } from "sonner";

import { statuses } from "@/config";
import { useStatus } from "@/hooks";
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
  const { filteredStatuses } = useStatus({
    data: statuses.distribution,
    status: distributionItem.status,
  });

  const isOrderDelivered = distributionItem.status === statuses.all.DELIVERED;
  const isOrderCancelled =
    distributionItem.status === statuses.all.CANCELLED ||
    distributionItem.status === statuses.all.RETURNED;

  const isOrderFormDisabled = isOrderDelivered || isOrderCancelled;
  // Form input diasbled state
  const [isFormDisabled, setIsFormDisabled] = useState(true);

  const {
    mutate: updateDistributionItem,
    isPending: isDistributionItemUpdating,
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
        distributionItemId: distributionItem.id,
        ...product.distributionDetails,
      })),
      dueDateAt: payload.dueDateAt,
      total: payload.products.reduce((acc, product) => {
        return (
          acc +
          product.distributionDetails.price *
            product.distributionDetails.distributedWeight
        );
      }, 0),
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
      }
    );
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="grid grid-cols-2 gap-x-2"
      >
        <FormSection label="ძირითადი ინფორმაცია">
          <SelectStatusField
            form={form}
            label="სტატუსი"
            name="status"
            isDisabled={isFormDisabled}
            className="w-64 -mt-1.5"
            items={filteredStatuses}
          />
        </FormSection>
        <FormSection label="პროდუქტები">
          <DistributionProductsList
            fields={fields}
            form={form}
            isDisabled={isFormDisabled}
          />
        </FormSection>

        {!isOrderFormDisabled && (
          <FormUpdateActions
            form={form}
            isFormDisabled={isFormDisabled}
            setIsFormDisabled={setIsFormDisabled}
            isProcessing={isDistributionItemUpdating}
          />
        )}
      </form>
    </Form>
  );
};
