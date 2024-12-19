import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

import { apiPaths } from "@/config";
import { api, handleAxiosError } from "@/lib/api-client";
import { MutationConfig } from "@/lib/react-query";
import { getFreezoneItemQueryOptions } from "@/services/freezone";
import { UpdateEntity } from "@/shared/types";
import { UpdateOrderStatus } from "../validations";
import { getOrderQueryOptions } from "./get-order";

export const updateOrderStatus = async ({
  id,
  status,
}: {
  id: number;
  status: UpdateOrderStatus["status"];
}) => {
  try {
    const URL = `${apiPaths.app.order}/${id}/${status}`;

    const response: AxiosResponse<UpdateEntity> = await api.patch(URL);
    return response.data;
  } catch (error) {
    await handleAxiosError(error);
    throw error;
  }
};

type UseUpdateOrderStatusOptions = {
  mutationConfig?: MutationConfig<typeof updateOrderStatus>;
};

export const useUpdateOrderStatus = ({
  mutationConfig,
}: UseUpdateOrderStatusOptions) => {
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
      onSuccess?.(data, ...args);
    },
    ...restConfig,
    mutationFn: updateOrderStatus,
  });
};
