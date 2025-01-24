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
import { useRemoveProduct, useUpdateProduct } from "../../services";

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
  const { remove, isRemoving } = useRemoveProduct();

  const handleUpdate = (index: number) => {
    const updatedProduct = form.getValues().products[index];
    update(updatedProduct);
  };

  const columns: ColumnDef<Product>[] = useMemo(() => {
    return [
      {
        id: "select_col",
        header: () => (
          <Checkbox
            className="border-white size-5 mt-1 disabled:opacity-100 bg-white"
            disabled
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            className="size-5 mt-1 ml-3"
            onClick={row.getToggleSelectedHandler()}
            disabled={!row.getCanSelect()}
            checked={row.getIsSelected()}
          />
        ),
        enableSorting: false,
      },
      {
        accessorKey: "id",
        header: () => <span className="font-sans">ID</span>,
        cell: (info) => (
          <span className="text-primary/80 ml-3">
            {info.getValue() as number}
          </span>
        ),
      },
      {
        accessorKey: "productCode",
        header: () => "SKU",
        cell: (info) => (
          <InputField
            form={form}
            name={`products.${info.row.index}.productCode`}
            type="text"
            showMessage={false}
            disabled={!info.row.getIsSelected()}
            inputClassName="disabled:bg-transparent disabled:border-transparent disabled:opacity-100"
            className="w-16"
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
            triggerClassName="disabled:bg-transparent disabled:border-transparent disabled:opacity-100"
            disabled={!info.row.getIsSelected()}
            className="w-20"
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
            disabled={!info.row.getIsSelected()}
            inputClassName="disabled:bg-transparent disabled:border-transparent disabled:opacity-100"
            className="min-w-64"
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
            className="max-w-16"
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
            className="max-w-16"
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
            className="max-w-16"
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
            className="max-w-16"
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
            className="max-w-16"
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
            className="max-w-16"
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
            className="max-w-16"
          />
        ),
      },
      {
        id: "actions",
        header: () => <EllipsisVertical size={20} />,
        cell: (info) => (
          <div className="flex items-center -mr-3">
            <Button
              type="button"
              variant={"ghost"}
              onClick={() => handleUpdate(info.row.index)}
              disabled={!info.row.getIsSelected()}
              className="hover:text-neutral-500 transition-colors size-9"
            >
              <Edit />
            </Button>
            <DeleteAlertDialog
              onRemove={() => remove(info.row.original.id)}
              isRemoving={isRemoving}
              disabled={!info.row.getIsSelected()}
              variant={"ghost"}
              className="hover:text-neutral-500 transition-colors size-9"
            />
          </div>
        ),
      },
    ];
  }, []);

  return columns;
};
