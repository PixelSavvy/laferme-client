import {
  DeleteAlertDialog,
  Form,
  FormCancelAction,
  FormEditAction,
  FormSubmitAction,
} from "@/components/ui";
import { zodResolver } from "@hookform/resolvers/zod";
import { Row } from "@tanstack/react-table";
import { Fragment, useState } from "react";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { toast } from "sonner";
import { useDeleteOrder, useUpdateOrder } from "../../api";
import { Order, orderSchema } from "../../validations";
import { OrderProductsAppendAction } from "./order-products-append-action";
import { OrderProductsList } from "./order-products-list";

export const OrdersTableExpanded = ({ row }: { row: Row<Order> }) => {
  const order = row.original;

  // Form input diasbled state
  const [isDisabled, setIsDisabled] = useState(true);
  const [isSelectingProduct, setIsSelectingProduct] = useState(false);

  const {
    mutate: updateOrder,
    isPending: isOrderUpdating,
    isSuccess: isOrderUpdated,
  } = useUpdateOrder({});

  const { mutate: deleteOrder, isPending: isOrderDeleting } = useDeleteOrder(
    {}
  );

  const form = useForm<Order>({
    resolver: zodResolver(orderSchema),
    defaultValues: order,
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "products",
  });

  const handleSubmit: SubmitHandler<Order> = (payload) => {
    const transformedPayload = {
      id: order.id,
      customerId: order.customer.id,
      status: payload.status,
      products: payload.products.map((product) => ({
        productId: product.id,
        ...product.orderDetails,
      })),
    };

    updateOrder(
      {
        id: order.id,
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
      }
    );
  };

  // Handle input field disabled state
  const handleDisabled = () => {
    setIsDisabled((prev) => !prev);
  };

  // Product cancel edit handler
  const handleCancel = () => {
    form.reset();
    handleDisabled();
  };

  const showSubmitActions = !isDisabled || (isOrderUpdating && !isOrderUpdated);

  const showEditActions =
    isDisabled &&
    !form.formState.isDirty &&
    !isOrderUpdating &&
    !isOrderUpdated;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="">
        <div className="space-y-4 flex flex-col max-w-max ">
          <h2 className="font-medium">პროდუქტების ინფორმაცია</h2>
          {/* Existing Products */}
          <div className="">
            <OrderProductsList
              fields={fields}
              form={form}
              isDisabled={isDisabled}
              removeFn={remove}
            />
          </div>

          {/* Add order products */}
          <div>
            <OrderProductsAppendAction
              appendFn={append as never}
              isSelectingProduct={isSelectingProduct}
              productSelectFn={setIsSelectingProduct}
              isDisabled={isDisabled}
              selectedProducts={order.products}
            />
          </div>

          {/* Order Products */}
        </div>
        {/* Form Actions */}
        <div className="flex justify-between items-center gap-2 mt-8 col-span-full justify-self-end">
          {/* Form edit actions */}
          {showEditActions && (
            <Fragment>
              <FormEditAction
                disableFn={handleDisabled}
                show={showEditActions}
              />
              <DeleteAlertDialog
                deleteFn={handleDelete}
                isPending={isOrderDeleting}
              />
            </Fragment>
          )}
          {/* Form submit actions */}
          {showSubmitActions && (
            <Fragment>
              <FormSubmitAction
                isDisabled={isDisabled}
                isFormDirty={form.formState.isDirty}
                isPending={isOrderUpdating}
                show={showSubmitActions}
              />
              <FormCancelAction cancelFn={handleCancel} />
            </Fragment>
          )}
        </div>
      </form>
    </Form>
  );
};
