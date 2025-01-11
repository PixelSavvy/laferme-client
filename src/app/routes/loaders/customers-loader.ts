import { getCustomersQueryOptions } from "@/services/customers";
import { QueryClient } from "@tanstack/react-query";

export const customersLoader = async (queryClient: QueryClient) => {
  const query = getCustomersQueryOptions();
  return (
    queryClient.getQueryData(query.queryKey) ??
    (await queryClient.fetchQuery(query))
  );
};
