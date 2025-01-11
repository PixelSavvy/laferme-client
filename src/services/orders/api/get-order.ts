import { queryOptions, useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

import { apiPaths } from "@/config";
import { api, handleAxiosError } from "@/lib/api-client";
import { QueryConfig } from "@/lib/react-query";
import { GetEntity } from "@/shared/types";
import { Order } from "../validations";

export const getOrder = async ({ id }: { id: number }) => {
  try {
    const URL = `${apiPaths.app.order}/${id}`;
    const response: AxiosResponse<GetEntity<Order>> = await api.get(URL);
    return response.data;
  } catch (error) {
    await handleAxiosError(error);
    throw error;
  }
};

export const getOrderQueryOptions = (id: number) => {
  return queryOptions({
    queryKey: ["orders", id],
    queryFn: () => getOrder({ id }),
  });
};

type UseOrderOptions = {
  id: number;
  queryConfig?: QueryConfig<typeof getOrderQueryOptions>;
};

export const useOrder = ({ id, queryConfig }: UseOrderOptions) => {
  return useQuery({
    ...getOrderQueryOptions(id),
    ...queryConfig,
  });
};
