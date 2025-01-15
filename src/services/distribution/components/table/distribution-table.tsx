import { CalendarFilter, DataTable, UseCalendarFilter } from "@/components/ui";

import { apiPaths, statuses } from "@/config";
import { DownloadButton } from "@/services/excel";
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

  const notDeliveredOrders = distributionQuery.data.data.filter(
    (distributionItem) => {
      return (
        distributionItem.status !== statuses.all.CANCELLED &&
        distributionItem.status !== statuses.all.RETURNED &&
        distributionItem.status !== statuses.all.DELIVERED
      );
    },
  );

  const defaultFallback =
    notDeliveredOrders.length === 0 ? "შეკვეთები ვერ მოიძებნა" : fallback;

  return (
    <div className="space-y-6 mt-10">
      {/* Actions */}
      <div className="flex gap-4 justify-between">
        <CalendarFilter {...rest} />
        <DownloadButton url={apiPaths.excel.getDistributionItems} />
      </div>
      <DataTable
        columns={columns}
        data={showAll ? distributionQuery.data.data : filteredData}
        getRowCanExpand={() => true}
        renderSubComponent={({ row }) => (
          <DistributionTableExpanded row={row} />
        )}
        fallback={defaultFallback}
        isDistributionRoute
      />
    </div>
  );
};
