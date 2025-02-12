import { queryOptions, useQuery } from "@tanstack/react-query";

import { apiPaths } from "@/config";
import { api, QueryConfig } from "@/lib";
import { GetEntity } from "@/shared/types";

import { Order } from "../schema";
export const getOrder = (id: string): Promise<GetEntity<Order>> => {
  const path = `${apiPaths.app.order}/${id}`;
  return api.get(path);
};

export const getOrderQueryOptions = (id: string) => {
  return queryOptions({
    queryKey: ["orders", id],
    queryFn: () => getOrder(id),
  });
};

type UseOrderOptions = {
  id: string;
  queryConfig?: QueryConfig<typeof getOrderQueryOptions>;
};

export const useOrder = ({ id, queryConfig }: UseOrderOptions) => {
  return useQuery({
    ...getOrderQueryOptions(id),
    ...queryConfig,
  });
};
