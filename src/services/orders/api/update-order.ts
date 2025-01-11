import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

import { Order, UpdateOrder } from "../validations";

import { apiPaths } from "@/config";
import { api, handleAxiosError } from "@/lib/api-client";
import { MutationConfig } from "@/lib/react-query";
import { getDistributionItemsQueryOptions } from "@/services/distribution";
import { getFreezoneItemQueryOptions } from "@/services/freezone";
import { UpdateEntity } from "@/shared/types";
import { getOrderQueryOptions } from "./get-order";

export const updateOrder = async ({
  id,
  data,
}: {
  id: number;
  data: UpdateOrder;
}) => {
  try {
    const URL = `${apiPaths.app.order}/${id}`;

    const response: AxiosResponse<UpdateEntity<Order>> = await api.patch(
      URL,
      data,
    );
    return response.data;
  } catch (error) {
    await handleAxiosError(error);
    throw error;
  }
};

type UseUpdateOrderOptions = {
  mutationConfig?: MutationConfig<typeof updateOrder>;
};

export const useUpdateOrder = ({ mutationConfig }: UseUpdateOrderOptions) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...restConfig } = mutationConfig ?? {};

  return useMutation({
    onSuccess: async (data, ...args) => {
      await queryClient.refetchQueries({
        queryKey: getOrderQueryOptions(data.id).queryKey,
      });
      await queryClient.refetchQueries({
        queryKey: getFreezoneItemQueryOptions(data.id).queryKey,
      });
      await queryClient.refetchQueries({
        queryKey: getDistributionItemsQueryOptions().queryKey,
      });
      onSuccess?.(data, ...args);
    },
    ...restConfig,
    mutationFn: updateOrder,
  });
};
