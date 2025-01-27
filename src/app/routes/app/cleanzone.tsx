import { QueryClient } from "@tanstack/react-query";

import { ContentLayout } from "@/components/layout";
import {
  CalendarFilter,
  DataTable,
  DebouncedInput,
  Separator,
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
    data: cleanzoneData?.data,
  });

  if (!cleanzoneData?.data) return null;

  return (
    <ContentLayout title="სუფთა ზონა">
      <div className="grid grid-cols-2 gap-6 mb-7">
        {/* Page title */}
        <div>
          <h1 className="text-2xl font-semibold mb-1">სუფთა ზონა</h1>
          <span className="text-neutral-600 text-sm">
            სუფთა ზონის ცხრილის აღწერა
          </span>
        </div>

        {/* Actions */}
        <div className="flex justify-end items-center gap-4">
          <DownloadButton url={apiPaths.excel.cleanzone} />
        </div>

        <Separator className="col-span-full" />

        {/* Filters */}
        <div className="flex justify-between col-span-full">
          <CalendarFilter {...restCalendarProps} />
          <DebouncedInput
            value={globalFilter}
            onChange={(event) => setGlobalFilter(event.target.value)}
            placeholder="მოძებნე"
            className="w-64 "
          />
        </div>
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
