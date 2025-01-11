import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

import { apiPaths } from "@/config";
import { api, handleAxiosError } from "@/lib/api-client";
import { MutationConfig } from "@/lib/react-query";
import { DeleteEntity } from "@/shared/types";
import { getFreezoneItemsQueryOptions } from "./get-freezone-items";

export const deleteFreezoneItem = async ({ id }: { id: number }) => {
  try {
    const URL = `${apiPaths.app.freezone}/${id.toString()}`;

    const response: AxiosResponse<DeleteEntity> = await api.delete(URL);
    return response.data;
  } catch (error) {
    await handleAxiosError(error);
    throw error;
  }
};

type UseDeleteFreezoneItemOptions = {
  mutationConfig?: MutationConfig<typeof deleteFreezoneItem>;
};

export const useDeleteFreezoneItem = ({
  mutationConfig,
}: UseDeleteFreezoneItemOptions) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...restConfig } = mutationConfig ?? {};

  return useMutation({
    onSuccess: async (...args) => {
      await queryClient.invalidateQueries({
        queryKey: getFreezoneItemsQueryOptions().queryKey,
      });
      onSuccess?.(...args);
    },
    ...restConfig,
    mutationFn: deleteFreezoneItem,
  });
};
