import { queryOptions, useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

import { apiPaths } from "@/config";
import { api, handleAxiosError } from "@/lib/api-client";
import { QueryConfig } from "@/lib/react-query";
import { GetEntities } from "@/shared/types";
import { Order } from "../validations";

export const getOrders = async () => {
  try {
    const response: AxiosResponse<GetEntities<Order>> = await api.get(
      apiPaths.app.order,
    );
    return response.data;
  } catch (error) {
    await handleAxiosError(error);
    throw error;
  }
};

export const getOrdersQueryOptions = () => {
  return queryOptions({
    queryKey: ["orders"],
    queryFn: () => getOrders(),
  });
};

type UseGetOrdersOptions = {
  queryConfig?: QueryConfig<typeof getOrdersQueryOptions>;
};

export const useOrders = ({ queryConfig }: UseGetOrdersOptions) => {
  return useQuery({
    ...getOrdersQueryOptions(),
    ...queryConfig,
  });
};
