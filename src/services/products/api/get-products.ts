import { queryOptions, useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

import { Product } from "../schemas";

import { apiPaths } from "@/config";
import { api, handleAxiosError } from "@/lib/api-client";
import { QueryConfig } from "@/lib/react-query";
import { GetEntities } from "@/shared/types";

const getProducts = async () => {
  try {
    const response: AxiosResponse<GetEntities<Product>> = await api.get(
      apiPaths.app.product,
    );

    return response.data;
  } catch (error) {
    await handleAxiosError(error);
    throw error;
  }
};

export const getProductsQueryOptions = () => {
  return queryOptions({
    queryKey: ["products"],
    queryFn: () => getProducts(),
  });
};
type TuseProductsOptions = {
  queryConfig?: QueryConfig<typeof getProductsQueryOptions>;
};

export const useProducts = ({ queryConfig }: TuseProductsOptions) => {
  return useQuery({
    ...getProductsQueryOptions(),
    ...queryConfig,
  });
};
