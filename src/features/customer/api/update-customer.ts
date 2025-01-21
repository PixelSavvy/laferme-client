import { useMutation, useQueryClient } from "@tanstack/react-query";

import { apiPaths } from "@/config";
import { api, MutationConfig } from "@/lib";
import { UpdateEntity } from "@/shared/types";

import { Customer } from "../schema";
import { getCustomerQueryOptions } from "./get-customer";

export const updateCustomer = ({
  id,
  data,
}: {
  id: number;
  data: Customer;
}): Promise<UpdateEntity<Customer>> => {
  const path = `${apiPaths.app.customer}/${id}`;
  return api.put(path, data);
};

type UseUpdateCustomerOptions = {
  mutationConfig?: MutationConfig<typeof updateCustomer>;
};

export const useUpdateCustomer = ({
  mutationConfig,
}: UseUpdateCustomerOptions = {}) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (data, ...args) => {
      queryClient.refetchQueries({
        queryKey: getCustomerQueryOptions(data.data.data.id).queryKey,
      });
      onSuccess?.(data, ...args);
    },
    ...restConfig,
    mutationFn: updateCustomer,
  });
};
