import { DataTable } from "@/components/ui";

import { useDistributionItems } from "../../api";
import { useDistributionColumns } from "./distribution-table-cols";
import { DistributionTableExpanded } from "./distribution-table-expanded";

export const DistributionTable = () => {
  const columns = useDistributionColumns();

  const { data: distributionItems } = useDistributionItems({});

  if (!distributionItems?.data) return null;

  return (
    <DataTable
      columns={columns}
      data={distributionItems.data}
      getRowCanExpand={() => true}
      renderSubComponent={({ row }) => <DistributionTableExpanded row={row} />}
      fallback={distributionItems.message}
    />
  );
};
