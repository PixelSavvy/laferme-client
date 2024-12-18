import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

import { Product } from "../validations";
import { getProductQueryOptions } from "./get-product";

import { apiPaths } from "@/config";
import { api, handleAxiosError } from "@/lib/api-client";
import { MutationConfig } from "@/lib/react-query";
import { UpdateEntity } from "@/shared/types";

export const updateProduct = async ({
  data,
  id,
}: {
  data: Product;
  id: number;
}) => {
  const URL = `${apiPaths.app.product}/${id}`;

  try {
    const response: AxiosResponse<UpdateEntity> = await api.patch(URL, data);

    return response.data;
  } catch (error) {
    await handleAxiosError(error);
    throw error;
  }
};

type UseUpdateProductOptions = {
  mutationConfig?: MutationConfig<typeof updateProduct>;
};

export const useUpdateProduct = ({
  mutationConfig,
}: UseUpdateProductOptions) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...restConfig } = mutationConfig ?? {};

  return useMutation({
    onSuccess: async (data, ...args) => {
      await queryClient.refetchQueries({
        queryKey: getProductQueryOptions(data.id).queryKey,
      });
      onSuccess?.(data, ...args);
    },
    ...restConfig,
    mutationFn: updateProduct,
  });
};
