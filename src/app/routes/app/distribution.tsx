import { QueryClient } from "@tanstack/react-query";

import { ContentLayout } from "@/components/layout";
import {
  CalendarFilter,
  DataTable,
  DebouncedInput,
  Separator,
  useCalendarFilter,
} from "@/components/ui";
import { apiPaths, stagesObj } from "@/config";
import { useDistributionColumns } from "@/features/distribution";
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

const DistributionRoute = () => {
  const [globalFilter, setGlobalFilter] = useState("");
  const { data: distributionData } = useOrders();

  const columns = useDistributionColumns();

  const { filteredData, fallback, ...restCalendarProps } = useCalendarFilter({
    data: distributionData?.data,
  });

  if (!distributionData?.data) return null;

  const distributionItems = filteredData.filter(
    (item) =>
      item.stage === stagesObj.DISTRIBUTION ||
      item.stage === stagesObj.DELIVERED,
  );

  return (
    <ContentLayout title="დისტრიბუცია">
      <div className="grid grid-cols-2 gap-6 mb-7">
        {/* Page title */}
        <div>
          <h1 className="text-2xl font-semibold mb-1">დისტრიბუცია</h1>
          <span className="text-neutral-600 text-sm">
            დისტრიბუციის ცხრილის აღწერა
          </span>
        </div>

        {/* Actions */}
        <div className="flex justify-end items-center gap-4">
          <DownloadButton url={apiPaths.excel.distribution} />
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
        data={distributionItems}
        columns={columns}
        fallback={fallback}
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
      />
    </ContentLayout>
  );
};

export default DistributionRoute;
