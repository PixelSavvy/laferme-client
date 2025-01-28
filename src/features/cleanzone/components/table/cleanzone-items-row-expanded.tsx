import { zodResolver } from "@hookform/resolvers/zod";
import { Row } from "@tanstack/react-table";
import { useFieldArray, useForm } from "react-hook-form";

import { AppDrawer, Form, FormSection } from "@/components/ui";
import { statusesObj } from "@/config";
import { Order, orderSchema } from "@/features/orders";

import { useUpdateOrder } from "@/features/orders/services";
import { AddSurplusForm } from "@/features/surplus";
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

  const handleSubmit = form.handleSubmit((data) => {
    update(data);
  });

  const isFormDisabled =
    cleanzoneItem.updateCount >= 2 ||
    isUpdating ||
    cleanzoneItem.status === statusesObj.cleanzone.PREPARED;

  return (
    <Form {...form}>
      <form
        className="grid grid-cols-[max-content_1fr] gap-x-64"
        onSubmit={handleSubmit}
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

        {/* Form Actions */}
        <div className="flex items-center col-span-full gap-2 justify-end mt-10">
          {!isFormDisabled && <CleanzoneEditAction />}

          <AppDrawer
            label="დაამატე ნაშთი"
            title="ნაშთის მართვა"
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
            className="max-w-xl"
          >
            <AddSurplusForm orderId={cleanzoneItem.id} />
          </AppDrawer>
        </div>
      </form>
    </Form>
  );
};
