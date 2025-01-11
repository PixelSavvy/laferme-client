import { ContentLayout } from "@/components/layout";
import { ProductsTable } from "@/services/products";

export const ProductsRoute = () => {
  return (
    <ContentLayout title="პროდუქტები">
      <div className="mt-6">
        <ProductsTable />
      </div>
    </ContentLayout>
  );
};
