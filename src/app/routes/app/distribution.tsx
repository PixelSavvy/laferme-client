import { QueryClient } from "@tanstack/react-query";

import { ContentLayout } from "@/components/layout";
import { CalendarFilter, DataTable, useCalendarFilter } from "@/components/ui";
import { apiPaths, stagesObj } from "@/config";
import {
  DistributionItemRowExpanded,
  useDistributionColumns,
} from "@/features/distribution";
import { DownloadButton } from "@/features/excel";
import { getOrdersQueryOptions, useOrders } from "@/features/orders";

export const clientLoader = (queryClient: QueryClient) => async () => {
  const query = getOrdersQueryOptions();

  return (
    queryClient.getQueryData(query.queryKey) ??
    (await queryClient.fetchQuery(query))
  );
};

const DistributionRoute = () => {
  const { data: distributionData } = useOrders();

  const columns = useDistributionColumns();

  const { filteredData, fallback, ...restCalendarProps } = useCalendarFilter({
    data: distributionData,
  });

  if (!distributionData?.data) return null;

  const distributionItems = filteredData.filter(
    (item) =>
      item.stage === stagesObj.DISTRIBUTION ||
      item.stage === stagesObj.DELIVERED
  );

  return (
    <ContentLayout title="დისტრიბუცია">
      <div className="flex justify-between items-center mb-6 gap-2">
        <DownloadButton url={apiPaths.excel.distribution} />
        <CalendarFilter {...restCalendarProps} className="mr-auto" />
      </div>
      <DataTable
        data={distributionItems}
        columns={columns}
        fallback={fallback}
        renderSubComponent={({ row }) => (
          <DistributionItemRowExpanded row={row} />
        )}
        getRowCanExpand={() => true}
      />
    </ContentLayout>
  );
};

export default DistributionRoute;
