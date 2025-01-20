import { QueryClient } from "@tanstack/react-query";

import { ContentLayout } from "@/components/layout";
import { AppDrawer } from "@/components/ui";
import { DrawerProvider } from "@/context";
import {
  AddProductForm,
  getProductsQueryOptions,
  ProductsTable,
  useProducts,
} from "@/features/products";

export const clientLoader = (queryClient: QueryClient) => async () => {
  const query = getProductsQueryOptions();

  return (
    queryClient.getQueryData(query.queryKey) ??
    (await queryClient.fetchQuery(query))
  );
};

const ProductsRoute = () => {
  const { data: productsData } = useProducts();

  if (!productsData?.data) return null;

  const products = productsData.data.data.flat();

  return (
    <ContentLayout title="პროდუქტები">
      <DrawerProvider>
        <div className="mb-6 flex justify-end">
          <AppDrawer
            title="პროდუქტები"
            label="დაამატე პროდუქტი"
            className="max-w-2xl"
          >
            <AddProductForm />
          </AppDrawer>
        </div>
      </DrawerProvider>
      <ProductsTable data={products} fallback={productsData.data.message} />
    </ContentLayout>
  );
};

export default ProductsRoute;
