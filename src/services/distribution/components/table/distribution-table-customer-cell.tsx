import { Row } from "@tanstack/react-table";
import { DistributionItem } from "../../validations";

type DistributionTableCustomerCellProps = {
  row: Row<DistributionItem>;
};

export const DistributionTableCustomerCell = ({
  row,
}: DistributionTableCustomerCellProps) => {
  const customer = row.original.customer;

  const distributionProducts = row.original.products;

  return (
    <div className="flex justify-start items-center gap-2">
      <span>{customer.name}</span>
      <div className="size-4 rounded-full flex place-content-center text-background typo-label-sm font-medium bg-info-500">
        <span>{distributionProducts.length}</span>
      </div>
    </div>
  );
};
