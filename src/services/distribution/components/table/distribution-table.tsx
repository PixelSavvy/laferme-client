import { DataTable } from "@/components/ui";

import { useCalendarFilter } from "@/hooks";
import { useDistributionItems } from "../../api";
import { useDistributionColumns } from "./distribution-table-cols";
import { DistributionTableExpanded } from "./distribution-table-expanded";

export const DistributionTable = () => {
  const columns = useDistributionColumns();

  const distributionQuery = useDistributionItems({});

  const { showAll, filteredData, fallback, CalendarFilter } = useCalendarFilter(
    {
      query: distributionQuery.data
        ? {
            ...distributionQuery.data,
            message: distributionQuery.data.message ?? "",
          }
        : undefined,
    },
  );

  if (!distributionQuery?.data) return null;

  return (
    <div className="space-y-6 mt-10">
      {/* Actions */}
      <div className="flex gap-4 justify-between">{CalendarFilter}</div>
      <DataTable
        columns={columns}
        data={showAll ? distributionQuery.data.data : filteredData}
        getRowCanExpand={() => true}
        renderSubComponent={({ row }) => (
          <DistributionTableExpanded row={row} />
        )}
        fallback={fallback}
        isOrdersRoute
      />
    </div>
  );
};
