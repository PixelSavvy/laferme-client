import { getFreezoneItemsQueryOptions } from "@/services/freezone";
import { QueryClient } from "@tanstack/react-query";

export const freezoneLoader = async (queryClient: QueryClient) => {
  const query = getFreezoneItemsQueryOptions();
  return (
    queryClient.getQueryData(query.queryKey) ??
    (await queryClient.fetchQuery(query))
  );
};
