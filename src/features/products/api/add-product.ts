import { useMutation, useQueryClient } from "@tanstack/react-query";

import { apiPaths } from "@/config";
import { api, MutationConfig } from "@/lib";
import { AddEntity } from "@/shared/types";
import { NewProduct, Product } from "../schema";
import { getProductsQueryOptions } from "./get-products";

export const addProduct = ({
  data,
}: {
  data: NewProduct;
}): Promise<AddEntity<Product>> => {
  const path = apiPaths.app.product;
  return api.post(path, data);
};

type UseAddProductOptions = {
  mutationConfig?: MutationConfig<typeof addProduct>;
};

export const useAddProduct = ({
  mutationConfig,
}: UseAddProductOptions = {}) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...restConfig } = mutationConfig ?? {};

  return useMutation({
    onSuccess: (...args) => {
      queryClient.invalidateQueries({
        queryKey: getProductsQueryOptions().queryKey,
      });
      onSuccess?.(...args);
    },
    ...restConfig,
    mutationFn: addProduct,
  });
};
