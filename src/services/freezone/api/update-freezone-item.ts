import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

import { apiPaths } from "@/config";
import { api, handleAxiosError } from "@/lib/api-client";
import { MutationConfig } from "@/lib/react-query";
import { getOrderQueryOptions } from "@/services/orders";
import { UpdateEntity } from "@/shared/types";
import { FreezoneItem, UpdateFreezoneItem } from "../validations";
import { getFreezoneItemQueryOptions } from "./get-freezone-item";

export const updateFreezoneItem = async ({
  id,
  data,
}: {
  id: number;
  data: UpdateFreezoneItem;
}) => {
  try {
    const URL = `${apiPaths.app.freezone}/${id}`;

    const response: AxiosResponse<UpdateEntity<FreezoneItem>> = await api.patch(
      URL,
      data
    );
    return response.data;
  } catch (error) {
    await handleAxiosError(error);
    throw error;
  }
};

type UseUpdateFreezoneItemOptions = {
  mutationConfig?: MutationConfig<typeof updateFreezoneItem>;
};

export const useUpdateFreezoneItem = ({
  mutationConfig,
}: UseUpdateFreezoneItemOptions) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...restConfig } = mutationConfig ?? {};

  return useMutation({
    onSuccess: async (data, ...args) => {
      await queryClient.refetchQueries({
        queryKey: getFreezoneItemQueryOptions(data.id).queryKey,
      });
      await queryClient.refetchQueries({
        queryKey: getOrderQueryOptions(data.id).queryKey,
      });
      onSuccess?.(data, ...args);
    },
    ...restConfig,
    mutationFn: updateFreezoneItem,
  });
};
