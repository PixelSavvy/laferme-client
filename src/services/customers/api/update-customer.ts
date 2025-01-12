import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

import { Customer } from "../schema";
import { getCustomerQueryOptions } from "./get-customer";

import { apiPaths } from "@/config";
import { api, handleAxiosError } from "@/lib/api-client";
import { MutationConfig } from "@/lib/react-query";
import { UpdateEntity } from "@/shared/types";

export const updateCustomer = async ({
  id,
  data,
}: {
  id: number;
  data: Customer;
}) => {
  try {
    const URL = `${apiPaths.app.customer}/${id}`;
    const response: AxiosResponse<UpdateEntity<Customer>> = await api.patch(
      URL,
      data,
    );
    return response.data;
  } catch (error) {
    await handleAxiosError(error);
    throw error;
  }
};

type UseUpdateCustomerOptions = {
  mutationConfig?: MutationConfig<typeof updateCustomer>;
};

export const useUpdateCustomer = ({
  mutationConfig,
}: UseUpdateCustomerOptions) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...restConfig } = mutationConfig ?? {};

  return useMutation({
    onSuccess: async (data, ...args) => {
      await queryClient.refetchQueries({
        queryKey: getCustomerQueryOptions(data.id).queryKey,
      });
      onSuccess?.(data, ...args);
    },
    ...restConfig,
    mutationFn: updateCustomer,
  });
};
