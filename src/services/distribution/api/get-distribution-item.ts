import { queryOptions, useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

import { apiPaths } from "@/config";
import { api, handleAxiosError } from "@/lib/api-client";
import { QueryConfig } from "@/lib/react-query";
import { GetEntity } from "@/shared/types";
import { DistributionItem } from "../validations";

export const getDistributionItem = async ({ id }: { id: number }) => {
  try {
    const URL = `${apiPaths.app.distribution}/${id}`;
    const response: AxiosResponse<GetEntity<DistributionItem>> =
      await api.get(URL);
    return response.data;
  } catch (error) {
    await handleAxiosError(error);
    throw error;
  }
};

export const getDistributionItemQueryOptions = (id: number) => {
  return queryOptions({
    queryKey: ["distribution-items", id],
    queryFn: () => getDistributionItem({ id }),
  });
};

type UseDistributionItemOptions = {
  id: number;
  queryConfig?: QueryConfig<typeof getDistributionItemQueryOptions>;
};

export const useDistributionItem = ({
  id,
  queryConfig,
}: UseDistributionItemOptions) => {
  return useQuery({
    ...getDistributionItemQueryOptions(id),
    ...queryConfig,
  });
};
