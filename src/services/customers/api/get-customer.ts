import { queryOptions, useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

import { apiPaths } from "@/config";
import { api, handleAxiosError } from "@/lib/api-client";
import { QueryConfig } from "@/lib/react-query";
import { GetEntity } from "@/shared/types";
import { Customer } from "../validations";

export const getCustomer = async ({ id }: { id: number }) => {
  try {
    const URL = `${apiPaths.app.customer}/${id}`;
    const response: AxiosResponse<GetEntity<Customer>> = await api.get(URL);
    return response.data;
  } catch (error) {
    await handleAxiosError(error);
    throw error;
  }
};

export const getCustomerQueryOptions = (id: number) => {
  return queryOptions({
    queryKey: ["customers", id],
    queryFn: () => getCustomer({ id }),
  });
};

type UseCustomerOptions = {
  id: number;
  queryConfig?: QueryConfig<typeof getCustomerQueryOptions>;
};

export const useCustomer = ({ id, queryConfig }: UseCustomerOptions) => {
  return useQuery({
    ...getCustomerQueryOptions(id),
    ...queryConfig,
  });
};
