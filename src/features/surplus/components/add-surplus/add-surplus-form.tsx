import { Fragment, useEffect, useMemo } from "react";

import { Form, FormAddAction, InputField, Skeleton } from "@/components/ui";
import { useProducts } from "@/features/products";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { NewSurplus, newSurplusSchema } from "../../schema";
import { useCreateSurplus } from "../../services";

type AddSurplusFormProps = {
  orderId: number;
};

export const AddSurplusForm = ({ orderId }: AddSurplusFormProps) => {
  const { data: productsData, isPending } = useProducts();
  const { create, isSurplusAdding } = useCreateSurplus();

  const products = productsData?.data.data;

  const surplusDefaultValues: NewSurplus = useMemo(
    () => ({
      orderId,
      products:
        products?.map((product) => ({
          id: product.id,
          title: product.title,
          quantity: 0,
          weight: 0,
        })) || [],
      createdAt: null,
      expiresAt: null,
    }),
    [orderId, products],
  );

  const form = useForm<NewSurplus>({
    resolver: zodResolver(newSurplusSchema),
    defaultValues: surplusDefaultValues,
  });

  const { fields } = useFieldArray({
    control: form.control,
    name: "products",
  });

  useEffect(() => {
    form.reset(surplusDefaultValues);
  }, [surplusDefaultValues, form]);

  if (!products) return null;

  const handleSubmit = form.handleSubmit((data) => {
    create(data);
  });

  return (
    <Fragment>
      {isPending ? (
        Array.from({ length: 10 }).map((_, index) => (
          <Skeleton key={index} className="w-full h-10" />
        ))
      ) : (
        <Form {...form}>
          <form className="h-full flex flex-col " onSubmit={handleSubmit}>
            {fields.map((field, index) => (
              <div
                key={field.id}
                className="flex justify-between items-center gap-2"
              >
                <InputField
                  form={form}
                  name={`products.${index}.title`}
                  label="პროდუქტი"
                  type="text"
                  className="flex-0"
                  inputClassName="disabled:opacity-100"
                  disabled
                />
                <InputField
                  form={form}
                  name={`products.${index}.quantity`}
                  label="რაოდ."
                  type="number"
                  className="w-20"
                />
                <InputField
                  form={form}
                  name={`products.${index}.weight`}
                  label="წონა"
                  type="number"
                  className="w-20"
                />
              </div>
            ))}

            <FormAddAction isAdding={isSurplusAdding} className="mt-auto" />
          </form>
        </Form>
      )}
    </Fragment>
  );
};
