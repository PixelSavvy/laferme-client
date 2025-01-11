import { getOrdersQueryOptions } from "@/services/orders";
import { QueryClient } from "@tanstack/react-query";

export const ordersLoader = async (queryClient: QueryClient) => {
  const query = getOrdersQueryOptions();
  return (
    queryClient.getQueryData(query.queryKey) ??
    (await queryClient.fetchQuery(query))
  );
};
