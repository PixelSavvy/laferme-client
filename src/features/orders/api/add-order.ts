import { useMutation, useQueryClient } from "@tanstack/react-query";

import { apiPaths } from "@/config";
import { api, MutationConfig } from "@/lib";
import { AddEntity } from "@/shared/types";
import { NewOrder } from "../schema";
import { getOrdersQueryOptions } from "./get-orders";

export const addOrder = ({
  data,
}: {
  data: NewOrder;
}): Promise<AddEntity<NewOrder>> => {
  const path = apiPaths.app.order;
  return api.post(path, data);
};

type UseAddOrderOptions = {
  mutationConfig?: MutationConfig<typeof addOrder>;
};

export const useAddOrder = ({ mutationConfig }: UseAddOrderOptions = {}) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...restConfig } = mutationConfig ?? {};

  return useMutation({
    onSuccess: (...args) => {
      queryClient.invalidateQueries({
        queryKey: getOrdersQueryOptions().queryKey,
      });
      onSuccess?.(...args);
    },
    ...restConfig,
    mutationFn: addOrder,
  });
};
