import { useDrawer } from "@/hooks";
import { AddEntity } from "@/shared/types";
import { useQueryClient } from "@tanstack/react-query";
import { SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import { useAddProduct as addProduct, getProductsQueryOptions } from "../api";
import { NewProduct, Product } from "../schema";

export const useAddProduct = () => {
  const { mutate: add, isPending: isProductCreating } = addProduct();
  const queryClient = useQueryClient();

  const { toggleDrawer } = useDrawer();

  const onSuccessCreate = async (data: AddEntity<Product>) => {
    toast.message(data.data.message);
    toggleDrawer();

    queryClient.invalidateQueries({
      queryKey: getProductsQueryOptions().queryKey,
    });
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
