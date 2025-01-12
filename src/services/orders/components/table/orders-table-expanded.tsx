import {
  Form,
  FormCalendarField,
  FormSection,
  FormUpdateActions,
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
  OrderProduct,
  UpdateOrder,
  UpdateOrderProduct,
  updateOrderSchema,
} from "../../validations";
import { OrderProductsAppendAction } from "../add-order/add-order-product-append-action";
import { AddOrderProductsList } from "../add-order/add-order-products-list";

export const OrdersTableExpanded = ({ row }: { row: Row<Order> }) => {
  const order = row.original;
  const orderProducts: OrderProduct[] = order.products;

  const [isFormDisabled, setIsFormDisabled] = useState(true);
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

  const transformedProducts: UpdateOrderProduct[] = orderProducts.map(
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
    disabled: isFormDisabled,
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "products",
  });

  const onSuccessSubmit = (message: string | undefined) => {
    form.reset();
    toast.success(message);
    row.toggleExpanded();
  };

  const onSuccessDelete = (message: string | undefined) => {
    toast.success(message);
    row.toggleExpanded();
  };

  const handleSubmit: SubmitHandler<UpdateOrder> = (payload) => {
    updateOrder(
      {
        id: payload.id,
        data: payload,
      },
      {
        onSuccess: (data) => onSuccessSubmit(data.message),
      }
    );
  };

  const handleDelete = () => {
    deleteOrder(
      {
        id: order.id,
      },
      {
        onSuccess: (data) => onSuccessDelete(data.message),
      }
    );
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="grid grid-cols-2 gap-x-2"
      >
        {/* General details */}
        <FormSection label="შეკვეთის დეტალები" className="items-start">
          <FormCalendarField
            form={form}
            name="dueDateAt"
            label="რეალიზაციის თარიღი"
          />

          {/* Status */}
          <SelectField
            form={form}
            name="status"
            items={filteredStatuses}
            label="სტატუსი"
            className="w-64 -mt-1.5"
            placeholder={currentStatus.label}
          />
        </FormSection>

        {/* Order Products */}
        <FormSection label="პროდუქცია" className="flex-col items-start gap-0">
          <AddOrderProductsList
            fields={fields}
            remove={remove}
            form={form}
            className="w-full"
          />

          {/* Add order products */}
          <OrderProductsAppendAction
            appendFn={append as never}
            isSelectingProduct={isSelectingProduct}
            productSelectFn={setIsSelectingProduct}
            isDisabled={isFormDisabled}
            selectedProductsIds={fields.map((field) => field.productId)}
            customer={order.customer}
          />
        </FormSection>

        {/* Form Actions */}
        <FormUpdateActions
          form={form}
          isFormDisabled={isFormDisabled}
          setIsFormDisabled={setIsFormDisabled}
          isProcessing={isOrderUpdating}
          isDeleting={isOrderDeleting}
          onDelete={handleDelete}
        />
      </form>
    </Form>
  );
};
