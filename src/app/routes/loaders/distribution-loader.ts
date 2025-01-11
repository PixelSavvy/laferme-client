import { getDistributionItemsQueryOptions } from "@/services/distribution";
import { QueryClient } from "@tanstack/react-query";

export const distributionLoader = async (queryClient: QueryClient) => {
  const query = getDistributionItemsQueryOptions();
  return (
    queryClient.getQueryData(query.queryKey) ??
    (await queryClient.fetchQuery(query))
  );
};
