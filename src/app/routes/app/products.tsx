import { ContentLayout } from "@/components/layout";
import { ProductsTable } from "@/services/products";

import { getProductsQueryOptions } from "@/services/products";
import { QueryClient } from "@tanstack/react-query";

export const productsLoader = async (queryClient: QueryClient) => {
  const query = getProductsQueryOptions();
  return (
    queryClient.getQueryData(query.queryKey) ??
    (await queryClient.fetchQuery(query))
  );
};

export const ProductsRoute = () => {
  return (
    <ContentLayout title="პროდუქტები">
      <ProductsTable />
    </ContentLayout>
  );
};
