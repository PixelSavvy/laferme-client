import {
  Form,
  FormCalendarField,
  FormSection,
  FormUpdateActions,
  SelectStatusField,
} from "@/components/ui";
import { statuses } from "@/config";
import { useStatus } from "@/hooks";
import { useDistributionItem } from "@/services/distribution";
import { zodResolver } from "@hookform/resolvers/zod";
import { Row } from "@tanstack/react-table";
import { useMemo, useState } from "react";
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

  const distributionItemQuery = useDistributionItem({
    id: order.id,
  });

  const isOrderDelivered = order.status === statuses.all.DELIVERED;
  const isOrderCancelled =
    order.status === statuses.all.CANCELLED ||
    order.status === statuses.all.RETURNED;

  const isOrderFormDisabled = isOrderDelivered || isOrderCancelled;

  const [isFormDisabled, setIsFormDisabled] = useState(true);
  const [isSelectingProduct, setIsSelectingProduct] = useState(false);

  const { filteredStatuses } = useStatus({
    data: statuses.order,
    status: order.status,
  });

  const adjustedStatuses = useMemo(() => {
    if (!distributionItemQuery.data?.data) {
      // If the distribution item does not exist, return the filtered statuses as-is
      return filteredStatuses;
    }

    const distributionItemStatus = distributionItemQuery.data.data.status;

    const statusesToExcludeREADYTODELIVER = [
      statuses.all.DELIVERING,
      statuses.all.DELIVERED,
      statuses.all.CANCELLED,
      statuses.all.RETURNED,
    ];

    return filteredStatuses.filter((orderStatus) => {
      // Exclude READYTODELIVER if the current status is DELIVERING
      if (
        orderStatus.value === statuses.all.READYTODELIVER &&
        statusesToExcludeREADYTODELIVER.includes(distributionItemStatus)
      ) {
        return false;
      }

      // Keep all other statuses
      return true;
    });
  }, [filteredStatuses, distributionItemQuery.data?.data]);

  const { mutate: updateOrder, isPending: isOrderUpdating } = useUpdateOrder(
    {},
  );

  const { mutate: deleteOrder, isPending: isOrderDeleting } = useDeleteOrder(
    {},
  );

  const transformedProducts: UpdateOrderProduct[] = orderProducts.map(
    (product) => ({
      productId: product.id,
      title: product.title,
      productCode: product.productCode,
      price: product.orderDetails.price,
      quantity: product.orderDetails.quantity,
      weight: product.orderDetails.weight,
    }),
  );
  const defaultValues = useMemo(
    () => ({
      ...order,
      products: transformedProducts,
    }),
    [order, transformedProducts],
  );

  const form = useForm<UpdateOrder>({
    resolver: zodResolver(updateOrderSchema),
    defaultValues: defaultValues,
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "products",
  });

  const onSuccessSubmit = async (message: string | undefined) => {
    form.reset();
    toast.success(message);
    row.toggleExpanded();
  };

  const onSuccessDelete = async (message: string | undefined) => {
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
      },
    );
  };

  const handleDelete = () => {
    deleteOrder(
      {
        id: order.id,
      },
      {
        onSuccess: (data) => onSuccessDelete(data.message),
      },
    );
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="grid grid-cols-[1fr_40%] gap-x-16"
      >
        <FormSection label="პროდუქცია" className="flex-col items-start gap-0">
          <AddOrderProductsList
            fields={fields}
            remove={remove}
            form={form}
            className="w-full"
            isDisabled={isFormDisabled}
          />

          <OrderProductsAppendAction
            appendFn={append as never}
            isSelectingProduct={isSelectingProduct}
            productSelectFn={setIsSelectingProduct}
            isDisabled={isFormDisabled}
            selectedProductsIds={fields.map((field) => field.productId)}
            customer={order.customer}
          />
        </FormSection>

        <FormSection label="შეკვეთის დეტალები" className="items-start">
          <FormCalendarField
            form={form}
            name="dueDateAt"
            isDisabled={isFormDisabled}
            label="რეალიზაციის თარიღი"
          />
          <SelectStatusField
            form={form}
            name="status"
            items={adjustedStatuses}
            label="სტატუსი"
            className="w-64 -mt-1.5"
            isDisabled={isFormDisabled}
          />
        </FormSection>

        {/* Form Actions */}
        {!isOrderFormDisabled && (
          <FormUpdateActions
            form={form}
            isFormDisabled={isFormDisabled}
            setIsFormDisabled={setIsFormDisabled}
            isProcessing={isOrderUpdating}
            isDeleting={isOrderDeleting}
            onDelete={handleDelete}
          />
        )}
      </form>
    </Form>
  );
};
