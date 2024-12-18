import { queryOptions, useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

import { apiPaths } from "@/config";
import { api, handleAxiosError } from "@/lib/api-client";
import { QueryConfig } from "@/lib/react-query";
import { GetEntities } from "@/shared/types";
import { FreezoneItem } from "../validations";

export const getFreezoneItems = async () => {
  try {
    const response: AxiosResponse<GetEntities<FreezoneItem>> = await api.get(
      apiPaths.app.freezone,
    );
    return response.data;
  } catch (error) {
    await handleAxiosError(error);
    throw error;
  }
};

export const getFreezoneItemsQueryOptions = () => {
  return queryOptions({
    queryKey: ["freezone-items"],
    queryFn: () => getFreezoneItems(),
  });
};

type UseGetFreezoneItemsOptions = {
  queryConfig?: QueryConfig<typeof getFreezoneItemsQueryOptions>;
};

export const useFreezoneItems = ({
  queryConfig,
}: UseGetFreezoneItemsOptions) => {
  return useQuery({
    ...getFreezoneItemsQueryOptions(),
    ...queryConfig,
  });
};
