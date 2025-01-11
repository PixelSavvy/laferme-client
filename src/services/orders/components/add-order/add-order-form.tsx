import {
  Button,
  DrawerClose,
  Form,
  FormCalendarField,
  FormCancelAction,
} from "@/components/ui";
import { Customer } from "@/services/customers";
import { zodResolver } from "@hookform/resolvers/zod";

import { CustomerSelect } from "@/services/customers/components/customer-select";
import { Dispatch, Fragment, SetStateAction, useState } from "react";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import ClipLoader from "react-spinners/ClipLoader";
import { toast } from "sonner";
import { useAddOrder } from "../../api";
import {
  NewOrder,
  newOrderDefaultValues,
  newOrderSchema,
} from "../../validations";
import { OrderProductsAppendAction } from "./add-order-product-append-action";
import { AddOrderProductsList } from "./add-order-products-list";

type AddOrderFormProps = {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

export const AddOrderForm = ({ setIsOpen }: AddOrderFormProps) => {
  const [isCustomerSelected, setIsCustomerSelected] = useState(false);
  const [isSelectingProduct, setIsSelectingProduct] = useState(false);
  const [customer, setCustomer] = useState<Customer>();

  const { mutate: addOrder, isPending } = useAddOrder({});

  const form = useForm<NewOrder>({
    resolver: zodResolver(newOrderSchema),
    defaultValues: newOrderDefaultValues,
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "products",
  });

  const handleSubmit: SubmitHandler<NewOrder> = (payload) => {
    addOrder(payload, {
      onSuccess: (data) => {
        toast.success(data.message);
        setIsOpen((prev) => !prev);
        form.reset();
      },
      onError: (data) => {
        toast.error(data.message);
      },
    });
  };

  const handleCancel = () => {
    form.reset();
    setIsOpen((prev) => !prev);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={(e) => void form.handleSubmit(handleSubmit)(e)}
        className="flex flex-col justify-start items-start gap-6 h-full "
      >
        {!isCustomerSelected ? (
          <CustomerSelect
            appendFn={append as never}
            customerSelectFn={setIsCustomerSelected}
            customerSetFn={setCustomer}
            form={form}
          />
        ) : (
          <Fragment>
            {/* Customer */}
            <div className="space-y-4 w-full">
              <div className="flex flex-col items-start gap-2 border p-4 rounded-md typo-label-md bg-neutral-50">
                <div className="flex justify-start items-center gap-1">
                  <h3 className="font-medium">სარეალიზაციო პუნქტი:</h3>
                  <p>{customer?.name}</p>
                </div>
                <div className="flex justify-start items-center gap-1">
                  <h3 className="font-medium">ტელეფონი:</h3>
                  <p className="underline text-info-500">{customer?.phone}</p>
                </div>
                <div className="flex justify-start items-center gap-1">
                  <h3 className="font-medium">ელ-ფოსტა:</h3>
                  <p className="underline text-info-500">{customer?.email}</p>
                </div>
              </div>
            </div>

            {/* Products */}
            <div className="space-y-4 flex flex-col items-start w-full">
              <h2 className="font-medium">პროდუქტები</h2>
              <AddOrderProductsList
                fields={fields}
                remove={remove}
                className="flex-nowrap flex-col items-start w-full"
                control={form.control as never}
              />
              <OrderProductsAppendAction
                isSelectingProduct={isSelectingProduct}
                productSelectFn={setIsSelectingProduct}
                appendFn={append}
                selectedProductsIds={fields.map((field) => field.productId)}
                customer={customer ? customer : ({} as Customer)}
              />
            </div>

            <div className="space-y-4 flex flex-col items-start w-full">
              <h2 className="font-medium">რეალიზაციის თარიღი</h2>
              <FormCalendarField form={form} name="dueDateAt" />
            </div>
          </Fragment>
        )}
        {/* 
 
        {/* Form actions */}
        <div className="gap-2 w-full flex justify-end items-center mt-auto">
          {isCustomerSelected && (
            <Button type="submit" disabled={isPending}>
              {isPending ? (
                <ClipLoader color="white" size={16} className="mr-1" />
              ) : (
                "დამატება"
              )}
            </Button>
          )}
          <DrawerClose asChild>
            <FormCancelAction cancelFn={handleCancel} />
          </DrawerClose>
        </div>
      </form>
    </Form>
  );
};
