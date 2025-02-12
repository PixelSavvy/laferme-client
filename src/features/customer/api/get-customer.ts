import { queryOptions, useQuery } from "@tanstack/react-query";

import { apiPaths } from "@/config";
import { api, QueryConfig } from "@/lib";
import { GetEntity } from "@/shared/types";
import { Customer } from "../schema";

const getCustomer = ({ id }: { id: string }): Promise<GetEntity<Customer>> => {
  const path = `${apiPaths.app.customer}/${id}`;
  return api.get(path);
};

export const getCustomerQueryOptions = (id: string) => {
  return queryOptions({
    queryKey: ["customers", id],
    queryFn: () => getCustomer({ id }),
  });
};

type UseCustomerOptions = {
  id: string;
  queryConfig?: QueryConfig<typeof getCustomerQueryOptions>;
};

export const useCustomer = ({ id, queryConfig }: UseCustomerOptions) => {
  return useQuery({
    ...getCustomerQueryOptions(id),
    ...queryConfig,
  });
};
