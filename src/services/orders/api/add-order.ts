import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

import { getOrdersQueryOptions } from "./get-orders";

import { apiPaths } from "@/config";
import { api, handleAxiosError } from "@/lib/api-client";
import { MutationConfig } from "@/lib/react-query";
import { getFreezoneItemsQueryOptions } from "@/services/freezone";
import { AddEntity } from "@/shared/types";
import { NewOrder } from "../validations";

const addOrder = async (data: NewOrder) => {
  try {
    const response: AxiosResponse<AddEntity> = await api.post(
      apiPaths.app.order,
      data,
    );

    return response.data;
  } catch (error) {
    await handleAxiosError(error);
    throw error;
  }
};

type UseAddOrderOptions = {
  mutationConfig?: MutationConfig<typeof addOrder>;
};

export const useAddOrder = ({ mutationConfig }: UseAddOrderOptions) => {
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
    mutationFn: addOrder,
  });
};
