import { DataTable } from "@/components/ui";
import { useProducts } from "../../api";
import { useProductColumns } from "./products-table-cols";
import { ProductsTableExpanded } from "./products-table-expanded";

export const ProductsTable = () => {
  const columns = useProductColumns();

  const { data: products } = useProducts({});

  if (!products?.data) return null;

  return (
    <DataTable
      columns={columns}
      data={products.data}
      getRowCanExpand={() => true}
      renderSubComponent={({ row }) => <ProductsTableExpanded row={row} />}
      fallback={products.message}
      isProductsRoute
    />
  );
};
