import { apiPaths } from "@/config";
import { api, QueryConfig } from "@/lib";
import { GetEntities } from "@/shared/types";
import { queryOptions, useQuery } from "@tanstack/react-query";
import { Product } from "../schema";

export const getProducts = (): Promise<GetEntities<Product[]>> => {
  return api.get(apiPaths.app.product);
};

export const getProductsQueryOptions = () => {
  return queryOptions({
    queryKey: ["products"],
    queryFn: getProducts,
  });
};

type UseProductsOptions = {
  queryConfig?: QueryConfig<typeof getProductsQueryOptions>;
};

export const useProducts = ({ queryConfig }: UseProductsOptions = {}) => {
  return useQuery({
    ...getProductsQueryOptions(),
    ...queryConfig,
  });
};
