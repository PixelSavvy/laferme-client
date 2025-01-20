import { useMutation, useQueryClient } from "@tanstack/react-query";

import { apiPaths } from "@/config";
import { api, MutationConfig } from "@/lib";
import { DeleteEntity } from "@/shared/types";

import { Order } from "../schema";
import { getOrdersQueryOptions } from "./get-orders";

export const deleteOrder = ({
  id,
}: {
  id: number;
}): Promise<DeleteEntity<Order>> => {
  const path = `${apiPaths.app.order}/${id}`;
  return api.delete(path);
};

type UseDeleteOrderOptions = {
  mutationConfig?: MutationConfig<typeof deleteOrder>;
};

export const useDeleteOrder = ({
  mutationConfig,
}: UseDeleteOrderOptions = {}) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (...args) => {
      queryClient.invalidateQueries({
        queryKey: getOrdersQueryOptions().queryKey,
      });
      onSuccess?.(...args);
    },
    ...restConfig,
    mutationFn: deleteOrder,
  });
};
