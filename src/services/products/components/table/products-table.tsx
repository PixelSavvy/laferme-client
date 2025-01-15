import { apiPaths } from "@/config";
import { DownloadButton } from "@/services/excel";
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
        <DownloadButton url={apiPaths.excel.getProducts} />
      </div>

      <ProductsDataTable
        data={products.data}
        fallback={products.message}
        columns={columns}
      />
    </div>
  );
};
