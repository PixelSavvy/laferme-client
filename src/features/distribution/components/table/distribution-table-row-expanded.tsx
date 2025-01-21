import { zodResolver } from "@hookform/resolvers/zod";
import { Row } from "@tanstack/react-table";
import { useFieldArray, useForm } from "react-hook-form";

import {
  Form,
  FormSection,
  FormUpdateActions,
  SelectStatusField,
} from "@/components/ui";
import { Order, orderSchema } from "@/features/orders";

import { statusesObj } from "@/config";
import { useUpdateOrder } from "@/features/orders/services";
import { useStatus } from "@/hooks";
import { useState } from "react";
import { DistributionTableRowProducts } from "./distribution-table-row-products";

type DistributionItemRowExpandedProps = {
  row: Row<Order>;
};

export const DistributionItemRowExpanded = ({
  row,
}: DistributionItemRowExpandedProps) => {
  const distributionItem = row.original;

  const [isFormDisabled, setIsFormDisabled] = useState(true);

  const { currentStatus, filteredStatuses } = useStatus({
    data: statusesObj.distribution,
    status: distributionItem.status,
  });

  const { update, isUpdating } = useUpdateOrder({ row });

  const form = useForm<Order>({
    resolver: zodResolver(orderSchema),
    defaultValues: distributionItem,
  });

  const { fields } = useFieldArray({
    control: form.control,
    name: "products",
  });

  return (
    <Form {...form}>
      <form
        className="grid grid-cols-[1fr_24rem] gap-x-24"
        onSubmit={(e) => void form.handleSubmit(update)(e)}
      >
        {/* Products */}
        <FormSection title="პროდუქტები">
          <DistributionTableRowProducts
            fields={fields}
            disabled={isFormDisabled}
          />
        </FormSection>
        {/* Status */}
        <FormSection title="შეკვეთის სტატუსი" className="flex-col items-start">
          <SelectStatusField
            form={form}
            name="status"
            items={filteredStatuses}
            label="სტატუსი"
            className="w-full self-end"
            placeholder={currentStatus.label}
            disabled={isFormDisabled}
          />
        </FormSection>

        {/* Form Actions */}
        <FormUpdateActions
          isFormDisabled={isFormDisabled}
          onFormDisable={setIsFormDisabled}
          isUpdating={isUpdating}
        />
      </form>
    </Form>
  );
};
