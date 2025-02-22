import { useFieldArray, useForm } from "react-hook-form";

import {
  CalendarField,
  Form,
  FormAddAction,
  FormSection,
} from "@/components/ui";
import { zodResolver } from "@hookform/resolvers/zod";
import { Fragment, useState } from "react";
import { NewOrder, newOrderDefaultValues, newOrderSchema } from "../../schema";
import { useCreateOrder } from "../../services";
import { SelectOrderCustomer } from "./select-order-customer";
import { SelectOrderProductField } from "./select-order-product-field";
import { SelectedCustomer } from "./selected-customer";
import { SelectedOrderProducts } from "./selected-order-products";

export const AddOrderForm = () => {
  const [isCustomerSelected, setIsCustomerSelected] = useState(false);

  const { create, isOrderAdding } = useCreateOrder();

  const form = useForm<NewOrder>({
    resolver: zodResolver(newOrderSchema),
    defaultValues: newOrderDefaultValues,
  });

  const { fields, remove, append } = useFieldArray({
    control: form.control,
    name: "products",
  });

  const handleSubmit = form.handleSubmit((data) => {
    create(data);
  });

  return (
    <Form {...form}>
      <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
        <div className="col-span-full">
          <FormSection title="სარეალიზაციო პუნქტი">
            {!isCustomerSelected ? (
              <SelectOrderCustomer
                onCustomerSelect={setIsCustomerSelected}
                append={append}
              />
            ) : (
              <SelectedCustomer />
            )}
          </FormSection>
        </div>
        {isCustomerSelected && (
          <Fragment>
            <FormSection title="შეკვეთის დეტალები" className="justify-between ">
              <CalendarField
                form={form}
                name="prepareDueAt"
                label="დამზადების თარიღი"
              />
              <CalendarField
                form={form}
                name="deliverDueAt"
                label="დისტრიბუციის თარიღი"
              />
            </FormSection>
            <FormSection title="პროდუქტები" className="flex-col justify-start ">
              <SelectedOrderProducts
                fields={fields}
                remove={remove}
                disabled={isOrderAdding}
              />
              <SelectOrderProductField
                disabled={isOrderAdding}
                append={append}
                fields={fields}
              />
            </FormSection>
          </Fragment>
        )}

        {isCustomerSelected && (
          <FormAddAction isAdding={isOrderAdding} className="pb-10 mt-10" />
        )}
      </form>
    </Form>
  );
};
