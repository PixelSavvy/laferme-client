import { Form, FormActions } from "@/components/ui";
import { zodResolver } from "@hookform/resolvers/zod";
import { Row } from "@tanstack/react-table";
import { useState } from "react";
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
  const [isFormDisabled, setIsFormDisabled] = useState(false);

  const { mutate: updateFreezoneItem, isPending: isFreezoneItemUpdating } =
    useUpdateFreezoneItem({});

  const form = useForm<FreezoneItem>({
    resolver: zodResolver(freezoneItemSchema),
    defaultValues: freezoneItem,
    disabled: isFormDisabled,
  });

  const { fields } = useFieldArray({
    control: form.control,
    name: "products",
  });

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
        <div className="space-y-4 flex flex-col max-w-max ">
          <h2 className="font-medium">პროდუქტების ინფორმაცია</h2>
          {/* Products */}
          <div>
            <FreezoneProductsList
              fields={fields}
              form={form}
              isDisabled={isFormDisabled}
            />
          </div>
        </div>
        {/* Form Actions */}
        <FormActions
          form={form}
          isFormDisabled={isFormDisabled}
          setIsFormDisabled={setIsFormDisabled}
          isProcessing={isFreezoneItemUpdating}
        />
      </form>
    </Form>
  );
};
