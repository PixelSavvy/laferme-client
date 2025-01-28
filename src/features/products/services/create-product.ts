import { useDrawer } from "@/hooks";
import { AddEntity } from "@/shared/types";
import { useQueryClient } from "@tanstack/react-query";
import { SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import { getProductsQueryOptions, useAddProduct } from "../api";
import { NewProduct } from "../schema";

export const useCreateProduct = () => {
  const { mutate: add, isPending: isProductCreating } = useAddProduct();
  const queryClient = useQueryClient();

  const { toggleDrawer } = useDrawer();

  const onSuccessCreate = async (data: AddEntity<NewProduct>) => {
    toast.message(data.message);
    toggleDrawer();

    return (
      queryClient.getQueryData(getProductsQueryOptions().queryKey) ??
      (await queryClient.fetchQuery({
        queryKey: getProductsQueryOptions().queryKey,
      }))
    );
  };

  const create: SubmitHandler<NewProduct> = (payload) => {
    add(
      {
        data: payload,
      },
      {
        onSuccess: onSuccessCreate,
      },
    );
  };

  return {
    create,
    isProductCreating,
  };
};
