import { Button, Form, FormSection, SelectField } from "@/components/ui";
import { statuses } from "@/config";
import { useStatus } from "@/hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import { Row } from "@tanstack/react-table";
import { Save } from "lucide-react";
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
  const isOrderUpdated = freezoneItem.isUpdated;

  console.log(isOrderUpdated);

  const { mutate: updateFreezoneItem, isPending: isFreezoneItemUpdating } =
    useUpdateFreezoneItem({});

  const { currentStatus, filteredStatuses } = useStatus({
    data: statuses.freezone,
    status: freezoneItem.status,
  });

  const form = useForm<FreezoneItem>({
    resolver: zodResolver(freezoneItemSchema),
    defaultValues: freezoneItem,
    disabled: isOrderUpdated,
  });

  const { fields } = useFieldArray({
    control: form.control,
    name: "products",
  });

  const onSuccessSubmit = (message: string | undefined) => {
    form.reset();
    toast.success(message);
    row.toggleExpanded();
  };

  const handleSubmit: SubmitHandler<FreezoneItem> = (payload) => {
    const transformedPayload: UpdateFreezoneItem = {
      ...payload,
      products: payload.products.map((product) => ({
        freezoneItemId: payload.id,
        productId: product.id,
        ...product.freezoneDetails,
      })),
      isUpdated: true,
    };
    updateFreezoneItem(
      {
        id: freezoneItem.id,
        data: transformedPayload,
      },
      {
        onSuccess: (data) => onSuccessSubmit(data.message),
      }
    );
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="grid grid-cols-[45%_1fr] gap-x-6"
      >
        <FormSection label="შეკვეთის დეტალები" className="items-start">
          <SelectField
            form={form}
            name="status"
            items={filteredStatuses}
            placeholder={currentStatus?.label}
            label="სტატუსი"
            className="w-64"
          />
        </FormSection>
        <FormSection label="პროდუქცია" className="flex-col items-start gap-0">
          <FreezoneProductsList
            fields={fields}
            form={form}
            isDisabled={isOrderUpdated}
          />
        </FormSection>
        {/* Form Actions */}
        {!isOrderUpdated ? (
          <div className="col-span-full justify-self-end mt-10">
            <Button
              disabled={isFreezoneItemUpdating || !form.formState.isDirty}
              type="submit"
            >
              <Save />
              <span>შენახვა</span>
            </Button>
          </div>
        ) : null}
      </form>
    </Form>
  );
};
