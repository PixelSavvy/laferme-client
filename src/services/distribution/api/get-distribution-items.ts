import { queryOptions, useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

import { apiPaths } from "@/config";
import { api, handleAxiosError } from "@/lib/api-client";
import { QueryConfig } from "@/lib/react-query";
import { GetEntities } from "@/shared/types";
import { DistributionItem } from "../validations";

export const getDistributionItems = async () => {
  try {
    const response: AxiosResponse<GetEntities<DistributionItem>> =
      await api.get(apiPaths.app.distribution);
    return response.data;
  } catch (error) {
    await handleAxiosError(error);
    throw error;
  }
};

export const getDistributionItemsQueryOptions = () => {
  return queryOptions({
    queryKey: ["distribution-items"],
    queryFn: () => getDistributionItems(),
  });
};

type UseGetDistributionItemsOptions = {
  queryConfig?: QueryConfig<typeof getDistributionItemsQueryOptions>;
};

export const useDistributionItems = ({
  queryConfig,
}: UseGetDistributionItemsOptions) => {
  return useQuery({
    ...getDistributionItemsQueryOptions(),
    ...queryConfig,
  });
};
