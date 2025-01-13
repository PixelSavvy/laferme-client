import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

import { apiPaths } from "@/config";
import { api, handleAxiosError } from "@/lib/api-client";
import { MutationConfig } from "@/lib/react-query";
import { getOrderQueryOptions } from "@/services/orders";
import { UpdateEntity } from "@/shared/types";
import { DistributionItem, UpdateDistributionItem } from "../validations";
import { getDistributionItemQueryOptions } from "./get-distribution-item";

export const updateDistributionItem = async ({
  id,
  data,
}: {
  id: number;
  data: UpdateDistributionItem;
}) => {
  try {
    const URL = `${apiPaths.app.distribution}/${id}`;

    const response: AxiosResponse<UpdateEntity<DistributionItem>> =
      await api.patch(URL, data);
    return response.data;
  } catch (error) {
    await handleAxiosError(error);
    throw error;
  }
};

type UseUpdateDistributionItemOptions = {
  mutationConfig?: MutationConfig<typeof updateDistributionItem>;
};

export const useUpdateDistributionItem = ({
  mutationConfig,
}: UseUpdateDistributionItemOptions) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...restConfig } = mutationConfig ?? {};

  return useMutation({
    onSuccess: async (data, ...args) => {
      await queryClient.refetchQueries({
        queryKey: getDistributionItemQueryOptions(data.id).queryKey,
      });
      await queryClient.refetchQueries({
        queryKey: getOrderQueryOptions(data.id).queryKey,
      });
      onSuccess?.(data, ...args);
    },
    ...restConfig,
    mutationFn: updateDistributionItem,
  });
};
