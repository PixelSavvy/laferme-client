import { queryOptions, useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

import { Product } from "../validations";

import { apiPaths } from "@/config";
import { api, handleAxiosError } from "@/lib/api-client";
import { QueryConfig } from "@/lib/react-query";
import { GetEntity } from "@/shared/types";

export const getProduct = async ({ id }: { id: number }) => {
  try {
    const URl = `${apiPaths.app.product}/${id}`;
    const response: AxiosResponse<GetEntity<Product>> = await api.get(URl);
    return response.data;
  } catch (error) {
    await handleAxiosError(error);
    throw error;
  }
};

export const getProductQueryOptions = (id: number) => {
  return queryOptions({
    queryKey: ["products", id],
    queryFn: () => getProduct({ id }),
  });
};

type UseProductOptions = {
  id: number;
  queryConfig?: QueryConfig<typeof getProductQueryOptions>;
};

export const useProduct = ({ id, queryConfig }: UseProductOptions) => {
  return useQuery({
    ...getProductQueryOptions(id),
    ...queryConfig,
  });
};
