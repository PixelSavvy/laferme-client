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
import _ from "lodash";
import { toast } from "sonner";
import { useDeleteProduct, useUpdateProduct } from "../../api";
import { Product, ProductsTableFormData } from "../../schemas";
import { ProductsDataTableBody } from "./products-data-table-body";
import { ProductsTableEditableCell } from "./products-table-editable-cell";

type ProductsDataTableProps = {
  data: Product[];
  columns: ColumnDef<Product>[];
  fallback?: string;
};

export const ProductsDataTable = ({
  data,
  columns,
  fallback,
}: ProductsDataTableProps) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [formData, setFormData] = useState<Product[]>(data);

  const { mutate: updateProduct } = useUpdateProduct({});
  const { mutate: deleteProduct, isPending: isProductDeleting } =
    useDeleteProduct({});

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

  const form = useForm<ProductsTableFormData>({
    defaultValues: {
      products: data,
    },
  });

  useEffect(() => {
    let mounted = true;

    if (mounted) {
      form.reset({ products: data });
      setFormData(data);
    }

    return () => {
      mounted = false;
    };
  }, [form, data]);

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

  const { remove } = useFieldArray({
    control: form.control,
    name: "products",
  });

  const onUpdateSuccess = async (message: string) => {
    // const productsQuery = getProductsQueryOptions();

    // queryClient.setQueryData(productsQuery.queryKey, (oldData) => {
    //   if (oldData) {
    //     const updatedProducts = oldData.data.map((product) =>
    //       product.id === updatedProduct.id ? updatedProduct : product
    //     );
    //     return { ...oldData, data: updatedProducts };
    //   }

    //   return { data: [updatedProduct] };
    // });
    toast.success(message);
    setRowSelection({});
  };

  const handleSubmit = (payload: Product) => {
    const updatedData = payload;

    const originalData = data.find((item) => item.id === payload.id);
    const isDataChanged = !_.isEqual(updatedData, originalData);

    if (isDataChanged) {
      updateProduct(
        {
          id: payload.id,
          data: updatedData,
        },
        {
          onSuccess: (data) => onUpdateSuccess(data.message!),
          onError: (error) => {
            toast.error(error.message);
          },
        }
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
        }
      );
    }
  };

  return (
    <Fragment>
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
