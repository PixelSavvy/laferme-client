import { useMutation, useQueryClient } from "@tanstack/react-query";

import { apiPaths } from "@/config";
import { api, MutationConfig } from "@/lib";
import { DeleteEntity } from "@/shared/types";

import { getProductsQueryOptions } from "./get-products";

export const deleteProduct = ({
  id,
}: {
  id: number;
}): Promise<DeleteEntity> => {
  const path = `${apiPaths.app.product}/${id}`;
  return api.delete(path);
};

type UseDeleteProductOptions = {
  mutationConfig?: MutationConfig<typeof deleteProduct>;
};

export const useDeleteProduct = ({
  mutationConfig,
}: UseDeleteProductOptions = {}) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (...args) => {
      queryClient.invalidateQueries({
        queryKey: getProductsQueryOptions().queryKey,
      });
      onSuccess?.(...args);
    },
    ...restConfig,
    mutationFn: deleteProduct,
  });
};
