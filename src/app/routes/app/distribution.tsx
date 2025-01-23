import { QueryClient } from "@tanstack/react-query";

import { ContentLayout } from "@/components/layout";
import {
  CalendarFilter,
  DataTable,
  DebouncedInput,
  useCalendarFilter,
} from "@/components/ui";
import { apiPaths, stagesObj } from "@/config";
import {
  DistributionItemRowExpanded,
  useDistributionColumns,
} from "@/features/distribution";
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
    data: distributionData,
  });

  if (!distributionData?.data) return null;

  const distributionItems = filteredData.filter(
    (item) =>
      item.stage === stagesObj.DISTRIBUTION ||
      item.stage === stagesObj.DELIVERED,
  );

  return (
    <ContentLayout title="დისტრიბუცია">
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
        data={distributionItems}
        columns={columns}
        fallback={fallback}
        renderSubComponent={({ row }) => (
          <DistributionItemRowExpanded row={row} />
        )}
        getRowCanExpand={() => true}
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
      />
    </ContentLayout>
  );
};

export default DistributionRoute;
