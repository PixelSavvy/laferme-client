import { CalendarFilter, DataTable, UseCalendarFilter } from "@/components/ui";

import { statuses } from "@/config";
import { useFreezoneItems } from "../../api/get-freezone-items";
import useFreezoneColumns from "./freezone-table-cols";
import { FreezoneTableExpanded } from "./freezone-table-expanded";

export const FreezoneTable = () => {
  const columns = useFreezoneColumns();

  const freezoneQuery = useFreezoneItems({});

  const { showAll, filteredData, fallback, ...rest } = UseCalendarFilter({
    response: freezoneQuery,
  });

  if (!freezoneQuery?.data) return null;

  const notPreparedOrders = freezoneQuery.data.data.filter((freezoneItem) => {
    return freezoneItem.status !== statuses.all.PREPARED;
  });

  const defaultFallback =
    notPreparedOrders.length === 0 ? "შეკვეთები ვერ მოიძებნა" : fallback;

  return (
    <div className="space-y-6 mt-10">
      {/* Actions */}
      <div className="flex gap-4 justify-between">
        <CalendarFilter {...rest} />
      </div>
      <DataTable
        columns={columns}
        data={showAll ? freezoneQuery.data.data : filteredData}
        getRowCanExpand={() => true}
        renderSubComponent={({ row }) => <FreezoneTableExpanded row={row} />}
        fallback={defaultFallback}
        isFreezeRoute
      />
    </div>
  );
};
