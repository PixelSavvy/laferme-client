import { QueryClient } from "@tanstack/react-query";

import { ContentLayout } from "@/components/layout";
import { AppDrawer } from "@/components/ui";
import { apiPaths } from "@/config";
import { DrawerProvider } from "@/context";
import { DownloadButton } from "@/features/excel";
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
  const fallback = productsData.data.message;

  return (
    <ContentLayout title="პროდუქტები">
      <DrawerProvider>
        <div className="mb-6 flex justify-between">
          <DownloadButton url={apiPaths.excel.getProducts} />
          <AppDrawer
            title="პროდუქტები"
            label="დაამატე პროდუქტი"
            className="max-w-2xl"
          >
            <AddProductForm />
          </AppDrawer>
        </div>
      </DrawerProvider>
      <ProductsTable data={products} fallback={fallback} />
    </ContentLayout>
  );
};

export default ProductsRoute;
