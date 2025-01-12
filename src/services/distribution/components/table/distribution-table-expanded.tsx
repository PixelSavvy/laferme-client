import { Form, FormSection, FormUpdateActions } from "@/components/ui";
import { zodResolver } from "@hookform/resolvers/zod";
import { Row } from "@tanstack/react-table";
import { useState } from "react";
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
  const [isFormDisabled, setIsFormDisabled] = useState(true);

  const {
    mutate: updateDistributionItem,
    isPending: isDistributionItemUpdating,
  } = useUpdateDistributionItem({});

  const form = useForm<DistributionItem>({
    resolver: zodResolver(distributionItemSchema),
    defaultValues: distributionItem,
    disabled: isFormDisabled,
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
      }
    );
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="">
        <FormSection>
          <DistributionProductsList
            fields={fields}
            form={form}
            isDisabled={isFormDisabled}
          />
        </FormSection>

        <FormUpdateActions
          form={form}
          isFormDisabled={isFormDisabled}
          setIsFormDisabled={setIsFormDisabled}
          isProcessing={isDistributionItemUpdating}
        />
      </form>
    </Form>
  );
};
