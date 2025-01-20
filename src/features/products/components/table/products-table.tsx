import { zodResolver } from "@hookform/resolvers/zod";
import {
  getCoreRowModel,
  getSortedRowModel,
  RowSelectionState,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { DataTableHeaders, Form, Table } from "@/components/ui";
import { Product, productSchema } from "../../schema";
import { useProductColumns } from "./product-table-columns";
import { ProductsDataTableBody } from "./products-table-body";

type ProductsTableProps = {
  data: Product[];
  fallback?: string;
};

type Products = {
  products: Product[];
};

export const ProductsTable = ({ data, fallback }: ProductsTableProps) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

  const form = useForm<Products>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      products: data,
    },
  });

  useEffect(() => {
    if (data && data.length) {
      form.reset({ products: data });
      setRowSelection({});
    }
  }, [data, form]);

  const columns = useProductColumns({
    form,
    onRowSelect: setRowSelection,
  });

  const table = useReactTable({
    data,
    columns,

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
    <Form {...form}>
      <form>
        <Table>
          <DataTableHeaders table={table} />
          <ProductsDataTableBody
            table={table}
            columns={columns}
            fallback={fallback}
          />
        </Table>
      </form>
    </Form>
  );
};
