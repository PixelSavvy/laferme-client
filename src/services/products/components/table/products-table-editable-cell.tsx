import {
  Button,
  DeleteAlertDialog,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui";
import { vatOptions } from "@/config";
import { ColumnDef, Row } from "@tanstack/react-table";
import { Edit } from "lucide-react";
import { MouseEvent } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { Product } from "../../validations";

type ProductsTableFormData = {
  products: Product[];
};

type ProductsTableEditableCellProps = {
  row: Row<Product>;
  column: ColumnDef<Product>;
  submitFn: (payload: Product) => void;
  removeFn: (index: number) => void;
  isProductDeleting: boolean;
};

export const ProductsTableEditableCell = ({
  row,
  column,
  submitFn,
  removeFn,
  isProductDeleting,
}: ProductsTableEditableCellProps) => {
  const form = useFormContext<ProductsTableFormData>();

  const isDisabled = !row.getIsSelected();

  let content = null;

  const onSubmit = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const payload = form.getValues().products[row.index];
    submitFn(payload);
  };

  const onDelete = () => {
    const id = form.getValues().products[row.index].id;
    removeFn(id);
  };

  switch (column.id) {
    case "productCode":
      content = (
        <Controller
          name={`products[${row.index}].productCode`}
          defaultValue={form.getValues().products[row.index].productCode}
          render={({ field }) => (
            <Input
              {...field}
              disabled={isDisabled}
              type="text"
              className="disabled:bg-transparent disabled:border-transparent disabled:opacity-100 disabled:text-foreground max-w-20"
            />
          )}
          disabled={isDisabled}
        />
      );
      break;
    case "title":
      content = (
        <Controller
          name={`products[${row.index}].title`}
          defaultValue={form.getValues().products[row.index].title}
          render={({ field }) => (
            <Input
              {...field}
              type="text"
              className="disabled:bg-transparent disabled:border-transparent disabled:opacity-100 disabled:text-foreground  min-w-80"
            />
          )}
          disabled={isDisabled}
        />
      );
      break;
    case "hasVAT":
      content = (
        <Controller
          name={`products[${row.index}].hasVAT`}
          defaultValue={form.getValues().products[row.index].hasVAT}
          render={({ field }) => (
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <SelectTrigger
                className="disabled:bg-transparent disabled:border-transparent disabled:opacity-100 disabled:text-foreground min-w-24"
                disabled={field.disabled}
                {...field}
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {vatOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
          disabled={isDisabled}
        />
      );
      break;

    case "prices_TR1":
      content = (
        <Controller
          name={`products[${row.index}].prices.TR1`}
          defaultValue={form.getValues().products[row.index].prices.TR1}
          render={({ field }) => (
            <Input
              {...field}
              type="number"
              min={0}
              step={0.01}
              showLeftIcon
              leftIcon={"₾"}
              className="disabled:bg-transparent disabled:border-transparent disabled:opacity-100 disabled:text-foreground"
              onChange={(e) => {
                const value = Number(e.target.value);
                field.onChange(value);
              }}
            />
          )}
          disabled={isDisabled}
        />
      );
      break;

    case "prices_TR2":
      content = (
        <Controller
          name={`products[${row.index}].prices.TR2`}
          defaultValue={form.getValues().products[row.index].prices.TR2}
          render={({ field }) => (
            <Input
              {...field}
              type="number"
              min={0}
              step={0.01}
              showLeftIcon
              leftIcon={"₾"}
              className="disabled:bg-transparent disabled:border-transparent disabled:opacity-100 disabled:text-foreground"
              onChange={(e) => {
                const value = Number(e.target.value);
                field.onChange(value);
              }}
            />
          )}
          disabled={isDisabled}
        />
      );
      break;

    case "prices_TR3":
      content = (
        <Controller
          name={`products[${row.index}].prices.TR3`}
          defaultValue={form.getValues().products[row.index].prices.TR3}
          render={({ field }) => (
            <Input
              {...field}
              type="number"
              min={0}
              step={0.01}
              showLeftIcon
              leftIcon={"₾"}
              className="disabled:bg-transparent disabled:border-transparent disabled:opacity-100 disabled:text-foreground"
              onChange={(e) => {
                const value = Number(e.target.value);
                field.onChange(value);
              }}
            />
          )}
          disabled={isDisabled}
        />
      );

      break;
    case "prices_TR4":
      content = (
        <Controller
          name={`products[${row.index}].prices.TR4`}
          defaultValue={form.getValues().products[row.index].prices.TR4}
          render={({ field }) => (
            <Input
              {...field}
              type="number"
              min={0}
              step={0.01}
              showLeftIcon
              leftIcon={"₾"}
              className="disabled:bg-transparent disabled:border-transparent disabled:opacity-100 disabled:text-foreground"
              onChange={(e) => {
                const value = Number(e.target.value);
                field.onChange(value);
              }}
            />
          )}
          disabled={isDisabled}
        />
      );
      break;

    case "prices_TR5":
      content = (
        <Controller
          name={`products[${row.index}].prices.TR5`}
          defaultValue={form.getValues().products[row.index].prices.TR5}
          render={({ field }) => (
            <Input
              {...field}
              type="number"
              min={0}
              step={0.01}
              showLeftIcon
              leftIcon={"₾"}
              className="disabled:bg-transparent disabled:border-transparent disabled:opacity-100 disabled:text-foreground"
              onChange={(e) => {
                const value = Number(e.target.value);
                field.onChange(value);
              }}
            />
          )}
          disabled={isDisabled}
        />
      );
      break;

    case "prices_TRC":
      content = (
        <Controller
          name={`products[${row.index}].prices.TRC`}
          defaultValue={form.getValues().products[row.index].prices.TRC}
          render={({ field }) => (
            <Input
              {...field}
              type="number"
              min={0}
              step={0.01}
              showLeftIcon
              leftIcon={"₾"}
              className="disabled:bg-transparent disabled:border-transparent disabled:opacity-100 disabled:text-foreground"
              onChange={(e) => {
                const value = Number(e.target.value);
                field.onChange(value);
              }}
            />
          )}
          disabled={isDisabled}
        />
      );
      break;

    case "prices_TRD":
      content = (
        <Controller
          name={`products[${row.index}].prices.TRD`}
          defaultValue={form.getValues().products[row.index].prices.TRD}
          render={({ field }) => (
            <Input
              {...field}
              type="number"
              min={0}
              step={0.01}
              showLeftIcon
              leftIcon={"₾"}
              className="disabled:bg-transparent disabled:border-transparent disabled:opacity-100 disabled:text-foreground"
              onChange={(e) => {
                const value = Number(e.target.value);
                field.onChange(value);
              }}
            />
          )}
          disabled={isDisabled}
        />
      );
      break;

    case "actions":
      content = (
        <div className="flex">
          <Button
            variant={"ghost"}
            disabled={isDisabled}
            onClick={(e) => onSubmit(e)}
            type="submit"
          >
            <Edit />
          </Button>

          <DeleteAlertDialog
            deleteFn={onDelete}
            isPending={isProductDeleting}
            isDisabled={isDisabled}
          />
        </div>
      );
      break;
    default:
      content = null;
  }

  return content;
};
