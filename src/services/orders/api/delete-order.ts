import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

import { getOrdersQueryOptions } from "./get-orders";

import { apiPaths } from "@/config";
import { api, handleAxiosError } from "@/lib/api-client";
import { MutationConfig } from "@/lib/react-query";
import { getFreezoneItemsQueryOptions } from "@/services/freezone";
import { DeleteEntity } from "@/shared/types";

export const deleteOrder = async ({ id }: { id: number }) => {
  try {
    const URL = `${apiPaths.app.order}/${id.toString()}`;

    const response: AxiosResponse<DeleteEntity> = await api.delete(URL);
    return response.data;
  } catch (error) {
    await handleAxiosError(error);
    throw error;
  }
};

type UseDeleteOrderOptions = {
  mutationConfig?: MutationConfig<typeof deleteOrder>;
};

export const useDeleteOrder = ({ mutationConfig }: UseDeleteOrderOptions) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...restConfig } = mutationConfig ?? {};

  return useMutation({
    onSuccess: async (...args) => {
      await queryClient.invalidateQueries({
        queryKey: getOrdersQueryOptions().queryKey,
      });
      await queryClient.invalidateQueries({
        queryKey: getFreezoneItemsQueryOptions().queryKey,
      });
      onSuccess?.(...args);
    },
    ...restConfig,
    mutationFn: deleteOrder,
  });
};
