import {
  Button,
  DrawerClose,
  Form,
  FormCancelAction,
  InputField,
  SelectField,
} from "@/components/ui";
import { invoiceOptions, paymentOptionValues, priceIndexes } from "@/config";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dispatch, SetStateAction, useState } from "react";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import ClipLoader from "react-spinners/ClipLoader";
import { toast } from "sonner";
import { useAddCustomer } from "../../api";
import {
  NewCustomer,
  newCustomerDefaultValues,
  newCustomerSchema,
} from "../../validations";
import { CustomerProductsList } from "../table";
import { CustomerProductsAppendAction } from "../table/customer-products-append-action";

type AddCustomerFormProps = {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

export const AddCustomerForm = ({ setIsOpen }: AddCustomerFormProps) => {
  const { mutate: addCustomer, isPending } = useAddCustomer({});

  const [isSelectingProduct, setIsSelectingProduct] = useState(false);

  const form = useForm<NewCustomer>({
    resolver: zodResolver(newCustomerSchema),
    defaultValues: newCustomerDefaultValues,
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "products",
  });

  const handleSubmit: SubmitHandler<NewCustomer> = (payload) => {
    addCustomer(payload, {
      onSuccess: (data) => {
        toast.success(data.message);
        setIsOpen((prev) => !prev);
        form.reset();
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
        className="flex flex-col justify-start items-start gap-6 h-full"
      >
        {/* General Details */}
        <div className="space-y-4 w-full">
          <h2 className="font-medium">ძირითადი ინფორმაცია</h2>
          {/* Selectables */}
          <div className="flex justify-start items-center gap-4  ">
            <SelectField
              control={form.control}
              label="ინდექსი"
              name="priceIndex"
              items={priceIndexes}
              placeholder="ინდექსი"
              className="min-w-28"
            />
            <SelectField
              control={form.control}
              label="ზედნადები"
              name="needInvoice"
              items={invoiceOptions}
              className="min-w-28"
              placeholder="აირჩიე"
            />
            <SelectField
              control={form.control}
              label="გადახდა"
              name="paymentOption"
              items={paymentOptionValues}
              placeholder="მეთოდი"
              className="min-w-44"
            />
          </div>
          {/* Name */}
          <div>
            <InputField
              control={form.control}
              name="name"
              label="სახელი"
              type="text"
            />
          </div>

          {/* Contact details */}
          <div className="flex justify-start items-center gap-4 w-full">
            <InputField
              control={form.control}
              name="phone"
              label="ტელეფონი"
              type="phone"
            />
            <InputField
              control={form.control}
              name="email"
              label="ელ.ფოსტა"
              type="email"
            />
          </div>
        </div>

        {/* Customer Products */}
        <div className="space-y-4 flex flex-col items-start w-full">
          <h2 className="font-medium">პროდუქტები</h2>
          <CustomerProductsList
            fields={fields}
            remove={remove}
            className="flex-nowrap flex-col items-start w-full"
          />
          <CustomerProductsAppendAction
            isSelectingProduct={isSelectingProduct}
            productSelectFn={setIsSelectingProduct}
            selectedProductCodes={fields.map((field) => field.productCode)}
            appendFn={append}
          />
        </div>

        {/* Form actions */}
        <div className="gap-2 w-full flex justify-end items-center mt-auto">
          <Button type="submit" disabled={isPending}>
            {isPending ?? (
              <ClipLoader color="white" size={16} className="mr-1" />
            )}
            დამატება
          </Button>
          <DrawerClose asChild>
            <FormCancelAction cancelFn={handleCancel} />
          </DrawerClose>
        </div>
      </form>
    </Form>
  );
};
