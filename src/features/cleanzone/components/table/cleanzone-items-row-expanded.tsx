import { zodResolver } from "@hookform/resolvers/zod";
import { Row } from "@tanstack/react-table";
import { useFieldArray, useForm } from "react-hook-form";

import { DialogContentTrigger, Form, FormSection } from "@/components/ui";
import { statusesObj } from "@/config";
import { Order, orderSchema } from "@/features/orders";

import { useUpdateOrder } from "@/features/orders/services";
import { AddRemainderForm } from "@/features/remainder";
import { CleanzoneEditAction } from "./cleanzone-edit-action";
import { CleanzoneStatusField } from "./cleanzone-status-field";
import { CleanzoneTableRowProducts } from "./cleanzone-table-row-products";

type CleanzoneItemRowExpandedProps = {
  row: Row<Order>;
};

export const CleanzoneItemRowExpanded = ({
  row,
}: CleanzoneItemRowExpandedProps) => {
  const cleanzoneItem = row.original;

  const { update, isUpdating } = useUpdateOrder({ row });

  const form = useForm<Order>({
    resolver: zodResolver(orderSchema),
    defaultValues: cleanzoneItem,
  });

  const { fields } = useFieldArray({
    control: form.control,
    name: "products",
  });

  const isFormDisabled =
    cleanzoneItem.updateCount >= 2 ||
    isUpdating ||
    cleanzoneItem.status === statusesObj.cleanzone.PREPARED;

  return (
    <Form {...form}>
      <form
        className="grid grid-cols-[1fr_repeat(2,max-content)] gap-x-8"
        onSubmit={(e) => void form.handleSubmit(update)(e)}
      >
        {/* Products */}
        <FormSection title="პროდუქტები">
          <CleanzoneTableRowProducts
            fields={fields}
            disabled={isFormDisabled}
          />
        </FormSection>
        {/* Status */}
        <FormSection title="შეკვეთის სტატუსი" className="flex-col items-start">
          <CleanzoneStatusField disabled={isFormDisabled} />
        </FormSection>

        {/* Remainder Form */}
        <FormSection title="ნაშთი" className="flex-col items-start">
          <DialogContentTrigger
            label="ნაშთის მართვა"
            header="დაამატე ნაშთი"
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
            className="mt-5"
          >
            <AddRemainderForm />
          </DialogContentTrigger>
        </FormSection>

        {/* Form Actions */}
        {!isFormDisabled && (
          <CleanzoneEditAction className="col-span-full justify-self-end mt-10" />
        )}
      </form>
    </Form>
  );
};
