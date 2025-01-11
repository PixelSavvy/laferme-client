import { DataTableHeaders } from "@/components/ui/table/data-table-headers";

import { Table as DataTable } from "@/components/ui/table/table";
import {
  ColumnDef,
  getCoreRowModel,
  getSortedRowModel,
  RowSelectionState,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { Fragment, useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";

import { Form } from "@/components/ui";
import { useQueryClient } from "@tanstack/react-query";
import _ from "lodash";
import { toast } from "sonner";
import {
  getProductsQueryOptions,
  useDeleteProduct,
  useUpdateProduct,
} from "../../api";
import { Product } from "../../validations";
import { AddProductTrigger } from "../add-product";
import { ProductsDataTableBody } from "./products-data-table-body";
import { ProductsTableEditableCell } from "./products-table-editable-cell";

type ProductsDataTableProps = {
  data: Product[];
  columns: ColumnDef<Product>[];
  fallback?: string;
};

type ProductsTableFormData = {
  products: Product[];
};

export const ProductsDataTable = ({
  data,
  columns,
  fallback,
}: ProductsDataTableProps) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [formData, setFormData] = useState<Product[]>(data);

  const queryClient = useQueryClient();

  const { mutate: updateProduct } = useUpdateProduct({});
  const { mutate: deleteProduct, isPending: isProductDeleting } =
    useDeleteProduct({});

  const form = useForm<ProductsTableFormData>({
    defaultValues: {
      products: data,
    },
  });

  const { remove } = useFieldArray({
    control: form.control,
    name: "products",
  });

  useEffect(() => {
    form.reset({ products: data });
    setFormData(data);
  }, [data]);

  const onUpdateSuccess = async (updatedProduct: Product, message: string) => {
    const productsQuery = getProductsQueryOptions();

    queryClient.setQueryData(productsQuery.queryKey, (oldData) => {
      if (oldData) {
        const updatedProducts = oldData.data.map((product) =>
          product.id === updatedProduct.id ? updatedProduct : product,
        );
        return { ...oldData, data: updatedProducts };
      }

      return { data: [updatedProduct] };
    });
    toast.success(message);
    setRowSelection({});
  };

  const handleSubmit = (payload: Product) => {
    const updatedData = payload;

    console.log(updatedData);

    const originalData = data.find((item) => item.id === payload.id);
    const isDataChanged = !_.isEqual(updatedData, originalData);

    if (isDataChanged) {
      updateProduct(
        {
          id: payload.id,
          data: updatedData,
        },
        {
          onSuccess: (data) => onUpdateSuccess(data.data, data.message!),
          onError: (error) => {
            toast.error(error.message);
          },
        },
      );
    }
  };

  const handleRemove = (id: number) => {
    const productToRemove = data.find((item) => item.id === id);

    if (!productToRemove) {
      toast.error("პროდუქტი ვერ მოიძებნა");
    } else {
      deleteProduct(
        {
          id: productToRemove.id,
        },
        {
          onSuccess: (data) => {
            toast.success(data.message);
            setRowSelection({});
            remove(productToRemove.id);
          },
        },
      );
    }
  };

  const defaultColumn: Partial<ColumnDef<Product>> = {
    cell: (info) => (
      <ProductsTableEditableCell
        column={info.column}
        row={info.row}
        submitFn={handleSubmit}
        removeFn={handleRemove}
        isProductDeleting={isProductDeleting}
      />
    ),
  };

  const table = useReactTable({
    data: formData,
    columns,
    defaultColumn,

    getCoreRowModel: getCoreRowModel(),

    // Sorting
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    enableSortingRemoval: false,
    enableMultiSort: false,

    // Row selection
    enableMultiRowSelection: false,
    enableSubRowSelection: false,
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,

    state: {
      sorting,
      rowSelection,
    },
  });

  return (
    <Fragment>
      {/* Table actions */}
      <div className="flex py-4 justify-end">
        <AddProductTrigger />
      </div>
      {/* Table component */}
      <div className="rounded-md ">
        <Form {...form}>
          <form>
            <DataTable>
              <DataTableHeaders table={table} />
              <ProductsDataTableBody
                table={table}
                columns={columns}
                fallback={fallback}
              />
            </DataTable>
          </form>
        </Form>
      </div>
    </Fragment>
  );
};
