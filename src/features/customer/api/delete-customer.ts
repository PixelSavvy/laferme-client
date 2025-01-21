import { useMutation, useQueryClient } from "@tanstack/react-query";

import { apiPaths } from "@/config";
import { api, MutationConfig } from "@/lib";
import { DeleteEntity } from "@/shared/types";

import { Customer } from "../schema";
import { getCustomersQueryOptions } from "./get-customers";

export const deleteCustomer = ({
  id,
}: {
  id: number;
}): Promise<DeleteEntity<Customer>> => {
  const path = `${apiPaths.app.customer}/${id}`;
  return api.delete(path);
};

type UseDeleteCustomerOptions = {
  mutationConfig?: MutationConfig<typeof deleteCustomer>;
};

export const useDeleteCustomer = ({
  mutationConfig,
}: UseDeleteCustomerOptions = {}) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (...args) => {
      queryClient.invalidateQueries({
        queryKey: getCustomersQueryOptions().queryKey,
      });
      onSuccess?.(...args);
    },
    ...restConfig,
    mutationFn: deleteCustomer,
  });
};
