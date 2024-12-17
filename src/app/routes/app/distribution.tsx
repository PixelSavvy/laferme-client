import { ContentLayout } from "@/components/layout";
import { getDistributionItemsQueryOptions } from "@/services/distribution";
import { DistributionTable } from "@/services/distribution/components/table/distribution-table";

import { QueryClient } from "@tanstack/react-query";

export const distributionLoader = async (queryClient: QueryClient) => {
  const query = getDistributionItemsQueryOptions();
  const distributionItemsQuery =
    queryClient.getQueryData(query.queryKey) ??
    (await queryClient.fetchQuery(query));

  if (!distributionItemsQuery.data)
    return console.log("No distribution items data found");

  return distributionItemsQuery.data;
};

export const DistributionRoute = () => {
  return (
    <ContentLayout title="დისტრიბუცია">
      <div className="mt-6">
        <DistributionTable />
      </div>
    </ContentLayout>
  );
};
