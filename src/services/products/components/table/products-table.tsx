import { useProducts } from "../../api";
import { AddProductTrigger } from "../add-product";
import { ProductsDataTable } from "./products-data-table";
import { useProductColumns } from "./products-table-cols";

export const ProductsTable = () => {
  const columns = useProductColumns();
  const { data: products } = useProducts({});

  if (!products?.data) return null;

  return (
    <div className="space-y-6 mt-10">
      <div className="flex gap-4 justify-end">
        <AddProductTrigger />
      </div>

      <ProductsDataTable
        data={products.data}
        fallback={products.message}
        columns={columns}
      />
    </div>
  );
};
