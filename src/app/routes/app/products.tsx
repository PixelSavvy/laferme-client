import { ContentLayout } from "@/components/layout";
import {
  getProductsQueryOptions,
  ProductsTable,
  useProductStore,
} from "@/services/products";
import { QueryClient } from "@tanstack/react-query";

export const productsLoader = async (queryClient: QueryClient) => {
  const query = getProductsQueryOptions();
  const productsQuery =
    queryClient.getQueryData(query.queryKey) ??
    (await queryClient.fetchQuery(query));

  const setProducts = useProductStore.getState().setProducts;

  if (!productsQuery.data) return console.log("No products data found");

  setProducts(productsQuery.data);

  return productsQuery.data;
};

export const ProductsRoute = () => {
  return (
    <ContentLayout title="პროდუქტები">
      <div className="mt-6">
        <ProductsTable />
      </div>
    </ContentLayout>
  );
};
