import {
  Button,
  DrawerClose,
  Form,
  FormCancelAction,
  InputField,
  SelectField,
} from "@/components/ui";
import { vatOptions } from "@/config";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dispatch, SetStateAction } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import ClipLoader from "react-spinners/ClipLoader";
import { toast } from "sonner";
import { useAddProduct } from "../../api";
import {
  NewProduct,
  newProductSchema,
  productDefaultValues,
} from "../../validations";

type AddProductFormProps = {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

export const AddProductForm = ({ setIsOpen }: AddProductFormProps) => {
  // Add product API
  const { mutate: addProduct, isPending } = useAddProduct({});

  // Add product form instance
  const form = useForm<NewProduct>({
    resolver: zodResolver(newProductSchema),
    mode: "onChange",
    defaultValues: productDefaultValues,
  });

  // Form submit handler
  const handleSubmit: SubmitHandler<NewProduct> = (payload) => {
    addProduct(payload, {
      onSuccess: (data) => {
        toast.success(data.message);
        setIsOpen((prev) => !prev);
        form.reset();
      },
    });
  };

  // Form cancel handler
  const handleCancel = () => {
    form.reset();
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
          <div className="flex justify-start items-center gap-4  ">
            <SelectField
              control={form.control}
              name="hasVAT"
              label="დღგ"
              items={vatOptions}
              className="w-28 mb-2"
              placeholder="აირჩიე"
            />
            <InputField
              control={form.control}
              name="productCode"
              label="SKU"
              className="w-24"
            />
            <InputField control={form.control} name="title" label="პროდუქტი" />
          </div>
        </div>

        {/* Prices */}
        <div className="space-y-4">
          <h2 className="font-medium">ფასები</h2>
          <div className="grid auto-cols-max grid-flow-col gap-4">
            <InputField
              control={form.control}
              name={"prices.TR1"}
              label="TR1"
              type="number"
              isCurrency
              className="max-w-20"
            />
            <InputField
              control={form.control}
              name={"prices.TR2"}
              label="TR2"
              type="number"
              isCurrency
              className="max-w-20"
            />
            <InputField
              control={form.control}
              name={"prices.TR3"}
              label="TR3"
              type="number"
              isCurrency
              className="max-w-20"
            />
            <InputField
              control={form.control}
              name={"prices.TR4"}
              label="TR4"
              type="number"
              isCurrency
              className="max-w-20"
            />
            <InputField
              control={form.control}
              name={"prices.TR5"}
              label="TR5"
              type="number"
              isCurrency
              className="max-w-20"
            />
            <InputField
              control={form.control}
              name={"prices.TRC"}
              label="TRC"
              type="number"
              isCurrency
              className="max-w-20"
            />
            <InputField
              control={form.control}
              name={"prices.TRD"}
              label="TRD"
              type="number"
              isCurrency
              className="max-w-20"
            />
          </div>
        </div>

        {/* Form actions */}
        <div className="gap-2 w-full flex justify-end items-center mt-auto">
          <Button type="submit" disabled={isPending}>
            {isPending ?? (
              <ClipLoader color="white" size={16} className="mr-1" />
            )}
            დამატება
          </Button>
          <DrawerClose>
            <FormCancelAction cancelFn={handleCancel} />
          </DrawerClose>
        </div>
      </form>
    </Form>
  );
};
