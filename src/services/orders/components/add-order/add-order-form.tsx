import { Form, FormCalendarField, FormSection } from "@/components/ui";
import { Customer } from "@/services/customers";
import { zodResolver } from "@hookform/resolvers/zod";

import { FormAddActions } from "@/components/ui/form/form-add-actions";
import { CustomerSelect } from "@/services/customers/components/customer-select";
import { Dispatch, Fragment, SetStateAction, useState } from "react";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
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

  const { mutate: addOrder, isPending: isOrderAdding } = useAddOrder({});

  const form = useForm<NewOrder>({
    resolver: zodResolver(newOrderSchema),
    defaultValues: newOrderDefaultValues,
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "products",
  });

  const onSuccessSubmit = (message: string | undefined) => {
    toast.success(message);
    setIsOpen((prev) => !prev);
    form.reset();
  };

  const onErrorSubmit = (message: string | undefined) => {
    toast.error(message);
  };

  const handleSubmit: SubmitHandler<NewOrder> = (payload) => {
    addOrder(payload, {
      onSuccess: (data) => onSuccessSubmit(data.message),
      onError: (data) => onErrorSubmit(data.message),
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={(e) => void form.handleSubmit(handleSubmit)(e)}
        className="h-full flex flex-col justify-start gap-6"
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
            <FormSection label="სარეალიზაციო პუნქტი">
              {/* Customer */}
              <div className="space-y-4 w-full text-sm">
                <div className="flex flex-col items-start gap-2 border p-4 rounded-md bg-neutral-50">
                  <div className="flex justify-start items-center gap-1">
                    <h3 className="font-semiBold">სარეალიზაციო პუნქტი:</h3>
                    <p>{customer?.name}</p>
                  </div>
                  <div className="flex justify-start items-center gap-1">
                    <h3 className="font-semiBold">ტელეფონი:</h3>
                    <p className="underline text-blue-500">{customer?.phone}</p>
                  </div>
                  <div className="flex justify-start items-center gap-1">
                    <h3 className="font-semiBold">ელ-ფოსტა:</h3>
                    <p className="underline text-blue-500">{customer?.email}</p>
                  </div>
                </div>
              </div>
            </FormSection>

            <FormSection label="შეკვეთის დეტალები">
              <FormCalendarField
                form={form}
                name="dueDateAt"
                label="რეალიზაციის თარიღი"
              />
            </FormSection>

            {/* Products */}
            <FormSection
              label="პროდუქცია"
              className="flex-col items-start gap-0 w-full "
            >
              <AddOrderProductsList
                fields={fields}
                remove={remove}
                form={form}
                className="w-full"
              />
              <OrderProductsAppendAction
                isSelectingProduct={isSelectingProduct}
                productSelectFn={setIsSelectingProduct}
                appendFn={append}
                selectedProductsIds={fields.map((field) => field.productId)}
                customer={customer ? customer : ({} as Customer)}
              />
            </FormSection>
          </Fragment>
        )}

        {/* Form actions */}
        <FormAddActions form={form} isProcessing={isOrderAdding} />
      </form>
    </Form>
  );
};
