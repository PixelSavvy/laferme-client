import { useMutation, useQueryClient } from "@tanstack/react-query";

import { apiPaths } from "@/config";
import { api, MutationConfig } from "@/lib";
import { UpdateEntity } from "@/shared/types";

import { Product } from "../schema";
import { getProductQueryOptions } from "./get-product";

export const updateProduct = ({
  id,
  data,
}: {
  id: number;
  data: Product;
}): Promise<UpdateEntity<Product>> => {
  const path = `${apiPaths.app.product}/${id}`;
  return api.put(path, data);
};

type UseUpdateProductOptions = {
  mutationConfig?: MutationConfig<typeof updateProduct>;
};

export const useUpdateProduct = ({
  mutationConfig,
}: UseUpdateProductOptions = {}) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (data, ...args) => {
      queryClient.refetchQueries({
        queryKey: getProductQueryOptions(data.data.id).queryKey,
      });
      onSuccess?.(data, ...args);
    },
    ...restConfig,
    mutationFn: updateProduct,
  });
};
