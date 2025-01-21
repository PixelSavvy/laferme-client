import { useMutation, useQueryClient } from "@tanstack/react-query";

import { apiPaths } from "@/config";
import { api, MutationConfig } from "@/lib";
import { UpdateEntity } from "@/shared/types";

import { Order } from "../schema";
import { getOrderQueryOptions } from "./get-order";

export const updateOrder = ({
  id,
  data,
}: {
  id: number;
  data: Order;
}): Promise<UpdateEntity<Order>> => {
  const path = `${apiPaths.app.order}/${id}`;
  return api.put(path, data);
};

type UseUpdateOrderOptions = {
  mutationConfig?: MutationConfig<typeof updateOrder>;
};

export const useUpdateOrder = ({
  mutationConfig,
}: UseUpdateOrderOptions = {}) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: async (data, ...args) => {
      await queryClient.refetchQueries({
        queryKey: getOrderQueryOptions(data.data.data.id).queryKey,
      });
      onSuccess?.(data, ...args);
    },
    ...restConfig,
    mutationFn: updateOrder,
  });
};
