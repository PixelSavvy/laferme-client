import { zodResolver } from "@hookform/resolvers/zod";
import { Row } from "@tanstack/react-table";
import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";

import {
  Form,
  FormCalendarField,
  FormSection,
  FormUpdateActions,
  SelectStatusField,
} from "@/components/ui";
import { statusesObj } from "@/config";
import { useStatus } from "@/hooks";

import { Order, orderSchema } from "../../schema";
import { useRemoveOrder, useUpdateOrder } from "../../services";
import { SelectOrderProductField } from "../add-order/select-order-product-field";
import { SelectedOrderProducts } from "../add-order/selected-order-products";

type OrderRowExpandedProps = {
  row: Row<Order>;
};

export const OrderRowExpanded = ({ row }: OrderRowExpandedProps) => {
  const order = row.original;

  const [isFormDisabled, setIsFormDisabled] = useState(true);

  const { currentStatus, filteredStatuses } = useStatus({
    data: statusesObj.order,
    status: order.status,
  });

  const { update, isUpdating } = useUpdateOrder({ row });
  const { remove, isRemoving } = useRemoveOrder({ row });

  const form = useForm<Order>({
    resolver: zodResolver(orderSchema),
    defaultValues: {
      ...order,
      total: Number(order.total),
      customerId: order.customer.id,
    },
  });

  const {
    fields,
    remove: removeFieldArray,
    append,
  } = useFieldArray({
    control: form.control,
    name: "products",
  });

  return (
    <Form {...form}>
      <form
        className="grid grid-cols-2 gap-x-16"
        onSubmit={(e) => void form.handleSubmit(update)(e)}
      >
        <FormSection title="პროდუქტები" className="flex-col justify-start ">
          <SelectedOrderProducts
            fields={fields}
            remove={removeFieldArray}
            disabled={isFormDisabled}
          />
          <SelectOrderProductField
            disabled={isFormDisabled}
            append={append as never}
            fields={fields}
          />
        </FormSection>
        {/* General details */}
        <FormSection title="შეკვეთის დეტალები" className="items-start">
          <FormCalendarField
            form={form}
            name="prepareDueAt"
            label="მომზადების თარიღი"
            disabled={isFormDisabled}
          />
          <FormCalendarField
            form={form}
            name="deliverDueAt"
            label="დისტრიბუციის თარიღი"
            disabled={isFormDisabled}
          />

          <SelectStatusField
            form={form}
            name="status"
            items={filteredStatuses}
            label="სტატუსი"
            className="w-full -mt-1.5"
            placeholder={currentStatus.label}
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
