import {
  Form,
  FormActions,
  FormCalendarField,
  SelectField,
} from "@/components/ui";
import { statuses } from "@/config";
import { useStatus } from "@/hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import { Row } from "@tanstack/react-table";
import { useState } from "react";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { toast } from "sonner";
import { useDeleteOrder, useUpdateOrder } from "../../api";
import {
  Order,
  UpdateOrder,
  UpdateOrderProduct,
  updateOrderSchema,
} from "../../validations";
import { OrderProductsAppendAction } from "../add-order/add-order-product-append-action";
import { AddOrderProductsList } from "../add-order/add-order-products-list";

export const OrdersTableExpanded = ({ row }: { row: Row<Order> }) => {
  const order = row.original;

  const [isDisabled, setIsDisabled] = useState(true);
  const [isSelectingProduct, setIsSelectingProduct] = useState(false);

  const { currentStatus, filteredStatuses } = useStatus({
    data: statuses.order,
    status: order.status,
  });

  const { mutate: updateOrder, isPending: isOrderUpdating } = useUpdateOrder(
    {}
  );

  const { mutate: deleteOrder, isPending: isOrderDeleting } = useDeleteOrder(
    {}
  );

  const transformedProducts: UpdateOrderProduct[] = order.products.map(
    (product) => ({
      productId: product.id,
      title: product.title,
      productCode: product.productCode,
      price: product.orderDetails.price,
      quantity: product.orderDetails.quantity,
      weight: product.orderDetails.weight,
    })
  );

  const form = useForm<UpdateOrder>({
    resolver: zodResolver(updateOrderSchema),
    defaultValues: {
      ...order,
      products: transformedProducts,
    },
    disabled: isDisabled,
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "products",
  });

  const handleSubmit: SubmitHandler<UpdateOrder> = (payload) => {
    updateOrder(
      {
        id: payload.id,
        data: payload,
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

  const handleDelete = () => {
    deleteOrder(
      {
        id: order.id,
      },
      {
        onSuccess: (data) => {
          toast.success(data.message);
          row.toggleExpanded();
        },
        onError: (error) => {
          toast.error(error.message);
        },
      }
    );
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="w-full ">
        {/* General details */}
        <div className="space-y-4 flex flex-col w-full ">
          <h2 className="font-medium">ზოგადი ინფორმაცია</h2>
          <div className="flex justify-start items-center gap-4">
            {/* Order Due Date */}
            <FormCalendarField
              form={form}
              name="dueDateAt"
              label="რეალიზაციის თარიღი"
            />

            {/* Status */}
            <SelectField
              control={form.control}
              name="status"
              items={filteredStatuses}
              placeholder={currentStatus?.value}
              label="სტატუსი"
              className="max-w-64"
            />
          </div>
        </div>

        {/* Order Products */}
        <div className="space-y-4 flex flex-col w-full ">
          <h2 className="font-medium">პროდუქტების ინფორმაცია</h2>
          {/* Existing Products */}
          <div>
            <AddOrderProductsList
              fields={fields}
              remove={remove}
              isDisabled={isDisabled}
              className="flex-nowrap flex-col items-start w-full"
              control={form.control as never}
            />
          </div>

          {/* Add order products */}
          <div>
            <OrderProductsAppendAction
              appendFn={append as never}
              isSelectingProduct={isSelectingProduct}
              productSelectFn={setIsSelectingProduct}
              isDisabled={isDisabled}
              selectedProductsIds={fields.map((field) => field.productId)}
              customer={order.customer}
            />
          </div>

          {/* Order Products */}
        </div>
        {/* Form Actions */}
        <FormActions
          form={form}
          isFormDisabled={isDisabled}
          setIsFormDisabled={setIsDisabled}
          isProcessing={isOrderUpdating}
          isDeleting={isOrderDeleting}
          onDelete={handleDelete}
        />
      </form>
    </Form>
  );
};
