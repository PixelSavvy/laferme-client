import { queryOptions, useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

import { Customer } from "../validations";

import { apiPaths } from "@/config";
import { api, handleAxiosError } from "@/lib/api-client";
import { QueryConfig } from "@/lib/react-query";
import { GetEntities } from "@/shared/types";

export const getCustomers = async () => {
  try {
    const response: AxiosResponse<GetEntities<Customer>> = await api.get(
      apiPaths.app.customer,
    );
    return response.data;
  } catch (error) {
    await handleAxiosError(error);
    throw error;
  }
};

export const getCustomersQueryOptions = () => {
  return queryOptions({
    queryKey: ["customers"],
    queryFn: () => getCustomers(),
  });
};

type UseGetCustomersOptions = {
  queryConfig?: QueryConfig<typeof getCustomersQueryOptions>;
};

export const useCustomers = ({ queryConfig }: UseGetCustomersOptions) => {
  return useQuery({
    ...getCustomersQueryOptions(),
    ...queryConfig,
  });
};
