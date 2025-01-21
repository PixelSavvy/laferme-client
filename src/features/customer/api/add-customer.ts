import { useMutation, useQueryClient } from "@tanstack/react-query";

import { apiPaths } from "@/config";
import { api, MutationConfig } from "@/lib";
import { AddEntity } from "@/shared/types";
import { NewCustomer } from "../schema";
import { getCustomersQueryOptions } from "./get-customers";

export const addCustomer = ({
  data,
}: {
  data: NewCustomer;
}): Promise<AddEntity<NewCustomer>> => {
  const path = apiPaths.app.customer;
  return api.post(path, data);
};

type UseAddCustomerOptions = {
  mutationConfig?: MutationConfig<typeof addCustomer>;
};

export const useAddCustomer = ({
  mutationConfig,
}: UseAddCustomerOptions = {}) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...restConfig } = mutationConfig ?? {};

  return useMutation({
    onSuccess: (...args) => {
      queryClient.invalidateQueries({
        queryKey: getCustomersQueryOptions().queryKey,
      });
      onSuccess?.(...args);
    },
    ...restConfig,
    mutationFn: addCustomer,
  });
};
