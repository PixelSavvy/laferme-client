import { apiPaths } from "@/config";
import { api, QueryConfig } from "@/lib";
import { GetEntities } from "@/shared/types";
import { queryOptions, useQuery } from "@tanstack/react-query";
import { Surplus } from "../schema";

export const getSurplus = (id: number): Promise<GetEntities<Surplus[]>> => {
  const path = `${apiPaths.app.surplus}/${id}`;
  return api.get(path);
};

export const getSurplusQueryOptions = (id: number) => {
  return queryOptions({
    queryKey: ["surplus"],
    queryFn: () => getSurplus(id),
  });
};

type UseSurplusOptions = {
  queryConfig?: QueryConfig<typeof getSurplusQueryOptions>;
  id: number;
};

export const useSurplus = ({ queryConfig, id }: UseSurplusOptions) => {
  return useQuery({
    ...getSurplusQueryOptions(id),
    ...queryConfig,
  });
};
