import { CalendarFilter, DataTable, UseCalendarFilter } from "@/components/ui";

import { useDistributionItems } from "../../api";
import { useDistributionColumns } from "./distribution-table-cols";
import { DistributionTableExpanded } from "./distribution-table-expanded";

export const DistributionTable = () => {
  const columns = useDistributionColumns();

  const distributionQuery = useDistributionItems({});

  const { showAll, filteredData, fallback, ...rest } = UseCalendarFilter({
    response: distributionQuery,
  });

  if (!distributionQuery?.data) return null;

  return (
    <div className="space-y-6 mt-10">
      {/* Actions */}
      <div className="flex gap-4 justify-between">
        <CalendarFilter {...rest} />
      </div>
      <DataTable
        columns={columns}
        data={showAll ? distributionQuery.data.data : filteredData}
        getRowCanExpand={() => true}
        renderSubComponent={({ row }) => (
          <DistributionTableExpanded row={row} />
        )}
        fallback={fallback}
        isDistributionRoute
      />
    </div>
  );
};
