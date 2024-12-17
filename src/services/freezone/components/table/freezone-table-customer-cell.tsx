import { Row } from "@tanstack/react-table";
import { FreezoneItem } from "../../validations";

type FreezoneTableCustomerCellProps = {
  row: Row<FreezoneItem>;
};

export const FreezoneTableCustomerCell = ({
  row,
}: FreezoneTableCustomerCellProps) => {
  const customer = row.original.customer;

  const freezoneProducts = row.original.products;

  return (
    <div className="flex justify-start items-center gap-2">
      <span>{customer.name}</span>
      <div className="size-4 rounded-full flex place-content-center text-background typo-label-sm font-medium bg-info-500">
        <span>{freezoneProducts.length}</span>
      </div>
    </div>
  );
};
