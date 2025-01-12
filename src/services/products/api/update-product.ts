import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

import { Product } from "../schemas";

import { apiPaths } from "@/config";
import { api, handleAxiosError } from "@/lib/api-client";
import { MutationConfig } from "@/lib/react-query";
import { UpdateEntity } from "@/shared/types";
import { getProductQueryOptions } from "./get-product";

export const updateProduct = async ({
  data,
  id,
}: {
  data: Product;
  id: number;
}) => {
  const URL = `${apiPaths.app.product}/${id}`;

  try {
    const response: AxiosResponse<UpdateEntity<Product>> = await api.patch(
      URL,
      data
    );

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
      await queryClient.invalidateQueries({
        queryKey: getProductQueryOptions(data.id).queryKey,
        predicate: () => true,
      });
      onSuccess?.(data, ...args);
    },
    ...restConfig,
    mutationFn: updateProduct,
  });
};
