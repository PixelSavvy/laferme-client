import { queryOptions, useQuery } from "@tanstack/react-query";

import { apiPaths } from "@/config";
import { api, QueryConfig } from "@/lib";
import { GetEntity } from "@/shared/types";

import { Product } from "../schema";

export const getProduct = ({
  id,
}: {
  id: number;
}): Promise<GetEntity<Product>> => {
  const path = `${apiPaths.app.product}/${id}`;
  return api.get(path);
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
