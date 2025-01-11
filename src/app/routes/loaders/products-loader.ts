import { getProductsQueryOptions } from "@/services/products";
import { QueryClient } from "@tanstack/react-query";

export const productsLoader = async (queryClient: QueryClient) => {
  const query = getProductsQueryOptions();
  return (
    queryClient.getQueryData(query.queryKey) ??
    (await queryClient.fetchQuery(query))
  );
};
