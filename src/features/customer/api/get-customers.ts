import { queryOptions, useQuery } from "@tanstack/react-query";

import { apiPaths } from "@/config";
import { api, QueryConfig } from "@/lib";
import { GetEntity } from "@/shared/types";
import { Customer } from "../schema";

const getCustomers = (): Promise<GetEntity<Customer[]>> => {
  return api.get(apiPaths.app.customer);
};

export const getCustomersQueryOptions = () => {
  return queryOptions({
    queryKey: ["customers"],
    queryFn: getCustomers,
  });
};

type UseCustomersOptions = {
  queryConfig?: QueryConfig<typeof getCustomersQueryOptions>;
};

export const useCustomers = ({ queryConfig }: UseCustomersOptions = {}) => {
  return useQuery({
    ...getCustomersQueryOptions(),
    ...queryConfig,
  });
};
