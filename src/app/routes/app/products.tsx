import { QueryClient } from "@tanstack/react-query";

import { ContentLayout } from "@/components/layout";
import { AppDrawer, DebouncedInput, Separator } from "@/components/ui";
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
  const fallback = "პროდუქტები ვერ მოიძებნა";

  return (
    <ContentLayout title="პროდუქტები">
      <div className="flex flex-col gap-4 mb-4">
        {/* Actions */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold mb-1">პროდუქტები</h1>
            <span className="text-neutral-600 text-sm">
              პროდუქტების ცხრილის აღწერა
            </span>
          </div>
          <div className="flex justify-between items-center gap-4">
            <DownloadButton url={apiPaths.excel.product} />
            <Separator orientation="vertical" className="h-8" />
            <AppDrawer
              title="პროდუქტები"
              label="დაამატე პროდუქტი"
              className="max-w-2xl"
            >
              <AddProductForm />
            </AppDrawer>
          </div>
        </div>

        <Separator />

        {/* Filters */}
        <div className="flex justify-end">
          <DebouncedInput
            value={globalFilter}
            onChange={(event) => setGlobalFilter(event.target.value)}
            placeholder="მოძებნე"
            className="w-64"
          />
        </div>
      </div>
      {/* Product table */}
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
