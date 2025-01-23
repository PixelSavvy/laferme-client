import { QueryClient } from "@tanstack/react-query";

import { ContentLayout } from "@/components/layout";
import {
  CalendarFilter,
  DataTable,
  DebouncedInput,
  useCalendarFilter,
} from "@/components/ui";
import { apiPaths } from "@/config";
import {
  CleanzoneItemRowExpanded,
  useCleanzoneColumns,
} from "@/features/cleanzone";
import { DownloadButton } from "@/features/excel";
import { getOrdersQueryOptions, useOrders } from "@/features/orders";
import { useState } from "react";

export const clientLoader = (queryClient: QueryClient) => async () => {
  const query = getOrdersQueryOptions();

  return (
    queryClient.getQueryData(query.queryKey) ??
    (await queryClient.fetchQuery(query))
  );
};

const CleanzoneRoute = () => {
  const [globalFilter, setGlobalFilter] = useState("");
  const { data: cleanzoneData } = useOrders();
  const columns = useCleanzoneColumns();

  const { filteredData, fallback, ...restCalendarProps } = useCalendarFilter({
    data: cleanzoneData,
  });

  if (!cleanzoneData?.data) return null;

  return (
    <ContentLayout title="სუფთა ზონა">
      <div className="flex items-center gap-2 mb-6">
        {/* Excel Download button */}
        <DownloadButton url={apiPaths.excel.cleanzone} />
        {/* Calendar Filter */}
        <CalendarFilter {...restCalendarProps} />

        {/* Global Filter */}
        <DebouncedInput
          value={globalFilter}
          onChange={(event) => setGlobalFilter(event.target.value)}
          placeholder="მოძებნე"
          className="flex-1"
        />
      </div>
      <DataTable
        data={filteredData}
        columns={columns}
        fallback={fallback}
        renderSubComponent={({ row }) => <CleanzoneItemRowExpanded row={row} />}
        getRowCanExpand={() => true}
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
      />
    </ContentLayout>
  );
};

export default CleanzoneRoute;
