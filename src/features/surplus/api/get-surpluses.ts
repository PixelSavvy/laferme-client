import { apiPaths } from "@/config";
import { api, QueryConfig } from "@/lib";
import { GetEntities } from "@/shared/types";
import { queryOptions, useQuery } from "@tanstack/react-query";
import { Surplus } from "../schema";

export const getSurpluses = (): Promise<GetEntities<Surplus[]>> => {
  return api.get(apiPaths.app.surplus);
};

export const getSurplusesQueryOptions = () => {
  return queryOptions({
    queryKey: ["surplus"],
    queryFn: getSurpluses,
  });
};

type UseSurplusesOptions = {
  queryConfig?: QueryConfig<typeof getSurplusesQueryOptions>;
};

export const useSurpluses = ({ queryConfig }: UseSurplusesOptions = {}) => {
  return useQuery({
    ...getSurplusesQueryOptions(),
    ...queryConfig,
  });
};
