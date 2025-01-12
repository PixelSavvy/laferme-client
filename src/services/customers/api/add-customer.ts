import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

import { getCustomersQueryOptions } from "./get-customers";

import { apiPaths } from "@/config";
import { api, handleAxiosError } from "@/lib/api-client";
import { MutationConfig } from "@/lib/react-query";
import { AddEntity } from "@/shared/types";
import { NewCustomer } from "../schema";

const addCustomer = async (data: NewCustomer) => {
  try {
    const response: AxiosResponse<AddEntity> = await api.post(
      apiPaths.app.customer,
      data
    );

    return response.data;
  } catch (error) {
    await handleAxiosError(error);
    throw error;
  }
};

type UseAddCustomerOptions = {
  mutationConfig?: MutationConfig<typeof addCustomer>;
};

export const useAddCustomer = ({ mutationConfig }: UseAddCustomerOptions) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...restConfig } = mutationConfig ?? {};

  return useMutation({
    onSuccess: async (...args) => {
      await queryClient.invalidateQueries({
        queryKey: getCustomersQueryOptions().queryKey,
      });
      onSuccess?.(...args);
    },
    ...restConfig,
    mutationFn: addCustomer,
  });
};
