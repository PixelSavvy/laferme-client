import { ColumnDef, RowSelectionState } from "@tanstack/react-table";
import { Edit, EllipsisVertical } from "lucide-react";
import { Dispatch, SetStateAction, useMemo } from "react";
import { UseFormReturn } from "react-hook-form";

import {
  Button,
  Checkbox,
  DeleteAlertDialog,
  InputField,
  SelectField,
} from "@/components/ui";
import { booleanItems } from "@/config";

import { Product } from "../../schema";
import { useDeleteProduct, useUpdateProduct } from "../../services";

type Products = {
  products: Product[];
};

type UseProductsColumnsProps = {
  form: UseFormReturn<Products>;
  onRowSelect: Dispatch<SetStateAction<RowSelectionState>>;
};

export const useProductColumns = ({
  form,
  onRowSelect,
}: UseProductsColumnsProps) => {
  const { update } = useUpdateProduct({ onRowSelect });
  const { remove, isDeleting } = useDeleteProduct();

  const handleUpdate = (index: number) => {
    const updatedProduct = form.getValues().products[index];
    update(updatedProduct);
  };

  const columns: ColumnDef<Product>[] = useMemo(() => {
    return [
      {
        id: "select_col",
        cell: ({ row }) => (
          <Checkbox
            className="size-5 mt-1 mr-4"
            onClick={row.getToggleSelectedHandler()}
            disabled={!row.getCanSelect()}
            checked={row.getIsSelected()}
          />
        ),
        enableSorting: false,
      },
      {
        accessorKey: "id",
        header: "ID",
      },
      {
        accessorKey: "productCode",
        header: "SKU",
        cell: (info) => (
          <InputField
            form={form}
            name={`products.${info.row.index}.productCode`}
            type="text"
            showMessage={false}
            disabled={!info.row.getIsSelected()}
            inputClassName="disabled:bg-transparent disabled:border-transparent disabled:opacity-100"
          />
        ),
      },
      {
        accessorKey: "hasVAT",
        header: "დღგ",
        cell: (info) => (
          <SelectField
            form={form}
            name={`products.${info.row.index}.hasVAT`}
            items={booleanItems}
            showMessage={false}
            className="min-w-24"
            triggerClassName="disabled:bg-transparent disabled:border-transparent disabled:opacity-100"
            disabled={!info.row.getIsSelected()}
          />
        ),
      },
      {
        accessorKey: "title",
        header: "პროდუქტის ტიპი",
        cell: (info) => (
          <InputField
            form={form}
            name={`products.${info.row.index}.title`}
            type="text"
            showMessage={false}
            className="min-w-64"
            disabled={!info.row.getIsSelected()}
            inputClassName="disabled:bg-transparent disabled:border-transparent disabled:opacity-100"
          />
        ),
      },
      {
        accessorKey: "prices.TR1",
        header: "TR1",
        cell: (info) => (
          <InputField
            form={form}
            name={`products.${info.row.index}.prices.TR1`}
            type="number"
            showMessage={false}
            disabled={!info.row.getIsSelected()}
            inputClassName="disabled:bg-transparent disabled:border-transparent disabled:opacity-100"
          />
        ),
      },
      {
        accessorKey: "prices.TR2",
        header: "TR2",
        cell: (info) => (
          <InputField
            form={form}
            name={`products.${info.row.index}.prices.TR2`}
            type="number"
            showMessage={false}
            disabled={!info.row.getIsSelected()}
            inputClassName="disabled:bg-transparent disabled:border-transparent disabled:opacity-100"
          />
        ),
      },
      {
        accessorKey: "prices.TR3",
        header: "TR3",
        cell: (info) => (
          <InputField
            form={form}
            name={`products.${info.row.index}.prices.TR3`}
            type="number"
            showMessage={false}
            disabled={!info.row.getIsSelected()}
            inputClassName="disabled:bg-transparent disabled:border-transparent disabled:opacity-100"
          />
        ),
      },
      {
        accessorKey: "prices.TR4",
        header: "TR4",
        cell: (info) => (
          <InputField
            form={form}
            name={`products.${info.row.index}.prices.TR4`}
            type="number"
            showMessage={false}
            disabled={!info.row.getIsSelected()}
            inputClassName="disabled:bg-transparent disabled:border-transparent disabled:opacity-100"
          />
        ),
      },
      {
        accessorKey: "prices.TR5",
        header: "TR5",
        cell: (info) => (
          <InputField
            form={form}
            name={`products.${info.row.index}.prices.TR5`}
            type="number"
            showMessage={false}
            disabled={!info.row.getIsSelected()}
            inputClassName="disabled:bg-transparent disabled:border-transparent disabled:opacity-100"
          />
        ),
      },
      {
        accessorKey: "prices.TRC",
        header: "TRC",
        cell: (info) => (
          <InputField
            form={form}
            name={`products.${info.row.index}.prices.TRC`}
            type="number"
            showMessage={false}
            disabled={!info.row.getIsSelected()}
            inputClassName="disabled:bg-transparent disabled:border-transparent disabled:opacity-100"
          />
        ),
      },
      {
        accessorKey: "prices.TRD",
        header: "TRD",
        cell: (info) => (
          <InputField
            form={form}
            name={`products.${info.row.index}.prices.TRD`}
            type="number"
            showMessage={false}
            disabled={!info.row.getIsSelected()}
            inputClassName="disabled:bg-transparent disabled:border-transparent disabled:opacity-100"
          />
        ),
      },
      {
        id: "actions",
        header: () => <EllipsisVertical size={20} />,
        cell: (info) => (
          <div className="flex gap-1.5 items-center">
            <Button
              type="button"
              variant={"default"}
              size={"sm"}
              onClick={() => handleUpdate(info.row.index)}
              disabled={!info.row.getIsSelected()}
            >
              <Edit />
            </Button>
            <DeleteAlertDialog
              onDelete={() => remove(info.row.original.id)}
              isDeleting={isDeleting}
              disabled={!info.row.getIsSelected()}
              size={"sm"}
            />
          </div>
        ),
      },
    ];
  }, [form]);

  return columns;
};
