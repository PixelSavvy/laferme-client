import { queryOptions, useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

import { apiPaths } from "@/config";
import { api, handleAxiosError } from "@/lib/api-client";
import { QueryConfig } from "@/lib/react-query";
import { GetEntity } from "@/shared/types";
import { FreezoneItem } from "../validations";

export const getFreezoneItem = async ({ id }: { id: number }) => {
  try {
    const URL = `${apiPaths.app.freezone}/${id}`;
    const response: AxiosResponse<GetEntity<FreezoneItem>> = await api.get(URL);
    return response.data;
  } catch (error) {
    await handleAxiosError(error);
    throw error;
  }
};

export const getFreezoneItemQueryOptions = (id: number) => {
  return queryOptions({
    queryKey: ["freezone-items", id],
    queryFn: () => getFreezoneItem({ id }),
  });
};

type UseFreezoneitemOptions = {
  id: number;
  queryConfig?: QueryConfig<typeof getFreezoneItemQueryOptions>;
};

export const useFreezoneitem = ({
  id,
  queryConfig,
}: UseFreezoneitemOptions) => {
  return useQuery({
    ...getFreezoneItemQueryOptions(id),
    ...queryConfig,
  });
};
