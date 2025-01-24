import { QueryClient } from "@tanstack/react-query";

import { ContentLayout } from "@/components/layout";
import { AppDrawer, DebouncedInput } from "@/components/ui";
import { apiPaths } from "@/config";
import { DownloadButton } from "@/features/excel";
import {
  AddProductForm,
  getProductsQueryOptions,
  ProductsTable,
  useProducts,
} from "@/features/products";
import { useState } from "react";

export const clientLoader = (queryClient: QueryClient) => async () => {
  const query = getProductsQueryOptions();

  return (
    queryClient.getQueryData(query.queryKey) ??
    (await queryClient.fetchQuery(query))
  );
};

const ProductsRoute = () => {
  const [globalFilter, setGlobalFilter] = useState("");
  const { data: productsData } = useProducts();

  if (!productsData?.data) return null;

  const products = productsData.data.data.flat();
  const fallback = productsData.data.message;

  return (
    <ContentLayout title="პროდუქტები">
      <div className="mb-6  gap-2 flex justify-between">
        <DownloadButton url={apiPaths.excel.product} />
        <DebouncedInput
          value={globalFilter}
          onChange={(event) => setGlobalFilter(event.target.value)}
          placeholder="მოძებნე"
          className="w-96 mr-auto"
        />
        <AppDrawer
          title="პროდუქტები"
          label="დაამატე პროდუქტი"
          className="max-w-2xl"
        >
          <AddProductForm />
        </AppDrawer>
      </div>

      <ProductsTable
        data={products}
        fallback={fallback}
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
      />
    </ContentLayout>
  );
};

export default ProductsRoute;
