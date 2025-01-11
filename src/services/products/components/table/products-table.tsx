import { useProducts } from "../../api";
import { ProductsDataTable } from "./products-data-table";
import { useProductColumns } from "./products-table-cols";

export const ProductsTable = () => {
  const columns = useProductColumns();
  const { data: products } = useProducts({});

  if (!products?.data) return null;

  return (
    <ProductsDataTable
      data={products.data}
      fallback={products.message}
      columns={columns}
    />
  );
};
