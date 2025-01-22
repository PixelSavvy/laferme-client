import { queryOptions, useQuery } from "@tanstack/react-query";

import { apiPaths } from "@/config";
import { api, QueryConfig } from "@/lib";
import { GetEntity } from "@/shared/types";
import { Order } from "../schema";

const getOrders = (): Promise<GetEntity<Order[]>> => {
  const path = `${apiPaths.app.order}`;
  return api.get(path);
};

export const getOrdersQueryOptions = () => {
  return queryOptions({
    queryKey: ["orders"],
    queryFn: getOrders,
  });
};

type UseOrderOptions = {
  queryConfig?: QueryConfig<typeof getOrdersQueryOptions>;
};

export const useOrders = ({ queryConfig }: UseOrderOptions = {}) => {
  return useQuery({
    ...getOrdersQueryOptions(),
    ...queryConfig,
  });
};
