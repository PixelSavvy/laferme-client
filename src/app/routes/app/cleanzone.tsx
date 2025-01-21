import { QueryClient } from "@tanstack/react-query";

import { ContentLayout } from "@/components/layout";
import { CalendarFilter, DataTable, useCalendarFilter } from "@/components/ui";
import { apiPaths } from "@/config";
import {
  CleanzoneItemRowExpanded,
  useCleanzoneColumns,
} from "@/features/cleanzone";
import { DownloadButton } from "@/features/excel";
import { getOrdersQueryOptions, useOrders } from "@/features/orders";

export const clientLoader = (queryClient: QueryClient) => async () => {
  const query = getOrdersQueryOptions();

  return (
    queryClient.getQueryData(query.queryKey) ??
    (await queryClient.fetchQuery(query))
  );
};

const CleanzoneRoute = () => {
  const { data: cleanzoneData } = useOrders();
  const columns = useCleanzoneColumns();

  const { filteredData, fallback, ...rest } = useCalendarFilter();

  if (!cleanzoneData?.data) return null;

  return (
    <ContentLayout title="სუფთა ზონა">
      <div className="flex justify-between items-center mb-6 gap-2">
        <DownloadButton url={apiPaths.excel.getCleanzoneItems} />
        <CalendarFilter props={rest} className="mr-auto" />
      </div>
      <DataTable
        data={filteredData}
        columns={columns}
        fallback={fallback}
        renderSubComponent={({ row }) => <CleanzoneItemRowExpanded row={row} />}
        getRowCanExpand={() => true}
      />
    </ContentLayout>
  );
};

export default CleanzoneRoute;
